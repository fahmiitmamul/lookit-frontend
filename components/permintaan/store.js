import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    requests: {
        requests_id: '',
        selectedRequests: [],
    },
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        setRequestsId: (state, action) => {
            state.requests.requests_id = action.payload
        },
        setSelectedRequestsData: (state, action) => {
            state.requests.selectedRequests = action.payload
        },
    },
})

export const { setRequestsId, setSelectedRequestsData } = requestsSlice.actions

export default requestsSlice.reducer
