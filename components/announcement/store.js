import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    announcement: {
        announcement_id: '',
        selectedAnnouncement: [],
    },
}

const announcementSlice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        setAnnouncementId: (state, action) => {
            state.announcement.announcement_id = action.payload
        },
        setSelectedAnnouncement: (state, action) => {
            state.announcement.selectedAnnouncement = action.payload
        },
    },
})

export const { setAnnouncementId, setSelectedAnnouncement } =
    announcementSlice.actions

export default announcementSlice.reducer
