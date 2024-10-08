import http from '@/app/helpers/http.helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from '@/components/ui/Select'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { setMainSalary } from '../../store'
import { fetchEmployee as fetchEmployeeData } from '../../action'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'

export const EditMainSalaryModal = ({ setShowEditMainSalaryModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const mainSalaryId = useSelector(
        (state) => state.finance.finance.selectedMainSalaryId
    )

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
        watch,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/main-salary/${mainSalaryId}`
            )
            return data.results
        },
        mode: 'all',
    })

    const employee_id = watch('employee_id')

    useEffect(() => {
        if (employee_id) {
            dispatch(fetchEmployeeData(employee_id))
        }
    }, [employee_id])

    const styles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
    }

    const countOptions = [
        { label: 'Menit', value: 'minutes' },
        { label: 'Jam', value: 'hours' },
        { label: 'Hari', value: 'days' },
        { label: 'Bulan', value: 'months' },
    ]

    const queryClient = useQueryClient()

    const patchMainSalary = useMutation({
        mutationFn: async (values) => {
            const form = new URLSearchParams(values).toString()
            return http(token).patch(`/main-salary/${mainSalaryId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit gaji pokok')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowEditMainSalaryModal(false)
        patchMainSalary.mutate(data)
        dispatch(setLoading(true))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:grid grid gap-5">
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
                        <label htmlFor="main_salary" className="form-label">
                            Nilai Rupiah
                        </label>
                        <Controller
                            name="main_salary"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <NumericFormat
                                    {...fieldProps}
                                    name="main_salary"
                                    placeholder=" Nilai Rupiah"
                                    id="main_salary"
                                    allowNegative={false}
                                    prefix="Rp"
                                    thousandsGroupStyle="rupiah"
                                    thousandSeparator=","
                                    className={
                                        errors?.main_salary
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(e) => {
                                        onChange(e.target.value)
                                        dispatch(setMainSalary(e.target.value))
                                    }}
                                />
                            )}
                        />
                        {errors?.main_salary && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.main_salary?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="main_salary_count"
                            className="form-label "
                        >
                            Silahkan Pilih Perhitungan
                        </label>
                        <Select
                            className="react-select"
                            name="main_salary_count"
                            register={register}
                            options={countOptions}
                            styles={styles}
                            id="main_salary_count"
                            error={errors.main_salary_count}
                        />
                    </div>
                </div>
                <div className="pt-10">
                    <div className="flex gap-5 justify-end">
                        <Button
                            text="Batal"
                            className="btn-danger"
                            type="button"
                            onClick={() => {
                                setShowEditMainSalaryModal(false)
                            }}
                        />
                        <Button
                            text="Simpan"
                            type="submit"
                            className="btn-success"
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
