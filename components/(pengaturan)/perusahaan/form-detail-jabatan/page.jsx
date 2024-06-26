import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const DetailPositionForm = ({ showViewPositionModal }) => {
    const positionId = useSelector(
        (state) => state.company.position.position_id
    )
    const validatePosition = yup.object({
        position_code: yup.string().required('Harap diisi'),
        position_name: yup.string().required('Harap diisi'),
        description: yup.string().required('Harap diisi'),
    })

    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/position-of-work/${positionId}`
            )
            return data.results
        },
        resolver: yupResolver(validatePosition),
        mode: 'all',
    })

    const token = getCookie('token')

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Jabatan"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Jabatan"
                        name="position_code"
                        register={register}
                        error={errors.position_code}
                    />
                    <Textinput
                        label="Nama Jabatan"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Jabatan"
                        name="position_name"
                        register={register}
                        error={errors.position_name}
                    />
                </div>

                <div>
                    <Textarea
                        label="Deskripsi"
                        type="text"
                        disabled
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
                            showViewPositionModal(false)
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

export default DetailPositionForm
