import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import opencage from 'opencage-api-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'
import { setLoading } from '@/store/loadingReducer'
import Image from 'next/image'

const DetailCompanyForm = ({ showViewCompanyModal }) => {
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [address, setAddress] = useState('')
    const [radius, setRadius] = useState(0)
    const fillBlueOptions = { fillColor: 'blue' }
    const token = getCookie('token')
    const companyId = useSelector((state) => state.company.company.company_id)

    const handleSearch = async () => {
        try {
            const data = await opencage.geocode({
                q: query,
                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
            })
            setResults(data.results)
        } catch (error) {
            console.error('Error searching for address:', error)
        }
    }

    const MyMap = useMemo(
        () =>
            dynamic(() => import('@/components/map/map'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    )

    function PanMap() {
        const map = useMap()
        map.panTo([latitude, longitude])
        return null
    }

    const validateCompany = yup.object({
        logo: yup.string().required('Harap diisi'),
        company_name: yup.string().required('Harap diisi'),
        brand_name: yup.string().required('Harap diisi'),
        business_type: yup.string().required('Harap diisi'),
        email: yup.string().required('Harap diisi'),
        company_phone_number: yup.string().required('Harap diisi'),
        maps: yup.string().required('Harap diisi'),
        full_address: yup.string().required('Harap diisi'),
        radius: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/company/${companyId}`)
            setLatitude(data.results.latitude)
            setLongitude(data.results.longitude)
            setRadius(data.results.radius)
            return data.results
        },
        resolver: yupResolver(validateCompany),
        mode: 'all',
    })

    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postCompany = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            if (selectedPicture) {
                form.append('logo', selectedPicture)
            }

            form.append('company_name', values.company_name)
            form.append('brand_name', values.brand_name)
            form.append('business_type', values.business_type)
            form.append('email', values.email)
            form.append('company_phone_number', values.company_phone_number)
            form.append('latitude', latitude)
            form.append('longitude', longitude)
            form.append('maps', address)
            form.append('radius', radius)
            form.append('full_address', values.full_address)
            return http(token).post('/company', form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah perusahaan')
            showViewCompanyModal(false)
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postCompany.mutate(data)
    }

    const handleFileChange = (e) => {
        setSelectedPicture(e.target.files[0])
    }

    const companyData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="profile-photo" className=" form-label">
                            Logo Perusahaan{' '}
                        </label>
                        {companyData?.logo && (
                            <Image
                                src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${companyData?.logo}`}
                                width={200}
                                height={200}
                                alt=""
                            ></Image>
                        )}
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Perusahaan"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Perusahaan"
                        name="company_name"
                        register={register}
                        error={errors.company_name}
                    />
                    <Textinput
                        label="Brand"
                        type="text"
                        disabled
                        placeholder="Masukkan Brand"
                        name="brand_name"
                        register={register}
                        error={errors.brand_name}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Bidang Bisnis"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Bidang Bisnis"
                        name="business_type"
                        register={register}
                        error={errors.business_type}
                    />
                    <Textinput
                        label="Email"
                        type="text"
                        disabled
                        placeholder="Masukkan Email"
                        name="email"
                        register={register}
                        error={errors.email}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nomor Telepon Perusahaan"
                        type="text"
                        disabled
                        placeholder="Masukkan Nomor Telepon Perusahaan"
                        name="company_phone_number"
                        register={register}
                        error={errors.company_phone_number}
                    />
                </div>

                <div>
                    <Textinput
                        id="input_address"
                        label="Alamat Lengkap Perusahaan"
                        type="text"
                        disabled
                        name="maps"
                        register={register}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                        onKeyUp={handleSearch}
                        placeholder="Alamat Lengkap Perusahaan"
                        error={errors.maps}
                    />
                </div>

                {results.length > 0 && (
                    <div className="h-[150px] overflow-auto">
                        <ul className="bg-gray-200 rounded-md flex flex-col gap-2 p-2">
                            {results.map((result, index) => (
                                <li
                                    onClick={() => {
                                        setLatitude(result.geometry.lat)
                                        setLongitude(result.geometry.lng)
                                        setValue(
                                            'latitude',
                                            result.geometry.lat
                                        )
                                        setValue(
                                            'longitude',
                                            result.geometry.lng
                                        )
                                        setAddress(result.formatted)
                                        setResults(false)
                                        document.getElementById(
                                            'input_address'
                                        ).value = result.formatted
                                    }}
                                    className="cursor-pointer hover:bg-white p-2.5 rounded-md"
                                    key={index}
                                >
                                    {result.formatted}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <MyMap
                        fillBlueOptions={fillBlueOptions}
                        latitude={latitude}
                        longitude={longitude}
                        address={address}
                        radius={radius}
                        PanMap={PanMap}
                    />
                </div>

                <div>
                    <Textarea
                        label="Alamat Lengkap"
                        type="text"
                        disabled
                        name="full_address"
                        register={register}
                        placeholder="Alamat Lengkap"
                        error={errors.full_address}
                    />
                </div>

                <Textinput
                    label="Radius"
                    type="text"
                    disabled
                    placeholder="Masukkan Radius"
                    name="radius"
                    register={register}
                    error={errors.radius}
                    onChange={(e) => {
                        setRadius(e.target.value)
                    }}
                />
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Kembali"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewCompanyModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailCompanyForm
