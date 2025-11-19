import React, { useState } from 'react'
import api from '../api'

export default function TaskItem({ task, onUpdate, onDelete, currentUser }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [progress, setProgress] = useState(task.progress)
  const [loading, setLoading] = useState(false)

  const currentUserId = currentUser?.id || currentUser?._id || null
  const isOwner = task.userId === currentUserId

  const save = async () => {
    setLoading(true)
    try {
      const res = await api.put(`/tasks/${task._id}`, { title, description, progress })
      if (res.data?.success) {
        onUpdate(res.data.task)
        setEditing(false)
      } else {
        alert(res.data?.message || 'Update failed')
      }
    } catch (err) {
      alert(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async () => {
    if (!confirm('Delete task?')) return
    try {
      await api.delete(`/tasks/${task._id}`)
      onDelete(task._id)
    } catch (err) {
      alert(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div style={{ border: '1px solid #eee', padding: 8, borderRadius: 6 }}>
      {editing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%' }} />
          <div style={{ marginTop: 6 }}>
            <input value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginTop: 6 }}>
            <select value={progress} onChange={e => setProgress(e.target.value)}>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={save} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{task.title}</strong>
              <div style={{ fontSize: 12, color: '#555' }}>{task.description}</div>
              <div style={{ fontSize: 12, color: '#666' }}>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
              <div style={{ fontSize: 12 }}>Progress: <b>{task.progress}</b></div>
            </div>

            <div>
              {isOwner ? (
                <>
                  <button onClick={() => setEditing(true)}>Edit</button>
                  <button onClick={remove} style={{ marginLeft: 6 }}>Delete</button>
                </>
              ) : (
                <div style={{ fontSize: 12, color: '#999' }}>Read only</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
