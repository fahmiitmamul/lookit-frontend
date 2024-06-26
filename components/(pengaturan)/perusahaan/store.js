import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    company: {
        company_id: '',
    },
    area: {
        area_id: '',
    },
    branch: {
        branch_id: '',
    },
    division: {
        division_id: '',
    },
    position: {
        position_id: '',
    },
    level: {
        level_id: '',
    },
}

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyId: (state, action) => {
            state.company.company_id = action.payload
        },
        setAreaId: (state, action) => {
            state.area.area_id = action.payload
        },
        setBranchId: (state, action) => {
            state.branch.branch_id = action.payload
        },
        setDivisionId: (state, action) => {
            state.division.division_id = action.payload
        },
        setPositionId: (state, action) => {
            state.position.position_id = action.payload
        },
        setLevelId: (state, action) => {
            state.level.level_id = action.payload
        },
    },
})

export const {
    setCompanyId,
    setAreaId,
    setBranchId,
    setDivisionId,
    setPositionId,
    setLevelId,
} = companySlice.actions

export default companySlice.reducer
