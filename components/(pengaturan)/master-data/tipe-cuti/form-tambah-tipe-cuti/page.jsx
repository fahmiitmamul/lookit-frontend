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

const AddLeaveTypeForm = ({ showAddLeaveTypeModal }) => {
    const validateLeaveType = yup.object({
        leave_type_code: yup.string().required('Harap diisi'),
        leave_type_name: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateLeaveType),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postLeaveType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/leave-type-master', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leave-type-master'] })
            dispatch(setLoading(false))
            showAddLeaveTypeModal(false)
            toast.success('Berhasil menambah tipe cuti')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showAddLeaveTypeModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postLeaveType.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Tipe Cuti"
                        type="text"
                        placeholder="Masukkan Kode Tipe Cuti"
                        name="leave_type_code"
                        register={register}
                        error={errors.leave_type_code}
                    />
                    <Textinput
                        label="Nama Tipe Cuti"
                        type="text"
                        placeholder="Masukkan Nama Tipe Cuti"
                        name="leave_type_name"
                        register={register}
                        error={errors.leave_type_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddLeaveTypeModal(false)
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

export default AddLeaveTypeForm
