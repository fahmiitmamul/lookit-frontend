import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ticket: {
        ticket_id: '',
        selectedTicket: [],
    },
}

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicketId: (state, action) => {
            state.ticket.ticket_id = action.payload
        },
        setSelectedTicket: (state, action) => {
            state.ticket.selectedTicket = action.payload
        },
    },
})

export const { setTicketId, setSelectedTicket } = ticketSlice.actions

export default ticketSlice.reducer
