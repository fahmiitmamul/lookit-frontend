import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import Fileinput from '@/components/ui/Fileinput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { setLoading } from '@/store/loadingReducer'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const DetailGuaranteeForm = ({ setShowViewGuaranteeModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [guaranteeName, setGuaranteeName] = useState('')
    const [guaranteeNameOptions, setGuaranteeNameOptions] = useState([])
    const [guaranteeType, setGuaranteeType] = useState('')
    const [guaranteeTypeOptions, setGuaranteeTypeOptions] = useState([])
    const guaranteeId = useSelector(
        (state) => state.guarantee.guarantee.guarantee_id
    )

    const handleChangeGuaranteeName = (e) => {
        setGuaranteeName(e.target.value)
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSaveGuaranteeName = () => {
        if (guaranteeName.trim() !== '') {
            const newOption = { value: guaranteeName, label: guaranteeName }
            setGuaranteeNameOptions([...guaranteeNameOptions, newOption])
            setGuaranteeName('')
        }
    }

    const handleDeleteGuarateeName = (index) => {
        const updatedOptions = [...guaranteeNameOptions]
        updatedOptions.splice(index, 1)
        setGuaranteeNameOptions(updatedOptions)
    }

    const handleChangeGuaranteeType = (e) => {
        setGuaranteeType(e.target.value)
    }

    const handleSaveGuaranteeType = () => {
        if (guaranteeType.trim() !== '') {
            const newOption = { value: guaranteeType, label: guaranteeType }
            setGuaranteeTypeOptions([...guaranteeTypeOptions, newOption])
            setGuaranteeType('')
        }
    }

    const handleDeleteGuaranteeType = (index) => {
        const updatedOptions = [...guaranteeTypeOptions]
        updatedOptions.splice(index, 1)
        setGuaranteeNameOptions(updatedOptions)
    }

    const validateGuarantee = Yup.object({
        guarantee_name: Yup.string().required('Harap diisi'),
        guarantee_type: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
        guarantee_description: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/guarantee/${guaranteeId}`)
            return data.results
        },
        resolver: yupResolver(validateGuarantee),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const token = getCookie('token')

    const postGuarantee = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('guarantee_name', values.guarantee_name)
            form.append('guarantee_type', values.guarantee_type)
            form.append('guarantee_description', values.guarantee_description)
            form.append('file', selectedFile)
            return http(token).post(`/guarantee`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guarantee'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit garansi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowViewGuaranteeModal(false)
        postGuarantee.mutate(data)
        dispatch(setLoading(true))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const guaranteeData = getValues()

    console.log(guaranteeData.guarantee_name)

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Nama Garansi"
                            type="text"
                            disabled
                            placeholder="Masukkan Nama Garansi"
                            name="guarantee_name"
                            register={register}
                            error={errors.guarantee_name}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Tipe Garansi"
                            type="text"
                            disabled
                            placeholder=" Tipe Garansi"
                            name="guarantee_type"
                            register={register}
                            error={errors.guarantee_type}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Garansi"
                            type="text"
                            name="guarantee_description"
                            disabled
                            register={register}
                            id="df"
                            placeholder="Deskripsi Garansi"
                            error={errors.guarantee_description}
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
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${guaranteeData?.file?.replace(
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
                            setShowViewGuaranteeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailGuaranteeForm
