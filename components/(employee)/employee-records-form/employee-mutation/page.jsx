'use client'
import React, { Fragment, useEffect } from 'react'
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
import PositionMutationTable from '@/components/mutation/tabel-mutasi-jabatan/page'
import LocationMutationTable from '@/components/mutation/tabel-mutasi-lokasi/page'
import AddLocationMutation from '@/components/mutation/form-tambah-mutasi-lokasi/page'
import EditLocationMutation from '@/components/mutation/form-edit-mutasi-lokasi/page'
import DeleteLocationMutation from '@/components/mutation/form-hapus-mutasi-lokasi/page'
import DetailMutationPositionForm from '@/components/mutation/form-detail-mutasi-jabatan/page'
import DetailMutationLocationForm from '@/components/mutation/form-detail-mutasi-lokasi/page'
import AddMutationPositionForm from '@/components/mutation/form-tambah-mutasi-jabatan/page'
import EditMutationPositionForm from '@/components/mutation/form-edit-mutasi-jabatan/page'
import DeleteMutationPositionForm from '@/components/mutation/form-hapus-mutasi-jabatan/page'
import Dropdown from '@/components/ui/Dropdown'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MutationDocument from '@/components/mutation/download-pdf-mutasi/page'

export default function Mutasi() {
    const [showAddMutationPositionModal, setShowAddMutationPositionModal] =
        useState(false)
    const [showEditMutationPositionModal, setShowEditMutationPositionModal] =
        useState(false)
    const [
        showDeleteMutationPositionModal,
        setShowDeleteMutationPositionModal,
    ] = useState(false)
    const [showViewMutationPositionModal, setShowViewMutationPositionModal] =
        useState(false)
    const [showAddMutationLocationModal, setShowAddMutationLocationModal] =
        useState(false)
    const [showEditMutationLocationModal, setShowEditMutationLocationModal] =
        useState(false)
    const [showViewMutationLocationModal, setShowViewMutationLocationModal] =
        useState(false)
    const [
        showDeleteMutationLocationModal,
        setShowDeleteMutationLocationModal,
    ] = useState(false)
    const [mutationLocationPage, setMutationLocationPage] = useState(1)
    const [mutationLocationLimit, setMutationLocationLimit] = useState(5)
    const [mutationLocationSearchData, setMutationLocationSearchData] =
        useState('')
    const [mutationPositionPage, setMutationPositionPage] = useState(1)
    const [mutationPositionLimit, setMutationPositionLimit] = useState(5)
    const [mutationPositionSearchData, setMutationPositionSearchData] =
        useState('')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Jabatan')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const selectedMutationData = useSelector(
        (state) => state.mutation.mutation.selectedMutation
    )
    const [isClient, setIsClient] = useState(false)

    const { employee_id } = useSelector((state) => state.employee.employee)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Jabatan') {
            setMutationPositionPage(page)
        } else {
            setMutationLocationPage(page)
        }
    }

    const buttons = [
        {
            title: 'Jabatan',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Lokasi',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchMutationPosition(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/mutation/position?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&employee_id=' +
                employee_id
        )
        return data.results
    }

    const { data: mutationPositionData } = useQuery({
        queryKey: [
            'mutation-position',
            mutationPositionPage,
            mutationPositionSearchData,
            mutationPositionLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchMutationPosition(
                mutationPositionPage,
                mutationPositionSearchData,
                mutationPositionLimit
            ),
    })

    async function fetchMutationLocation(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/mutation/location?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&employee_id=' +
                employee_id
        )
        return data.results
    }

    const { data: mutationLocationData } = useQuery({
        queryKey: [
            'mutation-location',
            mutationLocationPage,
            mutationLocationSearchData,
            mutationLocationLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchMutationLocation(
                mutationLocationPage,
                mutationLocationSearchData,
                mutationLocationLimit
            ),
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
        fetchMutationLocation(
            mutationLocationPage,
            mutationLocationSearchData,
            mutationLocationLimit
        )
        fetchMutationPosition(
            mutationPositionPage,
            mutationPositionSearchData,
            mutationPositionLimit
        )

        queryClient.invalidateQueries({ queryKey: ['mutation-position'] })
        queryClient.invalidateQueries({ queryKey: ['mutation-location'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div>
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Jabatan') {
                                        setShowAddMutationPositionModal(
                                            !showAddMutationPositionModal
                                        )
                                    } else {
                                        setShowAddMutationLocationModal(
                                            !showAddMutationLocationModal
                                        )
                                    }
                                }}
                                icon="heroicons-outline:plus"
                                className="btn-success"
                            />
                        </div>
                        <div>
                            <Dropdown
                                items={[
                                    {
                                        label: 'ID',
                                        onClick: () => {
                                            handleSort('id')
                                        },
                                    },
                                    {
                                        label: 'Nama',
                                        onClick: () => {
                                            handleSort('name')
                                        },
                                    },
                                ]}
                                classMenuItems="left-0  w-[220px] top-[110%]"
                                label={
                                    <Button
                                        className="btn-primary"
                                        icon="heroicons-outline:arrows-up-down"
                                        div
                                    />
                                }
                            ></Dropdown>
                        </div>
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder="Cari Mutasi"
                                className="h-[48px]"
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                                onChange={(e) => {
                                    setMutationLocationSearchData(
                                        e.target.value
                                    )
                                    setMutationPositionSearchData(
                                        e.target.value
                                    )
                                    fetchMutationLocation()
                                    fetchMutationPosition()
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        {isClient ? (
                            <Button
                                text="Download PDF"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedMutationData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedMutationData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <MutationDocument
                                                        data={
                                                            selectedMutationData
                                                        }
                                                    />
                                                }
                                                fileName="data-mutasi.pdf"
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
                                    ) : null
                                }
                            />
                        ) : null}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card>
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
                                        <PositionMutationTable
                                            setShowViewMutationPositionModal={
                                                setShowViewMutationPositionModal
                                            }
                                            setShowEditMutationPositionModal={
                                                setShowEditMutationPositionModal
                                            }
                                            setShowDeleteMutationPositionModal={
                                                setShowDeleteMutationPositionModal
                                            }
                                            positionMutationData={
                                                mutationPositionData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <LocationMutationTable
                                            setShowViewMutationLocationModal={
                                                setShowViewMutationLocationModal
                                            }
                                            setShowEditMutationLocationModal={
                                                setShowEditMutationLocationModal
                                            }
                                            setShowDeleteMutationLocationModal={
                                                setShowDeleteMutationLocationModal
                                            }
                                            locationMutationData={
                                                mutationLocationData
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
                                if (selectedItem === 'Jabatan') {
                                    setMutationPositionLimit(e.target.value)
                                    fetchMutationPosition()
                                } else {
                                    setMutationLocationLimit(e.target.value)
                                    fetchMutationLocation()
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
                        {selectedItem === 'Jabatan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mutationPositionData?.currentPage} of{' '}
                                {mutationPositionData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mutationLocationData?.currentPage} of{' '}
                                {mutationLocationData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Jabatan'
                                    ? mutationPositionData?.totalPages
                                    : mutationLocationData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Jabatan'
                                    ? mutationPositionData?.currentPage
                                    : mutationLocationData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Mutasi Jabatan"
                    label="Tambah Mutasi Jabatan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddMutationPositionModal}
                    onClose={() => {
                        setShowAddMutationPositionModal(
                            !showAddMutationPositionModal
                        )
                    }}
                >
                    <AddMutationPositionForm
                        showAddMutationPositionModal={
                            setShowAddMutationPositionModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Mutasi Jabatan"
                    label="Edit Mutasi Jabatan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditMutationPositionModal}
                    onClose={() => {
                        setShowEditMutationPositionModal(
                            !showEditMutationPositionModal
                        )
                    }}
                >
                    <EditMutationPositionForm
                        showEditMutationPositionModal={
                            setShowEditMutationPositionModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Mutasi Jabatan"
                    label="Detail Mutasi Jabatan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewMutationPositionModal}
                    onClose={() => {
                        setShowViewMutationPositionModal(
                            !showViewMutationPositionModal
                        )
                    }}
                >
                    <DetailMutationPositionForm
                        showViewMutationPositionModal={
                            setShowViewMutationPositionModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Mutasi Jabatan"
                    label="Hapus Mutasi Jabatan"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteMutationPositionModal}
                    onClose={() => {
                        setShowDeleteMutationPositionModal(
                            !showDeleteMutationPositionModal
                        )
                    }}
                >
                    <DeleteMutationPositionForm
                        showDeleteMutationPositionModal={
                            setShowDeleteMutationPositionModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Mutasi Lokasi"
                    label="Tambah Mutasi Lokasi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddMutationLocationModal}
                    onClose={() => {
                        setShowAddMutationLocationModal(
                            !showAddMutationLocationModal
                        )
                    }}
                >
                    <AddLocationMutation
                        showAddMutationLocationModal={
                            setShowAddMutationLocationModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Mutasi Lokasi"
                    label="Edit Mutasi Lokasi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditMutationLocationModal}
                    onClose={() => {
                        setShowEditMutationLocationModal(
                            !showEditMutationLocationModal
                        )
                    }}
                >
                    <EditLocationMutation
                        showEditLocationMutationModal={
                            setShowEditMutationLocationModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Mutasi Lokasi"
                    label="Detail Mutasi Lokasi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewMutationLocationModal}
                    onClose={() => {
                        setShowViewMutationLocationModal(
                            !showViewMutationLocationModal
                        )
                    }}
                >
                    <DetailMutationLocationForm
                        showViewMutationLocationModal={
                            setShowViewMutationLocationModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Mutasi Lokasi"
                    label="Hapus Mutasi Lokasi"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteMutationLocationModal}
                    onClose={() => {
                        setShowDeleteMutationLocationModal(
                            !showDeleteMutationLocationModal
                        )
                    }}
                >
                    <DeleteLocationMutation
                        showDeleteMutationLocationModal={
                            setShowDeleteMutationLocationModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
