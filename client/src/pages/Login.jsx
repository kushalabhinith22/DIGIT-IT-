import React, { useState } from 'react'
import api from '../api'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      if (res.data?.success) {
        login(res.data.token, res.data.user)
        nav('/')
      } else setError(res.data?.message || 'Login failed')
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <div className="card">
        <h3>Login</h3>
        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <label className="small">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          <label className="small" style={{ marginTop: 10 }}>Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <div style={{ color: '#fb7185', marginTop: 10 }}>{error}</div>}
          <div style={{ marginTop: 12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <button className="btn btn-primary" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
            <Link to="/signup" className="small">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}