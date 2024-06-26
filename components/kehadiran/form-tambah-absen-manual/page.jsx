'use client'
import React from 'react'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Textarea from '@/components/ui/Textarea'
import ReactSelect from 'react-select'
import { useState, useEffect } from 'react'
import Select from '@/components/ui/Select'
import Fileinput from '@/components/ui/Fileinput'

const AddPresenceRecordForm = ({ setShowAddPresenceModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [selectedFileIn, setSelectedFileIn] = useState('')
    const [selectedFileOut, setSelectedFileOut] = useState('')
    const [checked, setChecked] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const presenceId = useSelector(
        (state) => state.presence.presence.presence_id
    )

    async function fetchPresenceStatus() {
        const { data } = await http(token).get('/presence-status')
        return data.results
    }

    const { data: presenceStatus } = useQuery({
        queryKey: ['presence-status'],
        queryFn: fetchPresenceStatus,
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const patchPresence = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/presence/${presenceId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['presence'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit kehadiran')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validatePresence = Yup.object({
        start_time: Yup.string().required('Harap diisi'),
        end_time: Yup.string().required('Harap diisi'),
        presence_status_id: Yup.string().required('Harap diisi'),
        change_reason: Yup.string().required('Harap diisi'),
    })

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee/active')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchEmployee(),
    })

    async function fetchBranch() {
        const { data } = await http(token).get(
            `/branch/employee/?employee_id=${selectedEmployee}`
        )
        return data.results
    }

    async function fetchPositionOfWork() {
        const { data } = await http(token).get(
            `/position-of-work/employee/?employee_id=${selectedEmployee}`
        )
        return data.results
    }

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/presence/${presenceId}`)
            return data.results
        },
        resolver: yupResolver(validatePresence),
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        patchPresence.mutate(data)
        setShowAddAbsentManualModal(false)
    }

    const styles = {
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? '1px solid #000' : '1px solid #000',
        }),
    }

    const handleSelectChangeIn = (e) => {
        setSelectedFileIn(e.target.files[0])
    }

    const handleSelectChangeOut = (e) => {
        setSelectedFileOut(e.target.files[0])
    }

    useEffect(() => {
        if (selectedEmployee) {
            fetchBranch()
            fetchPositionOfWork()
        }
    }, [selectedEmployee])

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid-cols-1 grid gap-5">
                    <div>
                        <label className="form-label">Nama Karyawan</label>
                        <Controller
                            name="employee_id"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <ReactSelect
                                    styles={styles}
                                    placeholder=""
                                    options={employeeData?.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            label: `${item.name} / ${item.employee_nik}`,
                                        })
                                    )}
                                    className="react-select"
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions.value)
                                        setSelectedEmployee(
                                            selectedOptions.value
                                        )
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="form-label">Jabatan</label>
                        <ReactSelect
                            styles={styles}
                            placeholder=""
                            // options={positionData?.data?.map((item) => ({
                            //     value: item.position_name,
                            //     label: item.position_name,
                            // }))}
                            className={'react-select'}
                            onChange={(selectedOptions) => {}}
                        />
                    </div>
                    <div>
                        <label className="form-label">Cabang</label>
                        <ReactSelect
                            styles={styles}
                            placeholder=""
                            // options={branchData?.data?.map((item) => ({
                            //     value: item.branch_name,
                            //     label: item.branch_name,
                            // }))}
                            className={'react-select'}
                            onChange={(selectedOptions) => {}}
                        />
                    </div>
                </div>
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div className="flex flex-col">
                        <label htmlFor="start_time" className=" form-label">
                            Jam Masuk
                        </label>
                        <Controller
                            name="start_time"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    id="timepicker"
                                    name="start_time"
                                    className={
                                        errors?.start_time?.message
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: 'H:i',
                                        time_24hr: true,
                                    }}
                                />
                            )}
                        />
                        {errors?.start_time?.message && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.start_time?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="end_time" className=" form-label">
                            Jam Pulang
                        </label>
                        <Controller
                            name="end_time"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    id="timepicker"
                                    name="end_time"
                                    className={
                                        errors?.end_time?.message
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: 'H:i',
                                        time_24hr: true,
                                    }}
                                />
                            )}
                        />
                        {errors?.end_time?.message && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.end_time?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            <div>
                                <label
                                    htmlFor="employee_id"
                                    className="form-label "
                                >
                                    Status Kehadiran
                                </label>
                                <Select
                                    className="react-select"
                                    name="employee_id"
                                    register={register}
                                    options={[
                                        ...(presenceStatus?.data?.map(
                                            (item) => ({
                                                value: item.id,
                                                label: item.name,
                                            })
                                        ) || []),
                                    ]}
                                    styles={styles}
                                    id="employee_id"
                                    error={errors.employee_id}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Upload File Masuk
                            </label>
                            <Controller
                                name="file"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Fileinput
                                        {...fieldProps}
                                        name="file"
                                        className={
                                            errors?.file && 'border-red-500'
                                        }
                                        onChange={(e) => {
                                            handleSelectChangeIn(e)
                                            onChange(e.target.files[0])
                                        }}
                                        id="file"
                                    />
                                )}
                            />
                        </div>
                        {errors?.file && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.file?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Upload File Pulang
                            </label>
                            <Controller
                                name="file"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Fileinput
                                        {...fieldProps}
                                        name="file"
                                        className={
                                            errors?.file && 'border-red-500'
                                        }
                                        onChange={(e) => {
                                            handleSelectChangeOut(e)
                                            onChange(e.target.files[0])
                                        }}
                                        id="file"
                                    />
                                )}
                            />
                        </div>
                        {errors?.file && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.file?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Textarea
                        label="Keterangan"
                        type="text"
                        name="change_reason"
                        register={register}
                        id="df"
                        placeholder="Keterangan"
                        error={errors.change_reason}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddPresenceModal(false)
                        }}
                    />
                    <Button
                        text="Proses"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddPresenceRecordForm
