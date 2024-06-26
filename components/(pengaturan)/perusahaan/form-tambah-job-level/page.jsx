import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const AddLevelModal = ({ showAddLevelModal }) => {
    const validateLevel = yup.object({
        level_code: yup.string().required('Harap diisi'),
        level_name: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateLevel),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postLevel = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/level', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['level'] })
            dispatch(setLoading(false))
            showAddLevelModal(false)
            toast.success('Berhasil menambah level')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showAddLevelModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postLevel.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Level"
                        type="text"
                        placeholder="Masukkan Kode Level"
                        name="level_code"
                        register={register}
                        error={errors.level_code}
                    />
                    <Textinput
                        label="Nama Level"
                        type="text"
                        placeholder="Masukkan Nama Level"
                        name="level_name"
                        register={register}
                        error={errors.level_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddLevelModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddLevelModal
