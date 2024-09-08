'use client'
import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Flatpickr from 'react-flatpickr'
import Textinput from '@/components/ui/Textinput'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'

const DetailShiftForm = ({ setShowViewShiftModal }) => {
    const [shiftName, setShiftName] = useState('')
    const [shiftOptions, setShiftOptions] = useState([])

    async function fetchShift() {
        const { data } = await http(token).get('/shift')
        setShiftOptions(
            data.results.data.map((item) => ({
                value: item.shift_name,
                label: item.shift_name,
            }))
        )
        setShiftOptions(
            data.results.data.map((item) => ({
                value: item.shift_name,
                label: item.shift_name,
            }))
        )
        return data.results
    }

    useEffect(() => {
        fetchShift()
    }, [])

    const handleChangeShiftName = (e) => {
        setShiftName(e.target.value)
    }

    const handleSaveShiftName = () => {
        if (shiftName.trim() !== '') {
            const newOption = { value: shiftName, label: shiftName }
            setShiftOptions([...shiftOptions, newOption])
            setShiftName('')
        }
    }

    const handleDeleteShiftName = (index) => {
        const updatedOptions = [...shiftOptions]
        updatedOptions.splice(index, 1)
        setShiftOptions(updatedOptions)
    }

    const FormValidationSchema = Yup.object({
        shift_name: Yup.string().required('Harap diisi'),
        shift_code: Yup.string().required('Harap diisi'),
        start_time: Yup.string().required('Harap diisi'),
        end_time: Yup.string().required('Harap diisi'),
        minimal_start_time: Yup.string().required('Harap diisi'),
        minimal_end_time: Yup.string().required('Harap diisi'),
        maximal_start_time: Yup.string().required('Harap diisi'),
        maximal_end_time: Yup.string().required('Harap diisi'),
    })

    const shiftId = useSelector((state) => state.shift.shift.shift_id)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/shift/${shiftId}`)
            return data.results
        },
        resolver: yupResolver(FormValidationSchema),
        mode: 'all',
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const token = getCookie('token')

    const postShift = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
            })
            return http(token).post(`/shift`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shift'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah shift')
            setShowViewShiftModal(false)
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        postShift.mutate(data)
        dispatch(setLoading(true))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div className="flex gap-2">
                        <div className="w-full">
                            <Textinput
                                label="Buat Nama Shift"
                                type="text"
                                placeholder="Nama Shift"
                                value={shiftName}
                                onChange={handleChangeShiftName}
                            />
                        </div>
                        <div className="flex gap-2 mt-8">
                            <div>
                                <Button
                                    text="Batal"
                                    className="bg-red-500 btn-sm text-white"
                                    onClick={handleDeleteShiftName}
                                ></Button>
                            </div>
                            <div>
                                <Button
                                    text="Save"
                                    className="btn-primary btn-sm"
                                    onClick={handleSaveShiftName}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-full">
                            <div>
                                <label
                                    htmlFor="shift_name"
                                    className="form-label "
                                >
                                    Pilih Shift
                                </label>
                                <Select
                                    className="react-select"
                                    name="shift_name"
                                    register={register}
                                    options={[
                                        ...(shiftOptions?.map((item) => ({
                                            value: item.value,
                                            label: item.label,
                                        })) || []),
                                    ]}
                                    styles={styles}
                                    id="shift_name"
                                    error={errors.shift_name}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div>
                                <Textinput
                                    label="Kode Shift"
                                    type="text"
                                    placeholder="Masukkan Kode Shift"
                                    name="shift_code"
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="profile-photo"
                                className=" form-label"
                            >
                                Atur Jam Kerja :
                            </label>
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="profile-photo"
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
                        </div>
                        <div className="flex flex-col w-full mt-8">
                            <label
                                htmlFor="profile-photo"
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
                    <div></div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="profile-photo"
                                className=" form-label"
                            >
                                Atur Keterlambatan :
                            </label>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="profile-photo"
                                        className=" form-label"
                                    >
                                        Minimal Jam Masuk
                                    </label>
                                    <Controller
                                        name="minimal_start_time"
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <Flatpickr
                                                {...fieldProps}
                                                id="timepicker"
                                                name="minimal_start_time"
                                                className={
                                                    errors?.minimal_start_time
                                                        ?.message
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control date-picker-control py-2'
                                                }
                                                onChange={(
                                                    selectedDate,
                                                    dateStr
                                                ) => onChange(dateStr)}
                                                options={{
                                                    enableTime: true,
                                                    noCalendar: true,
                                                    dateFormat: 'H:i',
                                                    time_24hr: true,
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.minimal_start_time?.message && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors?.minimal_start_time
                                                    ?.message
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="profile-photo"
                                        className=" form-label"
                                    >
                                        Maksimal Jam Masuk
                                    </label>
                                    <Controller
                                        name="maximal_start_time"
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <Flatpickr
                                                {...fieldProps}
                                                id="timepicker"
                                                name="maximal_start_time"
                                                className={
                                                    errors?.maximal_start_time
                                                        ?.message
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control date-picker-control py-2'
                                                }
                                                onChange={(
                                                    selectedDate,
                                                    dateStr
                                                ) => onChange(dateStr)}
                                                options={{
                                                    enableTime: true,
                                                    noCalendar: true,
                                                    dateFormat: 'H:i',
                                                    time_24hr: true,
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.maximal_start_time?.message && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors?.maximal_start_time
                                                    ?.message
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-5 mt-8">
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="profile-photo"
                                    className=" form-label"
                                >
                                    Minimal Jam Pulang
                                </label>
                                <Controller
                                    name="minimal_end_time"
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            id="timepicker"
                                            name="minimal_end_time"
                                            className={
                                                errors?.minimal_end_time
                                                    ?.message
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
                                {errors?.minimal_end_time?.message && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.minimal_end_time?.message}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="profile-photo"
                                    className=" form-label"
                                >
                                    Maksimal Jam Pulang
                                </label>
                                <Controller
                                    name="maximal_end_time"
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            id="timepicker"
                                            name="maximal_end_time"
                                            className={
                                                errors?.maximal_end_time
                                                    ?.message
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
                                {errors?.maximal_end_time && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.maximal_end_time?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewShiftModal(false)
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

export default DetailShiftForm
