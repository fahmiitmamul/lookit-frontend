import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

const AddRequests = ({ setShowAddModal }) => {
    const [selectedPicture, setSelectedPicture] = useState(null)
    const token = getCookie('token')

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    const religionOptions = [
        {
            value: 'Islam',
            label: 'Islam',
        },
        {
            value: 'Kristen',
            label: 'Kristen',
        },
        {
            value: 'Hindu',
            label: 'Hindu',
        },
    ]

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="religion" className="form-label ">
                            Silakan Pilih Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="religion"
                            register={register}
                            options={religionOptions}
                            styles={styles}
                            id="religion"
                            error={errors.religion}
                        />
                    </div>
                    <div>
                        <label htmlFor="religion" className="form-label ">
                            Silahkan Pilih Saldo Cuti
                        </label>
                        <Select
                            className="react-select"
                            name="religion"
                            register={register}
                            options={religionOptions}
                            styles={styles}
                            id="religion"
                            error={errors.religion}
                        />
                    </div>
                    <div>
                        <label htmlFor="religion" className="form-label ">
                            Saldo Cuti
                        </label>
                        <div className="font-bold text-xl">12 Hari</div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="birth_date" className=" form-label">
                            Estimasi Awal
                        </label>
                        <Flatpickr className={'date-picker-control py-2'} />
                    </div>
                    <div>
                        <label htmlFor="birth_date" className=" form-label">
                            Estimasi Akhir
                        </label>
                        <Flatpickr className={'date-picker-control py-2'} />
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Cuti"
                            type="text"
                            name="urgent_full_address"
                            register={register}
                            id="df"
                            placeholder="Deskripsi Cuti"
                            error={errors.urgent_full_address}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowAddModal(false)
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

export default AddRequests
