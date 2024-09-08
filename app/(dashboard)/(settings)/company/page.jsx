'use client'
import React, { Fragment } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import Modal from '@/components/ui/Modal'
import AreaTable from '@/components/(pengaturan)/perusahaan/tabel-area/page'
import BranchTable from '@/components/(pengaturan)/perusahaan/tabel-cabang/page'
import DivisionTable from '@/components/(pengaturan)/perusahaan/tabel-divisi/page'
import PositionTable from '@/components/(pengaturan)/perusahaan/tabel-jabatan/page'
import LevelTable from '@/components/(pengaturan)/perusahaan/tabel-job-level/page'
import AddCompanyForm from '@/components/(pengaturan)/perusahaan/form-tambah-perusahaan/page'
import EditCompanyForm from '@/components/(pengaturan)/perusahaan/form-edit-perusahaan/page'
import DeleteCompanyForm from '@/components/(pengaturan)/perusahaan/form-hapus-perusahaan/page'
import AddAreaForm from '@/components/(pengaturan)/perusahaan/form-tambah-area/page'
import EditAreaForm from '@/components/(pengaturan)/perusahaan/form-edit-area/page'
import DeleteAreaForm from '@/components/(pengaturan)/perusahaan/form-hapus-area/page'
import AddBranchForm from '@/components/(pengaturan)/perusahaan/form-tambah-cabang/page'
import EditBranchForm from '@/components/(pengaturan)/perusahaan/form-edit-cabang/page'
import DeleteBranchForm from '@/components/(pengaturan)/perusahaan/form-hapus-cabang/page'
import AddDivisionForm from '@/components/(pengaturan)/perusahaan/form-tambah-divisi/page'
import EditDivisionForm from '@/components/(pengaturan)/perusahaan/form-edit-divisi/page'
import DetailDivisionForm from '@/components/(pengaturan)/perusahaan/form-detail-divisi/page'
import DeleteDivisionForm from '@/components/(pengaturan)/perusahaan/form-hapus-divisi/page'
import AddPositionForm from '@/components/(pengaturan)/perusahaan/form-tambah-jabatan/page'
import EditPositionForm from '@/components/(pengaturan)/perusahaan/form-edit-jabatan/page'
import DetailPositionForm from '@/components/(pengaturan)/perusahaan/form-detail-jabatan/page'
import DeletePositionForm from '@/components/(pengaturan)/perusahaan/form-hapus-jabatan/page'
import EditLevelForm from '@/components/(pengaturan)/perusahaan/form-edit-level/page'
import DetailLevelForm from '@/components/(pengaturan)/perusahaan/form-detail-level/page'
import DeleteLevelForm from '@/components/(pengaturan)/perusahaan/form-hapus-level/page'
import AddLevelForm from '@/components/(pengaturan)/perusahaan/form-tambah-job-level/page'
import DetailCompanyForm from '@/components/(pengaturan)/perusahaan/form-detail-perusahaan/page'
import DetailAreaForm from '@/components/(pengaturan)/perusahaan/form-detail-area/page'
import DetailBranchForm from '@/components/(pengaturan)/perusahaan/form-detail-cabang/page'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import Dropdown from '@/components/ui/Dropdown'

export default function DataPerusahaan() {
    const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)
    const [showViewCompanyModal, setShowViewCompanyModal] = useState(false)
    const [showEditCompanyModal, setShowEditCompanyModal] = useState(false)
    const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false)
    const [showAddAreaModal, setShowAddAreaModal] = useState(false)
    const [showViewAreaModal, setShowViewAreaModal] = useState(false)
    const [showEditAreaModal, setShowEditAreaModal] = useState(false)
    const [showDeleteAreaModal, setShowDeleteAreaModal] = useState(false)
    const [showAddBranchModal, setShowAddBranchModal] = useState(false)
    const [showViewBranchModal, setShowViewBranchModal] = useState(false)
    const [showEditBranchModal, setShowEditBranchModal] = useState(false)
    const [showDeleteBranchModal, setShowDeleteBranchModal] = useState(false)
    const [showAddDivisionModal, setShowAddDivisionModal] = useState(false)
    const [showViewDivisionModal, setShowViewDivisionModal] = useState(false)
    const [showEditDivisionModal, setShowEditDivisionModal] = useState(false)
    const [showDeleteDivisionModal, setShowDeleteDivisionModal] =
        useState(false)
    const [showAddPositionModal, setShowAddPositionModal] = useState(false)
    const [showViewPositionModal, setShowViewPositionModal] = useState(false)
    const [showEditPositionModal, setShowEditPositionModal] = useState(false)
    const [showDeletePositionModal, setShowDeletePositionModal] =
        useState(false)
    const [showAddLevelModal, setShowAddLevelModal] = useState(false)
    const [showViewLevelModal, setShowViewLevelModal] = useState(false)
    const [showEditLevelModal, setShowEditLevelModal] = useState(false)
    const [showDeleteLevelModal, setShowDeleteLevelModal] = useState(false)
    const [companyPage, setCompanyPage] = useState(1)
    const [companyLimit, setCompanyLimit] = useState(5)
    const [companySearchData, setCompanySearchData] = useState('')
    const [areaPage, setAreaPage] = useState(1)
    const [areaLimit, setAreaLimit] = useState(5)
    const [areaSearchData, setAreaSearchData] = useState('')
    const [branchPage, setBranchPage] = useState(1)
    const [branchLimit, setBranchLimit] = useState(5)
    const [branchSearchData, setBranchSearchData] = useState('')
    const [divisionPage, setDivisionPage] = useState(1)
    const [divisionLimit, setDivisionLimit] = useState(5)
    const [divisionSearchData, setDivisionSearchData] = useState('')
    const [positionPage, setPositionPage] = useState(1)
    const [positionLimit, setPositionLimit] = useState(5)
    const [positionSearchData, setPositionSearchData] = useState('')
    const [levelPage, setLevelPage] = useState(1)
    const [levelLimit, setLevelLimit] = useState(5)
    const [levelSearchData, setLevelSearchData] = useState('')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Perusahaan')
    const [sortOrder, setSortOrder] = useState('asc')

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Perusahaan') {
            setCompanyPage(page)
        } else if (selectedItem === 'Area') {
            setAreaPage(page)
        } else if (selectedItem === 'Cabang') {
            setBranchPage(page)
        } else if (selectedItem === 'Divisi') {
            setDivisionPage(page)
        } else if (selectedItem === 'Jabatan') {
            setPositionPage(page)
        } else if (selectedItem === 'Job Level') {
            setLevelPage(page)
        }
    }

    const buttons = [
        {
            title: 'Perusahaan',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Area',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Cabang',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Divisi',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Jabatan',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Job Level',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchCompanyData(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/company?page=' +
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

    const { data: companyData } = useQuery({
        queryKey: [
            'company',
            companyPage,
            companySearchData,
            companyLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchCompanyData(companyPage, companySearchData, companyLimit),
    })

    async function fetchArea(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/area?page=' +
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

    const { data: areaData } = useQuery({
        queryKey: ['area', areaPage, areaSearchData, areaLimit, sortOrder],
        queryFn: () => fetchArea(areaPage, areaSearchData, areaLimit),
    })

    async function fetchBranch(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/branch?page=' +
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

    const { data: branchData } = useQuery({
        queryKey: [
            'branch',
            branchPage,
            branchSearchData,
            branchLimit,
            sortOrder,
        ],
        queryFn: () => fetchBranch(branchPage, branchSearchData, branchLimit),
    })

    async function fetchDivision(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/division?page=' +
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

    const { data: divisionData } = useQuery({
        queryKey: [
            'division',
            divisionPage,
            divisionSearchData,
            divisionLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchDivision(divisionPage, divisionSearchData, divisionLimit),
    })

    async function fetchPosition(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/position-of-work?page=' +
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

    const { data: positionData } = useQuery({
        queryKey: [
            'position-of-work',
            positionPage,
            positionSearchData,
            positionLimit,
            sortOrder,
        ],
        queryFn: () =>
            fetchPosition(positionPage, positionSearchData, positionLimit),
    })

    async function fetchLevel(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/level?page=' +
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

    const { data: levelData } = useQuery({
        queryKey: ['level', levelPage, levelSearchData, levelLimit, sortOrder],
        queryFn: () => fetchLevel(levelPage, levelSearchData, levelLimit),
    })

    return (
        <>
            <div>
                <div className="w-full flex-wrap flex justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>Data {selectedItem}</h5>
                    </div>
                    <div>
                        {selectedItem === 'Perusahaan' ? null : (
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Perusahaan') {
                                        setShowAddCompanyModal(
                                            !showAddCompanyModal
                                        )
                                    } else if (selectedItem === 'Area') {
                                        setShowAddAreaModal(!showAddAreaModal)
                                    } else if (selectedItem === 'Cabang') {
                                        setShowAddBranchModal(
                                            !showAddBranchModal
                                        )
                                    } else if (selectedItem === 'Divisi') {
                                        setShowAddDivisionModal(
                                            !showAddDivisionModal
                                        )
                                    } else if (selectedItem === 'Jabatan') {
                                        setShowAddPositionModal(
                                            !showAddPositionModal
                                        )
                                    } else if (selectedItem === 'Job Level') {
                                        setShowAddLevelModal(!showAddLevelModal)
                                    }
                                }}
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text={
                                    selectedItem === 'Area'
                                        ? 'Buat Area'
                                        : selectedItem === 'Cabang'
                                          ? 'Buat Cabang'
                                          : selectedItem === 'Divisi'
                                            ? 'Buat Divisi'
                                            : selectedItem === 'Jabatan'
                                              ? 'Buat Jabatan'
                                              : 'Buat Job Level'
                                }
                            />
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        search={
                            <div>
                                {selectedItem === 'Perusahaan' ? null : (
                                    <InputGroup
                                        id="largesize"
                                        type="text"
                                        placeholder="Cari"
                                        className="h-[48px]"
                                        append={
                                            <Icon icon="heroicons-outline:search" />
                                        }
                                        onChange={(e) => {
                                            setCompanySearchData(e.target.value)
                                            setAreaSearchData(e.target.value)
                                            setBranchSearchData(e.target.value)
                                            setDivisionSearchData(
                                                e.target.value
                                            )
                                            setPositionSearchData(
                                                e.target.value
                                            )
                                            setLevelSearchData(e.target.value)
                                            fetchCompanyData()
                                            fetchArea()
                                            fetchBranch()
                                            fetchDivision()
                                            fetchPosition()
                                            fetchLevel()
                                        }}
                                    />
                                )}
                            </div>
                        }
                    >
                        <Tab.Group>
                            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                                {buttons.map((item, i) => (
                                    <Tab as={Fragment} key={i}>
                                        {({ selected }) => (
                                            <button
                                                className={`text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
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
                                        <AddCompanyForm />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <AreaTable
                                            showViewAreaModal={
                                                setShowViewAreaModal
                                            }
                                            showEditAreaModal={
                                                setShowEditAreaModal
                                            }
                                            showDeleteAreaModal={
                                                setShowDeleteAreaModal
                                            }
                                            areaData={areaData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <BranchTable
                                            showViewBranchModal={
                                                setShowViewBranchModal
                                            }
                                            showEditBranchModal={
                                                setShowEditBranchModal
                                            }
                                            showDeleteBranchModal={
                                                setShowDeleteBranchModal
                                            }
                                            branchData={branchData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <DivisionTable
                                            showViewDivisionModal={
                                                setShowViewDivisionModal
                                            }
                                            showEditDivisionModal={
                                                setShowEditDivisionModal
                                            }
                                            showDeleteDivisionModal={
                                                setShowDeleteDivisionModal
                                            }
                                            divisionData={divisionData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <PositionTable
                                            showViewPositionModal={
                                                setShowViewPositionModal
                                            }
                                            showEditPositionModal={
                                                setShowEditPositionModal
                                            }
                                            showDeletePositionModal={
                                                setShowDeletePositionModal
                                            }
                                            positionData={positionData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <LevelTable
                                            showViewLevelModal={
                                                setShowViewLevelModal
                                            }
                                            showEditLevelModal={
                                                setShowEditLevelModal
                                            }
                                            showDeleteLevelModal={
                                                setShowDeleteLevelModal
                                            }
                                            levelData={levelData}
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
                                if (selectedItem === 'Perusahaan') {
                                    setCompanyLimit(e.target.value)
                                    fetchCompanyData()
                                } else if (selectedItem === 'Area') {
                                    setAreaLimit(e.target.value)
                                    fetchArea()
                                } else if (selectedItem === 'Cabang') {
                                    setBranchLimit(e.target.value)
                                    fetchBranch()
                                } else if (selectedItem === 'Divisi') {
                                    setDivisionLimit(e.target.value)
                                    fetchDivision()
                                } else if (selectedItem === 'Jabatan') {
                                    setPositionLimit(e.target.value)
                                    fetchPosition()
                                } else if (selectedItem === 'Job Level') {
                                    setLevelLimit(e.target.value)
                                    fetchLevel()
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
                        {selectedItem === 'Perusahaan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {companyData?.currentPage} of{' '}
                                {companyData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Area' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {areaData?.currentPage} of{' '}
                                {areaData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Cabang' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {branchData?.currentPage} of{' '}
                                {branchData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Divisi' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {divisionData?.currentPage} of{' '}
                                {divisionData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Jabatan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {positionData?.currentPage} of{' '}
                                {positionData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {levelData?.currentPage} of{' '}
                                {levelData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Perusahaan'
                                    ? companyData?.totalPages
                                    : selectedItem === 'Area'
                                      ? areaData?.totalPages
                                      : selectedItem === 'Cabang'
                                        ? branchData?.totalPages
                                        : selectedItem === 'Divisi'
                                          ? divisionData?.totalPages
                                          : selectedItem === 'Jabatan'
                                            ? positionData?.totalPages
                                            : levelData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Perusahaan'
                                    ? companyData?.currentPage
                                    : selectedItem === 'Area'
                                      ? areaData?.currentPage
                                      : selectedItem === 'Cabang'
                                        ? branchData?.currentPage
                                        : selectedItem === 'Divisi'
                                          ? divisionData?.currentPage
                                          : selectedItem === 'Jabatan'
                                            ? positionData?.currentPage
                                            : levelData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Perusahaan"
                    label="Tambah Perusahaan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddCompanyModal}
                    onClose={() => {
                        setShowAddCompanyModal(!showAddCompanyModal)
                    }}
                >
                    <AddCompanyForm
                        showAddCompanyModal={setShowAddCompanyModal}
                    />
                </Modal>
                <Modal
                    title="Edit Perusahaan"
                    label="Edit Perusahaan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditCompanyModal}
                    onClose={() => {
                        setShowEditCompanyModal(!showEditCompanyModal)
                    }}
                >
                    <EditCompanyForm
                        showEditCompanyModal={setShowEditCompanyModal}
                    />
                </Modal>
                <Modal
                    title="Detail Perusahaan"
                    label="Detail Perusahaan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewCompanyModal}
                    onClose={() => {
                        setShowViewCompanyModal(!showViewCompanyModal)
                    }}
                >
                    <DetailCompanyForm
                        showViewCompanyModal={setShowViewCompanyModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Perusahaan"
                    label="Hapus Perusahaan"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteCompanyModal}
                    onClose={() => {
                        setShowDeleteCompanyModal(!showDeleteCompanyModal)
                    }}
                >
                    <DeleteCompanyForm
                        showDeleteCompanyModal={setShowDeleteCompanyModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Area"
                    label="Tambah Area"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddAreaModal}
                    onClose={() => {
                        setShowAddAreaModal(!showAddAreaModal)
                    }}
                >
                    <AddAreaForm showAddAreaModal={setShowAddAreaModal} />
                </Modal>
                <Modal
                    title="Edit Area"
                    label="Edit Area"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditAreaModal}
                    onClose={() => {
                        setShowEditAreaModal(!showEditAreaModal)
                    }}
                >
                    <EditAreaForm showEditAreaModal={setShowEditAreaModal} />
                </Modal>
                <Modal
                    title="Detail Area"
                    label="Detail Area"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewAreaModal}
                    onClose={() => {
                        setShowViewAreaModal(!showViewAreaModal)
                    }}
                >
                    <DetailAreaForm showViewAreaModal={setShowViewAreaModal} />
                </Modal>
                <Modal
                    title="Hapus Area"
                    label="Hapus Area"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteAreaModal}
                    onClose={() => {
                        setShowDeleteAreaModal(!showDeleteAreaModal)
                    }}
                >
                    <DeleteAreaForm
                        showDeleteAreaModal={setShowDeleteAreaModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Cabang"
                    label="Tambah Cabang"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddBranchModal}
                    onClose={() => {
                        setShowAddBranchModal(!showAddBranchModal)
                    }}
                >
                    <AddBranchForm showAddBranchModal={setShowAddBranchModal} />
                </Modal>
                <Modal
                    title="Edit Cabang"
                    label="Edit Cabang"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditBranchModal}
                    onClose={() => {
                        setShowEditBranchModal(!showEditBranchModal)
                    }}
                >
                    <EditBranchForm
                        showEditBranchModal={setShowEditBranchModal}
                    />
                </Modal>
                <Modal
                    title="Detail Cabang"
                    label="Detail Cabang"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewBranchModal}
                    onClose={() => {
                        setShowViewBranchModal(!showViewBranchModal)
                    }}
                >
                    <DetailBranchForm
                        showViewBranchModal={setShowViewBranchModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Cabang"
                    label="Hapus Cabang"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteBranchModal}
                    onClose={() => {
                        setShowDeleteBranchModal(!showDeleteBranchModal)
                    }}
                >
                    <DeleteBranchForm
                        showDeleteBranchModal={setShowDeleteBranchModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Divisi"
                    label="Tambah Divisi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddDivisionModal}
                    onClose={() => {
                        setShowAddDivisionModal(!showAddDivisionModal)
                    }}
                >
                    <AddDivisionForm
                        showAddDivisionModal={setShowAddDivisionModal}
                    />
                </Modal>
                <Modal
                    title="Edit Divisi"
                    label="Edit Divisi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditDivisionModal}
                    onClose={() => {
                        setShowEditDivisionModal(!showEditDivisionModal)
                    }}
                >
                    <EditDivisionForm
                        showEditDivisionModal={setShowEditDivisionModal}
                    />
                </Modal>
                <Modal
                    title="Detail Divisi"
                    label="Detail Divisi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewDivisionModal}
                    onClose={() => {
                        setShowViewDivisionModal(!showViewDivisionModal)
                    }}
                >
                    <DetailDivisionForm
                        showViewDivisionModal={setShowViewDivisionModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Divisi"
                    label="Hapus Divisi"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteDivisionModal}
                    onClose={() => {
                        setShowDeleteDivisionModal(!showDeleteDivisionModal)
                    }}
                >
                    <DeleteDivisionForm
                        showDeleteDivisionModal={setShowDeleteDivisionModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Jabatan"
                    label="Tambah Jabatan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddPositionModal}
                    onClose={() => {
                        setShowAddPositionModal(!showAddPositionModal)
                    }}
                >
                    <AddPositionForm
                        showAddPositionModal={setShowAddPositionModal}
                    />
                </Modal>
                <Modal
                    title="Edit Jabatan"
                    label="Edit Jabatan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditPositionModal}
                    onClose={() => {
                        setShowEditPositionModal(!showEditPositionModal)
                    }}
                >
                    <EditPositionForm
                        showEditPositionModal={setShowEditPositionModal}
                    />
                </Modal>
                <Modal
                    title="Detail Jabatan"
                    label="Detail Jabatan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewPositionModal}
                    onClose={() => {
                        setShowViewPositionModal(!showViewPositionModal)
                    }}
                >
                    <DetailPositionForm
                        showViewPositionModal={setShowViewPositionModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Jabatan"
                    label="Hapus Jabatan"
                    labelClass="btn-outline-dark"
                    activeModal={showDeletePositionModal}
                    onClose={() => {
                        setShowDeletePositionModal(!showDeletePositionModal)
                    }}
                >
                    <DeletePositionForm
                        showDeletePositionModal={setShowDeletePositionModal}
                    />
                </Modal>
                <Modal
                    title="Tambah Job Level"
                    label="Tambah Job Level"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddLevelModal}
                    onClose={() => {
                        setShowAddLevelModal(!showAddLevelModal)
                    }}
                >
                    <AddLevelForm showAddLevelModal={setShowAddLevelModal} />
                </Modal>
                <Modal
                    title="Edit Job Level"
                    label="Edit Job Level"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditLevelModal}
                    onClose={() => {
                        setShowEditLevelModal(!showEditLevelModal)
                    }}
                >
                    <EditLevelForm showEditLevelModal={setShowEditLevelModal} />
                </Modal>
                <Modal
                    title="Detail Job Level"
                    label="Detail Job Level"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewLevelModal}
                    onClose={() => {
                        setShowViewLevelModal(!showViewLevelModal)
                    }}
                >
                    <DetailLevelForm
                        showViewLevelModal={setShowViewLevelModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Job Level"
                    label="Hapus Job Level"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteLevelModal}
                    onClose={() => {
                        setShowDeleteLevelModal(!showDeleteLevelModal)
                    }}
                >
                    <DeleteLevelForm
                        showDeleteLevelModal={setShowDeleteLevelModal}
                    />
                </Modal>
            </div>
        </>
    )
}
