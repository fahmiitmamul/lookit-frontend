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

const EditInsuranceTypeForm = ({ setShowEditInsuranceTypeModal }) => {
    const validateInsurance = yup.object({
        insurance_code: yup.string().required('Harap diisi'),
        insurance_name: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/insurance/${insuranceId}`)
            return data.results
        },
        resolver: yupResolver(validateInsurance),
        mode: 'all',
    })

    const token = getCookie('token')
    const dispatch = useDispatch()

    const insuranceId = useSelector(
        (state) => state.masterdata.insurance_type.insurance_type_id
    )

    const queryClient = useQueryClient()

    const patchInsurance = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams(values).toString()
            return http(token).patch(`/insurance/${insuranceId}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['insurance'] })
            dispatch(setLoading(false))
            setShowEditInsuranceTypeModal(false)
            toast.success('Berhasil mengedit asuransi')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
            setShowEditInsuranceTypeModal(false)
        },
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        patchInsurance.mutate(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Tipe Asuransi"
                        type="text"
                        placeholder="Masukkan Kode Tipe Asuransi"
                        name="insurance_code"
                        register={register}
                        error={errors.insurance_code}
                    />
                    <Textinput
                        label="Nama Asuransi"
                        type="text"
                        placeholder="Masukkan Nama Asuransi"
                        name="insurance_name"
                        register={register}
                        error={errors.insurance_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowEditInsuranceTypeModal(false)
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

export default EditInsuranceTypeForm
