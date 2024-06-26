import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'

export const DetailInsuranceModal = ({ setShowViewInsuranceModal }) => {
    const insuranceId = useSelector(
        (state) => state.finance.finance.selectedInsuranceId
    )

    const styles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
    }

    const token = getCookie('token')

    async function fetchMasterInsurance() {
        const { data } = await http(token).get('/master-salary-insurance')
        return data.results
    }

    const { data: masterInsurance } = useQuery({
        queryKey: ['master-salary-insurance'],
        queryFn: () => fetchMasterInsurance(),
    })

    const {
        control,
        register,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/main-salary-insurance/${insuranceId}`
            )
            return data.results
        },
        mode: 'all',
    })

    const {
        fields: additionalSalaryFields,
        append: appendAdditionalSalary,
        remove: removeAdditionalSalary,
    } = useFieldArray({
        control,
        name: 'main_salary_insurance_value',
    })

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
                                    htmlFor="insurance_name"
                                    className="form-label "
                                >
                                    Nama Asuransi
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_insurance_value[${index}].insurance_name`}
                                    defaultValue={item.insurance_name}
                                    options={masterInsurance?.data?.map(
                                        (item) => ({
                                            value: item.insurance_name,
                                            label: item.insurance_name,
                                        })
                                    )}
                                    styles={styles}
                                    id="insurance_name"
                                    error={
                                        errors?.main_salary_insurance_value?.[
                                            index
                                        ]?.insurance_name
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <Textinput
                                    label="Input Nomor Asuransi"
                                    type="text"
                                    placeholder="Nomor Asuransi"
                                    register={register}
                                    name={`main_salary_insurance_value[${index}].insurance_number`}
                                    id="insurance_number"
                                    error={
                                        errors?.main_salary_insurance_value?.[
                                            index
                                        ]?.insurance_number
                                    }
                                />
                            </div>
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
                                        name={`main_salary_insurance_value[${index}].insurance_value`}
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <NumericFormat
                                                {...fieldProps}
                                                name={`main_salary_insurance_value[${index}].insurance_value`}
                                                placeholder="Nilai Rupiah"
                                                id={`main_salary_insurance_value[${index}].insurance_value`}
                                                allowNegative={false}
                                                prefix="Rp"
                                                thousandsGroupStyle="rupiah"
                                                thousandSeparator=","
                                                className={
                                                    errors
                                                        ?.main_salary_insurance_value?.[
                                                        index
                                                    ]?.insurance_value
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control py-2'
                                                }
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.main_salary_insurance_value?.[
                                        index
                                    ]?.insurance_value && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors
                                                    ?.main_salary_insurance_value?.[
                                                    index
                                                ]?.insurance_value?.message
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
                                                        `main_salary_insurance_value[${index}].insurance_value`
                                                    ).value

                                                const parsed = parseInt(
                                                    value.replace(/[^\d]/g, '')
                                                )

                                                if (newValue >= 100) {
                                                    setValue(
                                                        `main_salary_insurance_value[${index}].insurance_percentage`,
                                                        100
                                                    )

                                                    setValue(
                                                        `main_salary_insurance_value[${index}].insurance_results`,
                                                        (100 / 100) * parsed
                                                    )
                                                } else {
                                                    setValue(
                                                        `main_salary_insurance_value[${index}].insurance_results`,
                                                        (parseInt(newValue) /
                                                            100) *
                                                            parsed
                                                    )
                                                }
                                                setValue(
                                                    `main_salary_insurance_value[${index}].insurance_percentage`,
                                                    newValue
                                                )
                                                clearErrors(
                                                    `main_salary_insurance_value[${index}].insurance_percentage`
                                                )
                                                clearErrors(
                                                    `main_salary_insurance_value[${index}].insurance_results`
                                                )
                                            }}
                                            register={register}
                                            name={`main_salary_insurance_value[${index}].insurance_percentage`}
                                            error={
                                                errors
                                                    ?.main_salary_insurance_value?.[
                                                    index
                                                ]?.insurance_percentage
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
                                    name={`main_salary_insurance_value[${index}].insurance_results`}
                                    control={control}
                                    disabled
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name={`main_salary_insurance_value[${index}].insurance_results`}
                                            placeholder="Hasil"
                                            id={`main_salary_insurance_value[${index}].insurance_results`}
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_insurance_value?.[
                                                    index
                                                ]?.insurance_results
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `main_salary_insurance_value[${index}].insurance_percentage`
                                                )
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_insurance_value?.[index]
                                    ?.insurance_results && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_insurance_value?.[
                                                index
                                            ]?.insurance_results?.message
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
                                    name={`main_salary_insurance_value[${index}].insurance_fixed_value`}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="insurance_fixed_value"
                                            placeholder="Nilai Tetap"
                                            id="insurance_fixed_value"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_insurance_value?.[
                                                    index
                                                ]?.insurance_fixed_value
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_insurance_value?.[index]
                                    ?.insurance_fixed_value && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_insurance_value?.[
                                                index
                                            ]?.insurance_fixed_value?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="pt-10">
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewInsuranceModal(false)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
