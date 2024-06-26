'use client'
import ActivityRecordTable from '@/components/(karyawan)/rekam-karyawan/aktivitas-karyawan/page'
import AssetRecordTable from '@/components/(karyawan)/rekam-karyawan/aset-karyawan/page'
import SalaryRecordsTable from '@/components/(karyawan)/rekam-karyawan/gaji-karyawan/page'
import GuaranteeRecordTable from '@/components/(karyawan)/rekam-karyawan/garansi-karyawan/page'
import ScheduleRecordTable from '@/components/(karyawan)/rekam-karyawan/jadwal-karyawan/page'
import PresenceRecordsTable from '@/components/(karyawan)/rekam-karyawan/kehadiran-karyawan/page'
import ContractRecordsTable from '@/components/(karyawan)/rekam-karyawan/kontrak-karyawan/page'
import MutationRecordTable from '@/components/(karyawan)/rekam-karyawan/mutasi-karyawan/page'
import RecordRequestsTable from '@/components/(karyawan)/rekam-karyawan/pengajuan-karyawan/page'
import MessageRecords from '@/components/(karyawan)/rekam-karyawan/pesan-karyawan/page'
import EmployeeProfile from '@/components/(karyawan)/rekam-karyawan/profil-karyawan/page'
import TicketRecordsTable from '@/components/(karyawan)/rekam-karyawan/tiket-karyawan/page'
import TaskRecordsTable from '@/components/(karyawan)/rekam-karyawan/tugas-karyawan/page'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import EditScheduleForm from '@/components/jadwal/form-edit-jadwal/page'
import Modal from '@/components/ui/Modal'

const ProfileEmployeeRecords = () => {
    const [showEditScheduleModal, setShowEditScheduleModal] = useState(false)
    const employee_id = useSelector(
        (state) => state.employee.employee.employee_id
    )
    const [employeeData, setEmployeeData] = useState([])
    const token = getCookie('token')

    const buttons = [
        {
            title: 'Profil',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Jadwal',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Kehadiran',
            icon: 'heroicons-outline:chat-alt-2',
        },
        {
            title: 'Pengajuan',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Tugas',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Aktivitas',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Mutasi',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Aset',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Kontrak',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Garansi',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Pesan',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Tiket',
            icon: 'heroicons-outline:cog',
        },
        {
            title: 'Gaji',
            icon: 'heroicons-outline:cog',
        },
    ]

    async function fetchEmployee() {
        try {
            const { data } = await http(token).get(`/employee/${employee_id}`)
            setEmployeeData([data.results])
            return data
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    async function fetchSchedule() {
        try {
            const { data } = await http(token).get('/schedule?limit=999999')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: scheduleData } = useQuery({
        queryKey: ['schedule'],
        queryFn: () => fetchSchedule(),
    })

    return (
        <div>
            <Card noborder>
                <Tab.Group>
                    <Tab.List className="space-x-0 rtl:space-x-reverse">
                        {buttons.map((item, i) => (
                            <Tab as={Fragment} key={i}>
                                {({ selected }) => (
                                    <button
                                        className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-5 rounded-md py-2 transition duration-150
              
                                                ${
                                                    selected
                                                        ? 'text-white bg-primary-500 '
                                                        : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                }`}
                                    >
                                        {item.title}
                                    </button>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <EmployeeProfile />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <ScheduleRecordTable
                                    setShowEditScheduleModal={
                                        setShowEditScheduleModal
                                    }
                                    employeeData={employeeData}
                                    scheduleData={scheduleData}
                                />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <PresenceRecordsTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <RecordRequestsTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <TaskRecordsTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <ActivityRecordTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <MutationRecordTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <AssetRecordTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <ContractRecordsTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <GuaranteeRecordTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <MessageRecords />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <TicketRecordsTable />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                <SalaryRecordsTable />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </Card>
            <Modal
                title="Edit Jadwal"
                label="Edit Jadwal"
                className="max-w-2xl"
                labelClass="btn-outline-dark"
                activeModal={showEditScheduleModal}
                onClose={() => {
                    setShowEditScheduleModal(!showEditScheduleModal)
                }}
            >
                <EditScheduleForm
                    setShowEditScheduleModal={setShowEditScheduleModal}
                />
            </Modal>
        </div>
    )
}

export default ProfileEmployeeRecords
