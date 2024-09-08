import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'

const DetailLevelForm = ({ showViewLevelModal }) => {
    const levelId = useSelector((state) => state.company.level.level_id)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/level/${levelId}`)
            return data.results
        },
        mode: 'all',
    })

    const token = getCookie('token')

    const onSubmit = (data) => {}

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Kode Level"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Level"
                        name="level_code"
                        register={register}
                        error={errors.level_code}
                    />
                    <Textinput
                        label="Nama Level"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Level"
                        name="level_name"
                        register={register}
                        error={errors.level_name}
                    />
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Kembali"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            showViewLevelModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailLevelForm
