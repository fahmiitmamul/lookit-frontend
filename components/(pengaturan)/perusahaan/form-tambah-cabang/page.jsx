import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import * as yup from 'yup'
import Select from '@/components/ui/Select'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'
import opencage from 'opencage-api-client'
import Textarea from '@/components/ui/Textarea'

const AddBranchForm = ({ showAddBranchModal }) => {
    const dispatch = useDispatch()
    const token = getCookie('token')
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [address, setAddress] = useState('')
    const [radius, setRadius] = useState(0)
    const fillBlueOptions = { fillColor: 'blue' }

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

    async function fetchCompanies() {
        const { data } = await http(token).get('/company')
        return data.results
    }

    const { data: companyData } = useQuery({
        queryKey: ['company'],
        queryFn: () => fetchCompanies(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const validateBranch = yup.object({
        branch_code: yup.string().required('Harap diisi'),
        branch_name: yup.string().required('Harap diisi'),
        latitude: yup.string().required('Harap diisi'),
        longitude: yup.string().required('Harap diisi'),
        maps: yup.string().required('Harap diisi'),
        full_address: yup.string().required('Harap diisi'),
        company_id: yup.string().required('Harap diisi'),
        radius: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateBranch),
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const postBranch = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/branch', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branch'] })
            dispatch(setLoading(false))
            showAddBranchModal(false)
            toast.success('Berhasil menambah cabang')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showAddBranchModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postBranch.mutate(data)
    }

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
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="company_id" className="form-label ">
                            Pilih Perusahaan
                        </label>
                        <Select
                            className="react-select"
                            name="company_id"
                            register={register}
                            styles={styles}
                            options={companyData?.data?.map((item) => ({
                                value: parseInt(item.id),
                                label: item.company_name,
                            }))}
                            id="company_id"
                            error={errors.company_id}
                        />
                    </div>
                    <div></div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Cabang"
                        type="text"
                        placeholder="Masukkan Kode Cabang"
                        name="branch_code"
                        register={register}
                        error={errors.branch_code}
                    />
                    <Textinput
                        label="Nama Cabang"
                        type="text"
                        placeholder="Masukkan Nama Cabang"
                        name="branch_name"
                        register={register}
                        error={errors.branch_name}
                    />
                </div>

                <div>
                    <Textinput
                        id="input_address"
                        label="Alamat Lengkap Perusahaan"
                        type="text"
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
                        name="full_address"
                        register={register}
                        placeholder="Alamat Lengkap"
                        error={errors.full_address}
                    />
                </div>

                <Textinput
                    label="Radius"
                    type="text"
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
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddBranchModal(false)
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

export default AddBranchForm
