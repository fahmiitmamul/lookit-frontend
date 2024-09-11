import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const DetailMutationPositionForm = ({ showViewMutationPositionModal }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [employeeValue, setEmployeeValue] = useState([])
    const dispatch = useDispatch()
    const token = getCookie('token')
    const mutationId = useSelector(
        (state) => state.mutation.mutation.mutation_id
    )

    const queryClient = useQueryClient()

    const patchMutation = useMutation({
        mutationFn: async (values) => {
            const form = new FormData()
            form.append('employee_id', values.employee_id)
            form.append('status_id', values.status_id)
            form.append('position_id', values.position_id)
            form.append('last_position_id', employeeValue?.position_id)
            form.append('last_area_id', employeeValue?.area_id)
            form.append('date_created', values.date_created)
            form.append('date_applied', values.date_applied)
            form.append('mutation_description', values.mutation_description)
            form.append('file', selectedFile)
            form.append('mutation_type', 2)
            return http(token).patch(
                `/mutation/update-position/${mutationId}`,
                form
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mutation-position'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit mutasi')
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
        employee_id: Yup.string().required('Harap diisi'),
        status_id: Yup.string().required('Harap diisi'),
        position_id: Yup.string().required('Harap diisi'),
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
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/mutation/${mutationId}`)
            const transformedData = {
                ...data.results,
                position_id: parseInt(data.results.last_position_id),
            }
            return transformedData
        },
        resolver: yupResolver(validateMutation),
        mode: 'all',
    })

    const onSubmit = (data) => {
        showViewMutationPositionModal(false)
        patchMutation.mutate(data)
        dispatch(setLoading(false))
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['employee'],
        queryFn: () => fetchEmployee(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const statusOptions = [
        {
            value: 1,
            label: 'Promosi',
        },
        {
            value: 2,
            label: 'Demosi',
        },
    ]

    async function fetchPosition() {
        const { data } = await http(token).get('/position-of-work')
        return data.results
    }

    const { data: positionData } = useQuery({
        queryKey: ['position'],
        queryFn: () => fetchPosition(),
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

    const mutationData = getValues()

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Nama Karyawan
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
                        <label htmlFor="status_id" className="form-label ">
                            Status
                        </label>
                        <Select
                            className="react-select"
                            name="status_id"
                            register={register}
                            disabled
                            options={statusOptions}
                            styles={styles}
                            id="status_id"
                            error={errors.status_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="position_id" className="form-label ">
                            Posisi
                        </label>
                        <Select
                            className="react-select"
                            name="position_id"
                            disabled
                            register={register}
                            options={[
                                ...(positionData?.data?.map((item) => ({
                                    value: item.position_code,
                                    label: item.position_name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="position_id"
                            error={errors.position_id}
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
                            disabled
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
                            disabled
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
                            disabled
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
                            File
                        </label>
                        <Link
                            href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${mutationData?.file?.replace(
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
                    <div></div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewMutationPositionModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailMutationPositionForm
