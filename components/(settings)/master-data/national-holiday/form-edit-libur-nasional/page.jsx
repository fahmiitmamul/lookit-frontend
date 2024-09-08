import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditNationalHolidayForm = ({ showEditNationalHolidayModal }) => {
    const nationalHolidayId = useSelector(
        (state) => state.masterdata.national_holiday.national_holiday_id
    )
    const dispatch = useDispatch()

    const validateNationalHoliday = yup.object({
        date: yup.string().required('Harap diisi'),
        holiday_name: yup.string().required('Harap diisi'),
        holiday_description: yup.string().required('Harap diisi'),
    })

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/national-holiday/${nationalHolidayId}`
            )
            return data.results
        },
        resolver: yupResolver(validateNationalHoliday),
        mode: 'all',
    })

    const token = getCookie('token')

    const queryClient = useQueryClient()

    const patchNationalHoliday = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(
                `/national-holiday/${nationalHolidayId}`,
                data
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['national-holiday'] })
            dispatch(setLoading(false))
            showEditNationalHolidayModal(false)
            toast.success('Berhasil mengedit libur nasional')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showEditNationalHolidayModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        patchNationalHoliday.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="date" className=" form-label">
                            Tanggal
                        </label>
                        <Controller
                            name="date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.date?.message && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.date?.message}
                            </div>
                        )}
                    </div>
                    <Textinput
                        label="Nama Libur Nasional"
                        type="text"
                        placeholder="Masukkan Nama Libur Nasional"
                        name="holiday_name"
                        register={register}
                        error={errors.holiday_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi Libur Nasional"
                        type="text"
                        name="holiday_description"
                        register={register}
                        id="df"
                        placeholder="Deskripsi Libur Nasional"
                        error={errors.holiday_description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Kembali"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showEditNationalHolidayModal(false)
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

export default EditNationalHolidayForm
