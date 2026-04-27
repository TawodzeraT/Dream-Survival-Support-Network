import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext(null)

const ADMIN_USERS = [
  { username: 'admin', password: 'dssn2024!', name: 'Admin User', role: 'admin' },
  { username: 'editor', password: 'editor2024', name: 'Content Editor', role: 'editor' },
]

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try { const s = sessionStorage.getItem('dssn_admin'); return s ? JSON.parse(s) : null } catch { return null }
  })
  const [users, setUsers] = useState(() => {
    try { const s = localStorage.getItem('dssn_admin_users'); return s ? JSON.parse(s) : ADMIN_USERS } catch { return ADMIN_USERS }
  })

  useEffect(() => { localStorage.setItem('dssn_admin_users', JSON.stringify(users)) }, [users])

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      const { password: _, ...safeUser } = user
      setAdminUser(safeUser)
      sessionStorage.setItem('dssn_admin', JSON.stringify(safeUser))
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password' }
  }

  const logout = () => { setAdminUser(null); sessionStorage.removeItem('dssn_admin') }
  const addUser = (user) => { setUsers(prev => [...prev, { ...user, id: Date.now() }]) }
  const updateUser = (username, updates) => { setUsers(prev => prev.map(u => u.username === username ? { ...u, ...updates } : u)) }
  const deleteUser = (username) => { setUsers(prev => prev.filter(u => u.username !== username)) }

  return (
    <AdminContext.Provider value={{
      adminUser, currentUser: adminUser,
      isAuthenticated: !!adminUser,
      login, logout, users, addUser, updateUser, deleteUser,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
