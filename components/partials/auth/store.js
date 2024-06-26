import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: [],
        isAuth: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        handleLogin: (state, action) => {
            state.isAuth = action.payload
            // save isAuth in local storage
            if (typeof window !== 'undefined') {
                window?.localStorage.setItem(
                    'isAuth',
                    JSON.stringify(state.isAuth)
                )
            }
            toast.success('User logged in successfully', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        },
        handleLogout: (state, action) => {
            state.isAuth = action.payload
            // remove isAuth from local storage
            if (typeof window !== 'undefined') {
                window?.localStorage.removeItem('isAuth')
            }
            toast.success('User logged out successfully', {
                position: 'top-right',
            })
        },
    },
})

export const { handleLogin, handleLogout, setUser } = authSlice.actions

export default authSlice.reducer
