import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const DetailIncomingAssetsForm = ({ setShowViewIncomingAssetsModal }) => {
    const [selectedFile, setSelectedFile] = useState(false)
    const token = getCookie('token')
    const assetId = useSelector((state) => state.assets.assets.assets_id)

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee/active')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['employee'],
        queryFn: () => fetchEmployee(),
    })

    const queryClient = useQueryClient()

    const postIncomingAssets = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('file', selectedFile)
            form.append('asset_id', values.asset_id)
            form.append('start_date', values.start_date)
            form.append('asset_condition', values.asset_condition)
            form.append('asset_quantity', values.asset_quantity)
            form.append('asset_description', values.asset_description)
            return http(token).post(`/incoming-assets`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incoming-assets'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah Inventaris masuk')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowViewIncomingAssetsModal(false)
        postIncomingAssets.mutate(data)
        dispatch(setLoading(true))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateAssets = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
        asset_id: Yup.string().required('Harap diisi'),
        start_date: Yup.string().required('Harap diisi'),
        asset_condition: Yup.string().required('Harap diisi'),
        asset_quantity: Yup.string().required('Harap diisi'),
        asset_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/incoming-assets/${assetId}`
            )
            console.log(data)
            return data.results
        },
        resolver: yupResolver(validateAssets),
        mode: 'all',
    })

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    async function fetchAssets() {
        const { data } = await http(token).get(`/assets`)
        return data.results
    }

    const { data: assetsData } = useQuery({
        queryKey: ['assets'],
        queryFn: () => fetchAssets(),
    })

    const assetsCondition = [
        {
            value: 'Baru',
            label: 'Baru',
        },
        {
            value: 'Bekas',
            label: 'Bekas',
        },
    ]

    const incomingAssetsData = getValues()

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
                            register={register}
                            disabled
                            options={employeeData?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${incomingAssetsData?.file?.replace(
                                    /\s/g,
                                    '%20'
                                )}`}
                            >
                                <Icon
                                    width={35}
                                    height={35}
                                    icon="heroicons-outline:document"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Nama Inventaris"
                            type="text"
                            placeholder="Masukkan Nama Inventaris"
                            name="asset_name"
                            register={register}
                            disabled
                            error={errors.asset_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="start_date" className=" form-label">
                            Tanggal Masuk
                        </label>
                        <Controller
                            name="start_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.start_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Masuk"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.start_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.start_date?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="asset_condition"
                            className="form-label "
                        >
                            Kondisi Inventaris
                        </label>
                        <Select
                            className="react-select"
                            name="asset_condition"
                            register={register}
                            disabled
                            options={assetsCondition}
                            styles={styles}
                            id="asset_condition"
                            error={errors.asset_condition}
                        />
                    </div>
                    <Textinput
                        label="Jumlah Inventaris"
                        type="text"
                        placeholder="Masukkan Jumlah Inventaris"
                        name="asset_quantity"
                        register={register}
                        disabled
                        error={errors.asset_quantity}
                    />
                </div>
                <div>
                    <div>
                        <Textarea
                            label="Catatan Inventaris"
                            type="text"
                            name="asset_description"
                            register={register}
                            disabled
                            id="df"
                            placeholder="Catatan Inventaris"
                            error={errors.asset_description}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewIncomingAssetsModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailIncomingAssetsForm
