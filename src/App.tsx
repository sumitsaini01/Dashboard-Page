import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import SearchBar from './components/SearchBar'
import { useSelector } from 'react-redux'
import { RootState } from './store'

export default function App() {
  const [query, setQuery] = useState('')
  const state = useSelector((s: RootState) => s.dashboard)

  useEffect(() => {
    try {
      localStorage.setItem('dashboardState', JSON.stringify(state))
    } catch (e) {
      // ignore storage errors
    }
  }, [state])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow">
        <div className="font-bold text-lg flex items-center gap-2">📊 Dashboard Assignment</div>
        <div className="flex gap-6 text-sm">
          <span className="hover:text-blue-400 cursor-pointer">My Dashboard</span>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Dynamic Dashboard</h1>
        <p className="text-gray-600">Manage your widgets and visualize data with charts</p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-10">
        <SearchBar query={query} setQuery={setQuery} />
        <Dashboard searchQuery={query} />
      </main>
    </div>
  )
}
