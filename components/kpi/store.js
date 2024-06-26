import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    kpi: {
        kpi_id: '',
        selectedKPI: [],
    },
}

const kpiSlice = createSlice({
    name: 'kpi',
    initialState,
    reducers: {
        setKPIId: (state, action) => {
            state.kpi.kpi_id = action.payload
        },
        setSelectedKPIData: (state, action) => {
            state.kpi.selectedKPI = action.payload
        },
    },
})

export const { setKPIId, setSelectedKPIData } = kpiSlice.actions

export default kpiSlice.reducer
