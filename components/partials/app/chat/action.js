import http from '@/app/helpers/http.helper'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'

export const fetchContacts = createAsyncThunk(
    'chat/fetchContacts',
    async (data) => {
        try {
            const token = getCookie('token')
            let url = '/employee/active'
            if (data) {
                url += `?search=${data}`
            }
            const response = await http(token).get(url)
            return response?.data?.results?.data
        } catch (error) {
            console.log(error)
        }
    }
)
