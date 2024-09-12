import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { useFieldArray } from 'react-hook-form'
import Textinput from '@/components/ui/Textinput'
import { Icon } from '@iconify/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ReactSelect from 'react-select'

const AddKPIForm = ({ setShowAddKPIModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()

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

    const queryClient = useQueryClient()

    const postKPI = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                employee_id: values.employee_id.value,
                indicators: JSON.stringify(values.indicators),
            }).toString()
            return http(token).post(`/kpi`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kpi'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah kpi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowAddKPIModal(false)
        postKPI.mutate(data)
        dispatch(setLoading(false))
    }

    const validateKPI = Yup.object({
        employee_id: Yup.object().required('Harap diisi'),
        indicators: Yup.array().of(
            Yup.object().shape({
                indicator_name: Yup.string().required('Harap diisi'),
                target: Yup.string().required('Harap diisi'),
                results: Yup.string().required('Harap diisi'),
            })
        ),
        kpi_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            indicators: [
                {
                    indicator_name: '',
                    target: '',
                    results: '',
                },
            ],
        },
        resolver: yupResolver(validateKPI),
        mode: 'all',
    })

    const {
        fields: kpiFields,
        append: appendKPI,
        remove: removeKPI,
    } = useFieldArray({
        control: control,
        name: 'indicators',
    })

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
                    <div></div>
                </div>
                <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                    <div>
                        {kpiFields.map((item, index) => (
                            <div
                                className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                                key={item.id}
                            >
                                <Textinput
                                    label="Nama Indikator"
                                    type="text"
                                    id="indicator_name"
                                    placeholder="Nama Indikator"
                                    register={register}
                                    name={`indicators[${index}].indicator_name`}
                                    error={
                                        errors?.indicators?.[index]
                                            ?.indicator_name
                                    }
                                />
                                <Textinput
                                    label="Target"
                                    type="text"
                                    id="target"
                                    placeholder="Target"
                                    register={register}
                                    name={`indicators[${index}].target`}
                                    error={errors?.indicators?.[index]?.target}
                                />
                                <div className="flex justify-between items-end space-x-5">
                                    <div className="w-full">
                                        <Textinput
                                            label="Hasil Nilai"
                                            type="text"
                                            id="results"
                                            placeholder="Hasil Nilai"
                                            register={register}
                                            name={`indicators[${index}].results`}
                                            error={
                                                errors?.indicators?.[index]
                                                    ?.results
                                            }
                                        />
                                    </div>
                                    <div className="flex-none relative">
                                        <button
                                            onClick={() => appendKPI({})}
                                            type="button"
                                            className="inline-flex items-center justify-center h-10 w-10 bg-success-500 text-lg border rounded border-success-500 text-white"
                                        >
                                            <Icon icon="heroicons-outline:plus" />
                                        </button>
                                    </div>
                                    <div className="flex-none relative">
                                        <button
                                            onClick={() => removeKPI(index)}
                                            type="button"
                                            className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                                        >
                                            <Icon icon="heroicons-outline:trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Penilaian"
                            type="text"
                            name="kpi_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Penilaian"
                            error={errors.kpi_description}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddKPIModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddKPIForm
