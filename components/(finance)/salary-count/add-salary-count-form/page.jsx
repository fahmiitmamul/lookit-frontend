import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import Checkbox from '@/components/ui/Checkbox'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

const TotalSalaryForm = ({ setShowTotalSalaryModal }) => {
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [checked, setChecked] = useState(false)
    const token = getCookie('token')

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
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateTotalSalary = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        salary_period: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateTotalSalary),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const postTotalSalary = useMutation({
        mutationFn: async (values) => {
            return http(token).post('/total-salary', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['salary_count'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menghitung gaji')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowTotalSalaryModal(false)
        postTotalSalary.mutate(data)
        dispatch(setLoading(false))
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
                        <label htmlFor="default-picker" className=" form-label">
                            Pilih Periode
                        </label>

                        <Controller
                            name="salary_period"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    placeholder="Pilih Periode"
                                    className={
                                        errors?.salary_period
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        mode: 'range',
                                    }}
                                />
                            )}
                        />
                        {errors?.salary_period && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.salary_period?.message}
                            </div>
                        )}
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
                            setShowTotalSalaryModal(false)
                        }}
                    />
                    <Button
                        text="Hitung"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default TotalSalaryForm
