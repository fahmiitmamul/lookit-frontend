import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textinput from '@/components/ui/Textinput'
import http from '@/app/helpers/http.helper'
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import Select from '@/components/ui/Select'

const DetailDeclinedRequestForm = ({ setShowViewDeclinedRequestModal }) => {
    const requestsId = useSelector(
        (state) => state.requests.requests.requests_id
    )

    const {
        register,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/requests/${requestsId}`)
            return data.results
        },
        mode: 'all',
    })

    const token = getCookie('token')

    const guaranteeData = getValues()

    const [employeeData, setEmployeeData] = useState([])

    async function fetchEmployee() {
        const { data } = await http(token).get(`/employee/active`)
        setEmployeeData(data.results)
        return data.results
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            disabled
                            register={register}
                            options={employeeData?.data?.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            styles={styles}
                            id="employee_id"
                            error={errors.employee_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Nama Pengajuan"
                            type="text"
                            disabled
                            placeholder=" Nama Pengajuan"
                            name="request_name"
                            register={register}
                            error={errors.request_name}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Tanggal Pengajuan"
                            type="text"
                            disabled
                            placeholder="Masukkan Tanggal Pengajuan"
                            name="request_date"
                            register={register}
                            error={errors.request_date}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Keterangan"
                            type="text"
                            disabled
                            placeholder="Keterangan"
                            name="request_information"
                            register={register}
                            error={errors.request_information}
                        />
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <div>
                            <label htmlFor="file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${guaranteeData?.file?.replace(
                                    /\s/g,
                                    '%20'
                                )}`}
                            >
                                <Icon
                                    width={35}
                                    height={35}
                                    icon="heroicons-outline:document"
                                />
                            </Link>
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewDeclinedRequestModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailDeclinedRequestForm
