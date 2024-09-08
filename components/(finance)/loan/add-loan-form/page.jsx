import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import Fileinput from '@/components/ui/Fileinput'
import http from '@/app/helpers/http.helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as Yup from 'yup'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import Flatpickr from 'react-flatpickr'

const AddLoanForm = ({ showAddLoanModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const token = getCookie('token')
    const dispatch = useDispatch()

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchEmployee(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const statusOptions = [
        {
            value: 1,
            label: 'Open',
        },
        {
            value: 2,
            label: 'Close',
        },
        {
            value: 3,
            label: 'Pending',
        },
    ]

    const priorityOptions = [
        {
            value: 2,
            label: 'Sedang',
        },
        {
            value: 1,
            label: 'Rendah',
        },
        {
            value: 3,
            label: 'Tinggi',
        },
    ]

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const queryClient = useQueryClient()

    const postTicket = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('ticket_code', values.ticket_code)
            form.append('ticket_title', values.ticket_title)
            form.append('ticket_description', values.ticket_description)
            form.append('ticket_priority', values.ticket_priority)
            form.append('ticket_status', values.ticket_status)
            form.append('file', selectedFile)
            return http(token).post(`/tickets`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['open-ticket'] })
            queryClient.invalidateQueries({ queryKey: ['pending-ticket'] })
            queryClient.invalidateQueries({ queryKey: ['closed-ticket'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah tiket')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateTicket = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        ticket_code: Yup.string().required('Harap diisi'),
        ticket_title: Yup.string().required('Harap diisi'),
        ticket_description: Yup.string().required('Harap diisi'),
        ticket_priority: Yup.string().required('Harap diisi'),
        ticket_status: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateTicket),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showAddLoanModal(false)
        postTicket.mutate(data)
        dispatch(setLoading(true))
    }

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
                    <div></div>
                </div>

                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Input Jenis Pinjaman"
                            type="text"
                            placeholder="Masukkan Input Jenis Pinjaman"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Cicilan Awal
                            </label>
                            <Controller
                                name="initial_estimate"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        className={
                                            errors?.initial_estimate
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control py-2'
                                        }
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                    />
                                )}
                            />
                            {errors?.initial_estimate && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.initial_estimate?.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                Cicilan Akhir
                            </label>
                            <Controller
                                name="initial_estimate"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Flatpickr
                                        {...fieldProps}
                                        className={
                                            errors?.initial_estimate
                                                ? 'border-danger-500 border date-picker-control py-2'
                                                : 'date-picker-control py-2'
                                        }
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                    />
                                )}
                            />
                            {errors?.initial_estimate && (
                                <div
                                    className={
                                        'mt-2 text-danger-500 block text-sm'
                                    }
                                >
                                    {errors?.initial_estimate?.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Input Nilai Rupiah"
                            type="text"
                            placeholder="Masukkan Input Nilai Rupiah"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
                        />
                    </div>
                    <div>
                        <Textinput
                            label=" Potongan"
                            type="text"
                            placeholder="Masukkan  Potongan"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Jumlah"
                            type="text"
                            placeholder="Masukkan Jumlah"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
                        />
                    </div>
                </div>
                <div>
                    <Textarea
                        label="Keperluan"
                        type="text"
                        name="urgent_full_address"
                        register={register}
                        id="df"
                        placeholder="Keperluan"
                        error={errors.urgent_full_address}
                    />
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddLoanModal(false)
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

export default AddLoanForm
