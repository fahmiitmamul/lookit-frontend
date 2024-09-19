import React from 'react'
import { useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import 'flatpickr/dist/flatpickr.min.css'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import ReactSelect from 'react-select'

const TotalSalaryForm = ({ setShowTotalSalaryModal }) => {
    const token = getCookie('token')

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
            const data = new URLSearchParams(values).toString()
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
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label className="form-label">
                            Silahkan Pilih Nama Karyawan
                        </label>
                        <Controller
                            name="employee_id"
                            control={control}
                            render={({
                                field: { onChange },
                                ...fieldProps
                            }) => (
                                <ReactSelect
                                    {...fieldProps}
                                    styles={styles}
                                    placeholder=""
                                    options={employeeData?.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            label: item.name,
                                        })
                                    )}
                                    className={
                                        errors?.employee_id
                                            ? 'border-danger-500 border rounded-md'
                                            : 'react-select'
                                    }
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions)
                                    }}
                                />
                            )}
                        />
                        {errors?.employee_id && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.employee_id?.message}
                            </div>
                        )}
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
                                        plugins: [
                                            new monthSelectPlugin({
                                                shorthand: true,
                                                dateFormat: 'm.y',
                                                altFormat: 'F Y',
                                                theme: 'light',
                                            }),
                                        ],
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
