import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Select from '@/components/ui/Select'
import { NumericFormat } from 'react-number-format'
import Textarea from '@/components/ui/Textarea'

const AddOvertimeTypeForm = ({ setShowAddOvertimeTypeModal }) => {
    const validateOvertimeType = yup.object({
        name: yup.string().required('Harap diisi'),
        duration: yup.string().required('Harap diisi'),
        nominal: yup.string().required('Harap diisi'),
        overtime_type_count: yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateOvertimeType),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postOvertimeType = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/overtime-type', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime-type'] })
            dispatch(setLoading(false))
            setShowAddOvertimeTypeModal(false)
            toast.success('Berhasil menambah lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowAddOvertimeTypeModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postOvertimeType.mutate(data)
    }

    const overtimeTypeCountOptions = [
        { label: 'Menit', value: 'Menit' },
        { label: 'Jam', value: 'Jam' },
        { label: 'Hari', value: 'Hari' },
    ]

    const styles = {
        control: (styles) => ({ ...styles, width: '100%' }),
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama  Lembur"
                        type="text"
                        placeholder="Masukkan Nama  Lembur"
                        name="name"
                        register={register}
                        error={errors.name}
                    />
                    <div>
                        <label
                            className="form-label"
                            htmlFor="overtime_type_count"
                        >
                            Perhitungan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="overtime_type_count"
                            styles={styles}
                            id="overtime_type_count"
                            error={errors.overtime_type_count}
                            options={overtimeTypeCountOptions}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <Textinput
                        label="Durasi  Lembur"
                        type="number"
                        placeholder="Masukkan Durasi  Lembur"
                        name="duration"
                        register={register}
                        error={errors.duration}
                    />
                    <div>
                        <label htmlFor="nominal" className="form-label ">
                            Nilai Rupiah
                        </label>
                        <Controller
                            name="nominal"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <NumericFormat
                                    {...fieldProps}
                                    name="nominal"
                                    placeholder=" Nilai Rupiah"
                                    id="nominal"
                                    allowNegative={false}
                                    prefix="Rp"
                                    thousandsGroupStyle="rupiah"
                                    thousandSeparator=","
                                    className={
                                        errors?.nominal
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(e) => {
                                        onChange(e.target.value)
                                    }}
                                />
                            )}
                        />
                        {errors?.nominal && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.nominal?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddOvertimeTypeModal(false)
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

export default AddOvertimeTypeForm
