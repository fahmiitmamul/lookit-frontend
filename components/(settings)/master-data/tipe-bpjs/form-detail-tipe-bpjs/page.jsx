import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const DetailBpjsTypeForm = ({ setShowViewBpjsTypeModal }) => {
    const validateBpjs = yup.object({
        bpjs_code: yup.string().required('Harap diisi'),
        bpjs_type: yup.string().required('Harap diisi'),
    })

    const bpjsId = useSelector(
        (state) => state.masterdata.bpjs_type.bpjs_type_id
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/bpjs/${bpjsId}`)
            return data.results
        },
        resolver: yupResolver(validateBpjs),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postBpjs = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/bpjs/${bpjsId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bpjs'] })
            dispatch(setLoading(false))
            setShowViewBpjsTypeModal(false)
            toast.success('Berhasil mengedit bpjs')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowViewBpjsTypeModal(false)
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
                        disabled
                        placeholder="Masukkan Kode BPJS"
                        name="bpjs_code"
                        register={register}
                        error={errors.bpjs_code}
                    />
                    <Textinput
                        label="Nama BPJS"
                        type="text"
                        disabled
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
                            setShowViewBpjsTypeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailBpjsTypeForm
