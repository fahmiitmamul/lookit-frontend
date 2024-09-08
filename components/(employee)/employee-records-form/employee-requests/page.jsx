'use client'
import React, { Fragment, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import ApprovedRequest from '@/components/requests/tabel-permintaan-setuju/page'
import DeclinedRequest from '@/components/requests/tabel-permintaan-tolak/page'
import PendingRequest from '@/components/requests/tabel-permintaan-pending/page'
import Modal from '@/components/ui/Modal'
import Dropdown from '@/components/ui/Dropdown'
import Flatpickr from 'react-flatpickr'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import EditApprovedRequestForm from '@/components/requests/form-edit-permintaan-setuju/page'
import DetailApprovedRequestModal from '@/components/requests/form-detail-permintaan-setuju/page'
import DeleteApprovedRequestForm from '@/components/requests/form-hapus-permintaan-setuju/page'
import EditDeclinedRequestForm from '@/components/requests/form-edit-permintaan-tolak/page'
import DetailDeclinedRequestForm from '@/components/requests/form-detail-permintaan-tolak/page'
import DeleteDeclinedRequestForm from '@/components/requests/form-hapus-permintaan-tolak/page'
import EditPendingRequestForm from '@/components/requests/form-edit-permintaan-pending/page'
import DetailPendingRequestForm from '@/components/requests/form-detail-permintaan-pending/page'
import DeletePendingRequestForm from '@/components/requests/form-hapus-permintaan-pending/page'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DownloadPDFRequests from '@/components/requests/download-pdf-permintaan/page'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function Permintaan() {
    const [showViewApprovedRequestModal, setShowViewApprovedRequestModal] =
        useState(false)
    const [showEditApprovedRequestModal, setShowEditApprovedRequestModal] =
        useState(false)
    const [showDeleteApprovedRequestModal, setShowDeleteApprovedRequestModal] =
        useState(false)
    const [showViewDeclinedRequestModal, setShowViewDeclinedRequestModal] =
        useState(false)
    const [showEditDeclinedRequestModal, setShowEditDeclinedRequestModal] =
        useState(false)
    const [showDeleteDeclinedRequestModal, setShowDeleteDeclinedRequestModal] =
        useState(false)
    const [showViewPendingRequestModal, setShowViewPendingRequestModal] =
        useState(false)
    const [showEditPendingRequestModal, setShowEditPendingRequestModal] =
        useState(false)
    const [showDeletePendingRequestModal, setShowDeletePendingRequestModal] =
        useState(false)
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [selectedItem, setSelectedItem] = useState('Pending')
    const [pendingRequestPage, setPendingRequestPage] = useState(1)
    const [pendingRequestLimit, setPendingRequestLimit] = useState(5)
    const [pendingRequestSearchData, setPendingRequestSearchData] = useState('')
    const [approvedRequestPage, setApprovedRequestPage] = useState(1)
    const [approvedRequestLimit, setApprovedRequestLimit] = useState(5)
    const [approvedRequestSearchData, setApprovedRequestSearchData] =
        useState('')
    const [rejectedRequestPage, setRejectedRequestPage] = useState(1)
    const [rejectedRequestLimit, setRejectedRequestLimit] = useState(5)
    const [rejectedRequestSearchData, setRejectedRequestSearchData] =
        useState('')
    const token = getCookie('token')
    const [isClient, setIsClient] = useState(false)
    const selectedRequestData = useSelector(
        (state) => state.requests.requests.selectedRequests
    )

    const handlePageChange = (page) => {
        if (selectedItem === 'Pending') {
            setPendingRequestPage(page)
        } else if (selectedItem === 'Setuju') {
            setApprovedRequestPage(page)
        } else if (selectedItem === 'Tolak') {
            setRejectedRequestPage(page)
        }
    }

    const { employee_id } = useSelector((state) => state.employee.employee)

    const buttons = [
        {
            title: 'Setuju',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Tolak',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Pending',
            icon: 'heroicons-outline:user',
        },
    ]

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchPendingRequests() {
        const { data } = await http(token).get(
            '/requests/pending?page=' +
                pendingRequestPage +
                '&limit=' +
                pendingRequestLimit +
                '&search=' +
                pendingRequestSearchData +
                '&employee_id=' +
                employee_id
        )
        return data.results
    }

    const { data: pendingRequestsData } = useQuery({
        queryKey: [
            'pending-requests',
            pendingRequestPage,
            pendingRequestLimit,
            pendingRequestSearchData,
        ],
        queryFn: () => fetchPendingRequests(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchApprovedRequests() {
        const { data } = await http(token).get(
            '/requests/approved?page=' +
                approvedRequestPage +
                '&limit=' +
                approvedRequestLimit +
                '&search=' +
                approvedRequestSearchData +
                '&employee_id=' +
                employee_id
        )
        return data.results
    }

    const { data: approvedRequestsData } = useQuery({
        queryKey: [
            'approved-requests',
            approvedRequestPage,
            approvedRequestLimit,
            approvedRequestSearchData,
        ],
        queryFn: () => fetchApprovedRequests(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchRejectedRequests() {
        const { data } = await http(token).get(
            '/requests/rejected?page=' +
                rejectedRequestPage +
                '&limit=' +
                rejectedRequestLimit +
                '&search=' +
                rejectedRequestSearchData +
                '&employee_id=' +
                employee_id
        )
        return data.results
    }

    const { data: rejectedRequestsData } = useQuery({
        queryKey: [
            'rejected-requests',
            rejectedRequestPage,
            rejectedRequestLimit,
            rejectedRequestSearchData,
        ],
        queryFn: () => fetchRejectedRequests(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
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
                        <div className="flex flex-wrap gap-2">
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <div>
                                    <Flatpickr
                                        value={selectedPeriod}
                                        defaultValue={new Date()}
                                        id="period"
                                        placeholder="Awal - Akhir"
                                        className="date-picker-control w-[210px] py-2"
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
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder={
                                    selectedItem === 'Pending'
                                        ? 'Cari Permintaan Pending'
                                        : selectedItem === 'Setuju'
                                          ? 'Cari Permintaan Setuju'
                                          : 'Cari Permintaan Tolak'
                                }
                                className="h-[48px]"
                                onChange={(e) => {
                                    if (selectedItem === 'Pending') {
                                        setPendingRequestSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Setuju') {
                                        setApprovedRequestSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Tolak') {
                                        setRejectedRequestSearchData(
                                            e.target.value
                                        )
                                    }
                                }}
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
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
                                    selectedRequestData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedRequestData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <DownloadPDFRequests
                                                        data={
                                                            selectedRequestData
                                                        }
                                                    />
                                                }
                                                fileName="data-permintaan.pdf"
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
                                                onClick={() =>
                                                    setSelectedItem(item.title)
                                                }
                                                className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                                ${
                                                    selected
                                                        ? 'text-white bg-primary-500 '
                                                        : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                } `}
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
                                        <ApprovedRequest
                                            approvedRequestData={
                                                approvedRequestsData
                                            }
                                            setShowEditApprovedRequestModal={
                                                setShowEditApprovedRequestModal
                                            }
                                            setShowDeleteApprovedRequestModal={
                                                setShowDeleteApprovedRequestModal
                                            }
                                            setShowViewApprovedRequestModal={
                                                setShowViewApprovedRequestModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <DeclinedRequest
                                            declinedRequestData={
                                                rejectedRequestsData
                                            }
                                            setShowEditDeclinedRequestModal={
                                                setShowEditDeclinedRequestModal
                                            }
                                            setShowDeleteDeclinedRequestModal={
                                                setShowDeleteDeclinedRequestModal
                                            }
                                            setShowViewDeclinedRequestModal={
                                                setShowViewDeclinedRequestModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-6000 dark:text-slate-400 text-sm font-normal">
                                        <PendingRequest
                                            pendingRequestData={
                                                pendingRequestsData
                                            }
                                            setShowEditPendingRequestModal={
                                                setShowEditPendingRequestModal
                                            }
                                            setShowDeletePendingRequestModal={
                                                setShowDeletePendingRequestModal
                                            }
                                            setShowViewPendingRequestModal={
                                                setShowViewPendingRequestModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Pending') {
                                    fetchPendingRequests(
                                        pendingRequestPage,
                                        pendingRequestLimit,
                                        pendingRequestSearchData
                                    )
                                    setPendingRequestLimit(e.target.value)
                                } else if (selectedItem === 'Setuju') {
                                    fetchApprovedRequests(
                                        approvedRequestPage,
                                        approvedRequestLimit,
                                        approvedRequestSearchData
                                    )
                                    setApprovedRequestLimit(e.target.value)
                                } else if (selectedItem === 'Tolak') {
                                    fetchRejectedRequests(
                                        rejectedRequestPage,
                                        rejectedRequestLimit,
                                        rejectedRequestSearchData
                                    )
                                    setRejectedRequestLimit(e.target.value)
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
                        {selectedItem === 'Pending' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {pendingRequestsData?.currentPage} of{' '}
                                {pendingRequestsData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Setuju' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {approvedRequestsData?.currentPage} of{' '}
                                {approvedRequestsData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-3000">
                                Show {rejectedRequestsData?.currentPage} of{' '}
                                {rejectedRequestsData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Pending'
                                    ? pendingRequestsData?.totalPages
                                    : selectedItem === 'Setuju'
                                      ? approvedRequestsData?.totalPages
                                      : rejectedRequestsData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Pending'
                                    ? pendingRequestsData?.currentPage
                                    : selectedItem === 'Setuju'
                                      ? approvedRequestsData?.currentPage
                                      : rejectedRequestsData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal
                title="Edit Permintaan Setuju"
                label="Edit Permintaan Setuju"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditApprovedRequestModal}
                onClose={() => {
                    setShowEditApprovedRequestModal(
                        !showEditApprovedRequestModal
                    )
                }}
            >
                <EditApprovedRequestForm
                    setShowEditApprovedRequestModal={
                        setShowEditApprovedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Detail Permintaan Setuju"
                label="Detail Permintaan Setuju"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showViewApprovedRequestModal}
                onClose={() => {
                    setShowViewApprovedRequestModal(
                        !showViewApprovedRequestModal
                    )
                }}
            >
                <DetailApprovedRequestModal
                    setShowViewApprovedRequestModal={
                        setShowViewApprovedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Hapus Permintaan Setuju"
                label="Hapus Permintaan Setuju"
                labelClass="btn-outline-dark"
                activeModal={showDeleteApprovedRequestModal}
                onClose={() => {
                    setShowDeleteApprovedRequestModal(
                        !showDeleteApprovedRequestModal
                    )
                }}
            >
                <DeleteApprovedRequestForm
                    showDeleteApprovedRequestModal={
                        setShowDeleteApprovedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Edit Permintaan Tolak"
                label="Edit Permintaan Tolak"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditDeclinedRequestModal}
                onClose={() => {
                    setShowEditDeclinedRequestModal(
                        !showEditDeclinedRequestModal
                    )
                }}
            >
                <EditDeclinedRequestForm
                    setShowEditDeclinedRequestModal={
                        setShowEditDeclinedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Detail Permintaan Tolak"
                label="Detail Permintaan Tolak"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showViewDeclinedRequestModal}
                onClose={() => {
                    setShowViewDeclinedRequestModal(
                        !showViewDeclinedRequestModal
                    )
                }}
            >
                <DetailDeclinedRequestForm
                    setShowViewDeclinedRequestModal={
                        setShowViewDeclinedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Hapus Permintaan Tolak"
                label="Hapus Permintaan Tolak"
                labelClass="btn-outline-dark"
                activeModal={showDeleteDeclinedRequestModal}
                onClose={() => {
                    setShowDeleteDeclinedRequestModal(
                        !showDeleteDeclinedRequestModal
                    )
                }}
            >
                <DeleteDeclinedRequestForm
                    showDeleteDeclinedRequestModal={
                        setShowDeleteDeclinedRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Edit Permintaan Pending"
                label="Edit Permintaan Pending"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditPendingRequestModal}
                onClose={() => {
                    setShowEditPendingRequestModal(!showEditPendingRequestModal)
                }}
            >
                <EditPendingRequestForm
                    setShowEditPendingRequestModal={
                        setShowEditPendingRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Detail Permintaan Pending"
                label="Detail Permintaan Pending"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showViewPendingRequestModal}
                onClose={() => {
                    setShowViewPendingRequestModal(!showViewPendingRequestModal)
                }}
            >
                <DetailPendingRequestForm
                    setShowViewPendingRequestModal={
                        setShowViewPendingRequestModal
                    }
                />
            </Modal>
            <Modal
                title="Hapus Permintaan Pending"
                label="Hapus Permintaan Pending"
                labelClass="btn-outline-dark"
                activeModal={showDeletePendingRequestModal}
                onClose={() => {
                    setShowDeletePendingRequestModal(
                        !showDeletePendingRequestModal
                    )
                }}
            >
                <DeletePendingRequestForm
                    showDeletePendingRequestModal={
                        setShowDeletePendingRequestModal
                    }
                />
            </Modal>
        </>
    )
}
