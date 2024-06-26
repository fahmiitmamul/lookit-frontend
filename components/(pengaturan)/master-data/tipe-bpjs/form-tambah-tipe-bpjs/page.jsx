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

const AddBpjsTypeForm = ({ setShowAddBpjsTypeModal }) => {
    const validateBpjs = yup.object({
        bpjs_code: yup.string().required('Harap diisi'),
        bpjs_type: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateBpjs),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postBpjs = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/bpjs', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bpjs'] })
            dispatch(setLoading(false))
            setShowAddBpjsTypeModal(false)
            toast.success('Berhasil menambah bpjs')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowAddBpjsTypeModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postBpjs.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode BPJS"
                        type="text"
                        placeholder="Masukkan Kode BPJS"
                        name="bpjs_code"
                        register={register}
                        error={errors.bpjs_code}
                    />
                    <Textinput
                        label="Nama BPJS"
                        type="text"
                        placeholder="Masukkan Nama BPJS"
                        name="bpjs_type"
                        register={register}
                        error={errors.bpjs_type}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddBpjsTypeModal(false)
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

export default AddBpjsTypeForm
