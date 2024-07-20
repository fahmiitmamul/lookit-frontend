'use client'
import React from 'react'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { useDispatch } from 'react-redux'
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
    const [selectedPresence, setSelectedPresence] = useState('')

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

    async function fetchShift() {
        const { data } = await http(token).get('/shift')
        return data.results
    }

    const { data: shiftData } = useQuery({
        queryKey: ['shift'],
        queryFn: fetchShift,
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const postPresence = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()

            form.append('employee_id', values.employee_id)
            form.append('presence_status_id', values.presence_status_id)
            form.append('start_time', values.start_time)
            form.append('end_time', values.end_time)
            form.append('file_in', selectedFileIn)
            form.append('file_out', selectedFileOut)
            form.append('change_reason', values.change_reason)
            return http(token).post(`/presence/manual`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['present'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah kehadiran')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validatePresence = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        presence_status_id: Yup.string().required('Harap diisi'),
        start_time: Yup.string().required('Harap diisi'),
        end_time: Yup.string().required('Harap diisi'),
        file_in: Yup.string().required('Harap diisi'),
        file_out: Yup.string().required('Harap diisi'),
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

    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validatePresence),
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postPresence.mutate(data)
        setShowAddPresenceModal(false)
    }

    const styles = {
        control: (base, state) => ({
            ...base,
        }),
    }

    const handleSelectChangeIn = (e) => {
        setSelectedFileIn(e.target.files[0])
    }

    const handleSelectChangeOut = (e) => {
        setSelectedFileOut(e.target.files[0])
    }

    const presenceStatusName = watch('presence_status_id')

    useEffect(() => {
        if (presenceStatusName) {
            setSelectedPresence(presenceStatusName)
            console.log(presenceStatusName)
        }
    }, [presenceStatusName])

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
                                    className={
                                        errors?.employee_id
                                            ? 'border-danger-500 border rounded-md'
                                            : 'react-select'
                                    }
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions.value)
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
                        <label
                            htmlFor="presence_status_id"
                            className="form-label"
                        >
                            Status Kehadiran
                        </label>
                        <Select
                            className="react-select"
                            name="presence_status_id"
                            register={register}
                            options={[
                                ...(presenceStatus?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="presence_status_id"
                            error={errors.presence_status_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="shift_id" className="form-label">
                            Tanggal Absen
                        </label>
                        <Controller
                            name="absent_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.absent_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Absen"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.absent_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.absent_date?.message}
                            </div>
                        )}
                    </div>
                </div>
                {selectedPresence !== '9' && (
                    <div className="flex flex-col gap-5">
                        <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                            <div>
                                <label
                                    htmlFor="shift_id"
                                    className="form-label"
                                >
                                    Shift
                                </label>
                                <Select
                                    className="react-select"
                                    name="shift_id"
                                    register={register}
                                    options={[
                                        ...(shiftData?.data?.map((item) => ({
                                            value: item.id,
                                            label: item.shift_name,
                                        })) || []),
                                    ]}
                                    styles={styles}
                                    id="shift_id"
                                    error={errors.shift_id}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="start_time"
                                    className=" form-label"
                                >
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
                                            placeholder="HH:MM"
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
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.start_time?.message}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="end_time"
                                    className=" form-label"
                                >
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
                                            placeholder="HH:MM"
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
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.end_time?.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                            <div>
                                <div>
                                    <label
                                        htmlFor="file_in"
                                        className=" form-label"
                                    >
                                        Upload File Masuk
                                    </label>
                                    <Controller
                                        name="file_in"
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <Fileinput
                                                {...fieldProps}
                                                name="file_in"
                                                className={
                                                    errors?.file_in &&
                                                    'border-red-500'
                                                }
                                                selectedFile={selectedFileIn}
                                                onChange={(e) => {
                                                    handleSelectChangeIn(e)
                                                    onChange(e.target.files[0])
                                                }}
                                                id="file_in"
                                            />
                                        )}
                                    />
                                </div>
                                {errors?.file_in && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.file_in?.message}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    <label
                                        htmlFor="file_out"
                                        className=" form-label"
                                    >
                                        Upload File Pulang
                                    </label>
                                    <Controller
                                        name="file_out"
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <Fileinput
                                                {...fieldProps}
                                                name="file_out"
                                                className={
                                                    errors?.file_out &&
                                                    'border-red-500'
                                                }
                                                selectedFile={selectedFileOut}
                                                onChange={(e) => {
                                                    handleSelectChangeOut(e)
                                                    onChange(e.target.files[0])
                                                }}
                                                id="file_out"
                                            />
                                        )}
                                    />
                                </div>
                                {errors?.file_out && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.file_out?.message}
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
                    </div>
                )}

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
