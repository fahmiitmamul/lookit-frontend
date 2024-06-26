import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employee: {
        employee_id: '',
        selectedEmployee: [],
    },
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployeeId: (state, action) => {
            state.employee.employee_id = action.payload
        },
        setSelectedData: (state, action) => {
            state.employee.selectedEmployee = action.payload
        },
    },
})

export const { setEmployeeId, setSelectedData } = employeeSlice.actions

export default employeeSlice.reducer
