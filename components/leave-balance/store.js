import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leave_type: {
        leave_type_id: '',
        selectedLeaveType: [],
    },
}

const leaveTypeSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setLeaveTypeDataId: (state, action) => {
            state.leave_type.leave_type_id = action.payload
        },
        setSelectedLeaveTypeData: (state, action) => {
            state.leave_type.selectedLeaveType = action.payload
        },
    },
})

export const { setLeaveTypeDataId, setSelectedLeaveTypeData } =
    leaveTypeSlice.actions

export default leaveTypeSlice.reducer
