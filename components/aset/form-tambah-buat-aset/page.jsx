import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import Fileinput from '@/components/ui/Fileinput'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'

const AddAssetsForm = ({ setShowAddAssetsModal }) => {
    const [selectedFile, setSelectedFile] = useState(false)
    const token = getCookie('token')

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const validateMakeAssets = Yup.object({
        picture: Yup.string().required('Harap diisi'),
        asset_name: Yup.string().required('Harap diisi'),
        asset_brand: Yup.string().required('Harap diisi'),
        asset_type: Yup.string().required('Harap diisi'),
        asset_color: Yup.string().required('Harap diisi'),
        asset_code: Yup.string().required('Harap diisi'),
        asset_quantity: Yup.string().required('Harap diisi'),
        asset_condition: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateMakeAssets),
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const postAssets = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('picture', selectedFile)
            form.append('asset_name', values.asset_name)
            form.append('asset_brand', values.asset_brand)
            form.append('asset_type', values.asset_type)
            form.append('asset_color', values.asset_color)
            form.append('asset_code', values.asset_code)
            form.append('asset_quantity', values.asset_quantity)
            form.append('asset_condition', values.asset_condition)
            return http(token).post(`/assets`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['make-assets'] })
            queryClient.invalidateQueries({ queryKey: ['incoming-assets'] })
            queryClient.invalidateQueries({ queryKey: ['outgoing-assets'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah inventaris')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowAddAssetsModal(false)
        postAssets.mutate(data)
        dispatch(setLoading(true))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

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
                        <div>
                            <label htmlFor="picture" className=" form-label">
                                Foto Barang
                            </label>
                            <Controller
                                name="picture"
                                control={control}
                                render={({
                                    field: { onChange, ...fieldProps },
                                }) => (
                                    <Fileinput
                                        {...fieldProps}
                                        name="picture"
                                        className={
                                            errors?.picture && 'border-red-500'
                                        }
                                        selectedFile={selectedFile}
                                        onChange={(e) => {
                                            handleFileChange(e)
                                            onChange(e.target.files[0])
                                        }}
                                        id="picture"
                                    />
                                )}
                            />
                        </div>
                        {errors?.picture && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.picture?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>
                            <label
                                htmlFor="asset_condition"
                                className="form-label "
                            >
                                Silakan Pilih Kondisi
                            </label>
                            <Select
                                className="react-select"
                                name="asset_condition"
                                register={register}
                                styles={styles}
                                options={assetsCondition}
                                id="asset_condition"
                                error={errors.asset_condition}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama inventaris"
                        type="text"
                        placeholder="Masukkan Nama inventaris"
                        name="asset_name"
                        register={register}
                        error={errors.asset_name}
                    />
                    <Textinput
                        label="Merek inventaris"
                        type="text"
                        placeholder="Masukkan Merek inventaris"
                        name="asset_brand"
                        register={register}
                        error={errors.asset_brand}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Jenis inventaris"
                        type="text"
                        placeholder="Masukkan Jenis inventaris"
                        name="asset_type"
                        register={register}
                        error={errors.asset_type}
                    />
                    <Textinput
                        label="Warna inventaris"
                        type="text"
                        placeholder="Masukkan Warna inventaris"
                        name="asset_color"
                        register={register}
                        error={errors.asset_color}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode inventaris"
                        type="text"
                        placeholder="Masukkan Kode inventaris"
                        name="asset_code"
                        register={register}
                        error={errors.asset_code}
                    />
                    <Textinput
                        label="Jumlah inventaris"
                        type="number"
                        placeholder="Masukkan Jumlah inventaris"
                        name="asset_quantity"
                        register={register}
                        error={errors.asset_quantity}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddAssetsModal(false)
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

export default AddAssetsForm
