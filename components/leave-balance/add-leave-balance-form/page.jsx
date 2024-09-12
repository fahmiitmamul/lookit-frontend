import React from 'react'
import { useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import Textinput from '@/components/ui/Textinput'
import ReactSelect from 'react-select'

const AddLeaveTypeDataForm = ({ setShowAddLeaveTypeModal }) => {
    const token = getCookie('token')

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee/active')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchEmployee(),
    })

    async function fetchLeaveType() {
        const { data } = await http(token).get('/leave-type-master')
        return data.results
    }

    const { data: leaveTypeData } = useQuery({
        queryKey: ['leave-type-master'],
        queryFn: () => fetchLeaveType(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateLeaveType = Yup.object({
        employee_id: Yup.object().required('Harap diisi'),
        leave_type_id: Yup.string().required('Harap diisi'),
        leave_type: Yup.string().required('Harap diisi'),
        initial_estimate: Yup.string().required('Harap diisi'),
        final_estimate: Yup.string().required('Harap diisi'),
        leave_type_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateLeaveType),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const postLeaveType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                employee_id: values.employee_id.value,
                used_leave_type: 0,
                remaining_leave_type: 0,
                leave_type_code: values.leave_type_id,
            }).toString()
            return http(token).post(`/leave-type`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leave'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah saldo cuti')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowAddLeaveTypeModal(false)
        postLeaveType.mutate(data)
        dispatch(setLoading(false))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label className="form-label">
                            Silahkan Pilih Nama Karyawan
                        </label>
                        <Controller
                            name="employee_id"
                            control={control}
                            render={({
                                field: { onChange },
                                ...fieldProps
                            }) => (
                                <ReactSelect
                                    {...fieldProps}
                                    styles={styles}
                                    placeholder=""
                                    options={employeeData?.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            label: item.name,
                                        })
                                    )}
                                    className={
                                        errors?.employee_id
                                            ? 'border-danger-500 border rounded-md'
                                            : 'react-select'
                                    }
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions)
                                    }}
                                />
                            )}
                        />
                        {errors?.employee_id && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.employee_id?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="leave_type_id" className="form-label ">
                            Silahkan Pilih Saldo Cuti
                        </label>
                        <Select
                            className="react-select"
                            name="leave_type_id"
                            register={register}
                            options={leaveTypeData?.data?.map((item) => ({
                                value: item.leave_type_code,
                                label: item.leave_type_name,
                            }))}
                            styles={styles}
                            id="leave_type_id"
                            error={errors.leave_type_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Saldo Awal"
                            type="number"
                            placeholder="Masukkan Saldo Awal"
                            name="leave_type"
                            register={register}
                            error={errors.leave_type}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Periode Awal
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
                            Periode Akhir
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
                            setShowAddLeaveTypeModal(false)
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

export default AddLeaveTypeDataForm
