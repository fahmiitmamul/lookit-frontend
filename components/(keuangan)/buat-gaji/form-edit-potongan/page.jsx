import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { setLoading } from '@/store/loadingReducer'
import { Icon } from '@iconify/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const EditSalaryCutsForm = ({ setShowEditSalaryCutsModal }) => {
    const salaryCutsId = useSelector(
        (state) => state.finance.finance.selectedSalaryCutsId
    )

    const emp_id = useSelector((state) => state.finance.finance.employee_id)

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
    const token = getCookie('token')

    async function fetchMasterGajiPotongan() {
        const { data } = await http(token).get('/master-salary-deduction')
        return data.results
    }

    const { data: masterGajiPotongan } = useQuery({
        queryKey: ['master-salary-deduction'],
        queryFn: () => fetchMasterGajiPotongan(),
    })

    const {
        control,
        register,
        formState: { errors },
        clearErrors,
        handleSubmit,
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/main-salary-deduction/${salaryCutsId}`
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
        name: 'main_salary_deduction_value',
    })

    const queryClient = useQueryClient()

    const patchSalaryCuts = useMutation({
        mutationFn: async (values) => {
            const mainSalaryAdditionForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_deduction_value: JSON.stringify(
                    values.main_salary_deduction_value
                ),
            })

            return http(token).patch(
                `/main-salary-deduction/${salaryCutsId}`,
                mainSalaryAdditionForm
            )
        },
        onSuccess: () => {
            toast.success('Berhasil mengupdate data potongan')
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowEditSalaryCutsModal(false)
        patchSalaryCuts.mutate(data)
        dispatch(setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    htmlFor="salary_cuts_name"
                                    className="form-label "
                                >
                                    Jenis Potongan
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_deduction_value[${index}].salary_cuts_name`}
                                    defaultValue={item.salary_cuts_name}
                                    options={masterGajiPotongan?.data?.map(
                                        (item) => ({
                                            value: item.master_salary_name,
                                            label: item.master_salary_name,
                                        })
                                    )}
                                    styles={styles}
                                    id="salary_cuts_name"
                                    error={
                                        errors?.main_salary_deduction_value?.[
                                            index
                                        ]?.salary_cuts_name
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
                                        name={`main_salary_deduction_value[${index}].salary_cuts_value`}
                                        control={control}
                                        render={({
                                            field: { onChange, ...fieldProps },
                                        }) => (
                                            <NumericFormat
                                                {...fieldProps}
                                                name={`main_salary_deduction_value[${index}].salary_cuts_value`}
                                                placeholder="Nilai Rupiah"
                                                id={`main_salary_deduction_value[${index}].salary_cuts_value`}
                                                allowNegative={false}
                                                prefix="Rp"
                                                thousandsGroupStyle="rupiah"
                                                thousandSeparator=","
                                                className={
                                                    errors
                                                        ?.main_salary_deduction_value?.[
                                                        index
                                                    ]?.salary_cuts_value
                                                        ? 'border-danger-500 border date-picker-control py-2'
                                                        : 'date-picker-control py-2'
                                                }
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                }}
                                            />
                                        )}
                                    />
                                    {errors?.main_salary_deduction_value?.[
                                        index
                                    ]?.salary_cuts_value && (
                                        <div
                                            className={
                                                'mt-2 text-danger-500 block text-sm'
                                            }
                                        >
                                            {
                                                errors
                                                    ?.main_salary_deduction_value?.[
                                                    index
                                                ]?.salary_cuts_value?.message
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
                                                        `main_salary_deduction_value[${index}].salary_cuts_value`
                                                    ).value

                                                const parsed = parseInt(
                                                    value.replace(/[^\d]/g, '')
                                                )

                                                if (newValue >= 100) {
                                                    setValue(
                                                        `main_salary_deduction_value[${index}].salary_cuts_percentage`,
                                                        100
                                                    )

                                                    setValue(
                                                        `main_salary_deduction_value[${index}].salary_cuts_results`,
                                                        (100 / 100) * parsed
                                                    )
                                                } else {
                                                    setValue(
                                                        `main_salary_deduction_value[${index}].salary_cuts_results`,
                                                        (parseInt(newValue) /
                                                            100) *
                                                            parsed
                                                    )
                                                }
                                                setValue(
                                                    `main_salary_deduction_value[${index}].salary_cuts_percentage`,
                                                    newValue
                                                )
                                                clearErrors(
                                                    `main_salary_deduction_value[${index}].salary_cuts_percentage`
                                                )
                                                clearErrors(
                                                    `main_salary_deduction_value[${index}].salary_cuts_results`
                                                )
                                            }}
                                            register={register}
                                            name={`main_salary_deduction_value[${index}].salary_cuts_percentage`}
                                            error={
                                                errors
                                                    ?.main_salary_deduction_value?.[
                                                    index
                                                ]?.salary_cuts_percentage
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
                                    name={`main_salary_deduction_value[${index}].salary_cuts_results`}
                                    control={control}
                                    disabled
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name={`main_salary_deduction_value[${index}].salary_cuts_results`}
                                            placeholder="Hasil"
                                            id={`main_salary_deduction_value[${index}].salary_cuts_results`}
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_deduction_value?.[
                                                    index
                                                ]?.salary_cuts_results
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `main_salary_deduction_value[${index}].salary_cuts_percentage`
                                                )
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_deduction_value?.[index]
                                    ?.salary_cuts_results && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_deduction_value?.[
                                                index
                                            ]?.salary_cuts_results?.message
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
                                    name={`main_salary_deduction_value[${index}].salary_cuts_fixed_value`}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="salary_cuts_fixed_value"
                                            placeholder="Nilai Tetap"
                                            id="salary_cuts_fixed_value"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors
                                                    ?.main_salary_deduction_value?.[
                                                    index
                                                ]?.salary_cuts_fixed_value
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.main_salary_deduction_value?.[index]
                                    ?.salary_cuts_fixed_value && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors
                                                ?.main_salary_deduction_value?.[
                                                index
                                            ]?.salary_cuts_fixed_value?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="salary_cuts_calculation"
                                    className="form-label "
                                >
                                    Perhitungan
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`main_salary_deduction_value[${index}].salary_cuts_calculation`}
                                    defaultValue={item.salary_cuts_calculation}
                                    options={countOptions}
                                    styles={styles}
                                    id="salary_cuts_calculation"
                                    error={
                                        errors?.main_salary_deduction_value?.[
                                            index
                                        ]?.salary_cuts_calculation
                                    }
                                />
                            </div>
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
                            setShowEditSalaryCutsModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </div>
        </form>
    )
}
