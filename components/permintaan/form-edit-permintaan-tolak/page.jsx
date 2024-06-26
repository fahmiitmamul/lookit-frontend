import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textinput from '@/components/ui/Textinput'
import http from '@/app/helpers/http.helper'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Select from '@/components/ui/Select'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditDeclinedRequestForm = ({ setShowEditDeclinedRequestModal }) => {
    const requestsId = useSelector(
        (state) => state.requests.requests.requests_id
    )
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const editDeclinedRequests = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/requests/${requestsId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rejected-requests'] })
            dispatch(setLoading(false))
            setShowEditDeclinedRequestModal(false)
            toast.success('Berhasil mengedit permintaan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowEditDeclinedRequestModal(false)
        },
    })

    const onSubmit = (values) => {
        setShowEditDeclinedRequestModal(false)
        dispatch(setLoading(true))
        editDeclinedRequests.mutate(values)
    }

    const editDeclinedRequestsSchema = yup.object({
        employee_id: yup.number().required('Harap diisi'),
        request_name: yup.string().required('Harap diisi'),
        status: yup.string().required('Harap diisi'),
        request_date: yup.string().required('Harap diisi'),
        request_information: yup.string().required('Harap diisi'),
    })

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/requests/${requestsId}`)
            return data.results
        },
        resolver: yupResolver(editDeclinedRequestsSchema),
        mode: 'all',
    })

    const token = getCookie('token')

    const requestsData = getValues()

    const [employeeData, setEmployeeData] = useState([])

    async function fetchEmployee() {
        const { data } = await http(token).get(`/employee/active`)
        setEmployeeData(data.results)
        return data.results
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            register={register}
                            options={employeeData?.data?.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Nama Pengajuan"
                            type="text"
                            placeholder=" Nama Pengajuan"
                            name="request_name"
                            register={register}
                            error={errors.request_name}
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="form-label">
                            Status Permintaan
                        </label>
                        <Select
                            className="react-select"
                            name="status"
                            register={register}
                            options={[
                                { label: 'Pending', value: 'Pending' },
                                { label: 'Setuju', value: 'Setuju' },
                                { label: 'Tolak', value: 'Tolak' },
                            ]}
                            styles={styles}
                            id="status"
                            error={errors.status}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Tanggal Pengajuan"
                            type="text"
                            placeholder="Masukkan Tanggal Pengajuan"
                            name="request_date"
                            register={register}
                            error={errors.request_date}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Keterangan"
                            type="text"
                            placeholder="Keterangan"
                            name="request_information"
                            register={register}
                            error={errors.request_information}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${requestsData?.file?.replace(
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
                    <div></div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowEditDeclinedRequestModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        className="btn-primary bg-green-500"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default EditDeclinedRequestForm
