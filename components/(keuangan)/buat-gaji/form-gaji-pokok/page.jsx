import http from '@/app/helpers/http.helper'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import {
    setBpjsKesehatan,
    setBpjsKetenagakerjaan,
    setEmployeeId,
    setMainSalary,
    setTotalPotonganKaryawan,
    setTotalTunjanganDibiayaiPerusahaan,
} from '../../store'
import { fetchEmployee as fetchEmployeeData } from '../../action'

export const MainSalary = ({ watch, control, register, errors }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()

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

    const employee_id = watch('employee_id')

    useEffect(() => {
        if (employee_id) {
            dispatch(fetchEmployeeData(employee_id))
            dispatch(setEmployeeId(employee_id))

            async function fetchEmployee() {
                const { data } = await http(token).get(
                    `/main-salary-bpjs/employee/${employee_id}`
                )
                if (data?.results?.main_salary_bpjs_value) {
                    dispatch(
                        setBpjsKesehatan(
                            data?.results?.main_salary_bpjs_value?.[0]
                                ?.kesehatan
                        )
                    )
                    dispatch(
                        setBpjsKetenagakerjaan(
                            data?.results?.main_salary_bpjs_value?.[0]
                                ?.ketenagakerjaan
                        )
                    )
                    dispatch(
                        setTotalPotonganKaryawan(
                            data?.results?.main_salary_bpjs_value?.[0]
                                ?.total_potongan_karyawan
                        )
                    )
                    dispatch(
                        setTotalTunjanganDibiayaiPerusahaan(
                            data?.results?.main_salary_bpjs_value?.[0]
                                ?.total_tunjangan_dibiayai_perusahaan
                        )
                    )
                }
            }

            fetchEmployee()
        }
    }, [employee_id])

    const styles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
    }

    const countOptions = [
        { label: 'Menit', value: 'menit' },
        { label: 'Jam', value: 'jam' },
        { label: 'Hari', value: 'hari' },
        { label: 'Bulan', value: 'bulan' },
    ]

    return (
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
                        render={({ field: { onChange, ...fieldProps } }) => (
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
                        <div className={'mt-2 text-danger-500 block text-sm'}>
                            {errors?.main_salary?.message}
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="main_salary_count" className="form-label ">
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
        </div>
    )
}
