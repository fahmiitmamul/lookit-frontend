import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Fileinput from '@/components/ui/Fileinput'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ReactSelect from 'react-select'

const AddMutationLocationForm = ({ showAddMutationLocationModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [employeeValue, setEmployeeValue] = useState([])
    const dispatch = useDispatch()
    const token = getCookie('token')

    const queryClient = useQueryClient()

    const postMutation = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id.value)
            form.append('area_id', values.area_id)
            form.append('status_id', values.status_id)
            form.append('last_position_id', employeeValue?.position_id)
            form.append('last_area_id', employeeValue?.area_id)
            form.append('date_created', values.date_created)
            form.append('date_applied', values.date_applied)
            form.append('mutation_description', values.mutation_description)
            form.append('file', selectedFile)
            form.append('mutation_type', 1)
            return http(token).post(`/mutation/create-location`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mutation-location'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah mutasi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const validateMutation = Yup.object({
        employee_id: Yup.object().required('Harap diisi'),
        status_id: Yup.string().required('Harap diisi'),
        area_id: Yup.string().required('Harap diisi'),
        date_created: Yup.string().required('Harap diisi'),
        date_applied: Yup.string().required('Harap diisi'),
        mutation_description: Yup.string().required('Harap diisi'),
        file: Yup.string().required('Harap diisi'),
    })

    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateMutation),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showAddMutationLocationModal(false)
        postMutation.mutate(data)
        dispatch(setLoading(false))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const statusOptions = [
        {
            value: 3,
            label: 'Temporer',
        },
        {
            value: 4,
            label: 'Permanent',
        },
    ]

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

    async function fetchArea() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: areaData } = useQuery({
        queryKey: ['area'],
        queryFn: () => fetchArea(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const selectedEmployee = watch('employee_id')

    async function fetchEmployeeById(id) {
        const { data } = await http(token).get(`/employee/${id}`)
        setEmployeeValue(data.results)
    }

    useEffect(() => {
        if (selectedEmployee) {
            fetchEmployeeById(parseInt(selectedEmployee))
        }
    }, [selectedEmployee])

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label className="form-label">
                            Silahkan Pilih Nama Karyawan
                        </label>
                        <Controller
                            name="employee_id"
                            control={control}
                            render={({
                                field: { onChange },
                                ...fieldProps
                            }) => (
                                <ReactSelect
                                    {...fieldProps}
                                    styles={styles}
                                    placeholder=""
                                    options={employeeData?.data?.map(
                                        (item) => ({
                                            value: item.id,
                                            label: item.name,
                                        })
                                    )}
                                    className={
                                        errors?.employee_id
                                            ? 'border-danger-500 border rounded-md'
                                            : 'react-select'
                                    }
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions)
                                    }}
                                />
                            )}
                        />
                        {errors?.employee_id && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.employee_id?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="status_id" className="form-label ">
                            Silakan Pilih Status
                        </label>
                        <Select
                            className="react-select"
                            name="status_id"
                            register={register}
                            options={statusOptions}
                            styles={styles}
                            id="status_id"
                            error={errors.status_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="area_id" className="form-label ">
                            Silakan Pilih Area Baru
                        </label>
                        <Select
                            className="react-select"
                            name="area_id"
                            register={register}
                            options={[
                                ...(areaData?.data?.map((item) => ({
                                    value: item.area_code,
                                    label: item.area_name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="area_id"
                            error={errors.area_id}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="date_created" className=" form-label">
                            Tanggal Dibuat
                        </label>
                        <Controller
                            name="date_created"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.date_created
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
                        {errors?.date_created && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.date_created?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="date_applied" className=" form-label">
                            Tanggal Berlaku
                        </label>
                        <Controller
                            name="date_applied"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.date_applied
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    placeholder="Tanggal Berlaku"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                />
                            )}
                        />
                        {errors?.date_applied && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.date_applied?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Mutasi"
                            type="text"
                            name="mutation_description"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Mutasi"
                            error={errors.mutation_description}
                        />
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
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
                                    className={errors?.file && 'border-red-500'}
                                    selectedFile={selectedFile}
                                    onChange={(e) => {
                                        handleFileChange(e)
                                        onChange(e.target.files[0])
                                    }}
                                    id="file"
                                />
                            )}
                        />
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
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showAddMutationLocationModal(false)
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

export default AddMutationLocationForm
