import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import { useQueryClient } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { DocusealBuilder } from '@docuseal/react'
import axios from 'axios'
import dayjs from 'dayjs'
import { setFileURL } from '../store'

const StatusUnfinishedContractForm = ({
    showStatusUnfinishedContractModal,
}) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const [jwt, setJwt] = useState('')
    const [isUpload, setIsUpload] = useState(false)
    const [isSigned, setIsSigned] = useState(false)
    const [documentData, setDocumentData] = useState([])
    const [templateData, setTemplateData] = useState([])

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

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

    const patchContract = useMutation({
        mutationFn: async (values) => {
            const { data } = await http(token).get(
                `/employee/${values.employee_id}`
            )

            const docusealDocument = {
                ...documentData,
                email: data.results.email,
            }

            const docuseal_data = await axios.post(
                `api/docuseal`,
                docusealDocument
            )

            const emailData = {
                from: 'testing@runlapan.com',
                to: docuseal_data?.data?.[0]?.email,
                subject: 'Tanda Tangan Kontrak',
                text: `https://docuseal.co/s/${docuseal_data?.data?.[0]?.slug}`,
            }

            if (dayjs(values.end_date).format('DD') > dayjs().format('DD')) {
                const form = new URLSearchParams({
                    ...values,
                    status: 'Proses',
                    submission_id: docuseal_data?.data?.[0]?.submission_id,
                    template_id: documentData?.id,
                    file: templateData?.documents?.[0]?.preview_images?.[0]
                        ?.url,
                }).toString()
                const emailForm = new URLSearchParams(emailData).toString()

                await http(token).post(`/sendmail`, emailForm)
                return http(token).patch(`/contract/${id}`, form)
            } else {
                const form = new URLSearchParams({
                    ...values,
                    status: 'Tidak Selesai',
                    submission_id: docuseal_data?.data?.[0]?.submission_id,
                    template_id: documentData?.id,
                    file: templateData?.documents?.[0]?.preview_images?.[0]
                        ?.url,
                }).toString()
                const emailForm = new URLSearchParams(emailData).toString()

                await http(token).post(`/sendmail`, emailForm)
                return http(token).patch(`/contract/${id}`, form)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['processed-contract'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah kontrak karyawan')
            showStatusUnfinishedContractModal(
                !showStatusUnfinishedContractModal
            )
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showStatusUnfinishedContractModal(
                !showStatusUnfinishedContractModal
            )
        },
    })

    const id = useSelector((state) => state.contract.contract.contract_id)

    const validateContract = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        contract_name: Yup.string().required('Harap diisi'),
        start_date: Yup.string().required('Harap diisi'),
        end_date: Yup.string().required('Harap diisi'),
        contract_description: Yup.string().required('Harap diisi'),
    })

    useEffect(() => {
        async function getDocusealToken() {
            const { data } = await http().get('/docuseal-token')
            setJwt(data.results)
            return data.results
        }

        getDocusealToken()
    }, [])

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/contract/${id}`)
            dispatch(setFileURL(data.results.file))
            return data.results
        },
        resolver: yupResolver(validateContract),
        mode: 'all',
    })

    const onSubmit = (data) => {
        if (!isUpload) {
            alert('Silahkan Upload Dokumen Terlebih Dahulu')
            throw Error('Document is not signed')
        }
        if (documentData.fields.length === 0) {
            alert('Silahkan Tanda Tangan Terlebih Dahulu')
            throw Error('Document is not uploaded')
        }
        if (isSigned && isUpload) {
            patchContract.mutate(data)
        }
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
                    <div>
                        <div>
                            <Textinput
                                label="Nama Kontrak"
                                type="text"
                                placeholder="Masukkan Nama Kontrak"
                                name="contract_name"
                                register={register}
                                error={errors.contract_name}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="start_date" className=" form-label">
                            Tanggal Dibuat
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
                                    placeholder="Tanggal Dibuat"
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
                    <div>
                        <label htmlFor="end_date" className=" form-label">
                            Tanggal Akhir
                        </label>
                        <Controller
                            name="end_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.end_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Akhir"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.end_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.end_date?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi "
                            type="text"
                            name="contract_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi "
                            error={errors.contract_description}
                        />
                    </div>
                </div>

                <div className="relative">
                    <DocusealBuilder
                        autosave
                        withSendButton={false}
                        token={jwt}
                        onUpload={(data) => {
                            setIsUpload(true)
                            setTemplateData(data)
                        }}
                        fields={[{ name: 'Tanda Tangan', type: 'signature' }]}
                        onSave={(data) => {
                            setIsSigned(true)
                            setDocumentData(data)
                        }}
                        onlyDefinedFields
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showStatusUnfinishedContractModal(false)
                        }}
                    />
                    <Button
                        text="Kirim"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default StatusUnfinishedContractForm
