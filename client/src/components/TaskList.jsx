import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks = [], onUpdate, onDelete, currentUser }) {
  if (!tasks.length) return <div>No tasks to show.</div>

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {tasks.map(t => <TaskItem key={t._id} task={t} onUpdate={onUpdate} onDelete={onDelete} currentUser={currentUser} />)}
    </div>
  )
}
