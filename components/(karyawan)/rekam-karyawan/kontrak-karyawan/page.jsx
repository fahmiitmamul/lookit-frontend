'use client'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import http from '@/app/helpers/http.helper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import ProcessedContractDataTable from '@/components/kontrak/tabel-data-kontrak-proses/page'
import UnfinishedContractTable from '@/components/kontrak/tabel-data-kontrak-tidak-selesai/page'
import FinishedContractTable from '@/components/kontrak/tabel-kontrak-selesai/page'
import Dropdown from '@/components/ui/Dropdown'
import DetailProcessedContractForm from '@/components/kontrak/form-detail-kontrak-proses/page'
import DeleteContractForm from '@/components/kontrak/form-hapus-kontrak-proses/page'
import StatusFinishedContractForm from '@/components/kontrak/form-status-kontrak-selesai/page'
import DeleteFinishedContractForm from '@/components/kontrak/form-hapus-kontrak-selesai/page'
import DetailFinishedContractForm from '@/components/kontrak/form-detail-kontrak-selesai/page'
import StatusProcessedContractForm from '@/components/kontrak/form-status-kontrak-proses/page'
import AddProcessedContractForm from '@/components/kontrak/form-tambah-kontrak-proses/page'
import DeleteUnfinishedContractForm from '@/components/kontrak/form-hapus-kontrak-tidak-selesai/page'
import DetailUnfinishedContractForm from '@/components/kontrak/form-detail-kontrak-tidak-selesai/page'
import StatusUnfinishedContractForm from '@/components/kontrak/form-status-kontrak-tidak-selesai/page'

