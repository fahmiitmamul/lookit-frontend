import http from '@/app/helpers/http.helper'
import Checkbox from '@/components/ui/Checkbox'
import Select from '@/components/ui/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'

export default function SelectShift({ setShowAddSelectEmployeeModal, date }) {
    const token = getCookie('token')
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postSchedule = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                start: date,
                end: date,
                employee: selectedEmployee,
            }).toString()
            return http(token).post(`/schedule/flexible`, data)
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

    const onSubmit = (data) => {
        setShowAddSelectEmployeeModal(false)
        postSchedule.mutate(data)
        dispatch(setLoading(true))
    }

    const validateShift = yup.object({
        shift_id: yup.string().required('Harap diisi'),
    })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(validateShift), mode: 'all' })

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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid-cols-1 grid gap-5"
        >
            <div className="flex gap-2 mb-6">
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
                            setSelectedEmployees([])
                        }
                        setChecked(!checked)
                    }}
                />
                Semua Karyawan
            </div>
            <div className="w-full">
                <label htmlFor="employee" className="form-label">
                    Pilih Karyawan
                </label>
                <div className="w-full">
                    <Select
                        className="react-select"
                        onChange={(e) => {
                            handleSelectChange(e)
                        }}
                        options={employeeData?.data?.map((employee) => ({
                            value: employee.name,
                            label: employee.name,
                        }))}
                        styles={styles}
                        id="employee"
                    />
                </div>
            </div>
            <div className="w-full">
                <label htmlFor="shift_id" className="form-label">
                    Nama Shift
                </label>
                <div className="w-full">
                    <Select
                        className="react-select"
                        name="shift_id"
                        register={register}
                        options={shiftData?.data?.map((shift) => ({
                            value: shift.id,
                            label: shift.shift_name,
                        }))}
                        styles={styles}
                        id="shift_id"
                        error={errors.shift_id}
                    />
                </div>
            </div>
            <div className="pb-2">
                List Karyawan :
                <div className="flex flex-wrap gap-5 mt-2">
                    {selectedEmployees?.map((emp) => (
                        <div className="flex justify-center items-center bg-gray-200 text-sm rounded-xl p-2 gap-2">
                            <div className="pb-2">{emp?.name}</div>
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
                        setShowAddSelectEmployeeModal(false)
                    }}
                />
                <Button text="Simpan" type="submit" className="btn-success" />
            </div>
        </form>
    )
}
