import React from 'react'
import { useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import Textinput from '@/components/ui/Textinput'

const EditLeaveTypeDataForm = ({ setShowEditLeaveTypeModal }) => {
    const token = getCookie('token')
    const leaveTypeId = useSelector(
        (state) => state.leave_type.leave_type.leave_type_id
    )

    const handleInputChange = (e) => {
        let newValue = parseInt(e.target.value)
        if (newValue >= parseInt(leave_type_data.leave_type)) {
            setValue('used_leave_type', parseInt(leave_type_data.leave_type))
            setValue('remaining_leave_type', 0)
        } else {
            setValue(
                'remaining_leave_type',
                parseInt(leave_type_data.leave_type) - newValue
            )
        }
    }

    const validateLeaveType = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        leave_type_id: Yup.string().required('Harap diisi'),
        used_leave_type: Yup.string().required('Harap diisi'),
        initial_estimate: Yup.string().required('Harap diisi'),
        final_estimate: Yup.string().required('Harap diisi'),
        leave_type_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        getValues,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/leave-type/${leaveTypeId}`)
            return data.results
        },
        resolver: yupResolver(validateLeaveType),
        mode: 'all',
    })

    const leave_type_data = getValues()

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const patchLeaveType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({ ...values }).toString()
            return http(token).patch(`/leave-type/${leaveTypeId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leave'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit saldo cuti')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowEditLeaveTypeModal(false)
        patchLeaveType.mutate(data)
        dispatch(setLoading(false))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Saldo yang Digunakan"
                        type="number"
                        placeholder="Saldo yang Digunakan"
                        name="used_leave_type"
                        onChange={handleInputChange}
                        register={register}
                        error={errors.used_leave_type}
                    />
                    <Textinput
                        label="Sisa Saldo"
                        type="number"
                        placeholder="Sisa Saldo"
                        disabled
                        name="remaining_leave_type"
                        register={register}
                        error={errors.remaining_leave_type}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Estimasi Awal
                        </label>

                        <Controller
                            name="initial_estimate"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.initial_estimate
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.initial_estimate && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.initial_estimate?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Estimasi Akhir
                        </label>

                        <Controller
                            name="final_estimate"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.final_estimate
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.final_estimate && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.final_estimate?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Cuti"
                            type="text"
                            name="leave_type_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Cuti"
                            error={errors.leave_type_description}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowEditLeaveTypeModal(false)
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

export default EditLeaveTypeDataForm
