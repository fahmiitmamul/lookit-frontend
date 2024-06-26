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

const AddPositionModal = ({ showAddPositionModal }) => {
    const validatePosition = yup.object({
        position_code: yup.string().required('Harap diisi'),
        position_name: yup.string().required('Harap diisi'),
        description: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatePosition),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postPosition = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/position-of-work', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['position-of-work'] })
            dispatch(setLoading(false))
            showAddPositionModal(false)
            toast.success('Berhasil menambah posisi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showAddPositionModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postPosition.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Jabatan"
                        type="text"
                        placeholder="Masukkan Kode Jabatan"
                        name="position_code"
                        register={register}
                        error={errors.position_code}
                    />
                    <Textinput
                        label="Nama Jabatan"
                        type="text"
                        placeholder="Masukkan Nama Jabatan"
                        name="position_name"
                        register={register}
                        error={errors.position_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi"
                        type="text"
                        name="description"
                        register={register}
                        id="df"
                        placeholder="Deskripsi"
                        error={errors.description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddPositionModal(false)
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

export default AddPositionModal
