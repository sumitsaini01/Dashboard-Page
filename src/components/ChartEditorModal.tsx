import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editWidget } from '../store/slices/dashboardSlice'

export default function ChartEditorModal({ widget, categoryId, onClose }: any) {
  const dispatch = useDispatch()
  const [rows, setRows] = useState(widget.chartData || [])

  function updateRow(index: number, key: string, value: any) {
    const copy = [...rows]
    copy[index] = { ...copy[index], [key]: value }
    setRows(copy)
  }

  function addRow() {
    setRows([...rows, { name: 'New', value: 0 }])
  }

  function removeRow(i: number) {
    setRows(rows.filter((_, idx) => idx !== i))
  }

  function save() {
    dispatch(editWidget({ categoryId, widgetId: widget.id, changes: { chartData: rows } }))
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-4 rounded shadow w-full max-w-lg">
        <h3 className="font-semibold mb-2">Edit Chart Data - {widget.name}</h3>
        <div className="space-y-2 max-h-64 overflow-auto">
          {rows.map((r: any, idx: number) => (
            <div key={idx} className="flex gap-2 items-center">
              <input value={r.name} onChange={e=>updateRow(idx, 'name', e.target.value)} className="border p-1 rounded flex-1" />
              <input value={r.value ?? r.y ?? r.x ?? ''} onChange={e=>updateRow(idx, 'value', Number(e.target.value))} className="border p-1 rounded w-28" />
              <button onClick={()=>removeRow(idx)} className="px-2 py-1 border rounded text-sm">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3 justify-end">
          <button onClick={addRow} className="px-3 py-1 border rounded">Add Row</button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
