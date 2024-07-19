import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import Fileinput from '@/components/ui/Fileinput'
import Checkbox from '@/components/ui/Checkbox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const AddAnnouncementForm = ({ setShowAddAnnouncementModal }) => {
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [checked, setChecked] = useState(false)
    const token = getCookie('token')

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
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateAnnouncementSchema),
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const postAnnouncement = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('file', selectedPicture)
            form.append('announcement_title', values.announcement_title)
            form.append(
                'announcement_start_date',
                values.announcement_start_date
            )
            form.append(
                'announcement_expiration_date',
                values.announcement_expiration_date
            )
            form.append('announcement_content', values.announcement_content)
            form.append('employee_id', selectedEmployee)
            return http(token).post('/announcement', form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcement'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah pengumuman')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowAddAnnouncementModal(false)
        postAnnouncement.mutate(data)
        dispatch(setLoading(true))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const handleFileChange = (e) => {
        setSelectedPicture(e.target.files[0])
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
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
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
                                    className={errors?.file && 'border-red-500'}
                                    selectedFile={selectedPicture}
                                    onChange={(e) => {
                                        handleFileChange(e)
                                        onChange(e.target.files[0])
                                    }}
                                    id="file"
                                />
                            )}
                        />
                    </div>
                </div>

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
                            setShowAddAnnouncementModal(false)
                        }}
                    />
                    <Button
                        text="Publish"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddAnnouncementForm
