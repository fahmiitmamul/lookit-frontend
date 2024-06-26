'use client'
import React, { Fragment } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import LeaveTypeTable from '@/components/(pengaturan)/master-data/tipe-cuti/tabel-tipe-cuti/page'
import NationalHoliday from '@/components/(pengaturan)/master-data/libur-nasional/tabel-libur-nasional/page'
import PermissionTable from '@/components/(pengaturan)/master-data/tipe-izin/tabel-tipe-izin/page'
import AddLeaveTypeForm from '@/components/(pengaturan)/master-data/tipe-cuti/form-tambah-tipe-cuti/page'
import EditLeaveTypeForm from '@/components/(pengaturan)/master-data/tipe-cuti/form-edit-tipe-cuti/page'
import DetailLeaveTypeForm from '@/components/(pengaturan)/master-data/tipe-cuti/form-detail-tipe-cuti/page'
import DeleteLeaveTypeForm from '@/components/(pengaturan)/master-data/tipe-cuti/form-hapus-tipe-cuti/page'
import AddPermissionTypeForm from '@/components/(pengaturan)/master-data/tipe-izin/form-tambah-tipe-izin/page'
import EditPermissionTypeForm from '@/components/(pengaturan)/master-data/tipe-izin/form-edit-tipe-izin/page'
import DetailPermissionTypeForm from '@/components/(pengaturan)/master-data/tipe-izin/form-detail-tipe-izin/page'
import DeletePermissionTypeForm from '@/components/(pengaturan)/master-data/tipe-izin/form-hapus-tipe-izin/page'
import AddNationalHolidayForm from '@/components/(pengaturan)/master-data/libur-nasional/form-tambah-libur-nasional/page'
import EditNationalHolidayForm from '@/components/(pengaturan)/master-data/libur-nasional/form-edit-libur-nasional/page'
import DetailNationalHolidayForm from '@/components/(pengaturan)/master-data/libur-nasional/form-detail-libur-nasional/page'
import DeleteNationalHolidayForm from '@/components/(pengaturan)/master-data/libur-nasional/form-hapus-libur-nasional/page'
import EditBpjsForm from '@/components/(pengaturan)/master-data/tipe-bpjs/form-edit-tipe-bpjs/page'
import DetailBpjsTypeForm from '@/components/(pengaturan)/master-data/tipe-bpjs/form-detail-tipe-bpjs/page'
import DeleteBpjsTypeForm from '@/components/(pengaturan)/master-data/tipe-bpjs/form-hapus-tipe-bpjs/page'
import AddInsuranceTypeForm from '@/components/(pengaturan)/master-data/tipe-asuransi/form-tambah-tipe-asuransi/page'
import EditInsuranceTypeForm from '@/components/(pengaturan)/master-data/tipe-asuransi/form-edit-tipe-asuransi/page'
import DetailInsuranceTypeForm from '@/components/(pengaturan)/master-data/tipe-asuransi/form-detail-tipe-asuransi/page'
import DeleteInsuranceTypeForm from '@/components/(pengaturan)/master-data/tipe-asuransi/form-hapus-tipe-asuransi/page'
import BPJSType from '@/components/(pengaturan)/master-data/tipe-bpjs/table-tipe-bpjs/page'
import DetailVaccineTypeForm from '@/components/(pengaturan)/master-data/status-vaksin/form-detail-status-vaksin/page'
import DeleteVaccineTypeForm from '@/components/(pengaturan)/master-data/status-vaksin/form-hapus-status-vaksin/page'
import InsuranceType from '@/components/(pengaturan)/master-data/tipe-asuransi/tabel-tipe-asuransi/page'
import VaccineStatusType from '@/components/(pengaturan)/master-data/status-vaksin/tabel-status-vaksin/page'
import AddBpjsTypeForm from '@/components/(pengaturan)/master-data/tipe-bpjs/form-tambah-tipe-bpjs/page'
import AddVaccineStatusForm from '@/components/(pengaturan)/master-data/status-vaksin/form-tambah-status-vaksin/page'
import EditVaccineStatusForm from '@/components/(pengaturan)/master-data/status-vaksin/form-edit status-vaksin/page'
import AddOvertimeTypeForm from '@/components/(pengaturan)/master-data/tipe-lembur/form-tambah-tipe-lembur/page'
import EditOvertimeTypeForm from '@/components/(pengaturan)/master-data/tipe-lembur/form-edit-tipe-lembur/page'
import DetailOvertimeTypeForm from '@/components/(pengaturan)/master-data/tipe-lembur/form-detail-tipe-lembur/page'
import DeleteOvertimeTypeForm from '@/components/(pengaturan)/master-data/tipe-lembur/form-hapus-tipe-lembur/page'
import OvertimeTable from '@/components/(pengaturan)/master-data/tipe-lembur/tabel-tipe-lembur/page'

