'use client'
import React, { Fragment, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import ActiveEmployeeTable from '@/components/(karyawan)/data-karyawan/tabel-karyawan-aktif/page'
import NonActiveEmployeeTable from '@/components/(karyawan)/data-karyawan/tabel-karyawan-nonaktif/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import AddEmployeeForm from '@/components/(karyawan)/data-karyawan/form-tambah-karyawan/page'
import EditEmployeeForm from '@/components/(karyawan)/data-karyawan/form-edit-karyawan/page'
import DetailEmployeeForm from '@/components/(karyawan)/data-karyawan/form-detail-karyawan/page'
import DeleteEmployeeForm from '@/components/(karyawan)/data-karyawan/form-hapus-karyawan/page'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useDispatch, useSelector } from 'react-redux'
import MyDocument from '@/components/(karyawan)/data-karyawan/download-pdf-karyawan/page'
import { toast } from 'react-toastify'
import { setSelectedData } from '@/components/(karyawan)/store'
import ExportToExcel from '@/components/(karyawan)/data-karyawan/export-excel-karyawan/page'
import ImportEmployeeForm from '@/components/(karyawan)/data-karyawan/form-import-karyawan/page'
import Flatpickr from 'react-flatpickr'

export default function DataKaryawan() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)
    const [activeEmployeePage, setActiveEmployeePage] = useState(1)
    const [activeEmployeeLimit, setActiveEmployeeLimit] = useState(5)
    const [activeEmployeeSearchData, setActiveEmployeeSearchData] = useState('')
    const [nonActiveEmployeePage, setNonActiveEmployeePage] = useState(1)
    const [nonActiveEmployeelimit, setNonActiveEmployeeLimit] = useState(5)
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [isClient, setIsClient] = useState(false)
    const selectedData = useSelector(
        (state) => state.employee.employee.selectedEmployee
    )
    const [nonActiveEmployeeSearchData, setNonActiveEmployeeSearchData] =
        useState('')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Aktif')
    const dispatch = useDispatch()

    useEffect(() => {
        setIsClient(true)
        dispatch(setSelectedData([]))
    }, [])

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Aktif') {
            setActiveEmployeePage(page)
        } else {
            setNonActiveEmployeePage(page)
        }
    }

    const buttons = [
        {
            title: 'Aktif',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Nonaktif',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchActiveEmployee(
        pageData = activeEmployeePage,
        search = activeEmployeeSearchData,
        limitData = activeEmployeeLimit,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/employee/active?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: activeEmployeeData } = useQuery({
        queryKey: [
            'active-employee',
            activeEmployeePage,
            activeEmployeeSearchData,
            activeEmployeeLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchActiveEmployee(
                activeEmployeePage,
                activeEmployeeSearchData,
                activeEmployeeLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchNonActiveEmployee(
        pageData = nonActiveEmployeePage,
        search = nonActiveEmployeeSearchData,
        limitData = nonActiveEmployeelimit,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/employee/non-active?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: nonActiveEmployeeData } = useQuery({
        queryKey: [
            'non-active-employee',
            nonActiveEmployeePage,
            nonActiveEmployeeSearchData,
            nonActiveEmployeelimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchNonActiveEmployee(
                nonActiveEmployeePage,
                nonActiveEmployeeSearchData,
                nonActiveEmployeelimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    const queryClient = useQueryClient()

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>Data Karyawan</h5>
                    </div>
                    <div className="flex flex-wrap mt-4 xl:mt-0 gap-5">
                        {selectedItem === 'Aktif' ? (
                            <div>
                                <Button
                                    onClick={() => {
                                        setShowAddModal(!showAddModal)
                                    }}
                                    icon="heroicons-outline:plus"
                                    className="btn-success"
                                    text="Buat Karyawan"
                                />
                            </div>
                        ) : null}
                        <div>
                            {isClient && (
                                <Button
                                    text="Download PDF"
                                    icon="heroicons-outline:newspaper"
                                    className="bg-warning-500 text-white"
                                    onClick={() => {
                                        selectedData?.length == 0 &&
                                            toast.error(
                                                'Silahkan ceklis data terlebih dahulu'
                                            )
                                    }}
                                    children={
                                        selectedData?.length >= 1 && (
                                            <div>
                                                <PDFDownloadLink
                                                    document={
                                                        <MyDocument
                                                            selectedData={
                                                                selectedData
                                                            }
                                                        />
                                                    }
                                                    fileName="data-karyawan.pdf"
                                                >
                                                    {({
                                                        blob,
                                                        url,
                                                        loading,
                                                        error,
                                                    }) =>
                                                        loading
                                                            ? 'Loading document...'
                                                            : 'Download PDF'
                                                    }
                                                </PDFDownloadLink>
                                            </div>
                                        )
                                    }
                                />
                            )}
                        </div>
                        <div>
                            <Button
                                icon="heroicons-outline:newspaper"
                                text="Import"
                                className="btn-primary"
                                onClick={() => {
                                    setShowImportModal(!showImportModal)
                                }}
                            />
                        </div>
                        <div>
                            <ExportToExcel />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        period={
                            <div className="flex flex-wrap gap-5">
                                <div className="flex gap-2">
                                    <div className="flex justify-center items-center gap-3">
                                        <div>
                                            <Flatpickr
                                                value={selectedPeriod}
                                                defaultValue={new Date()}
                                                id="period"
                                                placeholder="Periode Awal - Periode Akhir"
                                                className="date-picker-control w-[210px] py-2 h-[48px]"
                                                onChange={(date) =>
                                                    setSelectedPeriod(date)
                                                }
                                                options={{
                                                    mode: 'range',
                                                    defaultDate: new Date(),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        search={
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                    onChange={(e) => {
                                        setActiveEmployeeSearchData(
                                            e.target.value
                                        )
                                        setNonActiveEmployeeSearchData(
                                            e.target.value
                                        )
                                        fetchActiveEmployee()
                                        fetchNonActiveEmployee()
                                    }}
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
                                                className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                                ${
                                                    selected
                                                        ? 'text-white bg-primary-500 '
                                                        : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                }`}
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
                                        <ActiveEmployeeTable
                                            setViewModal={setShowViewModal}
                                            setEditModal={setShowEditModal}
                                            setDeleteModal={setShowDeleteModal}
                                            activeEmployeeData={
                                                activeEmployeeData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <NonActiveEmployeeTable
                                            setViewModal={setShowViewModal}
                                            setEditModal={setShowEditModal}
                                            setDeleteModal={setShowDeleteModal}
                                            nonActiveEmployeeData={
                                                nonActiveEmployeeData
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
                                if (selectedItem === 'Aktif') {
                                    setActiveEmployeeLimit(e.target.value)
                                    fetchActiveEmployee()
                                } else {
                                    setNonActiveEmployeeLimit(e.target.value)
                                    fetchNonActiveEmployee()
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[5, 10].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Aktif' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {activeEmployeeData?.currentPage} of{' '}
                                {activeEmployeeData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {nonActiveEmployeeData?.currentPage} of{' '}
                                {nonActiveEmployeeData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Aktif'
                                    ? activeEmployeeData?.totalPages
                                    : nonActiveEmployeeData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Aktif'
                                    ? activeEmployeeData?.currentPage
                                    : nonActiveEmployeeData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Karyawan"
                    label="Tambah Karyawan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddModal}
                    onClose={() => {
                        setShowAddModal(!showAddModal)
                    }}
                >
                    <AddEmployeeForm setShowAddModal={setShowAddModal} />
                </Modal>
                <Modal
                    title="Edit Karyawan"
                    label="Edit Karyawan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditModal}
                    onClose={() => {
                        setShowEditModal(!showEditModal)
                    }}
                >
                    <EditEmployeeForm setShowEditModal={setShowEditModal} />
                </Modal>
                <Modal
                    title="Detail Karyawan"
                    label="Detail Karyawan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewModal}
                    onClose={() => {
                        setShowViewModal(!showViewModal)
                    }}
                >
                    <DetailEmployeeForm setShowViewModal={setShowViewModal} />
                </Modal>
                <Modal
                    title="Hapus Karyawan"
                    label="Hapus Karyawan"
                    labelClass="btn-outline-dark"
                    centered
                    className="max-w-xl"
                    activeModal={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(!showDeleteModal)
                    }}
                >
                    <DeleteEmployeeForm
                        setShowDeleteModal={setShowDeleteModal}
                    />
                </Modal>
                <Modal
                    title="Import Data Karyawan"
                    label="Import Data Karyawan"
                    labelClass="btn-outline-dark"
                    centered
                    className="max-w-xl"
                    activeModal={showImportModal}
                    onClose={() => {
                        setShowImportModal(!showImportModal)
                    }}
                >
                    <ImportEmployeeForm
                        setShowImportModal={setShowImportModal}
                    />
                </Modal>
            </div>
        </>
    )
}
