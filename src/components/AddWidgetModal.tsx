import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addWidget } from '../store/slices/dashboardSlice'

const SUGGESTIONS = [
  { name: 'Sales Overview', type: 'chart', chartKind: 'line', chartData: [{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 500 }] },
  { name: 'Revenue by Region', type: 'chart', chartKind: 'bar', chartData: [{ name: 'North', value: 120 }, { name: 'South', value: 90 }, { name: 'East', value: 80 }] },
  { name: 'Market Share', type: 'chart', chartKind: 'pie', chartData: [{ name: 'Product A', value: 45 }, { name: 'Product B', value: 35 }, { name: 'Product C', value: 20 }] },
  { name: 'Traffic Trend', type: 'chart', chartKind: 'area', chartData: [{ name: 'Week1', value: 200 }, { name: 'Week2', value: 450 }] },
  { name: 'Performance Radar', type: 'chart', chartKind: 'radar', chartData: [{ name: 'Q1', value: 80 }, { name: 'Q2', value: 90 }, { name: 'Q3', value: 75 }] },
  { name: 'Quality Scatter', type: 'chart', chartKind: 'scatter', chartData: [{ x: 10, y: 20 }, { x: 20, y: 35 }, { x: 30, y: 25 }] },
  { name: 'Notes', type: 'text', text: 'Write quick notes here' }
]

export default function AddWidgetModal({ onClose, categoryId }: any) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [type, setType] = useState('text')
  const [chartKind, setChartKind] = useState<any>('line')
  const [chartData, setChartData] = useState<any[]>([])
  const dispatch = useDispatch()

  function pickSuggestion(s: any) {
    setName(s.name || '')
    setType(s.type || 'text')
    setText(s.text || '')
    setChartKind(s.chartKind || 'line')
    setChartData(s.chartData || [])
  }

  function handleAdd() {
    if (!name.trim()) return
    const widget: any = { name, type }
    if (type === 'text') widget.text = text
    else { widget.chartKind = chartKind; widget.chartData = chartData }
    dispatch(addWidget(categoryId, widget))
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-20 bg-black/40 z-50">
      <div className="bg-white p-4 rounded shadow w-full max-w-2xl">
        <h3 className="font-semibold mb-2">Add Widget</h3>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="mb-2">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Widget name" className="w-full p-2 border rounded mb-2" />
              <select value={type} onChange={e=>setType(e.target.value)} className="w-full p-2 border rounded mb-2">
                <option value="text">Text</option>
                <option value="chart">Chart</option>
              </select>
              {type === 'text' ? (
                <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Widget text" className="w-full p-2 border rounded mb-2" />
              ) : (
                <div>
                  <select value={chartKind} onChange={e=>setChartKind(e.target.value)} className="w-full p-2 border rounded mb-2">
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                    <option value="pie">Pie</option>
                    <option value="area">Area</option>
                    <option value="radar">Radar</option>
                    <option value="scatter">Scatter</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
                <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="font-semibold mb-2">Suggestions</h4>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTIONS.map((s, idx) => (
                <div key={idx} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.type === 'chart' ? `Chart: ${s.chartKind}` : s.text}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>pickSuggestion(s)} className="px-2 py-1 border rounded text-sm">Use</button>
                    <button onClick={()=>{ dispatch(addWidget(categoryId, { name: s.name, type: s.type, chartKind: s.chartKind, chartData: s.chartData, text: s.text })); onClose(); }} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Pick & Add</button>
                  </div>
                </div>
              ))}
              <div className="mt-3 text-xs text-gray-500">Click "Use" to fill form and edit data before adding, or "Pick & Add" to add immediately.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
