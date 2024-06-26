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
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import Flatpickr from 'react-flatpickr'

const EditTicketForm = ({ showEditTicketModal }) => {
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
            form.append('action', values.action)
            form.append('action_employee_id', values.action_employee_id)
            form.append('action_description', values.action_description)
            form.append('ticket_status', values.ticket_status)
            form.append('completion_date', values.completion_date)
            if (selectedFile) {
                form.append('file_action', selectedFile)
            } else {
                form.append('file_action', values.file)
            }
            return http(token).patch(`/tickets/${ticketId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['open-ticket'] })
            queryClient.invalidateQueries({ queryKey: ['pending-ticket'] })
            queryClient.invalidateQueries({ queryKey: ['closed-ticket'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit tiket')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateTicket = Yup.object({
        action: Yup.string().required('Harap diisi'),
        action_employee_id: Yup.string().required('Harap diisi'),
        action_description: Yup.string().required('Harap diisi'),
        completion_date: Yup.string().required('Harap diisi'),
        ticket_status: Yup.string().required('Harap diisi'),
        file_action: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
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
        showEditTicketModal(false)
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
                        <Textinput
                            label="Tindakan"
                            type="text"
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
                            Silakan Pilih Karyawan
                        </label>
                        <Select
                            className="react-select"
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
                            <label
                                htmlFor="file_action"
                                className=" form-label"
                            >
                                Input File
                            </label>
                            <Controller
                                name="file_action"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Fileinput
                                        {...fieldProps}
                                        name="file_action"
                                        className={
                                            errors?.file && 'border-red-500'
                                        }
                                        selectedFile={selectedFile}
                                        onChange={(e) => {
                                            handleFileChange(e)
                                            onChange(e.target.files[0])
                                        }}
                                        id="file_action"
                                    />
                                )}
                            />
                        </div>
                        {errors?.file_action && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.file_action?.message}
                            </div>
                        )}
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
                            showEditTicketModal(false)
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

export default EditTicketForm
