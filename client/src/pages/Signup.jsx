import React, { useState } from 'react'
import api from '../api'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [teacherId, setTeacherId] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      const payload = role === 'student' ? { email, password, role, teacherId } : { email, password, role }
      const res = await api.post('/auth/signup', payload)
      if (res.data?.success) {
        login(res.data.token, res.data.user)
        nav('/')
      } else setError(res.data?.message || 'Signup failed')
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="card">
        <h3>Signup</h3>
        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <label className="small">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          
          <label className="small" style={{ marginTop: 10 }}>Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          
          <label className="small" style={{ marginTop: 10 }}>Role</label>
          <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {role === 'student' && (
            <>
              <label className="small" style={{ marginTop: 10 }}>Teacher ID</label>
              <input className="input" value={teacherId} onChange={e=>setTeacherId(e.target.value)} placeholder="Paste teacher ID" />
            </>
          )}

          {error && <div style={{ color: '#fb7185', marginTop: 10 }}>{error}</div>}
          <div style={{ marginTop: 12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Signup'}</button>
            <Link to="/login" className="small">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}