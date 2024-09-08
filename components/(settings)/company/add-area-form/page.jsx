import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const AddAreaForm = ({ showAddAreaModal }) => {
    const validateArea = yup.object({
        area_code: yup.string().required('Harap diisi'),
        area_name: yup.string().required('Harap diisi'),
        area_description: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateArea),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postArea = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/area', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['area'] })
            dispatch(setLoading(false))
            showAddAreaModal(false)
            toast.success('Berhasil menambah area')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showAddAreaModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postArea.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Area"
                        type="text"
                        placeholder="Masukkan Kode Area"
                        name="area_code"
                        register={register}
                        error={errors.area_code}
                    />
                    <Textinput
                        label="Nama Area"
                        type="text"
                        placeholder="Masukkan Nama Area"
                        name="area_name"
                        register={register}
                        error={errors.area_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi Area"
                        type="text"
                        name="area_description"
                        register={register}
                        id="df"
                        placeholder="Deskripsi Area"
                        error={errors.area_description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddAreaModal(false)
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

export default AddAreaForm
