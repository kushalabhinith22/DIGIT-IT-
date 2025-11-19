import React, { useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from '../contexts/AuthContext'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  const loadTasks = async () => {
    setLoading(true)
    try {
      const res = await api.get('/tasks')
      if (res.data?.success) setTasks(res.data.tasks)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadTasks() }, [])

  const handleCreate = (task) => setTasks(prev => [task, ...prev])
  const handleUpdate = (updated) => setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)))
  const handleDelete = (id) => setTasks(prev => prev.filter(t => t._id !== id))

  const filtered = tasks.filter(t => (filter === 'all' ? true : t.progress === filter))

  return (
    <div style={{ padding: 12 }}>
      <h3>Dashboard</h3>
      <div style={{ marginBottom: 12 }}>
        <TaskForm onCreate={handleCreate} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Filter: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? <div>Loading tasks...</div> : <TaskList tasks={filtered} onUpdate={handleUpdate} onDelete={handleDelete} currentUser={user} />}
    </div>
  )
}
