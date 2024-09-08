import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activity: {
        activity_id: '',
    },
}

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setActivityId: (state, action) => {
            state.activity.activity_id = action.payload
        },
    },
})

export const { setActivityId } = activitySlice.actions

export default activitySlice.reducer
