import React, { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'
import ReactSelect from 'react-select'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const DetailOvertimeDataForm = ({ setShowViewOvertimeDataModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const fillBlueOptions = { fillColor: 'blue' }
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [address, setAddress] = useState('')
    const [radius, setRadius] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([])

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

    const approveOvertime = useMutation({
        mutationFn: async (values) => {
            const data = new FormData()
            data.append('employee', selectedEmployee)
            data.append('status', 'Setuju')
            data.append('start_date', values.start_date)
            data.append('end_date', values.end_date)
            data.append('overtime_type_id', values.overtime_type_id)
            data.append('description', values.description)
            data.append('status_id', 2)
            data.append('latitude', latitude)
            data.append('longitude', longitude)
            data.append('file', values.file)
            return http(token).patch(`/overtime/${overtimeId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit data lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateOvertime = Yup.object({
        start_date: Yup.string().required('Harap diisi'),
        end_date: Yup.string().required('Harap diisi'),
        overtime_type_id: Yup.string().required('Harap diisi'),
        description: Yup.string().required('Harap diisi'),
    })

    const styles = {
        control: (base, state) => ({
            ...base,
            border: state.isFocused ? '1px solid #000' : '1px solid #000',
        }),
    }

    const handleSelectChange = (event) => {
        const selectedValue = event
        const selectedEmp = employeeData?.data?.find(
            (emp) => emp.name === selectedValue
        )

        if (
            selectedEmp &&
            !selectedEmployees.some((emp) => emp.name === selectedEmp.name)
        ) {
            setSelectedEmployees([...selectedEmployees, selectedEmp])
            setSelectedEmployee([...selectedEmployee, selectedEmp.id])
        }
    }

    async function fetchOvertimeType() {
        const { data } = await http(token).get('/overtime-type')
        return data.results
    }

    const { data: overtimeType } = useQuery({
        queryKey: ['overtime-type'],
        queryFn: () => fetchOvertimeType(),
    })

    const overtimeId = useSelector(
        (state) => state.overtime.overtime.overtime_id
    )

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/overtime/${overtimeId}`)
            const employeeData = await http(token).get(
                `/employee/nik/${data.results.employee_nik}`
            )
            setValue('branch_id', employeeData?.data?.results?.branch_id)
            setValue('position_id', employeeData?.data?.results?.position_id)
            setLatitude(data.results.latitude)
            setLongitude(data.results.longitude)
            setSelectedEmployee(employeeData?.data?.results?.id)
            setSelectedEmployees([{ name: employeeData?.data?.results?.name }])
            setEmployeeData([
                {
                    value: employeeData?.data?.results?.name,
                    label: employeeData?.data?.results?.name,
                },
            ])
            return data.results
        },
        resolver: yupResolver(validateOvertime),
        mode: 'all',
    })

    const onSubmit = (data) => {
        setShowViewOvertimeDataModal(false)
        dispatch(setLoading(true))
        approveOvertime.mutate(data)
    }

    const overtimeData = getValues()

    const declineOvertime = useMutation({
        mutationFn: async (values) => {
            const data = new FormData()
            data.append('employee', selectedEmployee)
            data.append('status', 'Tolak')
            data.append('start_date', overtimeData.start_date)
            data.append('end_date', overtimeData.end_date)
            data.append('overtime_type_id', overtimeData.overtime_type_id)
            data.append('description', overtimeData.description)
            data.append('status_id', 2)
            data.append('latitude', latitude)
            data.append('longitude', longitude)
            data.append('file', overtimeData.file)
            return http(token).patch(`/overtime/${overtimeId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit data lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    async function fetchPosition() {
        try {
            const { data } = await http(token).get('/position-of-work')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: positionData } = useQuery({
        queryKey: ['position-of-work'],
        queryFn: () => fetchPosition(),
    })

    async function fetchBranch() {
        try {
            const { data } = await http(token).get('/branch')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: branchData } = useQuery({
        queryKey: ['branch'],
        queryFn: () => fetchBranch(),
    })

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label className="form-label">Nama Karyawan</label>
                        <ReactSelect
                            styles={styles}
                            placeholder=""
                            isDisabled
                            options={employeeData}
                            value={employeeData}
                            className={'react-select'}
                            onChange={(selectedOptions) => {
                                handleSelectChange(selectedOptions.value)
                            }}
                        />
                    </div>
                    <div>
                        <label
                            className="form-label"
                            htmlFor="overtime_type_id"
                        >
                            Tipe Lembur
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            disabled
                            name="overtime_type_id"
                            options={overtimeType?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="overtime_type_id"
                            error={errors.overtime_type_id}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div>
                        <label className="form-label" htmlFor="position_id">
                            Jabatan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            disabled
                            name="position_id"
                            options={positionData?.data?.map((item) => ({
                                value: item.position_code,
                                label: item.position_name,
                            }))}
                            styles={styles}
                            id="position_id"
                            error={errors.position_id}
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="branch_id">
                            Cabang
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            disabled
                            name="branch_id"
                            options={branchData?.data?.map((item) => ({
                                value: item.branch_code,
                                label: item.branch_name,
                            }))}
                            styles={styles}
                            id="branch_id"
                            error={errors.branch_id}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="start_date" className=" form-label">
                            Mulai Lembur
                        </label>
                        <Controller
                            name="start_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    id="timepicker"
                                    disabled
                                    name="start_date"
                                    className={
                                        errors?.start_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) => {
                                        onChange(dateStr)
                                    }}
                                    options={{
                                        enableTime: true,
                                        dateFormat: 'Y-m-d H:i',
                                        time_24hr: true,
                                    }}
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
                    <div className="flex flex-col">
                        <label htmlFor="end_date" className=" form-label">
                            Selesai Lembur
                        </label>
                        <Controller
                            name="end_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    id="timepicker"
                                    disabled
                                    name="end_date"
                                    className={
                                        errors?.end_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) => {
                                        onChange(dateStr)
                                    }}
                                    options={{
                                        enableTime: true,
                                        dateFormat: 'Y-m-d H:i',
                                        time_24hr: true,
                                    }}
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

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div>
                        <label className="form-label">Foto Mulai</label>
                        <div>
                            <Image
                                src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/${overtimeData?.file?.replace(
                                    /\s/g,
                                    '%20'
                                )}`}
                                width={200}
                                height={200}
                                alt=""
                            ></Image>
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Foto Selesai</label>
                        <div>
                            <Image
                                src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/${overtimeData?.file?.replace(
                                    /\s/g,
                                    '%20'
                                )}`}
                                width={200}
                                height={200}
                                alt=""
                            ></Image>
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                    <div>
                        <label className="form-label">Lokasi Mulai</label>
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
                        <label className="form-label">Lokasi Selesai</label>
                        <MyMap
                            fillBlueOptions={fillBlueOptions}
                            latitude={latitude}
                            longitude={longitude}
                            address={address}
                            radius={radius}
                            PanMap={PanMap}
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewOvertimeDataModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailOvertimeDataForm
