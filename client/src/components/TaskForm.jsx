import React, { useState } from 'react'
import api from '../api'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = { title, description, dueDate: dueDate || undefined }
      const res = await api.post('/tasks', payload)
      if (res.data?.success) {
        onCreate(res.data.task)
        setTitle(''); setDescription(''); setDueDate('')
      } else {
        setError(res.data?.message || 'Create failed')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <div>
        <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Due date: </label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      </div>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <div style={{ marginTop: 10 }}>
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
      </div>
    </form>
  )
}
