import React from 'react'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import Textinput from '@/components/ui/Textinput'
import { NumericFormat } from 'react-number-format'
import Fileinput from '@/components/ui/Fileinput'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const DetailCostForm = ({ setShowViewCostModal }) => {
    const token = getCookie('token')
    const [selectedFile, setSelectedFile] = useState(null)

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateCost = Yup.object({
        cost_name: Yup.string().required('Harap diisi'),
        cost_type: Yup.string().required('Harap diisi'),
        cost_date: Yup.string().required('Harap diisi'),
        cost_status: Yup.string().required('Harap diisi'),
        cost_payment_type: Yup.string().required('Harap diisi'),
        cost_value: Yup.string().required('Harap diisi'),
        cost_tax_percentage: Yup.string().required('Harap diisi'),
        cost_tax_result: Yup.string().required('Harap diisi'),
        cost_grand_total: Yup.string().required('Harap diisi'),
        cost_description: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
    })

    const { selectedCostId } = useSelector((state) => state.finance.finance)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        clearErrors,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/cost/${selectedCostId}`)
            return data.results
        },
        resolver: yupResolver(validateCost),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const postCost = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('cost_name', values.cost_name)
            form.append('cost_type', values.cost_type)
            form.append('cost_payment_type', values.cost_payment_type)
            form.append('cost_date', values.cost_date)
            form.append('cost_status', values.cost_status)
            form.append('cost_value', values.cost_value)
            form.append('cost_tax_percentage', values.cost_tax_percentage)
            form.append('cost_tax_result', values.cost_tax_result)
            form.append('cost_grand_total', values.cost_grand_total)
            form.append('cost_description', values.cost_description)
            form.append('file', selectedFile)
            return http(token).post(`/cost`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cost'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit biaya')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const onSubmit = (data) => {
        setShowViewCostModal(false)
        postCost.mutate(data)
        dispatch(setLoading(false))
    }

    const statusOptions = [
        {
            value: 'Belum Dibayar',
            label: 'Belum Dibayar',
        },
        {
            value: 'Sudah Dibayar',
            label: 'Sudah Dibayar',
        },
    ]

    const paymentTypeOptions = [
        {
            value: 'Cash',
            label: 'Cash',
        },
        {
            value: 'Transfer',
            label: 'Transfer',
        },
    ]

    const costData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Biaya"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Biaya"
                        name="cost_name"
                        register={register}
                        error={errors.cost_name}
                    />
                    <Textinput
                        label="Jenis Biaya"
                        type="text"
                        disabled
                        placeholder="Masukkan Jenis Biaya"
                        name="cost_type"
                        register={register}
                        error={errors.cost_type}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                        <div>
                            <label htmlFor="value" className="form-label ">
                                Nilai Rupiah
                            </label>
                            <Controller
                                name="cost_value"
                                disabled
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <NumericFormat
                                        {...fieldProps}
                                        name="cost_value"
                                        placeholder="Nilai Rupiah"
                                        id="cost_value"
                                        allowNegative={false}
                                        prefix="Rp"
                                        thousandsGroupStyle="rupiah"
                                        thousandSeparator=","
                                        className={
                                            errors?.cost_value
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control py-2'
                                        }
                                        onChange={(e) => {
                                            onChange(e.target.value)
                                        }}
                                    />
                                )}
                            />
                            {errors?.cost_value && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.cost_value?.message}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <Textinput
                                    label="Pajak"
                                    type="number"
                                    disabled
                                    placeholder="Masukkan Pajak"
                                    onKeyUp={(e) => {
                                        const newValue = e.target.value

                                        const value =
                                            document.getElementById(
                                                `cost_value`
                                            ).value

                                        const parsed = parseInt(
                                            value.replace(/[^\d]/g, '')
                                        )

                                        const cost_tax_result_data =
                                            document.getElementById(
                                                'cost_tax_result'
                                            ).value

                                        const tax_result_data = parseInt(
                                            cost_tax_result_data.replace(
                                                /[^\d]/g,
                                                ''
                                            )
                                        )

                                        if (newValue >= 100) {
                                            setValue(
                                                `cost_grand_total`,
                                                parsed + tax_result_data
                                            )
                                            clearErrors(`cost_grand_total`)
                                        } else {
                                            setValue(
                                                `cost_grand_total`,
                                                parsed + tax_result_data
                                            )
                                            clearErrors(`cost_grand_total`)
                                        }
                                    }}
                                    onChange={(e) => {
                                        const newValue = e.target.value
                                        const value =
                                            document.getElementById(
                                                `cost_value`
                                            ).value

                                        const parsed = parseInt(
                                            value.replace(/[^\d]/g, '')
                                        )

                                        if (newValue >= 100) {
                                            setValue(`cost_tax_percentage`, 100)

                                            setValue(
                                                `cost_tax_result`,
                                                (100 / 100) * parsed
                                            )

                                            clearErrors(`cost_tax_result`)
                                        } else {
                                            setValue(
                                                `cost_tax_result`,
                                                (parseInt(newValue) / 100) *
                                                    parsed
                                            )

                                            clearErrors(`cost_tax_result`)
                                        }
                                        setValue(
                                            `cost_tax_percentage`,
                                            newValue
                                        )
                                        clearErrors(`cost_tax_percentage`)
                                        clearErrors(`cost_tax_result`)
                                    }}
                                    register={register}
                                    name={`cost_tax_percentage`}
                                    error={errors?.cost_tax_percentage}
                                />
                            </div>
                            <div className="pt-8 pl-5">%</div>
                        </div>
                    </div>
                    <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                        <div className="flex justify-center items-center">
                            <div>
                                <label
                                    htmlFor="cost_tax_result"
                                    className="form-label "
                                >
                                    Nilai Pajak
                                </label>
                                <Controller
                                    name="cost_tax_result"
                                    disabled
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="cost_tax_result"
                                            placeholder="Nilai Pajak"
                                            id="cost_tax_result"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors?.cost_tax_result
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `cost_tax_percentage`
                                                )
                                                clearErrors(`cost_tax_result`)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.cost_tax_result && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.cost_tax_result?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div>
                                <label
                                    htmlFor="cost_grand_total"
                                    className="form-label "
                                >
                                    Jumlah Total
                                </label>
                                <Controller
                                    name="cost_grand_total"
                                    control={control}
                                    disabled
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <NumericFormat
                                            {...fieldProps}
                                            name="cost_grand_total"
                                            placeholder="Jumlah Total"
                                            id="cost_grand_total"
                                            allowNegative={false}
                                            prefix="Rp"
                                            thousandsGroupStyle="rupiah"
                                            thousandSeparator=","
                                            className={
                                                errors?.cost_grand_total
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control py-2'
                                            }
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                clearErrors(
                                                    `cost_tax_percentage`
                                                )
                                                clearErrors(`cost_grand_total`)
                                            }}
                                        />
                                    )}
                                />
                                {errors?.cost_grand_total && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {errors?.cost_grand_total?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:grid-cols-4 grid-cols-1 grid gap-5">
                    <div>
                        <label htmlFor="cost_date" className=" form-label">
                            Tanggal Pembayaran
                        </label>
                        <Controller
                            name="cost_date"
                            disabled
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.cost_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Pembayaran"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.cost_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.cost_date?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="cost_status" className="form-label ">
                            Status
                        </label>
                        <Select
                            className="react-select"
                            name="cost_status"
                            disabled
                            register={register}
                            options={statusOptions}
                            styles={styles}
                            id="cost_status"
                            error={errors.cost_status}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="cost_payment_type"
                            className="form-label "
                        >
                            Jenis Pembayaran
                        </label>
                        <Select
                            className="react-select"
                            name="cost_payment_type"
                            register={register}
                            disabled
                            options={paymentTypeOptions}
                            styles={styles}
                            id="cost_payment_type"
                            error={errors.cost_payment_type}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="cost_file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${costData?.file?.replace(
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
                        {errors?.file && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.file?.message}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Textarea
                        label="Deskripsi"
                        type="text"
                        disabled
                        name="cost_description"
                        register={register}
                        placeholder="Deskripsi"
                        error={errors.cost_description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewCostModal(false)
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

export default DetailCostForm
