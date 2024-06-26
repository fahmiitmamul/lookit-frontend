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
import IncomingAssets from '@/components/aset/tabel-aset-masuk/page'
import OutgoingAssetsTable from '@/components/aset/tabel-aset-keluar/page'
import AddIncomingAssetsForm from '@/components/aset/form-tambah-aset-masuk/page'
import EditIncomingAssetsForm from '@/components/aset/form-edit-aset-masuk/page'
import DetailIncomingAssetsForm from '@/components/aset/form-detail-aset-masuk/page'
import DeleteIncomingAssetsForm from '@/components/aset/form-hapus-aset-masuk/page'
import AddOutgoingAssetsForm from '@/components/aset/form-tambah-aset-keluar/page'
import EditOutgoingAssetsForm from '@/components/aset/form-edit-aset-keluar/page'
import DetailOutgoingAssetsForm from '@/components/aset/form-detail-aset-keluar/page'
import DeleteOutgoingAssetForm from '@/components/aset/form-hapus-aset-keluar/page'
import Dropdown from '@/components/ui/Dropdown'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import IncomingAssetsDocument from '@/components/aset/download-pdf-aset-masuk/page'
import OutgoingAssetsDocument from '@/components/aset/download-pdf-aset-keluar/page'

export default function Aset() {
    const [makeAssetPage, setMakeAssetPage] = useState(1)
    const [makeAssetLimit, setMakeAssetLimit] = useState(5)
    const [makeAssetSearchData, setMakeAssetSearchData] = useState('')
    const [incomingAssetsPage, setIncomingAssetsPage] = useState(1)
    const [incomingAssetsLimit, setIncomingAssetsLimit] = useState(5)
    const [incomingAssetsSearchData, setIncomingAssetsSearchData] = useState('')
    const [outgoingAssetsPage, setOutgoingAssetsPage] = useState(1)
    const [outgoingAssetsLimit, setOutgoingAssetsLimit] = useState(5)
    const [outgoingAssetsSearchData, setOutgoingAssetsSearchData] = useState('')
    const selectedAssetsData = useSelector(
        (state) => state.assets.assets.selectedAssets
    )
    const [isClient, setIsClient] = useState(false)

    const [showAddIncomingAssetsModal, setShowAddIncomingAssetsModal] =
        useState(false)
    const [showEditIncomingAssetsModal, setShowEditIncomingAssetsModal] =
        useState(false)
    const [showViewIncomingAssetsModal, setShowViewIncomingAssetsModal] =
        useState(false)
    const [showDeleteIncomingAssetsModal, setShowDeleteIncomingAssetsModal] =
        useState(false)
    const [showAddOutgoingAssetsModal, setShowAddOutgoingAssetsModal] =
        useState(false)
    const [showEditOutgoingAssetsModal, setShowEditOutgoingAssetsModal] =
        useState(false)
    const [showViewOutgoingAssetsModal, setShowViewOutgoingAssetsModal] =
        useState(false)
    const [showDeleteOutgoingAssetsModal, setShowDeleteOutgoingAssetsModal] =
        useState(false)
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const [showImportModal, setShowImportModal] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Aset Masuk')

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
        fetchIncomingAssets(
            incomingAssetsPage,
            incomingAssetsSearchData,
            incomingAssetsSearchData
        )
        fetchOutgoingAssets(
            outgoingAssetsPage,
            outgoingAssetsSearchData,
            outgoingAssetsLimit
        )

        queryClient.invalidateQueries({ queryKey: ['incoming-assets'] })
        queryClient.invalidateQueries({ queryKey: ['outgoing-assets'] })
    }

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Aset Masuk') {
            setIncomingAssetsPage(page)
        } else {
            setOutgoingAssetsPage(page)
        }
    }

    const buttons = [
        {
            title: 'Aset Masuk',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Aset Keluar',
            icon: 'heroicons-outline:user',
        },
    ]

    const { employee_id } = useSelector((state) => state.employee.employee)

    async function fetchIncomingAssets(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/incoming-assets?page=' +
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

    const { data: incomingAssetsData } = useQuery({
        queryKey: [
            'incoming-assets',
            incomingAssetsPage,
            incomingAssetsSearchData,
            incomingAssetsLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchIncomingAssets(
                incomingAssetsPage,
                incomingAssetsSearchData,
                incomingAssetsLimit
            ),
    })

    async function fetchOutgoingAssets(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/outgoing-assets?page=' +
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

    const { data: outgoingAssetsData } = useQuery({
        queryKey: [
            'outgoing-assets',
            outgoingAssetsPage,
            outgoingAssetsSearchData,
            outgoingAssetsLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchOutgoingAssets(
                outgoingAssetsPage,
                outgoingAssetsSearchData,
                outgoingAssetsLimit
            ),
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div>
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Aset Masuk') {
                                        setShowAddIncomingAssetsModal(
                                            !showAddIncomingAssetsModal
                                        )
                                    } else {
                                        setShowAddOutgoingAssetsModal(
                                            !showAddOutgoingAssetsModal
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
                                ]}
                                classMenuItems="left-0 w-[220px] top-[110%]"
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
                                placeholder="Cari Aset"
                                className="h-[48px]"
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                                onChange={(e) => {
                                    setMakeAssetSearchData(e.target.value)
                                    setIncomingAssetsSearchData(e.target.value)
                                    setOutgoingAssetsSearchData(e.target.value)
                                    fetchAssets()
                                    fetchIncomingAssets()
                                    fetchOutgoingAssets()
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5 mt-8 md:mt-0">
                        <div>
                            {isClient ? (
                                <Button
                                    text="Download PDF"
                                    icon="heroicons-outline:newspaper"
                                    className="bg-warning-500 text-white"
                                    onClick={() => {
                                        selectedAssetsData?.length == 0 &&
                                            toast.error(
                                                'Silahkan ceklis data terlebih dahulu'
                                            )
                                    }}
                                    children={
                                        selectedAssetsData?.length >= 1 ? (
                                            <div>
                                                <PDFDownloadLink
                                                    document={
                                                        selectedItem ===
                                                        'Aset Masuk' ? (
                                                            <IncomingAssetsDocument
                                                                data={
                                                                    selectedAssetsData
                                                                }
                                                            />
                                                        ) : (
                                                            <OutgoingAssetsDocument
                                                                data={
                                                                    selectedAssetsData
                                                                }
                                                            />
                                                        )
                                                    }
                                                    fileName="data-aset.pdf"
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
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card title="Data Aset">
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
                                        <IncomingAssets
                                            setShowViewIncomingAssetsModal={
                                                setShowViewIncomingAssetsModal
                                            }
                                            setShowEditIncomingAssetsModal={
                                                setShowEditIncomingAssetsModal
                                            }
                                            setShowDeleteIncomingAssetsModal={
                                                setShowDeleteIncomingAssetsModal
                                            }
                                            incomingAssetsData={
                                                incomingAssetsData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <OutgoingAssetsTable
                                            setShowViewOutgoingAssetsModal={
                                                setShowViewOutgoingAssetsModal
                                            }
                                            setShowEditOutgoingAssetsModal={
                                                setShowEditOutgoingAssetsModal
                                            }
                                            setShowDeleteOutgoingAssetsModal={
                                                setShowDeleteOutgoingAssetsModal
                                            }
                                            outgoingAssetsData={
                                                outgoingAssetsData
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
                                if (selectedItem === 'Aset Masuk') {
                                    setIncomingAssetsLimit(e.target.value)
                                    fetchIncomingAssets()
                                } else {
                                    setOutgoingAssetsLimit(e.target.value)
                                    fetchOutgoingAssets()
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
                        {selectedItem === 'Aset Masuk' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {incomingAssetsData?.currentPage} of{' '}
                                {incomingAssetsData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {outgoingAssetsData?.currentPage} of{' '}
                                {outgoingAssetsData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Aset Masuk'
                                    ? incomingAssetsData?.totalPages
                                    : outgoingAssetsData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Aset Masuk'
                                    ? incomingAssetsData?.currentPage
                                    : outgoingAssetsData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>

                <Modal
                    title="Buat Aset Masuk"
                    label="Buat Aset Masuk"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddIncomingAssetsModal}
                    onClose={() => {
                        setShowAddIncomingAssetsModal(
                            !showAddIncomingAssetsModal
                        )
                    }}
                >
                    <AddIncomingAssetsForm
                        setShowAddIncomingAssetsModal={
                            setShowAddIncomingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Aset Masuk"
                    label="Edit Aset Masuk"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditIncomingAssetsModal}
                    onClose={() => {
                        setShowEditIncomingAssetsModal(
                            !showEditIncomingAssetsModal
                        )
                    }}
                >
                    <EditIncomingAssetsForm
                        setShowEditIncomingAssetsModal={
                            setShowEditIncomingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Aset Masuk"
                    label="Detail Aset Masuk"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewIncomingAssetsModal}
                    onClose={() => {
                        setShowViewIncomingAssetsModal(
                            !showViewIncomingAssetsModal
                        )
                    }}
                >
                    <DetailIncomingAssetsForm
                        setShowViewIncomingAssetsModal={
                            setShowViewIncomingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Aset Masuk"
                    label="Hapus Aset Masuk"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteIncomingAssetsModal}
                    onClose={() => {
                        setShowDeleteIncomingAssetsModal(
                            !showDeleteIncomingAssetsModal
                        )
                    }}
                >
                    <DeleteIncomingAssetsForm
                        setShowDeleteIncomingAssetsModal={
                            setShowDeleteIncomingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Buat Aset Keluar"
                    label="Buat Aset Keluar"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddOutgoingAssetsModal}
                    onClose={() => {
                        setShowAddOutgoingAssetsModal(
                            !showAddOutgoingAssetsModal
                        )
                    }}
                >
                    <AddOutgoingAssetsForm
                        setShowAddOutgoingAssetsModal={
                            setShowAddOutgoingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Aset Keluar"
                    label="Edit Aset Keluar"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditOutgoingAssetsModal}
                    onClose={() => {
                        setShowEditOutgoingAssetsModal(
                            !showEditOutgoingAssetsModal
                        )
                    }}
                >
                    <EditOutgoingAssetsForm
                        setShowEditOutgoingAssetsModal={
                            setShowEditOutgoingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Aset Keluar"
                    label="Detail Aset Keluar"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewOutgoingAssetsModal}
                    onClose={() => {
                        setShowViewOutgoingAssetsModal(
                            !showViewOutgoingAssetsModal
                        )
                    }}
                >
                    <DetailOutgoingAssetsForm
                        setShowViewOutgoingAssetsModal={
                            setShowViewOutgoingAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Aset Keluar"
                    label="Hapus Aset Keluar"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteOutgoingAssetsModal}
                    onClose={() => {
                        setShowDeleteOutgoingAssetsModal(
                            !showDeleteOutgoingAssetsModal
                        )
                    }}
                >
                    <DeleteOutgoingAssetForm
                        setShowDeleteOutgoingAssetsModal={
                            setShowDeleteOutgoingAssetsModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
