import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Image from 'next/image'

const DetailAllTasksForm = ({ setShowDetailAllTasksModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const tasksId = useSelector((state) => state.tasks.tasks.tasks_id)

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
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

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/tasks/${tasksId}`)
            return data.results
        },
        mode: 'all',
    })

    const onSubmit = (data) => {
        setShowDetailAllTasksModal(false)
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
    const tasksData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            Prioritas Tugas
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="task_priority"
                            register={register}
                            options={priorityOptions}
                            styles={styles}
                            id="task_priority"
                            error={errors.task_priority}
                        />
                    </div>
                    <div>
                        <label htmlFor="task_file" className=" form-label">
                            File
                        </label>
                        <div className="flex">
                            {tasksData?.file?.map((item) => (
                                <Link
                                    href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${item?.filename?.replace(
                                        /\s/g,
                                        '%20'
                                    )}`}
                                >
                                    <Icon
                                        icon="heroicons-outline:document"
                                        fontSize={35}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {errors?.task_file && (
                        <div className={'mt-2 text-danger-500 block text-sm'}>
                            {errors?.task_file?.message}
                        </div>
                    )}
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
                            setShowDetailAllTasksModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailAllTasksForm
