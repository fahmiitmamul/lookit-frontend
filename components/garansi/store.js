import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    guarantee: {
        guarantee_id: '',
        selectedGuarantee: [],
    },
}

const guaranteeSlice = createSlice({
    name: 'guarantee',
    initialState,
    reducers: {
        setGuaranteeId: (state, action) => {
            state.guarantee.guarantee_id = action.payload
        },
        setSelectedGuarantee: (state, action) => {
            state.guarantee.selectedGuarantee = action.payload
        },
    },
})

export const { setGuaranteeId, setSelectedGuarantee } = guaranteeSlice.actions

export default guaranteeSlice.reducer
