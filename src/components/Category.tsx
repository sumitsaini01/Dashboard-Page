import React, { useState } from 'react'
import WidgetCard from './WidgetCard'
import AddWidgetModal from './AddWidgetModal'
import { Plus } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { reorderWidgets } from '../store/slices/dashboardSlice'
import { removeCategory } from '../store/slices/dashboardSlice'

export default function Category({ category, searchQuery }: any) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const visibleWidgets = category.widgets.filter((w: any) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    dispatch(reorderWidgets({ categoryId: category.id, startIndex: result.source.index, endIndex: result.destination.index }))
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{category.name}</h2>
        <button onClick={() => { if(window.confirm('Are you sure you want to delete this category?')) dispatch(removeCategory(category.id)) }} className="ml-4 text-red-600 hover:text-red-800 text-sm">Remove Category</button>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm text-blue-600">
          <Plus size={14} /> Add Widget
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={category.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-3 space-y-3">
              {visibleWidgets.length === 0 ? (
                <p className="text-sm text-gray-500">No widgets to show.</p>
              ) : (
                visibleWidgets.map((w: any, index: number) => (
                  <Draggable key={w.id} draggableId={w.id} index={index}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                        <WidgetCard widget={w} categoryId={category.id} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {open && <AddWidgetModal onClose={() => setOpen(false)} categoryId={category.id} />}
    </div>
  )
}