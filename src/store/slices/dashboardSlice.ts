import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export type ChartKind = 'line' | 'bar' | 'pie' | 'area' | 'radar' | 'scatter'

export interface Widget {
  id: string
  name: string
  type: 'text' | 'chart'
  text?: string
  chartKind?: ChartKind
  chartData?: any[]
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}

export interface DashboardState {
  categories: Category[]
}

const persisted = typeof window !== 'undefined' ? localStorage.getItem('dashboardState') : null
const initialState: DashboardState = persisted ? JSON.parse(persisted) : {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'w1', name: 'Sales Overview', type: 'chart', chartKind: 'line', chartData: [{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 500 }] },
        { id: 'w2', name: 'Notes', type: 'text', text: 'This is a note widget.' }
      ]
    },
    {
      id: 'ops',
      name: 'Operations',
      widgets: [
        { id: 'w3', name: 'Revenue by Region', type: 'chart', chartKind: 'bar', chartData: [{ name: 'North', value: 120 }, { name: 'South', value: 90 }] }
      ]
    }
  ]
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
removeCategory: (state, action: PayloadAction<string>) => {
  state.categories = state.categories.filter(c => c.id !== action.payload)
},

    addWidget: {
      reducer(state, action: PayloadAction<{ categoryId: string, widget: Widget }>) {
        const { categoryId, widget } = action.payload
        const cat = state.categories.find(c => c.id === categoryId)
        if (cat) cat.widgets.push(widget)
      },
      prepare(categoryId: string, widget: Omit<Widget, 'id'>) {
        return {
          payload: {
            categoryId,
            widget: { id: nanoid(), ...widget }
          }
        }
      }
    },
    removeWidget(state, action: PayloadAction<{ categoryId: string, widgetId: string }>) {
      const { categoryId, widgetId } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) cat.widgets = cat.widgets.filter(w => w.id !== widgetId)
    },
    editWidget(state, action: PayloadAction<{ categoryId: string, widgetId: string, changes: Partial<Widget> }>) {
      const { categoryId, widgetId, changes } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        const w = cat.widgets.find(w => w.id === widgetId)
        if (w) Object.assign(w, changes)
      }
    },
    reorderWidgets(state, action: PayloadAction<{ categoryId: string, startIndex: number, endIndex: number }>) {
      const { categoryId, startIndex, endIndex } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        const [removed] = cat.widgets.splice(startIndex, 1)
        cat.widgets.splice(endIndex, 0, removed)
      }
    },
    addCategory(state, action: PayloadAction<{ id: string, name: string }>) {
      state.categories.push({ id: action.payload.id, name: action.payload.name, widgets: [] })
    }
  }
})

export const { addWidget, removeWidget, editWidget, reorderWidgets, addCategory , removeCategory} = dashboardSlice.actions
export default dashboardSlice.reducer
