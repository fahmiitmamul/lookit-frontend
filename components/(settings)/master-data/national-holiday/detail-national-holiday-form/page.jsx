import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

const DetailNationalHolidayForm = ({ showViewNationalHolidayModal }) => {
    const nationalHolidayId = useSelector(
        (state) => state.masterdata.national_holiday.national_holiday_id
    )

    const {
        control,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/national-holiday/${nationalHolidayId}`
            )
            return data.results
        },
        mode: 'all',
    })

    const token = getCookie('token')

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="date" className=" form-label">
                            Tanggal
                        </label>
                        <Controller
                            name="date"
                            control={control}
                            disabled
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
                        disabled
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
                        disabled
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
                            showViewNationalHolidayModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailNationalHolidayForm
