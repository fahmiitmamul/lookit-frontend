import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { useFieldArray } from 'react-hook-form'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const DetailKPIForm = ({ setShowViewKPIModal }) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [searchData, setSearchData] = useState('')
    const token = getCookie('token')
    const dispatch = useDispatch()
    const kpiId = useSelector((state) => state.kpi.kpi.kpi_id)

    const { control: kpiControl } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/kpi/${kpiId}`)
            return data.results
        },
    })

    const { fields: kpiFields } = useFieldArray({
        control: kpiControl,
        name: 'indicators',
    })

    async function fetchEmployee(
        pageData = page,
        search = searchData,
        limitData = limit
    ) {
        const { data } = await http(token).get(
            '/employee/active?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['employee', page, searchData, limit],
        queryFn: () => fetchEmployee(page, searchData, limit),
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
        setShowViewKPIModal(false)
        postKPI.mutate(data)
        dispatch(setLoading(false))
    }

    const validateKPI = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
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
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/kpi/${kpiId}`)
            return data.results
        },
        resolver: yupResolver(validateKPI),
        mode: 'all',
    })

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            disabled
                            register={register}
                            options={employeeData?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div></div>
                </div>
                <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                    <div>
                        {kpiFields.map((item, index) => (
                            <div
                                className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                                key={index}
                            >
                                <Textinput
                                    label="Nama Indikator"
                                    type="text"
                                    id="indicator_name"
                                    disabled
                                    placeholder="Nama Indikator"
                                    register={register}
                                    name={`indicators[${index}].indicator_name`}
                                    defaultValue={item.indicator_name}
                                    error={
                                        errors?.indicators?.[index]
                                            ?.indicator_name
                                    }
                                />
                                <Textinput
                                    label="Target"
                                    type="text"
                                    id="target"
                                    disabled
                                    placeholder="Target"
                                    register={register}
                                    name={`indicators[${index}].target`}
                                    defaultValue={item.target}
                                    error={errors?.indicators?.[index]?.target}
                                />
                                <div className="flex justify-between items-end space-x-5">
                                    <div className="w-full">
                                        <Textinput
                                            label="Hasil Nilai"
                                            type="text"
                                            id="results"
                                            disabled
                                            placeholder="Hasil Nilai"
                                            register={register}
                                            name={`indicators[${index}].results`}
                                            defaultValue={item.results}
                                            error={
                                                errors?.indicators?.[index]
                                                    ?.results
                                            }
                                        />
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
                            disabled
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
                            setShowViewKPIModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailKPIForm
