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

const AddVaccineStatusForm = ({ setShowAddVaccineStatusModal }) => {
    const validateVaccine = yup.object({
        vaccine_code: yup.string().required('Harap diisi'),
        vaccine_status: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateVaccine),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postVaccineType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/vaccine', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vaccine'] })
            dispatch(setLoading(false))
            setShowAddVaccineStatusModal(false)
            toast.success('Berhasil menambah tipe vaksin')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowAddVaccineStatusModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postVaccineType.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Tipe Vaksin"
                        type="text"
                        placeholder="Masukkan Kode Tipe Vaksin"
                        name="vaccine_code"
                        register={register}
                        error={errors.vaccine_code}
                    />
                    <Textinput
                        label="Nama Vaksin"
                        type="text"
                        placeholder="Masukkan Nama Vaksin"
                        name="vaccine_status"
                        register={register}
                        error={errors.vaccine_status}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddVaccineStatusModal(false)
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

export default AddVaccineStatusForm
