import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  key: number
  title: string,
  description?: string,
  completed: boolean
}

export interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: []
}

// TODO: pass isEditing here

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Omit<Task, 'key' | 'completed'>>) => {
      const key = Date.now();
      const completed = false;
      state.tasks.push({...action.payload, key, completed})
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.key === action.payload.key);
      if (index != -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.key !== action.payload)
    },
    toggleCompletion: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex(task => task.key === action.payload);
      if (index != -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
      }    
    },
  }
})

export const { setTasks, addTask, updateTask, deleteTask, toggleCompletion } = taskSlice.actions;
export default taskSlice.reducer;