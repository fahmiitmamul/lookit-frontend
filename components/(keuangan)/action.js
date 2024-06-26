// Import createAsyncThunk from Redux Toolkit
import http from '@/app/helpers/http.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async (id) => {
        const token = getCookie('token')
        const { data } = await http(token).get(`/employee/${id}`)
        return data.results
    }
)
