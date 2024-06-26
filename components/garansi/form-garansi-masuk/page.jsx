import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import Fileinput from '@/components/ui/Fileinput'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'

const AddIncomingGuaranteeForm = ({ setShowAddIncomingGuaranteeModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null)

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    async function fetchGuarantee() {
        const { data } = await http(token).get(`/guarantee`)
        return data.results
    }

    const { data: guaranteeData } = useQuery({
        queryKey: ['make-guarantee'],
        queryFn: () => fetchGuarantee(),
    })

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

    const queryClient = useQueryClient()

    const postIncomingGuarantee = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('file', selectedFile)
            form.append('guarantee_id', values.guarantee_id)
            form.append('start_date', values.start_date)
            form.append('recepient_name', values.recepient_name)
            form.append('guarantee_condition', values.guarantee_condition)
            form.append('guarantee_description', values.guarantee_description)
            return http(token).post(`/incoming-guarantee`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incoming-guarantee'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah garansi masuk')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateGuarantee = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
        guarantee_id: Yup.string().required('Harap diisi'),
        start_date: Yup.string().required('Harap diisi'),
        recepient_name: Yup.string().required('Harap diisi'),
        guarantee_condition: Yup.string().required('Harap diisi'),
        guarantee_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateGuarantee),
        mode: 'all',
    })

    const onSubmit = (data) => {
        setShowAddIncomingGuaranteeModal(false)
        postIncomingGuarantee.mutate(data)
        dispatch(setLoading(true))
    }

    const guaranteeOptions = [
        {
            value: 'Baru',
            label: 'Baru',
        },
        {
            value: 'Bekas',
            label: 'Bekas',
        },
    ]

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
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
                        <label htmlFor="guarantee_id" className="form-label ">
                            Silakan Pilih Garansi
                        </label>
                        <Select
                            className="react-select"
                            name="guarantee_id"
                            register={register}
                            options={[
                                ...(guaranteeData?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.guarantee_name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="guarantee_id"
                            error={errors.guarantee_id}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="guarantee_id" className="form-label ">
                            Nama Penerima
                        </label>
                        <Select
                            className="react-select"
                            name="recepient_name"
                            register={register}
                            options={[
                                ...(employeeData?.data?.map((item) => ({
                                    value: item.name,
                                    label: item.name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="recepient_name"
                            error={errors.recepient_name}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="guarantee_condition"
                            className="form-label "
                        >
                            Pilih Kondisi Garansi
                        </label>
                        <Select
                            className="react-select"
                            name="guarantee_condition"
                            register={register}
                            options={guaranteeOptions}
                            styles={styles}
                            id="guarantee_condition"
                            error={errors.guarantee_condition}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Input File
                            </label>
                            <Controller
                                name="file"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Fileinput
                                        {...fieldProps}
                                        name="file"
                                        className={
                                            errors?.file && 'border-red-500'
                                        }
                                        selectedFile={selectedFile}
                                        onChange={(e) => {
                                            handleFileChange(e)
                                            onChange(e.target.files[0])
                                        }}
                                        id="file"
                                    />
                                )}
                            />
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
                    <div>
                        <Textarea
                            label="Keterangan"
                            type="text"
                            name="guarantee_description"
                            register={register}
                            id="df"
                            placeholder="Keterangan"
                            error={errors.guarantee_description}
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddIncomingGuaranteeModal(false)
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

export default AddIncomingGuaranteeForm
