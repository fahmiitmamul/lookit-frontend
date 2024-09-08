import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    assets: {
        assets_id: '',
        selectedAssets: [],
    },
}

const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        setAssetsId: (state, action) => {
            state.assets.assets_id = action.payload
        },
        setSelectedAssets: (state, action) => {
            state.assets.selectedAssets = action.payload
        },
    },
})

export const { setAssetsId, setSelectedAssets } = assetsSlice.actions

export default assetsSlice.reducer
