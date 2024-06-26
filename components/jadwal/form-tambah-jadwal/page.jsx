'use client'
import React, { useRef, useState } from 'react'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Flatpickr from 'react-flatpickr'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import Checkbox from '@/components/ui/Checkbox'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Card from '@/components/ui/Card'
import { Icon } from '@iconify/react'
import Modal from '@/components/ui/Modal'
import SelectShift from '../form-pilih-shift/page'
import { setScheduleId, setStartDate } from '../store'

const AddScheduleForm = ({
    setShowAddScheduleModal,
    setShowEditScheduleModal,
}) => {
    const token = getCookie('token')
    const [showAddSelectEmployeeModal, setShowAddSelectEmployeeModal] =
        useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [checked, setChecked] = useState(false)
    const [currentMonth, setCurrentMonth] = useState('')
    const [dates, setDates] = useState('')
    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    const [selectedItem, setSelectedItem] = useState(null)

    async function fetchSchedule() {
        try {
            const { data } = await http(token).get('/schedule?limit=999999')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: scheduleData } = useQuery({
        queryKey: ['schedule'],
        queryFn: () => fetchSchedule(),
    })

    const calendarRef = useRef()

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

    const validateSchedule = Yup.object({
        senin_shift_id: Yup.string().required('Harap diisi'),
        selasa_shift_id: Yup.string().required('Harap diisi'),
        rabu_shift_id: Yup.string().required('Harap diisi'),
        kamis_shift_id: Yup.string().required('Harap diisi'),
        jumat_shift_id: Yup.string().required('Harap diisi'),
        sabtu_shift_id: Yup.string().required('Harap diisi'),
        minggu_shift_id: Yup.string().required('Harap diisi'),
        early_period: Yup.string().required('Harap diisi'),
        final_period: Yup.string().required('Harap diisi'),
    })

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

    async function fetchShift() {
        const { data } = await http(token).get('/shift/all')
        return data.results
    }

    const { data: shiftData } = useQuery({
        queryKey: ['shift'],
        queryFn: () => fetchShift(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const queryClient = useQueryClient()

    const postSchedule = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                employee: selectedEmployee,
            }).toString()
            return http(token).post(`/schedule`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah jadwal')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateSchedule),
        mode: 'all',
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowAddScheduleModal(false)
        postSchedule.mutate(data)
        dispatch(setLoading(true))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="flex gap-10 flex-auto w-full">
                    {selectedItem === 'Reguler' && (
                        <Card className="w-full">
                            <div>
                                <div className="grid gap-5 grid-cols-1 pb-5">
                                    <div className="flex gap-5">
                                        <div className="w-full">
                                            <label
                                                htmlFor="early_period"
                                                className="form-label "
                                            >
                                                Periode Awal
                                            </label>
                                            <Controller
                                                name="early_period"
                                                control={control}
                                                render={({
                                                    field: { onChange },
                                                    ...fieldProps
                                                }) => (
                                                    <Flatpickr
                                                        {...fieldProps}
                                                        className={
                                                            errors?.early_period
                                                                ? 'border-danger-500 border date-picker-control py-2'
                                                                : 'date-picker-control date-picker-control py-2'
                                                        }
                                                        placeholder="Periode"
                                                        name="early_period"
                                                        onChange={(
                                                            date,
                                                            dateStr
                                                        ) => {
                                                            onChange(dateStr)
                                                        }}
                                                        options={{
                                                            minDate: 'today',
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors?.early_period?.message && (
                                                <div
                                                    className={
                                                        'mt-2 text-danger-500 block text-sm'
                                                    }
                                                >
                                                    {
                                                        errors?.early_period
                                                            ?.message
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="final_period"
                                                className="form-label "
                                            >
                                                Periode Akhir
                                            </label>
                                            <Controller
                                                name="final_period"
                                                control={control}
                                                render={({
                                                    field: { onChange },
                                                    ...fieldProps
                                                }) => (
                                                    <Flatpickr
                                                        {...fieldProps}
                                                        className={
                                                            errors?.final_period
                                                                ? 'border-danger-500 border date-picker-control py-2'
                                                                : 'date-picker-control date-picker-control py-2'
                                                        }
                                                        placeholder="Periode"
                                                        name="final_period"
                                                        onChange={(
                                                            date,
                                                            dateStr
                                                        ) => {
                                                            onChange(dateStr)
                                                        }}
                                                        options={{
                                                            minDate: 'today',
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors?.final_period?.message && (
                                                <div
                                                    className={
                                                        'mt-2 text-danger-500 block text-sm'
                                                    }
                                                >
                                                    {
                                                        errors?.final_period
                                                            ?.message
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-6">
                                    <Checkbox
                                        value={checked}
                                        onChange={() => {
                                            if (!checked) {
                                                const allEmployee =
                                                    employeeData?.data?.map(
                                                        (employee) =>
                                                            employee.id
                                                    )
                                                setSelectedEmployee(allEmployee)
                                            } else {
                                                setSelectedEmployee([])
                                                setSelectedEmployees([])
                                            }
                                            setChecked(!checked)
                                        }}
                                    />
                                    Semua Karyawan
                                </div>
                                <div className="grid gap-5 grid-cols-1 pb-4">
                                    <div>
                                        <label
                                            htmlFor="employee_id"
                                            className="form-label "
                                        >
                                            Pilih Karyawan
                                        </label>
                                        <Select
                                            className="react-select"
                                            options={employeeData?.data?.map(
                                                (employee) => ({
                                                    value: employee.name,
                                                    label: employee.name,
                                                })
                                            )}
                                            styles={styles}
                                            id="employee_id"
                                            error={errors.employee_id}
                                            disabled={checked}
                                            onChange={(e) => {
                                                setValue(
                                                    'employee_id',
                                                    'Has a value'
                                                )
                                                handleSelectChange(e)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="pb-2">
                                    List Karyawan :
                                    <div className="flex flex-wrap gap-5 mt-2">
                                        {selectedEmployees?.map((emp) => (
                                            <div className="flex justify-center items-center bg-gray-200 text-sm rounded-xl p-2 gap-2">
                                                <div className="pb-2">
                                                    {emp?.name}
                                                </div>
                                                <div className="pt-1">
                                                    <Button
                                                        onClick={() => {
                                                            handleDeleteEmployee(
                                                                emp
                                                            )
                                                        }}
                                                        className="bg-none p-0"
                                                        icon="heroicons:x-mark"
                                                    ></Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                    {(selectedItem === 'Reguler' || selectedItem === null) && (
                        <div
                            className="w-full"
                            onClick={() => {
                                setSelectedItem('Reguler')
                            }}
                        >
                            <Card className="w-full hover:bg-slate-200 hover:cursor-pointer">
                                <div className="grid gap-5 grid-cols-1">
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="days_worked"
                                            className="form-label font-bold"
                                        >
                                            Jadwal Reguler
                                        </label>
                                        <div className="w-full">
                                            <label
                                                htmlFor="senin_shift_id"
                                                className="form-label"
                                            >
                                                Senin
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="senin_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="senin_shift_id"
                                                    error={
                                                        errors.senin_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="selasa_shift_id"
                                                className="form-label"
                                            >
                                                Selasa
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="selasa_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="selasa_shift_id"
                                                    error={
                                                        errors.selasa_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="rabu_shift_id"
                                                className="form-label"
                                            >
                                                Rabu
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="rabu_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="rabu_shift_id"
                                                    error={errors.rabu_shift_id}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="kamis_shift_id"
                                                className="form-label"
                                            >
                                                Kamis
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="kamis_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="kamis_shift_id"
                                                    error={
                                                        errors.kamis_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="jumat_shift_id"
                                                className="form-label"
                                            >
                                                Jumat
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="jumat_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="jumat_shift_id"
                                                    error={
                                                        errors.jumat_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="sabtu_shift_id"
                                                className="form-label"
                                            >
                                                Sabtu
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="sabtu_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="sabtu_shift_id"
                                                    error={
                                                        errors.sabtu_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="minggu_shift_id"
                                                className="form-label"
                                            >
                                                Minggu
                                            </label>
                                            <div className="w-full">
                                                <Select
                                                    className="react-select"
                                                    name="minggu_shift_id"
                                                    register={register}
                                                    options={shiftData?.data?.map(
                                                        (employee) => ({
                                                            value: employee.id,
                                                            label: employee.shift_name,
                                                        })
                                                    )}
                                                    styles={styles}
                                                    id="minggu_shift_id"
                                                    error={
                                                        errors.minggu_shift_id
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                    {(selectedItem === 'Fleksibel' ||
                        selectedItem === null) && (
                        <div
                            className="w-full"
                            onClick={() => {
                                setSelectedItem('Fleksibel')
                            }}
                        >
                            <Card className="w-full hover:bg-slate-200 hover:cursor-pointer">
                                <div className="grid gap-5 grid-cols-1">
                                    <div className="w-full flex justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-2">
                                                <label
                                                    htmlFor="days_worked"
                                                    className="form-label font-bold"
                                                >
                                                    Jadwal Fleksibel
                                                </label>
                                            </div>
                                            <div>{currentMonth}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="mr-2 p-2 bg-blue-500 text-white rounded"
                                                onClick={() =>
                                                    calendarRef.current
                                                        .getApi()
                                                        .prev()
                                                }
                                            >
                                                <Icon icon="akar-icons:chevron-left" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2 bg-blue-500 text-white rounded"
                                                onClick={() =>
                                                    calendarRef.current
                                                        .getApi()
                                                        .next()
                                                }
                                            >
                                                <Icon icon="akar-icons:chevron-right" />
                                            </button>
                                        </div>
                                    </div>
                                    <FullCalendar
                                        height={600}
                                        ref={calendarRef}
                                        plugins={[
                                            dayGridPlugin,
                                            timeGridPlugin,
                                            interactionPlugin,
                                            listPlugin,
                                        ]}
                                        dateClick={(data) => {
                                            setShowAddSelectEmployeeModal(
                                                !showAddSelectEmployeeModal
                                            )
                                            setDates(data.dateStr)
                                        }}
                                        dayMaxEvents={2}
                                        weekends
                                        initialView="dayGridMonth"
                                        headerToolbar={false}
                                        datesSet={(dateInfo) => {
                                            const monthIndex =
                                                dateInfo.start.getMonth()
                                            const monthName =
                                                monthNames[monthIndex]
                                            const year =
                                                dateInfo.start.getFullYear()
                                            setCurrentMonth(
                                                `${monthName} ${year}`
                                            )
                                        }}
                                        events={scheduleData?.data?.map(
                                            (item) => ({
                                                id: item?.id,
                                                title: item?.title,
                                                start: item?.start,
                                                end: item?.end,
                                                is_reguler: item?.is_reguler,
                                            })
                                        )}
                                        eventContent={(data) => {
                                            return (
                                                !data.event.extendedProps
                                                    .is_reguler && (
                                                    <div>
                                                        {data.event.title}
                                                    </div>
                                                )
                                            )
                                        }}
                                        eventClick={(data) => {
                                            setShowEditScheduleModal(true)

                                            dispatch(
                                                setScheduleId(data.event.id)
                                            )
                                            dispatch(
                                                setStartDate(data.event.start)
                                            )
                                        }}
                                    />
                                </div>
                            </Card>
                        </div>
                    )}
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddScheduleModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
            <Modal
                title="Pilih Shift"
                label="Pilih Shift"
                className="max-w-xl"
                centered
                labelClass="btn-outline-dark"
                activeModal={showAddSelectEmployeeModal}
                onClose={() => {
                    setShowAddSelectEmployeeModal(!showAddSelectEmployeeModal)
                }}
            >
                <SelectShift
                    date={dates}
                    setShowAddSelectEmployeeModal={
                        setShowAddSelectEmployeeModal
                    }
                />
            </Modal>
        </div>
    )
}

export default AddScheduleForm
