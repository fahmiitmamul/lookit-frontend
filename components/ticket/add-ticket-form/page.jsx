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
import ReactSelect from 'react-select'

const AddTicketForm = ({ showAddTicketModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const token = getCookie('token')
    const dispatch = useDispatch()

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
            form.append('employee_id', values.employee_id.value)
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
        employee_id: Yup.object().required('Harap diisi'),
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
        showAddTicketModal(false)
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
                    <div>
                        <Textinput
                            label="Kode Tiket"
                            type="text"
                            placeholder="Masukkan Kode Tiket"
                            name="ticket_code"
                            register={register}
                            error={errors.ticket_code}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Judul Ticket"
                            type="text"
                            placeholder="Masukkan Judul Tiket"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
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
                            label="Deskripsi Tiket"
                            type="text"
                            name="ticket_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Tiket"
                            error={errors.ticket_description}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="ticket_status" className="form-label ">
                            Pilih Status Tiket
                        </label>
                        <Select
                            className="react-select"
                            name="ticket_status"
                            register={register}
                            options={statusOptions}
                            styles={styles}
                            id="ticket_status"
                            error={errors.ticket_status}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="ticket_priority"
                            className="form-label "
                        >
                            Pilih Prioritas Tiket
                        </label>
                        <Select
                            className="react-select"
                            name="ticket_priority"
                            register={register}
                            options={priorityOptions}
                            styles={styles}
                            id="ticket_priority"
                            error={errors.ticket_priority}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddTicketModal(false)
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

export default AddTicketForm
