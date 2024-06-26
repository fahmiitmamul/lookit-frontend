import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shift: {
        shift_id: '',
        schedule_id: '',
        start: '',
    },
}

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        setShiftId: (state, action) => {
            state.shift.shift_id = action.payload
        },
        setScheduleId: (state, action) => {
            state.shift.schedule_id = action.payload
        },
        setStartDate: (state, action) => {
            state.shift.start = action.payload
        },
    },
})

export const { setShiftId, setScheduleId, setStartDate } = shiftSlice.actions

export default shiftSlice.reducer
