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
import { Icon } from '@iconify/react'
import Link from 'next/link'

const DetailDocumentForm = ({ showViewDocumentModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const token = getCookie('token')
    const dispatch = useDispatch()
    const documentId = useSelector(
        (state) => state.document.document.document_id
    )

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

    const postDocument = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('document_name', values.document_name)
            form.append('document_type', values.document_type)
            form.append('document_description', values.document_description)
            form.append('file', selectedFile)
            return http(token).patch(`/document/${documentId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['document'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah dokumen')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateDocument = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        document_name: Yup.string().required('Harap diisi'),
        document_type: Yup.string().required('Harap diisi'),
        document_description: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        getValues,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/document/${documentId}`)
            return data.results
        },
        resolver: yupResolver(validateDocument),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showViewDocumentModal(false)
        postDocument.mutate(data)
        dispatch(setLoading(true))
    }

    const documentData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            disabled
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
                            label="Tipe Dokumen"
                            type="text"
                            placeholder="Masukkan Tipe Dokumen"
                            disabled
                            name="document_type"
                            register={register}
                            error={errors.document_type}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Nama Dokumen"
                            type="text"
                            placeholder="Masukkan Nama Dokumen"
                            name="document_name"
                            register={register}
                            disabled
                            error={errors.document_name}
                        />
                    </div>
                    <div>
                        <div>
                            <div>
                                <label
                                    htmlFor="task_file"
                                    className=" form-label"
                                >
                                    File Dokumen
                                </label>
                                <Link
                                    href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${documentData?.file?.replace(
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
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi"
                            type="text"
                            name="document_description"
                            disabled
                            register={register}
                            id="df"
                            placeholder="Masukkan Deskripsi"
                            error={errors.document_description}
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewDocumentModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailDocumentForm
