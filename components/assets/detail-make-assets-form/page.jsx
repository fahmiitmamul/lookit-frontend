import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import * as Yup from 'yup'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import Image from 'next/image'

const DetailMakeAssetsForm = ({ setShowViewMakeAssetsModal }) => {
    const [selectedFile, setSelectedFile] = useState(false)
    const token = getCookie('token')
    const assetId = useSelector((state) => state.assets.assets.assets_id)

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
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/assets/${assetId}`)
            return data.results
        },
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
            dispatch(setLoading(false))
            toast.success('Berhasil menambah asset')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setShowViewMakeAssetsModal(false)
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

    const assetsData = getValues()

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
                            <div className="flex flex-col">
                                <div>
                                    {assetsData?.picture && (
                                        <Image
                                            src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${assetsData?.picture}`}
                                            width={200}
                                            height={200}
                                            alt=""
                                        ></Image>
                                    )}
                                </div>
                            </div>
                        </div>
                        {errors?.picture && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.picture?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex w-full h-full items-end">
                        <div className="w-full">
                            <label
                                htmlFor="asset_condition"
                                className="form-label "
                            >
                                Kondisi Inventaris
                            </label>
                            <Select
                                className="react-select"
                                name="asset_condition"
                                register={register}
                                styles={styles}
                                disabled
                                options={assetsCondition}
                                id="asset_condition"
                                error={errors.asset_condition}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Inventaris"
                        name="asset_name"
                        register={register}
                        error={errors.asset_name}
                    />
                    <Textinput
                        label="Merek Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Merek Inventaris"
                        name="asset_brand"
                        register={register}
                        error={errors.asset_brand}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Jenis Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Jenis Inventaris"
                        name="asset_type"
                        register={register}
                        error={errors.asset_type}
                    />
                    <Textinput
                        label="Warna Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Warna Inventaris"
                        name="asset_color"
                        register={register}
                        error={errors.asset_color}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Inventaris"
                        name="asset_code"
                        register={register}
                        error={errors.asset_code}
                    />
                    <Textinput
                        label="Jumlah Inventaris"
                        type="text"
                        disabled
                        placeholder="Masukkan Jumlah Inventaris"
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
                            setShowViewMakeAssetsModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailMakeAssetsForm
