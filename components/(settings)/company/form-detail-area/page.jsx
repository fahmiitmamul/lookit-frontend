import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'

const DetailAreaForm = ({ showViewAreaModal }) => {
    const areaId = useSelector((state) => state.company.area.area_id)

    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/area/${areaId}`)
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
                        label="Kode Area"
                        type="text"
                        disabled
                        placeholder="Masukkan Kode Area"
                        name="area_code"
                        register={register}
                        error={errors.area_code}
                    />
                    <Textinput
                        label="Nama Area"
                        type="text"
                        disabled
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
                        disabled
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
                            showViewAreaModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailAreaForm
