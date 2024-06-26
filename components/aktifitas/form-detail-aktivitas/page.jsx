import React from 'react'
import { useForm } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useQuery } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import Textinput from '@/components/ui/Textinput'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Textarea from '@/components/ui/Textarea'

const DetailActivityForm = ({ setShowViewActivityModal }) => {
    const token = getCookie('token')
    const activityId = useSelector(
        (state) => state.activity.activity.activity_id
    )

    async function fetchEmployee() {
        const { data } = await http(token).get('/employee/active')
        return data.results
    }

    const { data: employeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchEmployee(),
    })

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const { getValues, register } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/activity/${activityId}`)
            return data.results
        },
        mode: 'all',
    })

    const activityData = getValues()

    return (
        <div>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="employee_id" className="form-label ">
                            Nama Karyawan
                        </label>
                        <Select
                            className="react-select"
                            name="employee_id"
                            register={register}
                            disabled
                            options={employeeData?.data?.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                            styles={styles}
                            id="employee_id"
                        />
                    </div>
                    <div>
                        <div>
                            <Textinput
                                label="Tanggal Aktivitas"
                                type="text"
                                disabled
                                id="activity_date"
                                placeholder="Tanggal Aktivitas"
                                register={register}
                                name="activity_date"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Nama Aktivitas"
                            type="text"
                            disabled
                            id="activity_name"
                            placeholder="Nama Aktivitas"
                            register={register}
                            name="activity_name"
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="task_file" className=" form-label">
                                File
                            </label>
                            <Link
                                href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${activityData?.file?.replace(
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
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Deskripsi Aktivitas"
                            type="text"
                            disabled
                            name="activity_description"
                            register={register}
                            placeholder="Deskripsi Aktivitas"
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <Textarea
                            label="Komen Aktivitas"
                            type="text"
                            disabled
                            name="comment"
                            register={register}
                            placeholder="Komen Aktivitas"
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewActivityModal(false)
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default DetailActivityForm
