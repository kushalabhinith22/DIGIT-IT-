import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'

export default function App(){
  const { user, logout } = useAuth()
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo">ET</div>
          <div className="title">
            <h1>EdTech Task Manager</h1>
            <p>Student & Teacher task tracking</p>
          </div>
        </div>

        <div className="header-actions">
          {!user ? (
            <>
              <Link to="/login" className="small">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </>
          ) : (
            <>
              <div className="role-pill">{user.role}</div>
              <button className="btn btn-outline" onClick={() => setShowInfo(s => !s)}>
                {showInfo ? 'Hide info' : 'Show info'}
              </button>
            </>
          )}
        </div>
      </header>

      {user && showInfo && (
        <div className="info-panel card" style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="small">Your ID</div>
              <div className="mono" style={{ marginTop: 6 }}>{user.id}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div className="small">Email</div>
              <div style={{ marginTop: 6, color: '#cfe8ff' }}>{user.email}</div>
            </div>
          </div>

          {user.role === 'student' && user.teacherId && (
            <div style={{ marginTop: 12 }}>
              <div className="small">Assigned Teacher</div>
              <div style={{ marginTop: 6, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="mono">{user.teacherId}</div>
                <button className="btn btn-outline" onClick={() => navigator.clipboard.writeText(user.teacherId)}>Copy</button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <button className="btn btn-outline" onClick={logout}>Logout</button>
          </div>
        </div>
      )}

      <main className="main-grid">
        <div>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </div>

        <aside>
          <div className="card">
            <h4 style={{ margin: 0 }}>Quick Notes</h4>
            <p className="small" style={{ marginTop: 8 }}>
              This is a compact dark-mode UI. Your data and API are unchanged.
            </p>
            <ul className="small" style={{ paddingLeft: 18 }}>
              <li>Teacher sees assigned students' tasks</li>
              <li>Student sees only own tasks</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}