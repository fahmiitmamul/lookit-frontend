import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const DetailPermissionType = ({ showViewPermissionTypeModal }) => {
    const permissionId = useSelector(
        (state) => state.masterdata.permission_type.permission_type_id
    )
    const validateLeaveType = yup.object({
        permission_code: yup.string().required('Harap diisi'),
        permission_name: yup.string().required('Harap diisi'),
        permission_count: yup.string().required('Harap diisi'),
    })

    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/permission-type/${permissionId}`
            )
            return data.results
        },
        resolver: yupResolver(validateLeaveType),
        mode: 'all',
    })

    const token = getCookie('token')

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Tipe Izin"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Tipe Izin"
                        name="permission_code"
                        register={register}
                        error={errors.permission_code}
                    />
                    <Textinput
                        label="Nama Tipe Izin"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Tipe Izin"
                        name="permission_name"
                        register={register}
                        error={errors.permission_name}
                    />
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Maksimal Tipe Izin"
                        type="text"
                        disabled
                        placeholder="Masukkan Maksimal Tipe Izin"
                        name="permission_count"
                        register={register}
                        error={errors.permission_count}
                    />
                    <div></div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewPermissionTypeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailPermissionType
