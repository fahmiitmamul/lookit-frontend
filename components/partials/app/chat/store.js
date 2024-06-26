import { createSlice } from '@reduxjs/toolkit'
import { fetchContacts } from './action'

export const appChatSlice = createSlice({
    name: 'appchat',
    initialState: {
        openProfile: false,
        openinfo: true,
        activechat: false,
        searchContact: '',
        mobileChatSidebar: false,
        employee_id: '',
        user: {},
        contacts: [],
    },
    reducers: {
        openChat: (state, action) => {
            state.activechat = action.payload.activechat
            state.mobileChatSidebar = !state.mobileChatSidebar
            state.user = action.payload.contact
        },
        // toggole mobile chat sidebar
        toggleMobileChatSidebar: (state, action) => {
            state.mobileChatSidebar = action.payload
        },
        infoToggle: (state, action) => {
            state.openinfo = action.payload
        },
        setEmployeeChatId: (state, action) => {
            state.employee_id = action.payload
        },
        toggleProfile: (state, action) => {
            state.openProfile = action.payload
        },
        setContactSearch: (state, action) => {
            state.searchContact = action.payload
        },
        toggleActiveChat: (state, action) => {
            state.activechat = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.contacts = false
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.contacts = action.payload
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.contacts = false
            })
    },
})

export const {
    openChat,
    toggleMobileChatSidebar,
    infoToggle,
    toggleProfile,
    setContactSearch,
    toggleActiveChat,
    setEmployeeChatId,
} = appChatSlice.actions

export default appChatSlice.reducer
