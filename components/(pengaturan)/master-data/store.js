import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leave_type: {
        leave_type_id: '',
    },
    permission_type: {
        permission_type_id: '',
    },
    national_holiday: {
        national_holiday_id: '',
    },
    bpjs_type: {
        bpjs_type_id: '',
    },
    insurance_type: {
        insurance_type_id: '',
    },
    vaccine_status: {
        vaccine_status_id: '',
    },
    overtime_type: {
        overtime_type_id: '',
    },
}

const masterDataSlice = createSlice({
    name: 'master-data',
    initialState,
    reducers: {
        setLeaveTypeId: (state, action) => {
            state.leave_type.leave_type_id = action.payload
        },
        setPermissionId: (state, action) => {
            state.permission_type.permission_type_id = action.payload
        },
        setNationalHolidayId: (state, action) => {
            state.national_holiday.national_holiday_id = action.payload
        },
        setBpjsTypeId: (state, action) => {
            state.bpjs_type.bpjs_type_id = action.payload
        },
        setInsuranceTypeId: (state, action) => {
            state.insurance_type.insurance_type_id = action.payload
        },
        setVaccineStatusId: (state, action) => {
            state.vaccine_status.vaccine_status_id = action.payload
        },
        setOvertimeTypeId: (state, action) => {
            state.overtime_type.overtime_type_id = action.payload
        },
    },
})

export const {
    setLeaveTypeId,
    setPermissionId,
    setNationalHolidayId,
    setBpjsTypeId,
    setInsuranceTypeId,
    setVaccineStatusId,
    setOvertimeTypeId,
} = masterDataSlice.actions

export default masterDataSlice.reducer