export default function DataKontrak() {
    const [showAddProcessedContractModal, setShowAddProcessedContractModal] =
        useState(false)
    const [showViewProcessedContractModal, setShowViewProcessedContractModal] =
        useState(false)
    const [
        showStatusProcessedContractModal,
        setShowStatusProcessedContractModal,
    ] = useState(false)
    const [
        showDeleteProcessedContractModal,
        setShowDeleteProcessedContractModal,
    ] = useState(false)
    const [showViewFinishedContractModal, setShowViewFinishedContractModal] =
        useState(false)
    const [
        showStatusFinishedContractModal,
        setShowStatusFinishedContractModal,
    ] = useState(false)
    const [
        showDeleteFinishedContractModal,
        setShowDeleteFinishedContractModal,
    ] = useState(false)
    const [
        showViewUnfinishedContractModal,
        setShowViewUnfinishedContractModal,
    ] = useState(false)
    const [
        showStatusUnfinishedContractModal,
        setShowStatusUnfinishedContractModal,
    ] = useState(false)
    const [
        showDeleteUnfinishedContractModal,
        setShowDeleteUnfinishedContractModal,
    ] = useState(false)
    const [contractPage, setContractPage] = useState(1)
    const [contractLimit, setContractLimit] = useState(5)
    const [contractSearchData, setContractSearchData] = useState('')
    const [finishedContractPage, setFinishedContractPage] = useState(1)
    const [finishedContractLimit, setFinishedContractLimit] = useState(5)
    const [finishedContractSearchData, setFinishedContractSearchData] =
        useState('')
    const [unfinishedContractPage, setUnfinishedContractPage] = useState(1)
    const [unfinishedContractLimit, setUnfinishedContractLimit] = useState(5)
    const [unfinishedContractSearchData, setUnfinishedContractSearchData] =
        useState('')
    const [selectedItem, setSelectedItem] = useState('Proses')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const token = getCookie('token')

    const handlePageChange = (page) => {
        if (selectedItem === 'Proses') {
            setContractPage(page)
        } else if (selectedItem === 'Selesai') {
            setFinishedContractPage(page)
        } else {
            setUnfinishedContractPage(page)
        }
    }

    const buttons = [
        {
            title: 'Proses',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Selesai',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Tidak Selesai',
            icon: 'heroicons-outline:user',
        },
    ]

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    async function fetchContract(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/contract/process?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: contractData } = useQuery({
        queryKey: [
            'processed-contract',
            contractPage,
            contractSearchData,
            contractLimit,
        ],
        queryFn: () =>
            fetchContract(contractPage, contractSearchData, contractLimit),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchFinishedContract(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/contract/finished?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: finishedContractData } = useQuery({
        queryKey: [
            'finished-contract',
            finishedContractPage,
            finishedContractSearchData,
            finishedContractLimit,
        ],
        queryFn: () =>
            fetchFinishedContract(
                finishedContractPage,
                finishedContractSearchData,
                finishedContractLimit
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchUnfinishedContract(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/contract/unfinished?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: unfinishedContractData } = useQuery({
        queryKey: [
            'unfinished-contract',
            unfinishedContractPage,
            unfinishedContractSearchData,
            unfinishedContractLimit,
        ],
        queryFn: () =>
            fetchUnfinishedContract(
                unfinishedContractPage,
                unfinishedContractSearchData,
                unfinishedContractLimit
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }

        fetchContract(contractPage, contractLimit, contractSearchData)
        fetchUnfinishedContract(
            unfinishedContractPage,
            unfinishedContractLimit,
            unfinishedContractSearchData
        )
        fetchFinishedContract(
            finishedContractPage,
            finishedContractLimit,
            finishedContractSearchData
        )

        queryClient.invalidateQueries({ queryKey: ['processed-contract'] })
        queryClient.invalidateQueries({ queryKey: ['finished-contract'] })
        queryClient.invalidateQueries({ queryKey: ['unfinished-contract'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div>
                            {selectedItem === 'Proses' && (
                                <Button
                                    icon="heroicons-outline:plus"
                                    className="btn-success"
                                    onClick={() => {
                                        setShowAddProcessedContractModal(
                                            !showAddProcessedContractModal
                                        )
                                    }}
                                />
                            )}
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
                                placeholder="Cari"
                                onChange={(e) => {
                                    if (selectedItem === 'Proses') {
                                        setContractSearchData(e.target.value)
                                    } else if (selectedItem === 'Selesai') {
                                        setFinishedContractSearchData(
                                            e.target.value
                                        )
                                    } else {
                                        setUnfinishedContractSearchData(
                                            e.target.value
                                        )
                                    }
                                }}
                                className="h-[48px]"
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card title="Data Kontrak">
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
                                        <ProcessedContractDataTable
                                            contractData={contractData}
                                            setShowViewProcessedContractModal={
                                                setShowViewProcessedContractModal
                                            }
                                            setShowStatusProcessedContractModal={
                                                setShowStatusProcessedContractModal
                                            }
                                            setShowDeleteProcessedContractModal={
                                                setShowDeleteProcessedContractModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <FinishedContractTable
                                            contractData={finishedContractData}
                                            setShowViewFinishedContractModal={
                                                setShowViewFinishedContractModal
                                            }
                                            setShowStatusFinishedContractModal={
                                                setShowStatusFinishedContractModal
                                            }
                                            setShowDeleteFinishedContractModal={
                                                setShowDeleteFinishedContractModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <UnfinishedContractTable
                                            contractData={
                                                unfinishedContractData
                                            }
                                            setShowViewUnfinishedContractModal={
                                                setShowViewUnfinishedContractModal
                                            }
                                            setShowStatusUnfinishedContractModal={
                                                setShowStatusUnfinishedContractModal
                                            }
                                            setShowDeleteUnfinishedContractModal={
                                                setShowDeleteUnfinishedContractModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex-wrap flex justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                const newLimit = e.target.value
                                if (selectedItem === 'Proses') {
                                    setContractLimit(newLimit)
                                    fetchContract(
                                        contractPage,
                                        contractSearchData,
                                        newLimit
                                    )
                                } else if (selectedItem === 'Selesai') {
                                    setFinishedContractLimit(newLimit)
                                    fetchFinishedContract(
                                        finishedContractPage,
                                        finishedContractSearchData,
                                        newLimit
                                    )
                                } else {
                                    setUnfinishedContractLimit(newLimit)
                                    fetchUnfinishedContract(
                                        unfinishedContractPage,
                                        unfinishedContractSearchData,
                                        newLimit
                                    )
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Proses' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {contractData?.currentPage} of{' '}
                                {contractData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Selesai' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {finishedContractData?.currentPage} of{' '}
                                {finishedContractData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {unfinishedContractData?.currentPage} of{' '}
                                {unfinishedContractData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            handlePageChange={handlePageChange}
                            totalPages={
                                selectedItem === 'Proses'
                                    ? contractData?.totalPages
                                    : selectedItem === 'Selesai'
                                      ? finishedContractData?.totalPages
                                      : unfinishedContractData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Proses'
                                    ? contractData?.currentPage
                                    : selectedItem === 'Selesai'
                                      ? finishedContractData?.currentPage
                                      : unfinishedContractData?.currentPage
                            }
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Kontrak Karyawan"
                    label="Tambah Kontrak Karyawan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddProcessedContractModal}
                    onClose={() => {
                        setShowAddProcessedContractModal(
                            !showAddProcessedContractModal
                        )
                    }}
                >
                    <AddProcessedContractForm
                        showAddProcessedContractModal={
                            setShowAddProcessedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Kontrak Karyawan"
                    label="Detail Kontrak Karyawan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewProcessedContractModal}
                    onClose={() => {
                        setShowViewProcessedContractModal(
                            !showViewProcessedContractModal
                        )
                    }}
                >
                    <DetailProcessedContractForm
                        showViewProcessedContractModal={
                            setShowStatusProcessedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Status Kontrak Karyawan"
                    label="Status Kontrak Karyawan"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showStatusProcessedContractModal}
                    onClose={() => {
                        setShowStatusProcessedContractModal(
                            !showStatusProcessedContractModal
                        )
                    }}
                >
                    <StatusProcessedContractForm
                        showStatusProcessedContractModal={
                            setShowStatusProcessedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Kontrak Karyawan"
                    label="Hapus Kontrak Karyawan"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteProcessedContractModal}
                    onClose={() => {
                        setShowDeleteProcessedContractModal(
                            !showDeleteProcessedContractModal
                        )
                    }}
                >
                    <DeleteContractForm
                        showDeleteProcessedContractModal={
                            setShowDeleteProcessedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Kontrak Karyawan Selesai"
                    label="Detail Kontrak Karyawan Selesai"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewFinishedContractModal}
                    onClose={() => {
                        setShowViewFinishedContractModal(
                            !showViewFinishedContractModal
                        )
                    }}
                >
                    <DetailFinishedContractForm
                        showViewFinishedContractModal={
                            setShowViewFinishedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Status Kontrak Karyawan Selesai"
                    label="Status Kontrak Karyawan Selesai"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showStatusFinishedContractModal}
                    onClose={() => {
                        setShowStatusFinishedContractModal(
                            !showStatusFinishedContractModal
                        )
                    }}
                >
                    <StatusFinishedContractForm
                        showStatusFinishedContractModal={
                            showStatusFinishedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Kontrak Karyawan Selesai"
                    label="Hapus Kontrak Karyawan Selesai"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteFinishedContractModal}
                    onClose={() => {
                        setShowDeleteFinishedContractModal(
                            !showDeleteFinishedContractModal
                        )
                    }}
                >
                    <DeleteFinishedContractForm
                        showDeleteFinishedContractModal={
                            setShowDeleteFinishedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Kontrak Karyawan Tidak Selesai"
                    label="Detail Kontrak Karyawan Tidak Selesai"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewUnfinishedContractModal}
                    onClose={() => {
                        setShowViewUnfinishedContractModal(
                            !showViewUnfinishedContractModal
                        )
                    }}
                >
                    <DetailUnfinishedContractForm
                        showViewUnfinishedContractModal={
                            setShowViewUnfinishedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Status Kontrak Karyawan Tidak Selesai"
                    label="Status Kontrak Karyawan Tidak Selesai"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showStatusUnfinishedContractModal}
                    onClose={() => {
                        setShowStatusUnfinishedContractModal(
                            !showStatusUnfinishedContractModal
                        )
                    }}
                >
                    <StatusUnfinishedContractForm
                        showStatusUnfinishedContractModal={
                            showStatusUnfinishedContractModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Kontrak Karyawan Tidak Selesai"
                    label="Hapus Kontrak Karyawan Tidak Selesai"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteUnfinishedContractModal}
                    onClose={() => {
                        setShowDeleteUnfinishedContractModal(
                            !showDeleteUnfinishedContractModal
                        )
                    }}
                >
                    <DeleteUnfinishedContractForm
                        showDeleteUnfinishedContractModal={
                            setShowDeleteUnfinishedContractModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
