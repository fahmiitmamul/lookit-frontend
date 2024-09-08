import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'

const EditAreaForm = ({ showEditAreaModal }) => {
    const areaId = useSelector((state) => state.company.area.area_id)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/area/${areaId}`)
            return data.results
        },
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const editArea = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/area/${areaId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['area'] })
            dispatch(setLoading(false))
            showEditAreaModal(false)
            toast.success('Berhasil menambah area')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showEditAreaModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        editArea.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Area"
                        type="text"
                        placeholder="Masukkan Kode Area"
                        name="area_code"
                        register={register}
                        error={errors.area_code}
                    />
                    <Textinput
                        label="Nama Area"
                        type="text"
                        placeholder="Masukkan Nama Area"
                        name="area_name"
                        register={register}
                        error={errors.area_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi Area"
                        type="text"
                        name="area_description"
                        register={register}
                        id="df"
                        placeholder="Deskripsi Area"
                        error={errors.area_description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Kembali"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showEditAreaModal(false)
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

export default EditAreaForm
