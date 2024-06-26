import React, { useState } from 'react'
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
import { useSelector } from 'react-redux'
import Textinput from '@/components/ui/Textinput'

const DetailLeaveTypeDataForm = ({ setShowViewLeaveTypeModal }) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [searchData, setSearchData] = useState('')
    const token = getCookie('token')
    const leaveTypeId = useSelector(
        (state) => state.leave_type.leave_type.leave_type_id
    )

    async function fetchEmployee(
        pageData = page,
        search = searchData,
        limitData = limit
    ) {
        const { data } = await http(token).get(
            '/employee/active?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['employee', page, searchData, limit],
        queryFn: () => fetchEmployee(page, searchData, limit),
    })

    async function fetchLeaveType(
        pageData = page,
        search = searchData,
        limitData = limit
    ) {
        const { data } = await http(token).get(
            '/leave-type-master?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: leaveTypeData } = useQuery({
        queryKey: ['leave-type-master', page, searchData, limit],
        queryFn: () => fetchLeaveType(page, searchData, limit),
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
        employee_id: Yup.string().required('Harap diisi'),
        leave_type_id: Yup.string().required('Harap diisi'),
        initial_estimate: Yup.string().required('Harap diisi'),
        final_estimate: Yup.string().required('Harap diisi'),
        leave_type_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/leave-type/${leaveTypeId}`)
            const transformedData = {
                ...data.results,
                used_leave_type: data.results.used_leave_type + ' Hari',
                remaining_leave_type:
                    data.results.remaining_leave_type + ' Hari',
            }

            return transformedData
        },
        resolver: yupResolver(validateLeaveType),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const postLeaveType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post(`/leave-type`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leave-type-data'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah saldo cuti')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowViewLeaveTypeModal(false)
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
                        <label htmlFor="employee_id" className="form-label ">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="employee_id"
                            register={register}
                            options={employeeData?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="leave_type_code"
                            className="form-label "
                        >
                            Nama Saldo Cuti
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="leave_type_code"
                            register={register}
                            options={leaveTypeData?.data?.map((item) => ({
                                value: item.leave_type_code,
                                label: item.leave_type_name,
                            }))}
                            styles={styles}
                            id="leave_type_code"
                            error={errors.leave_type_code}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Saldo Cuti"
                            type="text"
                            disabled
                            placeholder="Masukkan Saldo Cuti"
                            name="leave_type"
                            register={register}
                            error={errors.leave_type}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Digunakan"
                            type="text"
                            disabled
                            placeholder="Masukkan Digunakan"
                            name="used_leave_type"
                            register={register}
                            error={errors.used_leave_type}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Sisa Saldo"
                            type="text"
                            placeholder="Sisa Saldo"
                            disabled
                            name="remaining_leave_type"
                            register={register}
                            error={errors.remaining_leave_type}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Estimasi Awal
                        </label>

                        <Controller
                            name="initial_estimate"
                            control={control}
                            disabled
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
                            disabled
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
                            disabled
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
                            setShowViewLeaveTypeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailLeaveTypeDataForm
