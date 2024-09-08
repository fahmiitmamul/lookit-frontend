import React from 'react'
import Button from '@/components/ui/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import dayjs from 'dayjs'

const EditScheduleForm = ({ setShowEditScheduleModal }) => {
    const token = getCookie('token')
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const scheduleId = useSelector((state) => state.shift.shift.schedule_id)
    const date = useSelector((state) => state.shift.shift.start)

    async function fetchShift() {
        const { data } = await http(token).get('/shift/all')
        return data.results
    }

    const { data: shiftData } = useQuery({
        queryKey: ['shift-all'],
        queryFn: () => fetchShift(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const patchSchedule = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                shift_id: values.shift_id,
                date: dayjs(date).format('YYYY-MM-DD'),
            }).toString()
            return http(token).patch(`/schedule/${scheduleId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengedit shift')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const validateShift = Yup.object({
        shift_id: Yup.string().required('Harap diisi'),
    })

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateShift),
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        patchSchedule.mutate(data)
        setShowEditScheduleModal(false)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="religion" className="form-label ">
                            Silakan Pilih Shift
                        </label>
                        <div>
                            <Select
                                className="react-select"
                                name="shift_id"
                                register={register}
                                options={shiftData?.data?.map((item) => ({
                                    value: item.id,
                                    label: item.shift_name,
                                }))}
                                styles={styles}
                                id="shift_id"
                                error={errors.shift_id}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowEditScheduleModal(false)
                        }}
                    />
                    <Button
                        text="Proses"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default EditScheduleForm
