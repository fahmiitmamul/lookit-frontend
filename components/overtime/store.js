import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    overtime: {
        overtime_id: '',
        showVerificationModal: false,
        selectedOvertimeData: [],
    },
}

const overtimeSlice = createSlice({
    name: 'overtime',
    initialState,
    reducers: {
        setOvertimeId: (state, action) => {
            state.overtime.overtime_id = action.payload
        },
        setShowVerificationModal: (state, action) => {
            state.overtime.showVerificationModal = action.payload
        },
        setSelectedOvertimeData: (state, action) => {
            state.overtime.selectedOvertimeData = action.payload
        },
    },
})

export const {
    setOvertimeId,
    setSelectedOvertimeData,
    setShowVerificationModal,
} = overtimeSlice.actions

export default overtimeSlice.reducer
