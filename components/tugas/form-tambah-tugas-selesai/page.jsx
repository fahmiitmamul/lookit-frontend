import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import Fileinput from '@/components/ui/Fileinput'
import { useQueryClient } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const AddFinishedTasksForm = ({ showAddFinishedTasksModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null)

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee/active')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchEmployee(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const queryClient = useQueryClient()

    const postTasks = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('task_name', values.task_name)
            form.append('task_start_date', values.task_start_date)
            form.append('task_end_date', values.task_end_date)
            form.append('task_priority', values.task_priority)
            form.append('task_description', values.task_description)
            form.append('task_status', 1)
            form.append('file', selectedFile)
            return http(token).post(`/tasks`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processed-tasks'] })
            queryClient.invalidateQueries({ queryKey: ['finished-tasks'] })
            queryClient.invalidateQueries({ queryKey: ['canceled-tasks'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah tugas')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateTasks = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        task_name: Yup.string().required('Harap diisi'),
        task_start_date: Yup.string().required('Harap diisi'),
        task_end_date: Yup.string().required('Harap diisi'),
        task_description: Yup.string().required('Harap diisi'),
        task_priority: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateTasks),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showAddFinishedTasksModal(false)
        postTasks.mutate(data)
        dispatch(setLoading(true))
    }

    const priorityOptions = [
        {
            value: 'Rendah',
            label: 'Rendah',
        },
        {
            value: 'Sedang',
            label: 'Sedang',
        },
        {
            value: 'Tinggi',
            label: 'Tinggi',
        },
    ]

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Silakan Pilih Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            register={register}
                            options={[
                                ...(employeeData?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Judul Tugas"
                            type="text"
                            placeholder="Masukkan Judul Tugas"
                            name="task_name"
                            register={register}
                            error={errors.task_name}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Tugas"
                            type="text"
                            name="task_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Tugas"
                            error={errors.task_description}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="task_start_date"
                            className=" form-label"
                        >
                            Tanggal Mulai
                        </label>
                        <Controller
                            name="task_start_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.task_start_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Mulai"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.task_start_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.task_start_date?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="task_end_date" className=" form-label">
                            Tanggal Selesai
                        </label>
                        <Controller
                            name="task_end_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.task_end_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Selesai"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.task_end_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.task_end_date?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="task_priority" className="form-label ">
                            Pilih Prioritas Tugas
                        </label>
                        <Select
                            className="react-select"
                            name="task_priority"
                            register={register}
                            options={priorityOptions}
                            styles={styles}
                            id="task_priority"
                            error={errors.task_priority}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Input File
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
                                        selectedFile={selectedFile}
                                        onChange={(e) => {
                                            handleFileChange(e)
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
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddFinishedTasksModal(false)
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

export default AddFinishedTasksForm
