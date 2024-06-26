import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const DetailMasterGajiPotonganForm = ({ showViewMasterGajiPotonganModal }) => {
    const validateMasterSalary = yup.object({
        master_salary_code: yup.string().required('Harap diisi'),
        master_salary_name: yup.string().required('Harap diisi'),
    })

    const masterGajiTambahanId = useSelector(
        (state) => state.finance.finance.selectedPotonganId
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/master-salary-deduction/${masterGajiTambahanId}`
            )
            return data.results
        },
        resolver: yupResolver(validateMasterSalary),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const postMasterSalary = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).post('/master-salary-deduction', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['master-salary-deduction'],
            })
            dispatch(setLoading(false))
            showViewMasterGajiPotonganModal(false)
            toast.success('Berhasil menambah master gaji potongan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            showViewMasterGajiPotonganModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        postMasterSalary.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Master Gaji Potongan"
                        type="text"
                        placeholder="Masukkan Kode Master Gaji Potongan"
                        name="master_salary_code"
                        disabled
                        register={register}
                        error={errors.master_salary_code}
                    />
                    <Textinput
                        label="Nama Master Gaji Potongan"
                        type="text"
                        placeholder="Masukkan Nama Master Gaji Potongan"
                        name="master_salary_name"
                        disabled
                        register={register}
                        error={errors.master_salary_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewMasterGajiPotonganModal(false)
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

export default DetailMasterGajiPotonganForm
