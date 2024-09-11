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
import { useDispatch } from 'react-redux'
import { getCookie } from 'cookies-next'
import { setLoading } from '@/store/loadingReducer'
import { useEffect } from 'react'

const AddGuaranteeForm = ({ setShowAddGuaranteeModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [guaranteeName, setGuaranteeName] = useState('')
    const [guaranteeNameOptions, setGuaranteeNameOptions] = useState([])
    const [guaranteeType, setGuaranteeType] = useState('')
    const [guaranteeTypeOptions, setGuaranteeTypeOptions] = useState([])
    const token = getCookie('token')

    async function fetchGuarantee() {
        const { data } = await http(token).get('/guarantee')
        setGuaranteeTypeOptions(
            data.results.data.map((item) => ({
                value: item.guarantee_type,
                label: item.guarantee_type,
            }))
        )
        setGuaranteeNameOptions(
            data.results.data.map((item) => ({
                value: item.guarantee_name,
                label: item.guarantee_name,
            }))
        )
        return data.results
    }

    useEffect(() => {
        fetchGuarantee()
    }, [])

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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateGuarantee),
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

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
            toast.success('Berhasil menambah garansi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowAddGuaranteeModal(false)
        postGuarantee.mutate(data)
        dispatch(setLoading(true))
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
                    <div className="flex gap-2">
                        <div className="w-full">
                            <Textinput
                                label="Buat Nama Garansi"
                                type="text"
                                placeholder="Nama Garansi"
                                value={guaranteeName}
                                onChange={handleChangeGuaranteeName}
                            />
                        </div>
                        <div className="flex gap-2 mt-8">
                            <div>
                                <Button
                                    text="Batal"
                                    className="bg-red-500 btn-sm text-white"
                                    onClick={handleDeleteGuarateeName}
                                ></Button>
                            </div>
                            <div>
                                <Button
                                    text="Save"
                                    className="btn-primary btn-sm"
                                    onClick={handleSaveGuaranteeName}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="guarantee_name" className="form-label ">
                            Silahkan Pilih Nama Garansi
                        </label>
                        <Select
                            className="react-select"
                            name="guarantee_name"
                            register={register}
                            options={[
                                ...(guaranteeNameOptions?.map((item) => ({
                                    value: item.value,
                                    label: item.label,
                                })) || []),
                            ]}
                            styles={styles}
                            id="guarantee_name"
                            error={errors.guarantee_name}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div className="flex gap-2">
                        <div className="w-full">
                            <Textinput
                                label="Buat Tipe Garansi"
                                type="text"
                                placeholder="Tipe Garansi"
                                value={guaranteeType}
                                onChange={handleChangeGuaranteeType}
                            />
                        </div>
                        <div className="flex gap-2 mt-8">
                            <div>
                                <Button
                                    text="Batal"
                                    className="bg-red-500 btn-sm text-white"
                                    onClick={handleDeleteGuaranteeType}
                                ></Button>
                            </div>
                            <div>
                                <Button
                                    text="Save"
                                    className="btn-primary btn-sm"
                                    onClick={handleSaveGuaranteeType}
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="guarantee_type" className="form-label ">
                            Silahkan Pilih Tipe Garansi
                        </label>
                        <Select
                            className="react-select"
                            name="guarantee_type"
                            register={register}
                            options={[
                                ...(guaranteeTypeOptions?.map((item) => ({
                                    value: item.value,
                                    label: item.label,
                                })) || []),
                            ]}
                            styles={styles}
                            id="guarantee_type"
                            error={errors.guarantee_type}
                        />
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
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
                    <div></div>
                </div>
                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Garansi"
                            type="text"
                            name="guarantee_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Garansi"
                            error={errors.guarantee_description}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddGuaranteeModal(false)
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

export default AddGuaranteeForm
