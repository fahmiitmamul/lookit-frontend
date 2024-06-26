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
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const EditDivisionForm = ({ showEditDivisionModal }) => {
    const divisionId = useSelector(
        (state) => state.company.division.division_id
    )
    const validateDivision = yup.object({
        division_code: yup.string().required('Harap diisi'),
        division_name: yup.string().required('Harap diisi'),
        description: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/division/${divisionId}`)
            return data.results
        },
        resolver: yupResolver(validateDivision),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postDivision = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/division/${divisionId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['division'] })
            dispatch(setLoading(false))
            showEditDivisionModal(false)
            toast.success('Berhasil mengedit divisi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showEditDivisionModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postDivision.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Divisi"
                        type="text"
                        placeholder="Masukkan Kode Divisi"
                        name="division_code"
                        register={register}
                        error={errors.division_code}
                    />
                    <Textinput
                        label="Nama Divisi"
                        type="text"
                        placeholder="Masukkan Nama Divisi"
                        name="division_name"
                        register={register}
                        error={errors.division_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi"
                        type="text"
                        name="description"
                        register={register}
                        id="df"
                        placeholder="Deskripsi"
                        error={errors.description}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showEditDivisionModal(false)
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

export default EditDivisionForm
