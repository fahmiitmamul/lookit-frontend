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
import MakeAssetsTable from '@/components/assets/make-assets-table/page'
import IncomingAssets from '@/components/assets/incoming-assets-table/page'
import OutgoingAssetsTable from '@/components/assets/outgoing-assets-table/page'
import AddAssetsForm from '@/components/assets/add-make-assets-form/page'
import EditMakeAssetsForm from '@/components/assets/edit-make-assets-form/page'
import DetailMakeAssetsForm from '@/components/assets/detail-make-assets-form/page'
import DeleteMakeAssetsForm from '@/components/assets/delete-make-assets-form/page'
import AddIncomingAssetsForm from '@/components/assets/add-incoming-assets-form/page'
import EditIncomingAssetsForm from '@/components/assets/edit-incoming-assets-form/page'
import DetailIncomingAssetsForm from '@/components/assets/detail-incoming-assets-form/page'
import DeleteIncomingAssetsForm from '@/components/assets/delete-incoming-assets-form/page'
import AddOutgoingAssetsForm from '@/components/assets/add-outgoing-assets-form/page'
import EditOutgoingAssetsForm from '@/components/assets/edit-outgoing-assets-form/page'
import DetailOutgoingAssetsForm from '@/components/assets/detail-outgoing-assets-form/page'
import DeleteOutgoingAssetForm from '@/components/assets/delete-outgoing-assets-form/page'
import Dropdown from '@/components/ui/Dropdown'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import AssetsDocument from '@/components/assets/download-pdf-assets/page'
import IncomingAssetsDocument from '@/components/assets/download-pdf-incoming-assets/page'
import OutgoingAssetsDocument from '@/components/assets/download-pdf-outgoing-assets/page'
import ExportToExcelAssets from '@/components/assets/assets-template/page'
import ImportAssetsForm from '@/components/assets/import-assets/page'

