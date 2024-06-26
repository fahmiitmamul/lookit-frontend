import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import Fileinput from '@/components/ui/Fileinput'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'

const AddOutgoingAssetsForm = ({ setShowAddOutgoingAssetsModal }) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [searchData, setSearchData] = useState('')
    const [selectedFile, setSelectedFile] = useState(false)
    const token = getCookie('token')

    async function fetchEmployee(
        pageData = page,
        search = searchData,
        limitData = limit
    ) {
        const { data } = await http(token).get(
            '/employee/active?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee', page, searchData, limit],
        queryFn: () => fetchEmployee(page, searchData, limit),
    })

    const queryClient = useQueryClient()

    const postOutgoingAssets = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('file', selectedFile)
            form.append('asset_id', values.asset_id)
            form.append('out_date', values.out_date)
            form.append('asset_condition', values.asset_condition)
            form.append('asset_quantity', values.asset_quantity)
            form.append('asset_description', values.asset_description)
            return http(token).post(`/outgoing-assets`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['make-assets'] })
            queryClient.invalidateQueries({ queryKey: ['incoming-assets'] })
            queryClient.invalidateQueries({ queryKey: ['outgoing-assets'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah invetaris keluar')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowAddOutgoingAssetsModal(false)
        postOutgoingAssets.mutate(data)
        dispatch(setLoading(true))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const validateAssets = Yup.object({
        employee_id: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
        asset_id: Yup.string().required('Harap diisi'),
        out_date: Yup.string().required('Harap diisi'),
        asset_condition: Yup.string().required('Harap diisi'),
        asset_quantity: Yup.string().required('Harap diisi'),
        asset_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateAssets),
        mode: 'all',
    })

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    async function fetchAssets() {
        const { data } = await http(token).get(`/assets`)
        return data.results
    }

    const { data: assetsData } = useQuery({
        queryKey: ['make-assets'],
        queryFn: () => fetchAssets(),
    })

    const assetsCondition = [
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
                            options={employeeData?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
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

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="asset_id" className="form-label ">
                            Silakan Pilih Invetaris
                        </label>
                        <Select
                            className="react-select"
                            name="asset_id"
                            register={register}
                            options={assetsData?.data?.map((item) => ({
                                value: item.id,
                                label: item.asset_name,
                            }))}
                            styles={styles}
                            id="asset_id"
                            error={errors.asset_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="out_date" className=" form-label">
                            Tanggal Keluar
                        </label>
                        <Controller
                            name="out_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.out_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Keluar"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.out_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.out_date?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="asset_condition"
                            className="form-label "
                        >
                            Silakan Pilih Kondisi Invetaris
                        </label>
                        <Select
                            className="react-select"
                            name="asset_condition"
                            register={register}
                            options={assetsCondition}
                            styles={styles}
                            id="asset_condition"
                            error={errors.asset_condition}
                        />
                    </div>
                    <Textinput
                        label="Jumlah Invetaris"
                        type="number"
                        placeholder="Masukkan Jumlah Invetaris"
                        name="asset_quantity"
                        register={register}
                        error={errors.asset_quantity}
                    />
                </div>
                <div>
                    <div>
                        <Textarea
                            label="Catatan Invetaris"
                            type="text"
                            name="asset_description"
                            register={register}
                            id="df"
                            placeholder="Catatan Invetaris"
                            error={errors.asset_description}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddOutgoingAssetsModal(false)
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

export default AddOutgoingAssetsForm
