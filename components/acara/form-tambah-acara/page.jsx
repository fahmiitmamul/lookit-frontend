import Checkbox from '@/components/ui/Checkbox'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import Select from '@/components/ui/Select'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Textinput from '@/components/ui/Textinput'
import Flatpickr from 'react-flatpickr'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const AddEventsForm = ({ setShowAddEventsModal }) => {
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [checked, setChecked] = useState(false)
    const token = getCookie('token')

    const eventCategoriesOptions = [
        {
            value: 'Bisnis',
            label: 'Bisnis',
        },
        {
            value: 'Liburan',
            label: 'Liburan',
        },
    ]

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value
        const selectedEmp = employeeData?.data?.find(
            (emp) => emp.name === selectedValue
        )

        if (
            selectedEmp &&
            !selectedEmployees.some((emp) => emp.name === selectedEmp.name)
        ) {
            setSelectedEmployees([...selectedEmployees, selectedEmp])
            setSelectedEmployee([...selectedEmployee, selectedEmp.id])
        }
    }

    const handleDeleteEmployee = (value) => {
        const updatedEmployees = selectedEmployees.filter(
            (emp) => emp.name !== value.name
        )
        const updatedEmployeesId = selectedEmployee.filter(
            (emp) => emp !== value.id
        )
        setSelectedEmployees(updatedEmployees)
        setSelectedEmployee(updatedEmployeesId)
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

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateEvents = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        title: Yup.string().required('Harap diisi'),
        categories: Yup.string().required('Harap diisi'),
        description: Yup.string().required('Harap diisi'),
        start_time: Yup.string().required('Harap diisi'),
        end_time: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateEvents),
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const postEvents = useMutation({
        mutationFn: async (values) => {
            console.log(values)
            const data = new URLSearchParams({
                ...values,
                start: dayjs(values.start_time).format('YYYY-MM-DD'),
                end: dayjs(values.end_time).add(1, 'day').format('YYYY-MM-DD'),
                start_time: dayjs(values.start_time).format('YYYY-MM-DD'),
                end_time: dayjs(values.end_time).format('YYYY-MM-DD'),
                allDay: true,
                employee: selectedEmployee,
            }).toString()
            return http(token).post('/events', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah acara')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowAddEventsModal(false)
        postEvents.mutate(data)
        dispatch(setLoading(true))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="flex gap-2">
                    <Checkbox
                        value={checked}
                        onChange={() => {
                            if (!checked) {
                                const allEmployee = employeeData?.data?.map(
                                    (employee) => employee.id
                                )
                                setSelectedEmployee(allEmployee)
                            } else {
                                setSelectedEmployee([])
                            }
                            setChecked(!checked)
                        }}
                    />
                    Pilih Semua Karyawan
                </div>
                <div className="lg:grid-cols-3 grid-cols-2 grid gap-5">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Silahkan Pilih Karyawan
                        </label>
                        <Select
                            className="react-select"
                            options={employeeData?.data?.map((employee) => ({
                                value: employee.name,
                                label: employee.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                            disabled={checked}
                            onChange={(e) => {
                                setValue('employee_id', 'Has a value')
                                handleSelectChange(e)
                            }}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Judul Acara"
                            type="text"
                            placeholder="Masukkan Judul Acara"
                            name="title"
                            register={register}
                            error={errors.title}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="categories" className="form-label ">
                                Kategori Acara
                            </label>
                            <Select
                                className="react-select"
                                name="categories"
                                register={register}
                                styles={styles}
                                options={eventCategoriesOptions}
                                id="categories"
                                error={errors.categories}
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div>
                        <label htmlFor="start_time" className=" form-label">
                            Tanggal Mulai
                        </label>
                        <Controller
                            name="start_time"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.start_time
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
                        {errors?.start_time && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.start_time?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="end_time" className=" form-label">
                            Tanggal Selesai
                        </label>
                        <Controller
                            name="end_time"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.end_time
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
                        {errors?.end_time && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.end_time?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:grid-cols-1grid-cols-1 grid gap-5">
                    <div>
                        <div>
                            <Textarea
                                label="Deskripsi"
                                type="text"
                                name="description"
                                register={register}
                                id="df"
                                placeholder="Masukkan Deskripsi"
                                error={errors.description}
                            />
                        </div>
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
                                        onClick={() => {
                                            handleDeleteEmployee(emp)
                                        }}
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
                            setShowAddEventsModal(false)
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

export default AddEventsForm
