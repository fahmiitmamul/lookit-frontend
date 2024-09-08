import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mutation: {
        mutation_id: '',
        selectedMutation: [],
    },
}

const mutationSlice = createSlice({
    name: 'mutation',
    initialState,
    reducers: {
        setMutationId: (state, action) => {
            state.mutation.mutation_id = action.payload
        },
        setSelectedMutationData: (state, action) => {
            state.mutation.selectedMutation = action.payload
        },
    },
})

export const { setMutationId, setSelectedMutationData } = mutationSlice.actions

export default mutationSlice.reducer
