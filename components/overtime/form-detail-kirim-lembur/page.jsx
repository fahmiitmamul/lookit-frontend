import React, { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Select from '@/components/ui/Select'
import ReactSelect from 'react-select'
import Textinput from '@/components/ui/Textinput'
import Textarea from '@/components/ui/Textarea'
import { NumericFormat } from 'react-number-format'

const DetailOvertimeForm = ({ setShowViewSendOvertimeModal }) => {
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [employeeData, setEmployeeData] = useState([])
    const token = getCookie('token')
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const handleSelectChange = (event) => {
        const selectedValue = event
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

    async function fetchOvertimeType() {
        const { data } = await http(token).get('/overtime-type')
        return data.results
    }

    const { data: overtimeType } = useQuery({
        queryKey: ['overtime-type'],
        queryFn: () => fetchOvertimeType(),
    })

    const overtimeId = useSelector(
        (state) => state.overtime.overtime.overtime_id
    )

    const patchOvertime = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                employee: selectedEmployee,
                status: 'Verifikasi',
            }).toString()
            return http(token).patch(`/overtime/${overtimeId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah data lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validatePresence = Yup.object({
        start_date: Yup.string().required('Harap diisi'),
        end_date: Yup.string().required('Harap diisi'),
        overtime_type_id: Yup.string().required('Harap diisi'),
        description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/overtime/${overtimeId}`)
            const employeeData = await http(token).get(
                `/employee/nik/${data.results.employee_nik}`
            )
            setSelectedEmployee(employeeData?.data?.results?.id)
            setSelectedEmployees([{ name: employeeData?.data?.results?.name }])
            setEmployeeData([
                {
                    value: employeeData?.data?.results?.name,
                    label: employeeData?.data?.results?.name,
                },
            ])
            return data.results
        },
        resolver: yupResolver(validatePresence),
        mode: 'all',
    })

    const {
        control: overtimeTypeControl,
        register: overtimeTypeRegister,
        setValue: overtimeTypeSetValue,
    } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        patchOvertime.mutate(data)
        setShowViewSendOvertimeModal(false)
    }

    const styles = {
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? '1px solid #000' : '1px solid #000',
        }),
    }

    const overtimeTypeCountOptions = [
        { label: 'Menit', value: 'Menit' },
        { label: 'Jam', value: 'Jam' },
        { label: 'Hari', value: 'Hari' },
    ]

    const overtime_type_id = watch('overtime_type_id')

    useEffect(() => {
        if (overtime_type_id) {
            const fetchOvertimeById = async () => {
                try {
                    const { data } = await http(token).get(
                        `/overtime-type/${overtime_type_id}`
                    )
                    overtimeTypeSetValue('duration', data.results.duration)
                    overtimeTypeSetValue(
                        'overtime_type_count',
                        data.results.overtime_type_count
                    )
                    overtimeTypeSetValue('nominal', data.results.nominal)
                    return data.results
                } catch (err) {
                    console.error(err)
                }
            }

            fetchOvertimeById()
        }
    }, [overtime_type_id])

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label className="form-label">Nama Karyawan</label>
                        <ReactSelect
                            styles={styles}
                            placeholder=""
                            options={employeeData}
                            value={employeeData}
                            className={'react-select'}
                            onChange={(selectedOptions) => {
                                handleSelectChange(selectedOptions.value)
                            }}
                        />
                    </div>
                    <div></div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="start_date" className=" form-label">
                                Mulai Lembur
                            </label>
                            <Controller
                                name="start_date"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        id="timepicker"
                                        name="start_date"
                                        className={
                                            errors?.start_date
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control date-picker-control py-2'
                                        }
                                        onChange={(selectedDate, dateStr) => {
                                            onChange(dateStr)
                                        }}
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            time_24hr: true,
                                        }}
                                    />
                                )}
                            />
                            {errors?.start_date && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.start_date?.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="end_date" className=" form-label">
                                Selesai Lembur
                            </label>
                            <Controller
                                name="end_date"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        id="timepicker"
                                        name="end_date"
                                        className={
                                            errors?.end_date
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control date-picker-control py-2'
                                        }
                                        onChange={(selectedDate, dateStr) => {
                                            onChange(dateStr)
                                        }}
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            time_24hr: true,
                                        }}
                                    />
                                )}
                            />
                            {errors?.end_date && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.end_date?.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="overtime_type_id"
                        >
                            Tipe Lembur
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="overtime_type_id"
                            options={overtimeType?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="overtime_type_id"
                            error={errors.overtime_type_id}
                        />
                    </div>
                </div>

                <div className="grid-cols-1 grid gap-5">
                    <Textarea
                        label="Deskripsi"
                        type="text"
                        name="description"
                        register={register}
                        id="description"
                        placeholder="Deskripsi"
                        error={errors.description}
                    />
                </div>

                {overtime_type_id && (
                    <div>
                        <div className="lg:grid-cols-3 grid-cols-1 grid gap-5">
                            <Textinput
                                label="Durasi  Lembur"
                                type="number"
                                placeholder="Masukkan Durasi  Lembur"
                                name="duration"
                                register={overtimeTypeRegister}
                            />
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="overtime_type_count"
                                >
                                    Perhitungan
                                </label>
                                <Select
                                    className="react-select"
                                    register={overtimeTypeRegister}
                                    name="overtime_type_count"
                                    styles={styles}
                                    id="overtime_type_count"
                                    options={overtimeTypeCountOptions}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="nominal"
                                    className="form-label "
                                >
                                    Nilai Rupiah
                                </label>
                                <Controller
                                    name="nominal"
                                    control={overtimeTypeControl}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="nominal"
                                            placeholder=" Nilai Rupiah"
                                            id="nominal"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewSendOvertimeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailOvertimeForm
