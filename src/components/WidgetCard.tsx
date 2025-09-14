import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeWidget, editWidget } from '../store/slices/dashboardSlice'
import { X, Pencil, Edit2 } from 'lucide-react'
import GraphWidget from './GraphWidget'
import ChartEditorModal from './ChartEditorModal'

export default function WidgetCard({ widget, categoryId }: any) {
  const dispatch = useDispatch()
  const [editingMeta, setEditingMeta] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [name, setName] = useState(widget.name)
  const [text, setText] = useState(widget.text || '')

  function saveMeta() {
    dispatch(editWidget({ categoryId, widgetId: widget.id, changes: { name, text } }))
    setEditingMeta(false)
  }

  return (
    <div className="border p-3 rounded flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{widget.name}</h3>
          {widget.type === 'text' && <p className="text-sm text-gray-600">{widget.text}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpenEditor(true)} className="p-1 text-green-600" title="Edit data">
            <Edit2 size={16} />
          </button>
          <button onClick={() => setEditingMeta(!editingMeta)} className="p-1 text-blue-600" title="Edit">
            <Pencil size={16} />
          </button>
          <button onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))} title="Remove" className="p-1 text-red-600">
            <X size={16} />
          </button>
        </div>
      </div>

      <div>
        {widget.type === 'chart' ? (
          <GraphWidget widget={widget} />
        ) : null}
      </div>

      {editingMeta && (
        <div className="space-y-2">
          <input value={name} onChange={e=>setName(e.target.value)} className="border p-1 w-full rounded" />
          <textarea value={text} onChange={e=>setText(e.target.value)} className="border p-1 w-full rounded" />
          <div className="flex gap-2">
            <button onClick={saveMeta} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Save</button>
            <button onClick={()=>setEditingMeta(false)} className="px-2 py-1 border rounded text-sm">Cancel</button>
          </div>
        </div>
      )}

      {openEditor && <ChartEditorModal widget={widget} categoryId={categoryId} onClose={()=>setOpenEditor(false)} />}
    </div>
  )
}
