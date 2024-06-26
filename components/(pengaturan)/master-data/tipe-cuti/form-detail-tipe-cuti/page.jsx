import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'

const DetailLeaveTypeForm = ({ showViewLeaveTypeModal }) => {
    const leaveTypeId = useSelector(
        (state) => state.masterdata.leave_type.leave_type_id
    )

    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/leave-type-master/${leaveTypeId}`
            )
            return data.results
        },
        mode: 'all',
    })

    const token = getCookie('token')

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Tipe Cuti"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Tipe Cuti"
                        name="leave_type_code"
                        register={register}
                        error={errors.leave_type_code}
                    />
                    <Textinput
                        label="Nama Tipe Cuti"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Tipe Cuti"
                        name="leave_type_name"
                        register={register}
                        error={errors.leave_type_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Kembali"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewLeaveTypeModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailLeaveTypeForm
