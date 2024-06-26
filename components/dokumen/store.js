import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    document: {
        document_id: '',
        selectedDocument: [],
    },
}

const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setDocumentId: (state, action) => {
            state.document.document_id = action.payload
        },
        setSelectedDocument: (state, action) => {
            state.document.selectedDocument = action.payload
        },
    },
})

export const { setDocumentId, setSelectedDocument } = documentSlice.actions

export default documentSlice.reducer