export default function Inventaris() {
    const [makeAssetPage, setMakeAssetPage] = useState(1)
    const [makeAssetLimit, setMakeAssetLimit] = useState(5)
    const [makeAssetSearchData, setMakeAssetSearchData] = useState('')
    const [incomingAssetsPage, setIncomingAssetsPage] = useState(1)
    const [incomingAssetsLimit, setIncomingAssetsLimit] = useState(5)
    const [incomingAssetsSearchData, setIncomingAssetsSearchData] = useState('')
    const [outgoingAssetsPage, setOutgoingAssetsPage] = useState(1)
    const [outgoingAssetsLimit, setOutgoingAssetsLimit] = useState(5)
    const [outgoingAssetsSearchData, setOutgoingAssetsSearchData] = useState('')
    const [showAddMakeAssetsModal, setShowAddMakeAssetsModal] = useState(false)
    const selectedAssetsData = useSelector(
        (state) => state.assets.assets.selectedAssets
    )
    const [isClient, setIsClient] = useState(false)
    const [showEditMakeAssetsModal, setShowEditMakeAssetsModal] =
        useState(false)
    const [showViewMakeAssetsModal, setShowViewMakeAssetsModal] =
        useState(false)
    const [showDeleteMakeAssetsModal, setShowDeleteMakeAssetsModal] =
        useState(false)
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
    const [selectedItem, setSelectedItem] = useState('Data Inventaris')

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
        if (selectedItem === 'Data Inventaris') {
            setMakeAssetPage(page)
        } else if (selectedItem === 'Inventaris Masuk') {
            setIncomingAssetsPage(page)
        } else {
            setOutgoingAssetsPage(page)
        }
    }

    const buttons = [
        {
            title: 'Data Inventaris',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Inventaris Masuk',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Inventaris Keluar',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchAssets(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/assets?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder
        )
        return data.results
    }

    const { data: assetsData } = useQuery({
        queryKey: [
            'make-assets',
            makeAssetPage,
            makeAssetSearchData,
            makeAssetLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchAssets(makeAssetPage, makeAssetSearchData, makeAssetLimit),
    })

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
                sortOrder
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
                sortOrder
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
                        <div className="flex justify-center items-center">
                            <h5>
                                {selectedItem === 'Data Inventaris'
                                    ? selectedItem
                                    : selectedItem === 'Inventaris Masuk'
                                      ? 'Data Inventaris Masuk'
                                      : 'Data Inventaris Keluar'}
                            </h5>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5 mt-8 md:mt-0">
                        <div>
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Data Inventaris') {
                                        setShowAddMakeAssetsModal(
                                            !showAddMakeAssetsModal
                                        )
                                    } else if (
                                        selectedItem === 'Inventaris Masuk'
                                    ) {
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
                                text={
                                    selectedItem === 'Data Inventaris'
                                        ? 'Buat Inventaris'
                                        : selectedItem === 'Inventaris Masuk'
                                          ? 'Buat Inventaris Masuk'
                                          : 'Buat Inventaris Keluar'
                                }
                            />
                        </div>
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
                                                        'Data Inventaris' ? (
                                                            <AssetsDocument
                                                                data={
                                                                    selectedAssetsData
                                                                }
                                                            />
                                                        ) : selectedItem ===
                                                          'Inventaris Masuk' ? (
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
                                                    fileName="data-inventaris.pdf"
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
                        {selectedItem === 'Data Inventaris' && (
                            <div className="flex gap-5">
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
                                    <ExportToExcelAssets />
                                </div>
                            </div>
                        )}
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
                                        setMakeAssetSearchData(e.target.value)
                                        setIncomingAssetsSearchData(
                                            e.target.value
                                        )
                                        setOutgoingAssetsSearchData(
                                            e.target.value
                                        )
                                        fetchAssets()
                                        fetchIncomingAssets()
                                        fetchOutgoingAssets()
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
                                        <MakeAssetsTable
                                            setShowViewMakeAssetsModal={
                                                setShowViewMakeAssetsModal
                                            }
                                            setShowEditMakeAssetsModal={
                                                setShowEditMakeAssetsModal
                                            }
                                            setShowDeleteMakeAssetsModal={
                                                setShowDeleteMakeAssetsModal
                                            }
                                            assetsData={assetsData}
                                        />
                                    </div>
                                </Tab.Panel>
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
                                if (selectedItem === 'Data Inventaris') {
                                    setMakeAssetLimit(e.target.value)
                                    fetchAssets()
                                } else if (
                                    selectedItem === 'Inventaris Masuk'
                                ) {
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
                        {selectedItem === 'Data Inventaris' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {assetsData?.currentPage} of{' '}
                                {assetsData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Inventaris Masuk' ? (
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
                                selectedItem === 'Data Inventaris'
                                    ? assetsData?.totalPages
                                    : selectedItem === 'Inventaris Masuk'
                                      ? incomingAssetsData?.totalPages
                                      : outgoingAssetsData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Data Inventaris'
                                    ? assetsData?.currentPage
                                    : selectedItem === 'Inventaris Masuk'
                                      ? incomingAssetsData?.currentPage
                                      : outgoingAssetsData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Import Data Inventaris"
                    label="Import Data Inventaris"
                    labelClass="btn-outline-dark"
                    centered
                    className="max-w-xl"
                    activeModal={showImportModal}
                    onClose={() => {
                        setShowImportModal(!showImportModal)
                    }}
                >
                    <ImportAssetsForm setShowImportModal={setShowImportModal} />
                </Modal>
                <Modal
                    title="Data Inventaris Inventaris"
                    label="Data Inventaris Inventaris"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddMakeAssetsModal}
                    onClose={() => {
                        setShowAddMakeAssetsModal(!showAddMakeAssetsModal)
                    }}
                >
                    <AddAssetsForm
                        setShowAddAssetsModal={setShowAddMakeAssetsModal}
                    />
                </Modal>
                <Modal
                    title="Edit Inventaris"
                    label="Edit Inventaris"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditMakeAssetsModal}
                    onClose={() => {
                        setShowEditMakeAssetsModal(!showEditMakeAssetsModal)
                    }}
                >
                    <EditMakeAssetsForm
                        setShowEditAssetsModal={setShowEditMakeAssetsModal}
                    />
                </Modal>
                <Modal
                    title="Detail Inventaris"
                    label="Detail Inventaris"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewMakeAssetsModal}
                    onClose={() => {
                        setShowViewMakeAssetsModal(!showViewMakeAssetsModal)
                    }}
                >
                    <DetailMakeAssetsForm
                        setShowViewMakeAssetsModal={setShowViewMakeAssetsModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Inventaris"
                    label="Hapus Inventaris"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteMakeAssetsModal}
                    onClose={() => {
                        setShowDeleteMakeAssetsModal(!showDeleteMakeAssetsModal)
                    }}
                >
                    <DeleteMakeAssetsForm
                        setShowDeleteMakeAssetsModal={
                            setShowDeleteMakeAssetsModal
                        }
                    />
                </Modal>
                <Modal
                    title="Data Inventaris Inventaris Masuk"
                    label="Data Inventaris Inventaris Masuk"
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
                    title="Edit Inventaris Masuk"
                    label="Edit Inventaris Masuk"
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
                    title="Detail Inventaris Masuk"
                    label="Detail Inventaris Masuk"
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
                    title="Hapus Inventaris Masuk"
                    label="Hapus Inventaris Masuk"
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
                    title="Data Inventaris Inventaris Keluar"
                    label="Data Inventaris Inventaris Keluar"
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
                    title="Edit Inventaris Keluar"
                    label="Edit Inventaris Keluar"
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
                    title="Detail Inventaris Keluar"
                    label="Detail Inventaris Keluar"
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
                    title="Hapus Inventaris Keluar"
                    label="Hapus Inventaris Keluar"
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
