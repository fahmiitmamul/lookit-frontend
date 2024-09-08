import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import { useQuery } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const DetailAnnouncementForm = ({ setShowViewAnnouncementModal }) => {
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const token = getCookie('token')
    const announcementId = useSelector(
        (state) => state.announcement.announcement.announcement_id
    )

    const validateAnnouncementSchema = yup.object().shape({
        announcement_title: yup.string().required('Harap diisi'),
        announcement_start_date: yup.string().required('Harap diisi'),
        announcement_expiration_date: yup.string().required('Harap diisi'),
        announcement_content: yup.string().required('Harap diisi'),
        file: yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/announcement/${announcementId}`
            )
            setSelectedEmployee(data.results.employees.map((emp) => emp.id))
            setSelectedEmployees(
                data.results.employees.map((emp) => ({ name: emp.name }))
            )
            return data.results
        },
        resolver: yupResolver(validateAnnouncementSchema),
        mode: 'all',
    })

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Judul Pengumuman"
                            type="text"
                            placeholder="Masukkan Judul Pengumuman"
                            name="announcement_title"
                            register={register}
                            error={errors.announcement_title}
                        />
                    </div>
                    <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                        <div>
                            <label
                                htmlFor="announcement_start_date"
                                className=" form-label"
                            >
                                Tanggal Dibuat
                            </label>
                            <Controller
                                name="announcement_start_date"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        className={
                                            errors?.announcement_start_date
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control py-2'
                                        }
                                        placeholder="Tanggal Dibuat"
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                    />
                                )}
                            />
                            {errors?.announcement_start_date && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.announcement_start_date?.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="announcement_expiration_date"
                                className=" form-label"
                            >
                                Tanggal Berlaku
                            </label>
                            <Controller
                                name="announcement_expiration_date"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        className={
                                            errors?.announcement_expiration_date
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control py-2'
                                        }
                                        placeholder="Tanggal Berlaku"
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                    />
                                )}
                            />
                            {errors?.announcement_expiration_date && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {
                                        errors?.announcement_expiration_date
                                            ?.message
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Isi Pengumuman"
                            type="text"
                            name="announcement_content"
                            register={register}
                            placeholder="Isi Pengumuman"
                            error={errors.announcement_content}
                        />
                    </div>
                </div>

                <div>
                    List Karyawan :
                    <div className="flex flex-wrap gap-5 mt-2">
                        {selectedEmployees?.map((emp) => (
                            <div className="flex justify-center items-center bg-gray-200 text-sm rounded-xl p-2 gap-2">
                                <div>{emp?.name}</div>
                                <div className="pt-1">
                                    <Button
                                        className="bg-none p-0"
                                        icon="heroicons:x-mark"
                                    ></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewAnnouncementModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailAnnouncementForm
