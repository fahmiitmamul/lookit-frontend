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

export const DetailTaxForm = ({ setShowViewTaxModal }) => {
    const taxId = useSelector((state) => state.finance.finance.selectedTaxId)

    const styles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
    }

    const token = getCookie('token')

    async function fetchMasterTax() {
        const { data } = await http(token).get('/master-salary-tax')
        return data.results
    }

    const { data: masterTax } = useQuery({
        queryKey: ['master-salary-tax'],
        queryFn: () => fetchMasterTax(),
    })
    const {
        control,
        register,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/main-salary-tax/${taxId}`)
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
        name: 'main_salary_tax_value',
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
                                    htmlFor="tax_name"
                                    className="form-label "
                                >
                                    Nama Pajak
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_tax_value[${index}].tax_name`}
                                    defaultValue={item.tax_name}
                                    options={masterTax?.data?.map((item) => ({
                                        value: item.tax_name,
                                        label: item.tax_name,
                                    }))}
                                    styles={styles}
                                    id="tax_name"
                                    error={
                                        errors?.main_salary_tax_value?.[index]
                                            ?.tax_name
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
                                        name={`main_salary_tax_value[${index}].tax_value`}
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <NumericFormat
                                                {...fieldProps}
                                                name={`main_salary_tax_value[${index}].tax_value`}
                                                placeholder="Nilai Rupiah"
                                                id={`main_salary_tax_value[${index}].tax_value`}
                                                allowNegative={false}
                                                prefix="Rp"
                                                thousandsGroupStyle="rupiah"
                                                thousandSeparator=","
                                                className={
                                                    errors
                                                        ?.main_salary_tax_value?.[
                                                        index
                                                    ]?.tax_value
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control py-2'
                                                }
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.main_salary_tax_value?.[index]
                                        ?.tax_value && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors?.main_salary_tax_value?.[
                                                    index
                                                ]?.tax_value?.message
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
                                                        `main_salary_tax_value[${index}].tax_value`
                                                    ).value

                                                const parsed = parseInt(
                                                    value.replace(/[^\d]/g, '')
                                                )

                                                if (newValue >= 100) {
                                                    setValue(
                                                        `main_salary_tax_value[${index}].tax_percentage`,
                                                        100
                                                    )

                                                    setValue(
                                                        `main_salary_tax_value[${index}].tax_results`,
                                                        (100 / 100) * parsed
                                                    )
                                                } else {
                                                    setValue(
                                                        `main_salary_tax_value[${index}].tax_results`,
                                                        (parseInt(newValue) /
                                                            100) *
                                                            parsed
                                                    )
                                                }
                                                setValue(
                                                    `main_salary_tax_value[${index}].tax_percentage`,
                                                    newValue
                                                )
                                                clearErrors(
                                                    `main_salary_tax_value[${index}].tax_percentage`
                                                )
                                                clearErrors(
                                                    `main_salary_tax_value[${index}].tax_results`
                                                )
                                            }}
                                            register={register}
                                            name={`main_salary_tax_value[${index}].tax_percentage`}
                                            error={
                                                errors?.main_salary_tax_value?.[
                                                    index
                                                ]?.tax_percentage
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
                                    name={`main_salary_tax_value[${index}].tax_results`}
                                    control={control}
                                    disabled
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name={`main_salary_tax_value[${index}].tax_results`}
                                            placeholder="Hasil"
                                            id={`main_salary_tax_value[${index}].tax_results`}
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors?.main_salary_tax_value?.[
                                                    index
                                                ]?.tax_results
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `main_salary_tax_value[${index}].tax_percentage`
                                                )
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_tax_value?.[index]
                                    ?.tax_results && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.main_salary_tax_value?.[
                                                index
                                            ]?.tax_results?.message
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
                                    name={`main_salary_tax_value[${index}].tax_fixed_value`}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="tax_fixed_value"
                                            placeholder="Nilai Tetap"
                                            id="tax_fixed_value"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors?.main_salary_tax_value?.[
                                                    index
                                                ]?.tax_fixed_value
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_tax_value?.[index]
                                    ?.tax_fixed_value && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.main_salary_tax_value?.[
                                                index
                                            ]?.tax_fixed_value?.message
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
                            setShowViewTaxModal(false)
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
    )
}
