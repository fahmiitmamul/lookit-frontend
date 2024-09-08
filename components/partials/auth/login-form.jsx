import React, { useState } from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import Checkbox from '@/components/ui/Checkbox'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { handleLogin } from './store'
import http from '@/app/helpers/http.helper'
import { handleMenuHidden } from '@/store/layoutReducer'
import { setEmployeeId } from '@/components/(employee)/store'

const schema = yup.object({
    email: yup.string().required('Harap diisi'),
    password: yup.string().required('Harap diisi'),
})

const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    })
    const router = useRouter()
    const dispatch = useDispatch()

    const onSubmit = async (authData) => {
        try {
            const { data } = await axios.post('api/login', authData)
            const token = data?.results?.token
            if (token) {
                const userData = await http(token).get('/users')
                if (
                    userData.data.results.role_id !== 1 &&
                    userData.data.results.role_id !== 2
                ) {
                    dispatch(handleLogin(true))
                    dispatch(handleMenuHidden(true))
                    router.push(`/rekam-karyawan/tab-rekam-karyawan`)
                    dispatch(
                        setEmployeeId(userData?.data?.results?.employee?.id)
                    )
                } else {
                    dispatch(handleLogin(true))
                    dispatch(handleMenuHidden(false))
                    router.push(`/dashboard`)
                    dispatch(
                        setEmployeeId(userData?.data?.results?.employee?.id)
                    )
                }
            }
            if (!data?.success) {
                toast.error('Kata sandi salah')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [checked, setChecked] = useState(false)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
                name="email"
                label="email"
                type="text"
                placeholder="Email"
                register={register}
                error={errors?.email}
            />
            <Textinput
                name="password"
                label="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors?.password}
            />
            <button className="btn btn-dark block w-full text-center">
                Masuk
            </button>
        </form>
    )
}

export default LoginForm
