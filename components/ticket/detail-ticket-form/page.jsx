import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import http from '@/app/helpers/http.helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as Yup from 'yup'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import Flatpickr from 'react-flatpickr'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const DetailTicketForm = ({ showDetailTicketModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const token = getCookie('token')
    const dispatch = useDispatch()
    const ticketId = useSelector((state) => state.ticket.ticket.ticket_id)

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
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/tickets/${ticketId}`)
            return data.results
        },
        resolver: yupResolver(validateTicket),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showDetailTicketModal(false)
        postTicket.mutate(data)
        dispatch(setLoading(true))
    }

    const ticketData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <h5>Tiket :</h5>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Karyawan
                        </label>
                        <Select
                            className="react-select"
                            disabled
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
                        <Textinput
                            label="Kode Tiket"
                            type="text"
                            disabled
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
                            disabled
                            placeholder="Masukkan Judul Tiket"
                            name="ticket_title"
                            register={register}
                            error={errors.ticket_title}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${ticketData?.file?.replace(
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
                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Tiket"
                            type="text"
                            disabled
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
                            disabled
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
                            disabled
                            name="ticket_priority"
                            register={register}
                            options={priorityOptions}
                            styles={styles}
                            id="ticket_priority"
                            error={errors.ticket_priority}
                        />
                    </div>
                </div>
                <h5>Tindakan :</h5>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Tindakan"
                            type="text"
                            disabled
                            placeholder="Masukkan Tindakan"
                            name="action"
                            register={register}
                            error={errors.action}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="action_employee_id"
                            className="form-label "
                        >
                            Karyawan
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="action_employee_id"
                            register={register}
                            options={[
                                ...(employeeData?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="action_employee_id"
                            error={errors.action_employee_id}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <div>
                            <div>
                                <label htmlFor="file" className=" form-label">
                                    File
                                </label>
                                <Link
                                    href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${ticketData?.file_action?.replace(
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
                    <div>
                        <label
                            htmlFor="completion_date"
                            className=" form-label"
                        >
                            Tanggal Penyelesaian
                        </label>
                        <Controller
                            name="completion_date"
                            control={control}
                            disabled
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.completion_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Penyelesaian"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.completion_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.completion_date?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Penyelesaian"
                            type="text"
                            disabled
                            name="action_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Penyelesaian"
                            error={errors.action_description}
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
                            disabled
                            name="ticket_status"
                            register={register}
                            options={statusOptions}
                            styles={styles}
                            id="ticket_status"
                            error={errors.ticket_status}
                        />
                    </div>
                    <div></div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showDetailTicketModal(false)
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

export default DetailTicketForm
