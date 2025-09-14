import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Category from './Category'
import { addCategory } from '../store/slices/dashboardSlice'
import { Plus } from 'lucide-react'
import { RootState } from '../store'

export default function Dashboard({ searchQuery }: { searchQuery: string }) {
  const categories = useSelector((s: RootState) => s.dashboard.categories)
  const dispatch = useDispatch()
  const [newCatName, setNewCatName] = useState('')

  function handleAddCategory() {
    if (!newCatName.trim()) return
    const id = newCatName.toLowerCase().replace(/\s+/g, '-')
    dispatch(addCategory({ id, name: newCatName }))
    setNewCatName('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <input
          value={newCatName}
          onChange={e => setNewCatName(e.target.value)}
          placeholder="Add new category..."
          className="p-2 border rounded flex-1"
        />
        <button onClick={handleAddCategory} className="px-4 py-2 bg-blue-600 text-white rounded inline-flex items-center gap-2">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <Category key={cat.id} category={cat} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  )
}
