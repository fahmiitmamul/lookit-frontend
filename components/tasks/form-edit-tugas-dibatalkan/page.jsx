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
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Image from 'next/image'

const EditCanceledTasksForm = ({ showEditCanceledTasksModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const [selectedFiles, setSelectedFiles] = useState(null)
    const tasksId = useSelector((state) => state.tasks.tasks.tasks_id)

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files))
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

    const patchTasks = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('task_name', values.task_name)
            form.append('task_start_date', values.task_start_date)
            form.append('task_end_date', values.task_end_date)
            form.append('task_priority', values.task_priority)
            form.append('task_description', values.task_description)
            form.append('task_status', values.task_status)
            if (selectedFiles) {
                selectedFiles.forEach((file) => {
                    form.append(`files`, file)
                })
            } else {
                selectedFiles.forEach((file) => {
                    form.append(`files`, values.file)
                })
            }
            return http(token).patch(`/tasks/${tasksId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processed-tasks'] })
            queryClient.invalidateQueries({ queryKey: ['finished-tasks'] })
            queryClient.invalidateQueries({ queryKey: ['canceled-tasks'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit tugas')
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
        task_status: Yup.string().required('Harap diisi'),
        file: Yup.array().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/tasks/${tasksId}`)
            setSelectedFiles(data.results.file)
            return data.results
        },
        resolver: yupResolver(validateTasks),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showEditCanceledTasksModal(false)
        patchTasks.mutate(data)
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

    const statusOptions = [
        {
            value: '0',
            label: 'Proses',
        },
        {
            value: '1',
            label: 'Selesai',
        },
        {
            value: '2',
            label: 'Batal',
        },
    ]

    const tasksData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
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
                    <div>
                        <label htmlFor="task_status" className="form-label ">
                            Status Tugas
                        </label>
                        <Select
                            className="react-select"
                            name="task_status"
                            register={register}
                            options={statusOptions}
                            styles={styles}
                            id="task_status"
                            error={errors.task_status}
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
                            defaultValue={tasksData?.file}
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
                                            selectedFiles={selectedFiles}
                                            onChange={(e) => {
                                                handleFileChange(e)
                                            }}
                                            id="file"
                                            multiple
                                        />
                                    )}
                                />
                            </div>
                            {errors?.file && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.file?.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div>Pemantauan Tugas : </div>
                    <div>
                        <Image
                            src={`https://res.cloudinary.com/dxnewldiy/raw/upload/v1706759584/file/${tasksData?.proof_of_assignment?.replace(
                                /\s/g,
                                '%20'
                            )}`}
                            width={200}
                            height={200}
                            alt=""
                        ></Image>
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showEditCanceledTasksModal(false)
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

export default EditCanceledTasksForm
