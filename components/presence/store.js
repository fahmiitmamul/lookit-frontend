import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    presence: {
        presence_id: '',
        selectedPresenceButton: 'H',
        selectedPresenceData: [],
    },
    presence_records: {
        presence_records_id: '',
        presence_records_data: [],
        selectedMonth: '',
    },
}

const presenceSlice = createSlice({
    name: 'presence',
    initialState,
    reducers: {
        setSelectedPresenceButton: (state, action) => {
            state.presence.selectedPresenceButton = action.payload
        },
        setSelectedPresenceData: (state, action) => {
            state.presence.selectedPresenceData = action.payload
        },
        setPresenceId: (state, action) => {
            state.presence.presence_id = action.payload
        },
        setPresenceRecordsId: (state, action) => {
            state.presence_records.presence_records_id = action.payload
        },
        setPresenceRecordsData: (state, action) => {
            state.presence_records.presence_records_data = action.payload
        },
        setSelectedMonth: (state, action) => {
            state.presence_records.selectedMonth = action.payload
        },
    },
})

export const {
    setSelectedPresenceButton,
    setSelectedPresenceData,
    setPresenceId,
    setPresenceRecordsId,
    setPresenceRecordsData,
    setSelectedMonth,
} = presenceSlice.actions

export default presenceSlice.reducer
