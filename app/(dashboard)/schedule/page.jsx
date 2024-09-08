'use client'
import AddScheduleForm from '@/components/schedule/form-tambah-jadwal/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import React from 'react'
import { useState, Fragment } from 'react'
import EditScheduleForm from '@/components/schedule/form-edit-jadwal/page'
import DeleteScheduleForm from '@/components/schedule/form-hapus-jadwal/page'
import { useQuery } from '@tanstack/react-query'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import ScheduleTable from '@/components/schedule/tabel-jadwal/page'
import ShiftTable from '@/components/schedule/tabel-shift/page'
import AddShiftForm from '@/components/schedule/form-tambah-shift/page'
import EditShiftForm from '@/components/schedule/form-edit-shift/page'
import DeleteShiftForm from '@/components/schedule/form-hapus-shift/page'
import http from '@/app/helpers/http.helper'
import DetailShiftForm from '@/components/schedule/form-detail-shift/page'
import { getCookie } from 'cookies-next'
import ImportScheduleForm from '@/components/schedule/form-import-jadwal/page'

export default function Jadwal() {
    const [employeePage, setEmployeePage] = useState(1)
    const [employeeLimit, setEmployeeLimit] = useState(5)
    const [employeeSearchData, setEmployeeSearchData] = useState('')
    const [shiftPage, setShiftPage] = useState(1)
    const [shiftLimit, setShiftLimit] = useState(5)
    const [shiftSearchData, setShiftSearchData] = useState('')
    const [showAddScheduleModal, setShowAddScheduleModal] = useState(false)
    const [showEditScheduleModal, setShowEditScheduleModal] = useState(false)
    const [showDeleteScheduleModal, setShowDeleteScheduleModal] =
        useState(false)
    const [showAddShiftModal, setShowAddShiftModal] = useState(false)
    const [showEditShiftModal, setShowEditShiftModal] = useState(false)
    const [showViewShiftModal, setShowViewShiftModal] = useState(false)
    const [showDeleteShiftModal, setShowDeleteShiftModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('Shift')
    const [showImportScheduleModal, setShowImportScheduleModal] =
        useState(false)
    const token = getCookie('token')

    const buttons = [
        {
            title: 'Shift',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Jadwal',
            icon: 'heroicons-outline:home',
        },
    ]

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

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

    async function fetchShift(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/shift?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: shiftData } = useQuery({
        queryKey: ['shift', shiftPage, shiftSearchData, shiftLimit],
        queryFn: () => fetchShift(shiftPage, shiftSearchData, shiftLimit),
    })

    async function fetchEmployee(
        pageData = employeePage,
        search = employeeSearchData,
        limitData = employeeLimit
    ) {
        try {
            const { data } = await http(token).get(
                '/employee/active?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: employeeData } = useQuery({
        queryKey: [
            'active-employee',
            employeePage,
            employeeSearchData,
            employeeLimit,
        ],
        queryFn: () =>
            fetchEmployee(employeePage, employeeSearchData, employeeLimit),
    })

    const handlePageChange = (page) => {
        if (selectedItem === 'Jadwal') {
            setEmployeePage(page)
        } else {
            setShiftPage(page)
        }
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap gap-5 justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>
                            {selectedItem === 'Jadwal'
                                ? 'Data Jadwal'
                                : 'Data Shift'}
                        </h5>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-5 justify-between w-full">
                            <div>
                                <Button
                                    onClick={() => {
                                        if (selectedItem === 'Jadwal') {
                                            setShowAddScheduleModal(
                                                !showAddScheduleModal
                                            )
                                        } else {
                                            setShowAddShiftModal(
                                                !showAddShiftModal
                                            )
                                        }
                                    }}
                                    icon="heroicons-outline:plus"
                                    className="btn-success"
                                    text={
                                        selectedItem === 'Jadwal'
                                            ? 'Buat Jadwal'
                                            : 'Buat Shift'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        search={
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    onChange={(e) => {
                                        if (selectedItem === 'Jadwal') {
                                            setEmployeeSearchData(
                                                e.target.value
                                            )
                                        } else {
                                            setShiftSearchData(e.target.value)
                                        }
                                    }}
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
                            </div>
                        }
                    >
                        <Tab.Group>
                            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                                {buttons.map((item, i) => (
                                    <Tab as={Fragment} key={i}>
                                        {({ selected }) => (
                                            <button
                                                className={`mr-4 text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                                ${
                                                    selected
                                                        ? 'text-white bg-primary-500 '
                                                        : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                } `}
                                                onClick={() =>
                                                    handleButtonClick(item)
                                                }
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
                                        <ShiftTable
                                            setShowViewShiftModal={
                                                setShowViewShiftModal
                                            }
                                            setShowEditShiftModal={
                                                setShowEditShiftModal
                                            }
                                            setShowDeleteShiftModal={
                                                setShowDeleteShiftModal
                                            }
                                            shiftData={shiftData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <ScheduleTable
                                            scheduleData={scheduleData}
                                            employeeData={employeeData}
                                            setShowEditScheduleModal={
                                                setShowEditScheduleModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Jadwal') {
                                    setEmployeeLimit(e.target.value)
                                    fetchEmployee()
                                } else {
                                    setShiftLimit(e.target.value)
                                    fetchShift()
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[5, 10, 25].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Shift' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {shiftData?.currentPage} of{' '}
                                {shiftData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {employeeData?.currentPage} of{' '}
                                {employeeData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Jadwal'
                                    ? employeeData?.totalPages
                                    : shiftData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Jadwal'
                                    ? employeeData?.currentPage
                                    : shiftData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Jadwal"
                    label="Tambah Jadwal"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddScheduleModal}
                    onClose={() => {
                        setShowAddScheduleModal(!showAddScheduleModal)
                    }}
                >
                    <AddScheduleForm
                        setShowAddScheduleModal={setShowAddScheduleModal}
                        setShowEditScheduleModal={setShowEditScheduleModal}
                    />
                </Modal>
                <Modal
                    title="Edit Jadwal"
                    label="Edit Jadwal"
                    className="max-w-2xl"
                    centered
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
                <Modal
                    title="Hapus Jadwal"
                    label="Hapus Jadwal"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteScheduleModal}
                    onClose={() => {
                        setShowDeleteScheduleModal(!showDeleteScheduleModal)
                    }}
                >
                    <DeleteScheduleForm
                        setShowDeleteScheduleModal={setShowDeleteScheduleModal}
                    />
                </Modal>
                <Modal
                    title="Buat Shift"
                    label="Buat Shift"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddShiftModal}
                    onClose={() => {
                        setShowAddShiftModal(!showAddShiftModal)
                    }}
                >
                    <AddShiftForm setShowAddShiftModal={setShowAddShiftModal} />
                </Modal>
                <Modal
                    title="Edit Shift"
                    label="Edit Shift"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditShiftModal}
                    onClose={() => {
                        setShowEditShiftModal(!showEditShiftModal)
                    }}
                >
                    <EditShiftForm
                        setShowEditShiftModal={setShowEditShiftModal}
                    />
                </Modal>
                <Modal
                    title="Detail Shift"
                    label="Detail Shift"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewShiftModal}
                    onClose={() => {
                        setShowViewShiftModal(!showViewShiftModal)
                    }}
                >
                    <DetailShiftForm
                        setShowViewShiftModal={setShowViewShiftModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Shift"
                    label="Hapus Shift"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteShiftModal}
                    onClose={() => {
                        setShowDeleteShiftModal(!showDeleteShiftModal)
                    }}
                >
                    <DeleteShiftForm
                        setShowDeleteShiftModal={setShowDeleteShiftModal}
                    />
                </Modal>
                <Modal
                    title="Import Jadwal"
                    label="Import Jadwal"
                    labelClass="btn-outline-dark"
                    activeModal={showImportScheduleModal}
                    onClose={() => {
                        setShowImportScheduleModal(!showImportScheduleModal)
                    }}
                >
                    <ImportScheduleForm
                        setShowImportScheduleModal={setShowImportScheduleModal}
                    />
                </Modal>
            </div>
        </>
    )
}
