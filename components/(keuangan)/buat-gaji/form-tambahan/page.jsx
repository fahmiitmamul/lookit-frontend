import http from '@/app/helpers/http.helper'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { Controller, useFieldArray } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useEffect } from 'react'

export const AdditionalSalary = ({
    control,
    register,
    errors,
    setValue,
    clearErrors,
}) => {
    const token = getCookie('token')

    const {
        fields: additionalSalaryFields,
        append: appendAdditionalSalary,
        remove: removeAdditionalSalary,
    } = useFieldArray({
        control,
        name: 'main_salary_addition_value',
    })

    async function fetchMasterGajiTambahan() {
        const { data } = await http(token).get('/master-salary-addition')
        return data.results
    }

    const { data: masterGajiData } = useQuery({
        queryKey: ['master-salary-addition'],
        queryFn: () => fetchMasterGajiTambahan(),
    })

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
        <div>
            {additionalSalaryFields.map((item, index) => (
                <div>
                    <div key={index} className="flex flex-col gap-5 mb-5">
                        <div className="flex justify-end items-end space-x-5">
                            <div className="flex-none relative">
                                <button
                                    onClick={() => appendAdditionalSalary({})}
                                    type="button"
                                    className="inline-flex items-center justify-center h-10 w-10 bg-success-500 text-lg border rounded border-success-500 text-white"
                                >
                                    <Icon icon="heroicons-outline:plus" />
                                </button>
                            </div>

                            {index >= 1 && (
                                <div className="flex-none relative">
                                    <button
                                        onClick={() =>
                                            removeAdditionalSalary(index)
                                        }
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                                    >
                                        <Icon icon="heroicons-outline:trash" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                            <div>
                                <label
                                    htmlFor="additional_salary_name"
                                    className="form-label "
                                >
                                    Silahkan Pilih Jenis Tambahan
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_addition_value[${index}].additional_salary_name`}
                                    defaultValue={item.additional_salary_name}
                                    options={masterGajiData?.data?.map(
                                        (item) => ({
                                            value: item.master_salary_name,
                                            label: item.master_salary_name,
                                        })
                                    )}
                                    styles={styles}
                                    id="main_salary_addition_value"
                                    error={
                                        errors?.main_salary_addition_value?.[
                                            index
                                        ]?.additional_salary_name
                                    }
                                />
                            </div>
                            <div></div>
                        </div>

                        <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div>
                                    <label
                                        htmlFor="value"
                                        className="form-label "
                                    >
                                        Nilai Rupiah
                                    </label>
                                    <Controller
                                        name={`main_salary_addition_value[${index}].additional_salary_value`}
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <NumericFormat
                                                {...fieldProps}
                                                name={`main_salary_addition_value[${index}].additional_salary_value`}
                                                placeholder="Nilai Rupiah"
                                                id={`main_salary_addition_value[${index}].additional_salary_value`}
                                                allowNegative={false}
                                                prefix="Rp"
                                                thousandsGroupStyle="rupiah"
                                                thousandSeparator=","
                                                className={
                                                    errors
                                                        ?.main_salary_addition_value?.[
                                                        index
                                                    ]?.additional_salary_value
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control py-2'
                                                }
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.main_salary_addition_value?.[index]
                                        ?.additional_salary_value && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors
                                                    ?.main_salary_addition_value?.[
                                                    index
                                                ]?.additional_salary_value
                                                    ?.message
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center items-center">
                                    <div>
                                        <Textinput
                                            label="Persentasi"
                                            type="number"
                                            placeholder="Masukkan Persentasi"
                                            onChange={(e) => {
                                                const newValue = e.target.value
                                                const value =
                                                    document.getElementById(
                                                        `main_salary_addition_value[${index}].additional_salary_value`
                                                    ).value

                                                const parsed = parseInt(
                                                    value.replace(/[^\d]/g, '')
                                                )

                                                if (newValue >= 100) {
                                                    setValue(
                                                        `main_salary_addition_value[${index}].additional_salary_percentage`,
                                                        100
                                                    )

                                                    setValue(
                                                        `main_salary_addition_value[${index}].additional_salary_results`,
                                                        (100 / 100) * parsed
                                                    )
                                                    clearErrors(
                                                        `main_salary_addition_value[${index}].additional_salary_results`
                                                    )
                                                } else {
                                                    setValue(
                                                        `main_salary_addition_value[${index}].additional_salary_results`,
                                                        (parseInt(newValue) /
                                                            100) *
                                                            parsed
                                                    )
                                                    clearErrors(
                                                        `main_salary_addition_value[${index}].additional_salary_results`
                                                    )
                                                }
                                                setValue(
                                                    `main_salary_addition_value[${index}].additional_salary_percentage`,
                                                    newValue
                                                )
                                                clearErrors(
                                                    `main_salary_addition_value[${index}].additional_salary_percentage`
                                                )
                                                clearErrors(
                                                    `main_salary_addition_value[${index}].additional_salary_results`
                                                )
                                            }}
                                            register={register}
                                            name={`main_salary_addition_value[${index}].additional_salary_percentage`}
                                            error={
                                                errors
                                                    ?.main_salary_addition_value?.[
                                                    index
                                                ]?.additional_salary_percentage
                                            }
                                        />
                                    </div>
                                    <div className="pt-8 pl-5">%</div>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="results"
                                    className="form-label "
                                >
                                    Hasil
                                </label>
                                <Controller
                                    name={`main_salary_addition_value[${index}].additional_salary_results`}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name={`main_salary_addition_value[${index}].additional_salary_results`}
                                            placeholder="Hasil"
                                            id={`main_salary_addition_value[${index}].additional_salary_results`}
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_addition_value?.[
                                                    index
                                                ]?.additional_salary_results
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `main_salary_addition_value[${index}].additional_salary_percentage`
                                                )
                                                clearErrors(
                                                    `main_salary_addition_value[${index}].additional_salary_results`
                                                )
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_addition_value?.[index]
                                    ?.additional_salary_results && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_addition_value?.[
                                                index
                                            ]?.additional_salary_results
                                                ?.message
                                        }
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                            <div>
                                <label htmlFor="value" className="form-label ">
                                    Nilai Tetap
                                </label>
                                <Controller
                                    name={`main_salary_addition_value[${index}].additional_salary_fixed_value`}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="additional_salary_fixed_value"
                                            placeholder="Nilai Tetap"
                                            id="additional_salary_fixed_value"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_addition_value?.[
                                                    index
                                                ]?.additional_salary_fixed_value
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_addition_value?.[index]
                                    ?.additional_salary_fixed_value && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_addition_value?.[
                                                index
                                            ]?.additional_salary_fixed_value
                                                ?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="additional_salary_calculation"
                                    className="form-label "
                                >
                                    Silahkan Pilih Perhitungan
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_addition_value[${index}].additional_salary_calculation`}
                                    defaultValue={
                                        item.additional_salary_calculation
                                    }
                                    options={countOptions}
                                    styles={styles}
                                    id="additional_salary_calculation"
                                    error={
                                        errors?.main_salary_addition_value?.[
                                            index
                                        ]?.additional_salary_calculation
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
