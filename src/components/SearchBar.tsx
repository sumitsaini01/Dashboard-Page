import React from 'react'

export default function SearchBar({ query, setQuery }: { query: string, setQuery: (q: string)=>void }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search widgets by name..."
        className="flex-1 p-2 border rounded"
      />
    </div>
  )
}
