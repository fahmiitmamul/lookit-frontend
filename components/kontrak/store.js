import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contract: {
        contract_id: '',
        submission_id: '',
        file: '',
    },
}

const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContractId: (state, action) => {
            state.contract.contract_id = action.payload
        },
        setSubmissionId: (state, action) => {
            state.contract.submission_id = action.payload
        },
        setFileURL: (state, action) => {
            state.contract.file = action.payload
        },
    },
})

export const { setContractId, setSubmissionId, setFileURL } =
    contractSlice.actions

export default contractSlice.reducer
