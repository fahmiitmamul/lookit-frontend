import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: {
        tasks_id: '',
        selectedTasks: [],
    },
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksId: (state, action) => {
            state.tasks.tasks_id = action.payload
        },
        setSelectedTasksData: (state, action) => {
            state.tasks.selectedTasks = action.payload
        },
    },
})

export const { setTasksId, setSelectedTasksData } = tasksSlice.actions

export default tasksSlice.reducer