export default function MasterData() {
    const [showAddLeaveType, setShowAddLeaveType] = useState(false)
    const [showEditLeaveType, setShowEditLeaveType] = useState(false)
    const [showDeleteLeaveType, setShowDeleteLeaveType] = useState(false)
    const [showViewLeaveType, setShowViewLeaveType] = useState(false)
    const [showAddBpjsTypeModal, setShowAddBpjsTypeModal] = useState(false)
    const [showEditBpjsTypeModal, setShowEditBpjsTypeModal] = useState(false)
    const [showDeleteBpjsTypeModal, setShowDeleteBpjsTypeModal] =
        useState(false)
    const [showViewBpjsTypeModal, setShowViewBpjsTypeModal] = useState(false)
    const [showAddInsuranceTypeModal, setShowAddInsuranceTypeModal] =
        useState(false)
    const [showEditInsuranceTypeModal, setShowEditInsuranceTypeModal] =
        useState(false)
    const [showDeleteInsuranceTypeModal, setShowDeleteInsuranceTypeModal] =
        useState(false)
    const [showViewInsuranceTypeModal, setShowViewInsuranceTypeModal] =
        useState(false)
    const [showAddVaccineTypeModal, setShowAddVaccineTypeModal] =
        useState(false)
    const [showEditVaccineTypeModal, setShowEditVaccineTypeModal] =
        useState(false)
    const [showDeleteVaccineTypeModal, setShowDeleteVaccineTypeModal] =
        useState(false)
    const [showViewVaccineTypeModal, setShowViewVaccineTypeModal] =
        useState(false)
    const [showAddPermissionType, setShowAddPermissionType] = useState(false)
    const [showEditPermissionType, setShowEditPermissionType] = useState(false)
    const [showDeletePermissionType, setShowDeletePermissionType] =
        useState(false)
    const [showViewPermissionType, setShowViewPermissionType] = useState(false)
    const [showAddNationalHoliday, setShowAddNationalHoliday] = useState(false)
    const [showEditNationalHoliday, setShowEditNationalHoliday] =
        useState(false)
    const [showDeleteNationalHoliday, setShowDeleteNationalHoliday] =
        useState(false)
    const [showViewNationalHoliday, setShowViewNationalHoliday] =
        useState(false)
    const [showAddOvertimeType, setShowAddOvertimeType] = useState(false)
    const [showEditOvertimeType, setShowEditOvertimeType] = useState(false)
    const [showViewOvertimeType, setShowViewOvertimeType] = useState(false)
    const [showDeleteOvertimeType, setShowDeleteOvertimeType] = useState(false)
    const [overtimeTypePage, setOvertimeTypePage] = useState(1)
    const [overtimeTypeLimit, setOvertimeTypeLimit] = useState(5)
    const [overtimeTypeSearchData, setOvertimeTypeSearchData] = useState('')
    const [leaveTypePage, setLeaveTypePage] = useState(1)
    const [leaveTypeLimit, setLeaveTypeLimit] = useState(5)
    const [leaveTypeSearchData, setLeaveTypeSearchData] = useState('')
    const [permissionTypePage, setPermissionTypePage] = useState(1)
    const [permissionTypeLimit, setPermissionTypeLimit] = useState(5)
    const [permissionTypeSearchData, setPermissionTypeSearchData] = useState('')
    const [nationalHolidayPage, setNationalHolidayPage] = useState(1)
    const [nationalHolidayLimit, setNationalHolidayLimit] = useState(5)
    const [nationalHolidaySearchData, setNationalHolidaySearchData] =
        useState('')
    const [bpjsTypePage, setBpjsTypePage] = useState(1)
    const [bpjsTypeLimit, setBpjsTypeLimit] = useState(5)
    const [bpjsTypeSearchData, setBpjsTypeSearchData] = useState('')
    const [insuranceTypePage, setInsuranceTypePage] = useState(1)
    const [insuranceTypeLimit, setInsuranceTypeLimit] = useState(5)
    const [insuranceTypeSearchData, setInsuranceTypeSearchData] = useState('')
    const [vaccinePage, setVaccinePage] = useState(1)
    const [vaccineLimit, setVaccineLimit] = useState(5)
    const [vaccineSearchData, setVaccineSearchData] = useState('')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Tipe Cuti')
    const [sortOrder, setSortOrder] = useState('asc')

    const queryClient = useQueryClient()

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Tipe Cuti') {
            setLeaveTypePage(page)
        } else if (selectedItem === 'Tipe Izin') {
            setPermissionTypePage(page)
        } else if (selectedItem === 'Libur Nasional') {
            setNationalHolidayPage(page)
        } else if (selectedItem === 'Tipe Bpjs') {
            setBpjsTypePage(page)
        } else if (selectedItem === 'Tipe Asuransi') {
            setInsuranceTypePage(page)
        } else if (selectedItem === 'Status Vaksin') {
            setVaccinePage(page)
        } else {
            setOvertimeTypePage(page)
        }
    }

    const buttons = [
        {
            title: 'Tipe Cuti',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Tipe Izin',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Tipe Lembur',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Tipe Bpjs',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Tipe Asuransi',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Status Vaksin',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Libur Nasional',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchLeaveType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/leave-type-master?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: leaveTypeData } = useQuery({
        queryKey: [
            'leave-type-master',
            leaveTypePage,
            leaveTypeSearchData,
            leaveTypeLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchLeaveType(leaveTypePage, leaveTypeSearchData, leaveTypeLimit),
    })

    async function fetchPermissionType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/permission-type?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: permissionTypeData } = useQuery({
        queryKey: [
            'permission-type',
            permissionTypePage,
            permissionTypeSearchData,
            permissionTypeLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchPermissionType(
                permissionTypePage,
                permissionTypeSearchData,
                permissionTypeLimit
            ),
    })

    async function fetchNationalHoliday(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/national-holiday?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: nationalHoliday } = useQuery({
        queryKey: [
            'national-holiday',
            nationalHolidayPage,
            nationalHolidaySearchData,
            nationalHolidayLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchNationalHoliday(
                nationalHolidayPage,
                nationalHolidaySearchData,
                nationalHolidayLimit
            ),
    })

    async function fetchBpjsType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/bpjs?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: bpjsType } = useQuery({
        queryKey: [
            'bpjs',
            bpjsTypePage,
            bpjsTypeSearchData,
            bpjsTypeLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchBpjsType(bpjsTypePage, bpjsTypeSearchData, bpjsTypeLimit),
    })

    async function fetchInsuranceType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/insurance?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: insuranceType } = useQuery({
        queryKey: [
            'insurance',
            insuranceTypePage,
            insuranceTypeSearchData,
            insuranceTypeLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchInsuranceType(
                insuranceTypePage,
                insuranceTypeSearchData,
                insuranceTypeLimit
            ),
    })

    async function fetchVaccineType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/vaccine?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: vaccineType } = useQuery({
        queryKey: [
            'vaccine',
            vaccinePage,
            vaccineSearchData,
            vaccineLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchVaccineType(vaccinePage, vaccineSearchData, vaccineLimit),
    })

    async function fetchOvertimeTypePage(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/overtime-type?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: overtimeTypeData } = useQuery({
        queryKey: [
            'overtime-type',
            overtimeTypePage,
            overtimeTypeSearchData,
            overtimeTypeLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchOvertimeTypePage(
                overtimeTypePage,
                overtimeTypeSearchData,
                overtimeTypeLimit
            ),
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 justify-between w-full">
                        <div className="flex justify-center items-center">
                            <h5>Data {selectedItem}</h5>
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Tipe Cuti') {
                                        setShowAddLeaveType(!showAddLeaveType)
                                    } else if (selectedItem === 'Tipe Izin') {
                                        setShowAddPermissionType(
                                            !showAddPermissionType
                                        )
                                    } else if (
                                        selectedItem === 'Libur Nasional'
                                    ) {
                                        setShowAddNationalHoliday(
                                            !showAddNationalHoliday
                                        )
                                    } else if (selectedItem === 'Tipe Bpjs') {
                                        setShowAddBpjsTypeModal(
                                            !showAddBpjsTypeModal
                                        )
                                    } else if (
                                        selectedItem === 'Tipe Asuransi'
                                    ) {
                                        setShowAddInsuranceTypeModal(
                                            !showAddInsuranceTypeModal
                                        )
                                    } else if (
                                        selectedItem === 'Status Vaksin'
                                    ) {
                                        setShowAddVaccineTypeModal(
                                            !showAddVaccineTypeModal
                                        )
                                    } else {
                                        setShowAddOvertimeType(
                                            !showAddOvertimeType
                                        )
                                    }
                                }}
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text={
                                    selectedItem === 'Tipe Cuti'
                                        ? 'Buat Tipe Cuti'
                                        : selectedItem === 'Tipe Izin'
                                          ? 'Buat Tipe Izin'
                                          : selectedItem === 'Libur Nasional'
                                            ? 'Buat Libur Nasional'
                                            : selectedItem === 'Tipe Bpjs'
                                              ? 'Tipe Bpjs'
                                              : selectedItem === 'Tipe Asuransi'
                                                ? 'Buat Tipe Asuransi'
                                                : selectedItem ===
                                                    'Status Vaksin'
                                                  ? 'Buat Status Vaksin'
                                                  : 'Buat Tipe Lembur'
                                }
                            />
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
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                    onChange={(e) => {
                                        setLeaveTypeSearchData(e.target.value)
                                        setPermissionTypeSearchData(
                                            e.target.value
                                        )
                                        setNationalHolidaySearchData(
                                            e.target.value
                                        )
                                        setBpjsTypeSearchData(e.target.value)
                                        setInsuranceTypeSearchData(
                                            e.target.value
                                        )
                                        setVaccineSearchData(e.target.value)
                                        fetchLeaveType()
                                        fetchPermissionType()
                                        fetchPermissionType()
                                        fetchBpjsType()
                                        fetchInsuranceType()
                                        fetchVaccineType()
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
                                        <LeaveTypeTable
                                            showViewLeaveTypeModal={
                                                setShowViewLeaveType
                                            }
                                            showEditLeaveTypeModal={
                                                setShowEditLeaveType
                                            }
                                            showDeleteLeaveTypeModal={
                                                setShowDeleteLeaveType
                                            }
                                            leaveTypeData={leaveTypeData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <PermissionTable
                                            showViewPermissionTypeModal={
                                                setShowViewPermissionType
                                            }
                                            showEditPermissionTypeModal={
                                                setShowEditPermissionType
                                            }
                                            showDeletePermissionTypeModal={
                                                setShowDeletePermissionType
                                            }
                                            permissionTypeData={
                                                permissionTypeData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <OvertimeTable
                                            setShowViewOvertimeTypeModal={
                                                setShowViewOvertimeType
                                            }
                                            setShowEditOvertimeTypeModal={
                                                setShowEditOvertimeType
                                            }
                                            setShowDeleteOvertimeTypeModal={
                                                setShowDeleteOvertimeType
                                            }
                                            overtimeTypeData={overtimeTypeData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <BPJSType
                                            showViewBpjsTypeModal={
                                                setShowViewBpjsTypeModal
                                            }
                                            showEditBpjsTypeModal={
                                                setShowEditBpjsTypeModal
                                            }
                                            showDeleteBpjsTypeModal={
                                                setShowDeleteBpjsTypeModal
                                            }
                                            bpjsType={bpjsType}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <InsuranceType
                                            showViewInsuranceTypeModal={
                                                setShowViewInsuranceTypeModal
                                            }
                                            showEditInsuranceTypeModal={
                                                setShowEditInsuranceTypeModal
                                            }
                                            showDeleteInsuranceTypeModal={
                                                setShowDeleteInsuranceTypeModal
                                            }
                                            insuranceType={insuranceType}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <VaccineStatusType
                                            showViewVaccineStatusTypeModal={
                                                setShowViewVaccineTypeModal
                                            }
                                            showEditVaccineStatusTypeModal={
                                                setShowEditVaccineTypeModal
                                            }
                                            showDeleteVaccineStatusTypeModal={
                                                setShowDeleteVaccineTypeModal
                                            }
                                            vaccineStatusType={vaccineType}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <NationalHoliday
                                            showViewNationalHolidayModal={
                                                setShowViewNationalHoliday
                                            }
                                            showEditNationalHolidayModal={
                                                setShowEditNationalHoliday
                                            }
                                            showDeleteNationalHolidayModal={
                                                setShowDeleteNationalHoliday
                                            }
                                            nationalHoliday={nationalHoliday}
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex-wrap flex justify-between mt-8">
                    <div className="flex-wrap flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Tipe Cuti') {
                                    setLeaveTypeLimit(e.target.value)
                                    fetchLeaveType()
                                } else if (selectedItem === 'Tipe Izin') {
                                    setPermissionTypeLimit(e.target.value)
                                    fetchPermissionType()
                                } else if (selectedItem === 'Libur Nasional') {
                                    setNationalHolidayLimit(e.target.value)
                                    fetchNationalHoliday()
                                } else if (selectedItem === 'Tipe Bpjs') {
                                    setBpjsTypeLimit(e.target.value)
                                    fetchBpjsType()
                                } else if (selectedItem === 'Tipe Asuransi') {
                                    setInsuranceTypeLimit(e.target.value)
                                    fetchInsuranceType()
                                } else if (selectedItem === 'Status Vaksin') {
                                    setVaccineLimit(e.target.value)
                                    fetchVaccineType()
                                } else {
                                    setOvertimeTypeLimit(e.target.value)
                                    fetchOvertimeTypePage()
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
                        {selectedItem === 'Tipe Cuti' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {leaveTypeData?.currentPage} of{' '}
                                {leaveTypeData?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Tipe Izin' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {permissionTypeData?.currentPage} of{' '}
                                {permissionTypeData?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Libur Nasional' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {nationalHoliday?.currentPage} of{' '}
                                {nationalHoliday?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Tipe Bpjs' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {bpjsType?.currentPage} of{' '}
                                {bpjsType?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Tipe Asuransi' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {insuranceType?.currentPage} of{' '}
                                {insuranceType?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Status Vaksin' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {vaccineType?.currentPage} of{' '}
                                {vaccineType?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Tipe Lembur' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {overtimeTypePage?.currentPage} of{' '}
                                {overtimeTypePage?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Tipe Cuti'
                                    ? leaveTypeData?.totalPages
                                    : selectedItem === 'Tipe Izin'
                                      ? permissionTypeData?.totalPages
                                      : selectedItem === 'Libur Nasional'
                                        ? nationalHoliday?.totalPages
                                        : selectedItem === 'Tipe Bpjs'
                                          ? bpjsType?.totalPages
                                          : selectedItem === 'Tipe Asuransi'
                                            ? insuranceType?.totalPages
                                            : selectedItem === 'Status Vaksin'
                                              ? vaccineType?.totalPages
                                              : overtimeTypePage?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Tipe Cuti'
                                    ? leaveTypeData?.currentPage
                                    : selectedItem === 'Tipe Izin'
                                      ? permissionTypeData?.currentPage
                                      : selectedItem === 'Libur Nasional'
                                        ? nationalHoliday?.currentPage
                                        : selectedItem === 'Tipe Bpjs'
                                          ? bpjsType?.totalPages
                                          : selectedItem === 'Tipe Asuransi'
                                            ? insuranceType?.totalPages
                                            : selectedItem === 'Status Vaksin'
                                              ? vaccineType?.totalPages
                                              : overtimeTypePage?.totalPages
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Tipe Cuti"
                    label="Tambah Tipe Cuti"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddLeaveType}
                    onClose={() => {
                        setShowAddLeaveType(!showAddLeaveType)
                    }}
                >
                    <AddLeaveTypeForm
                        showAddLeaveTypeModal={setShowAddLeaveType}
                    />
                </Modal>
                <Modal
                    title="Edit Tipe Cuti"
                    label="Edit Tipe Cuti"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditLeaveType}
                    onClose={() => {
                        setShowEditLeaveType(!showEditLeaveType)
                    }}
                >
                    <EditLeaveTypeForm
                        showEditLeaveTypeModal={setShowEditLeaveType}
                    />
                </Modal>
                <Modal
                    title="Detail Tipe Cuti"
                    label="Detail Tipe Cuti"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewLeaveType}
                    onClose={() => {
                        setShowViewLeaveType(!showViewLeaveType)
                    }}
                >
                    <DetailLeaveTypeForm
                        showViewLeaveTypeModal={setShowViewLeaveType}
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe Cuti"
                    label="Hapus Tipe Cuti"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteLeaveType}
                    onClose={() => {
                        setShowDeleteLeaveType(!showDeleteLeaveType)
                    }}
                >
                    <DeleteLeaveTypeForm
                        showDeleteLeaveTypeModal={setShowDeleteLeaveType}
                    />
                </Modal>
                <Modal
                    title="Tambah Tipe Izin"
                    label="Tambah Tipe Izin"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddPermissionType}
                    onClose={() => {
                        setShowAddPermissionType(!showAddPermissionType)
                    }}
                >
                    <AddPermissionTypeForm
                        showAddPermissionTypeModal={setShowAddPermissionType}
                    />
                </Modal>
                <Modal
                    title="Edit Tipe Izin"
                    label="Edit Tipe Izin"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditPermissionType}
                    onClose={() => {
                        setShowEditPermissionType(!showEditPermissionType)
                    }}
                >
                    <EditPermissionTypeForm
                        showEditPermissionTypeModal={setShowEditPermissionType}
                    />
                </Modal>
                <Modal
                    title="Detail Tipe Izin"
                    label="Detail Tipe Izin"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewPermissionType}
                    onClose={() => {
                        setShowViewPermissionType(!showViewPermissionType)
                    }}
                >
                    <DetailPermissionTypeForm
                        showViewPermissionTypeModal={setShowViewPermissionType}
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe Izin"
                    label="Hapus Tipe Izin"
                    labelClass="btn-outline-dark"
                    activeModal={showDeletePermissionType}
                    onClose={() => {
                        setShowDeletePermissionType(!showDeletePermissionType)
                    }}
                >
                    <DeletePermissionTypeForm
                        showDeletePermissionTypeModal={
                            setShowDeletePermissionType
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Tipe Libur Nasional"
                    label="Tambah Tipe Libur Nasional"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddNationalHoliday}
                    onClose={() => {
                        setShowAddNationalHoliday(!showAddNationalHoliday)
                    }}
                >
                    <AddNationalHolidayForm
                        showAddNationalHolidayModal={setShowAddNationalHoliday}
                    />
                </Modal>
                <Modal
                    title="Edit Tipe Libur Nasional"
                    label="Edit Tipe Libur Nasional"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditNationalHoliday}
                    onClose={() => {
                        setShowEditNationalHoliday(!showEditNationalHoliday)
                    }}
                >
                    <EditNationalHolidayForm
                        showEditNationalHolidayModal={
                            setShowEditNationalHoliday
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tipe Libur Nasional"
                    label="Detail Tipe Libur Nasional"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewNationalHoliday}
                    onClose={() => {
                        setShowViewNationalHoliday(!showViewNationalHoliday)
                    }}
                >
                    <DetailNationalHolidayForm
                        showViewNationalHolidayModal={
                            setShowViewNationalHoliday
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe Libur Nasional"
                    label="Hapus Tipe Libur Nasional"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteNationalHoliday}
                    onClose={() => {
                        setShowDeleteNationalHoliday(!showDeleteNationalHoliday)
                    }}
                >
                    <DeleteNationalHolidayForm
                        showDeleteNationalHolidayModal={
                            setShowDeleteNationalHoliday
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Tipe BPJS"
                    label="Tambah Tipe BPJS"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddBpjsTypeModal}
                    onClose={() => {
                        setShowAddBpjsTypeModal(!showAddBpjsTypeModal)
                    }}
                >
                    <AddBpjsTypeForm
                        setShowAddBpjsTypeModal={setShowAddBpjsTypeModal}
                    />
                </Modal>
                <Modal
                    title="Edit Tipe BPJS"
                    label="Edit Tipe BPJS"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditBpjsTypeModal}
                    onClose={() => {
                        setShowEditBpjsTypeModal(!showEditBpjsTypeModal)
                    }}
                >
                    <EditBpjsForm
                        setShowEditBpjsTypeModal={setShowEditBpjsTypeModal}
                    />
                </Modal>
                <Modal
                    title="Detail Tipe BPJS"
                    label="Detail Tipe BPJS"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewBpjsTypeModal}
                    onClose={() => {
                        setShowViewBpjsTypeModal(!showViewBpjsTypeModal)
                    }}
                >
                    <DetailBpjsTypeForm
                        setShowViewBpjsTypeModal={setShowViewBpjsTypeModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe BPJS"
                    label="Hapus Tipe BPJS"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteBpjsTypeModal}
                    onClose={() => {
                        setShowDeleteBpjsTypeModal(!showDeleteBpjsTypeModal)
                    }}
                >
                    <DeleteBpjsTypeForm
                        setShowDeleteBpjsTypeModal={setShowDeleteBpjsTypeModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Tipe Asuransi"
                    label="Tambah Tipe Asuransi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddInsuranceTypeModal}
                    onClose={() => {
                        setShowAddInsuranceTypeModal(!showAddInsuranceTypeModal)
                    }}
                >
                    <AddInsuranceTypeForm
                        setShowAddInsuranceTypeModal={
                            setShowAddInsuranceTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Tipe Asuransi"
                    label="Edit Tipe Asuransi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditInsuranceTypeModal}
                    onClose={() => {
                        setShowEditInsuranceTypeModal(
                            !showEditInsuranceTypeModal
                        )
                    }}
                >
                    <EditInsuranceTypeForm
                        setShowEditInsuranceTypeModal={
                            setShowEditInsuranceTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tipe Asuransi"
                    label="Detail Tipe Asuransi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewInsuranceTypeModal}
                    onClose={() => {
                        setShowViewInsuranceTypeModal(
                            !showViewInsuranceTypeModal
                        )
                    }}
                >
                    <DetailInsuranceTypeForm
                        setShowViewInsuranceTypeModal={
                            setShowViewInsuranceTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe Asuransi"
                    label="Hapus Tipe Asuransi"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteInsuranceTypeModal}
                    onClose={() => {
                        setShowDeleteInsuranceTypeModal(
                            !showDeleteInsuranceTypeModal
                        )
                    }}
                >
                    <DeleteInsuranceTypeForm
                        setShowDeleteInsuranceTypeModal={
                            setShowDeleteInsuranceTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Status Vaksin"
                    label="Tambah Status Vaksin"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddVaccineTypeModal}
                    onClose={() => {
                        setShowAddVaccineTypeModal(!showAddVaccineTypeModal)
                    }}
                >
                    <AddVaccineStatusForm
                        setShowAddVaccineStatusModal={
                            setShowAddVaccineTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Status Vaksin"
                    label="Edit Status Vaksin"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditVaccineTypeModal}
                    onClose={() => {
                        setShowEditVaccineTypeModal(!showEditVaccineTypeModal)
                    }}
                >
                    <EditVaccineStatusForm
                        setShowEditVaccineTypeModal={
                            setShowEditVaccineTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Status Vaksin"
                    label="Detail Status Vaksin"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewVaccineTypeModal}
                    onClose={() => {
                        setShowViewVaccineTypeModal(!showViewVaccineTypeModal)
                    }}
                >
                    <DetailVaccineTypeForm
                        setShowViewVaccineTypeModal={
                            setShowViewVaccineTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Status Vaksin"
                    label="Hapus Status Vaksin"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteVaccineTypeModal}
                    onClose={() => {
                        setShowDeleteVaccineTypeModal(
                            !showDeleteVaccineTypeModal
                        )
                    }}
                >
                    <DeleteVaccineTypeForm
                        setShowDeleteVaccineTypeModal={
                            setShowDeleteVaccineTypeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Tipe Lembur"
                    label="Tambah Tipe Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddOvertimeType}
                    onClose={() => {
                        setShowAddOvertimeType(!showAddOvertimeType)
                    }}
                >
                    <AddOvertimeTypeForm
                        setShowAddOvertimeTypeModal={setShowAddOvertimeType}
                    />
                </Modal>
                <Modal
                    title="Edit Tipe Lembur"
                    label="Edit Tipe Lembur"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditOvertimeType}
                    onClose={() => {
                        setShowEditOvertimeType(!showEditOvertimeType)
                    }}
                >
                    <EditOvertimeTypeForm
                        setShowEditOvertimeTypeModal={setShowEditOvertimeType}
                    />
                </Modal>
                <Modal
                    title="Detail Tipe Lembur"
                    label="Detail Tipe Lembur"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewOvertimeType}
                    onClose={() => {
                        setShowViewOvertimeType(!showViewOvertimeType)
                    }}
                >
                    <DetailOvertimeTypeForm
                        setShowViewOvertimeTypeModal={setShowViewOvertimeType}
                    />
                </Modal>
                <Modal
                    title="Hapus Tipe Lembur"
                    label="Hapus Tipe Lembur"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteOvertimeType}
                    onClose={() => {
                        setShowDeleteOvertimeType(!showDeleteOvertimeType)
                    }}
                >
                    <DeleteOvertimeTypeForm
                        setShowDeleteOvertimeTypeModal={
                            setShowDeleteOvertimeType
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
