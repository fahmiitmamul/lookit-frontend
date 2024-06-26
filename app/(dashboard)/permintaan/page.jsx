'use client'
import React, { Fragment, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import ApprovedRequest from '@/components/permintaan/tabel-permintaan-setuju/page'
import DeclinedRequest from '@/components/permintaan/tabel-permintaan-tolak/page'
import PendingRequest from '@/components/permintaan/tabel-permintaan-pending/page'
import Modal from '@/components/ui/Modal'
import Flatpickr from 'react-flatpickr'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import EditApprovedRequestForm from '@/components/permintaan/form-edit-permintaan-setuju/page'
import DetailApprovedRequestModal from '@/components/permintaan/form-detail-permintaan-setuju/page'
import DeleteApprovedRequestForm from '@/components/permintaan/form-hapus-permintaan-setuju/page'
import EditDeclinedRequestForm from '@/components/permintaan/form-edit-permintaan-tolak/page'
import DetailDeclinedRequestForm from '@/components/permintaan/form-detail-permintaan-tolak/page'
import DeleteDeclinedRequestForm from '@/components/permintaan/form-hapus-permintaan-tolak/page'
import EditPendingRequestForm from '@/components/permintaan/form-edit-permintaan-pending/page'
import DetailPendingRequestForm from '@/components/permintaan/form-detail-permintaan-pending/page'
import DeletePendingRequestForm from '@/components/permintaan/form-hapus-permintaan-pending/page'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AllRequests from '@/components/permintaan/tabel-all-request/page'
import EditAllRequestsForm from '@/components/permintaan/form-edit-all-permintaan/page'
import DetailAllRequestsForm from '@/components/permintaan/form-detail-all-permintaan/page'
import DeleteAllRequestsForm from '@/components/permintaan/form-hapus-all-permintaan/page'
import { setLoading } from '@/store/loadingReducer'
import { useDispatch } from 'react-redux'
import DownloadRequestsModal from '@/components/permintaan/download-modal/page'

export default function Permintaan() {
    const [showDownloadRequestsModal, setShowDownloadRequestsModal] =
        useState(false)
    const [showViewApprovedRequestModal, setShowViewApprovedRequestModal] =
        useState(false)
    const [showEditApprovedRequestModal, setShowEditApprovedRequestModal] =
        useState(false)
    const [showDeleteApprovedRequestModal, setShowDeleteApprovedRequestModal] =
        useState(false)
    const [showViewAllRequestModal, setShowViewAllRequestModal] =
        useState(false)
    const [showEditAllRequestModal, setShowEditAllRequestModal] =
        useState(false)
    const [showDeleteAllRequestModal, setShowDeleteAllRequestModal] =
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
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [selectedItem, setSelectedItem] = useState('Data Permintaan')
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
    const [allRequestsPage, setAllRequestsPage] = useState(1)
    const [allRequestsLimit, setAllRequestsLimit] = useState(5)
    const [allRequestsSearchData, setAllRequestsSearchData] = useState('')
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
        } else {
            setAllRequestsPage(page)
        }
    }

    const buttons = [
        {
            title: 'Data Permintaan',
            icon: 'heroicons-outline:home',
        },
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

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchAllRequests(
        allRequestsPage,
        allRequestsLimit,
        allRequestsSearchData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/requests?page=' +
                allRequestsPage +
                '&limit=' +
                allRequestsLimit +
                '&search=' +
                allRequestsSearchData +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: allRequestsData } = useQuery({
        queryKey: [
            'all-requests',
            allRequestsPage,
            allRequestsLimit,
            allRequestsSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchAllRequests(
                allRequestsPage,
                allRequestsLimit,
                allRequestsSearchData,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchPendingRequests(
        pendingRequestPage,
        pendingRequestLimit,
        pendingRequestSearchData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/requests/pending?page=' +
                pendingRequestPage +
                '&limit=' +
                pendingRequestLimit +
                '&search=' +
                pendingRequestSearchData +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: pendingRequestsData } = useQuery({
        queryKey: [
            'pending-requests',
            pendingRequestPage,
            pendingRequestLimit,
            pendingRequestSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchPendingRequests(
                pendingRequestPage,
                pendingRequestLimit,
                pendingRequestSearchData,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchApprovedRequests(
        approvedRequestPage,
        approvedRequestLimit,
        approvedRequestSearchData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/requests/approved?page=' +
                approvedRequestPage +
                '&limit=' +
                approvedRequestLimit +
                '&search=' +
                approvedRequestSearchData +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: approvedRequestsData } = useQuery({
        queryKey: [
            'approved-requests',
            approvedRequestPage,
            approvedRequestLimit,
            approvedRequestSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchApprovedRequests(
                approvedRequestPage,
                approvedRequestLimit,
                approvedRequestSearchData,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchRejectedRequests(
        rejectedRequestPage,
        rejectedRequestLimit,
        rejectedRequestSearchData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/requests/rejected?page=' +
                rejectedRequestPage +
                '&limit=' +
                rejectedRequestLimit +
                '&search=' +
                rejectedRequestSearchData +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: rejectedRequestsData } = useQuery({
        queryKey: [
            'rejected-requests',
            rejectedRequestPage,
            rejectedRequestLimit,
            rejectedRequestSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchRejectedRequests(
                rejectedRequestPage,
                rejectedRequestLimit,
                rejectedRequestSearchData,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    const patchApprovedRequest = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                status: 'Setuju',
                selectedRequestData: selectedRequestData.map((item) => item.id),
            }).toString()
            return http(token).patch(`/requests/status`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-requests'] })
            queryClient.invalidateQueries({ queryKey: ['pending-requests'] })
            queryClient.invalidateQueries({ queryKey: ['rejected-requests'] })
            queryClient.invalidateQueries({ queryKey: ['approved-requests'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengupdate data permintaan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const patchDeclinedRequest = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                status: 'Tolak',
                selectedRequestData: selectedRequestData.map((item) => item.id),
            }).toString()
            return http(token).patch(`/requests/status`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-requests'] })
            queryClient.invalidateQueries({ queryKey: ['pending-requests'] })
            queryClient.invalidateQueries({ queryKey: ['rejected-requests'] })
            queryClient.invalidateQueries({ queryKey: ['approved-requests'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengupdate data permintaan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const patchPendingRequest = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                status: 'Pending',
                selectedRequestData: selectedRequestData.map((item) => item.id),
            }).toString()
            return http(token).patch(`/requests/status`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-requests'] })
            queryClient.invalidateQueries({ queryKey: ['pending-requests'] })
            queryClient.invalidateQueries({ queryKey: ['rejected-requests'] })
            queryClient.invalidateQueries({ queryKey: ['approved-requests'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengupdate data permintaan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex justify-center items-center">
                            <h5>Data Permintaan</h5>
                        </div>
                    </div>
                    <div className="flex gap-5 pr-6">
                        <Button
                            text="Download"
                            icon="heroicons-outline:newspaper"
                            className="btn-warning w-[175px]"
                            onClick={() => {
                                selectedRequestData?.length == 0
                                    ? toast.error(
                                          'Silahkan ceklis data terlebih dahulu'
                                      )
                                    : setShowDownloadRequestsModal(
                                          !showDownloadRequestsModal
                                      )
                            }}
                        />
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
                                        } else {
                                            setAllRequestsSearchData(
                                                e.target.value
                                            )
                                        }
                                    }}
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
                            </div>
                        }
                        period={
                            <div className="flex flex-wrap gap-2">
                                <div className="flex flex-wrap justify-center items-center gap-3">
                                    <div>
                                        <Flatpickr
                                            value={selectedPeriod}
                                            defaultValue={new Date()}
                                            id="period"
                                            placeholder="Periode Awal - Akhir"
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
                        }
                        approved={
                            <div className="flex gap-5">
                                <Button
                                    icon="heroicons-outline:check"
                                    text="Setujui Semua"
                                    className="btn-success"
                                    onClick={() => {
                                        if (selectedRequestData.length === 0) {
                                            toast.error(
                                                'Silahkan checklist data terlebih dahulu'
                                            )
                                        } else {
                                            patchApprovedRequest.mutate()
                                        }
                                    }}
                                />
                                <Button
                                    icon="heroicons-outline:x"
                                    text="Tolak Semua"
                                    className="btn-danger"
                                    onClick={() => {
                                        if (selectedRequestData.length === 0) {
                                            toast.error(
                                                'Silahkan checklist data terlebih dahulu'
                                            )
                                        } else {
                                            patchDeclinedRequest.mutate()
                                        }
                                    }}
                                />
                                <Button
                                    icon="heroicons-outline:clock"
                                    text="Pending Semua"
                                    className="btn-warning"
                                    onClick={() => {
                                        if (selectedRequestData.length === 0) {
                                            toast.error(
                                                'Silahkan checklist data terlebih dahulu'
                                            )
                                        } else {
                                            patchPendingRequest.mutate()
                                        }
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
                                        <AllRequests
                                            allRequestsData={allRequestsData}
                                            setShowEditAllRequestsModal={
                                                setShowEditAllRequestModal
                                            }
                                            setShowViewAllRequestsModal={
                                                setShowViewAllRequestModal
                                            }
                                            setShowDeleteAllRequestsModal={
                                                setShowDeleteAllRequestModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
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
                                } else {
                                    fetchAllRequests(
                                        allRequestsPage,
                                        allRequestsLimit,
                                        allRequestsSearchData
                                    )
                                    setAllRequestsLimit(e.target.value)
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
            <Modal
                title="Edit Permintaan"
                label="Edit Permintaan"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditAllRequestModal}
                onClose={() => {
                    setShowEditAllRequestModal(!showEditAllRequestModal)
                }}
            >
                <EditAllRequestsForm
                    setShowEditAllRequstsModal={setShowEditAllRequestModal}
                />
            </Modal>
            <Modal
                title="Detail Permintaan"
                label="Detail Permintaan"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showViewAllRequestModal}
                onClose={() => {
                    setShowViewAllRequestModal(!showViewAllRequestModal)
                }}
            >
                <DetailAllRequestsForm
                    setShowViewAllRequestsModal={setShowViewAllRequestModal}
                />
            </Modal>
            <Modal
                title="Hapus Permintaan Pending"
                label="Hapus Permintaan Pending"
                labelClass="btn-outline-dark"
                activeModal={showDeleteAllRequestModal}
                onClose={() => {
                    setShowDeleteAllRequestModal(!showDeleteAllRequestModal)
                }}
            >
                <DeleteAllRequestsForm
                    setShowDeleteAllRequestsModal={setShowDeleteAllRequestModal}
                />
            </Modal>
            <Modal
                title="Download"
                label="Download"
                labelClass="btn-outline-dark"
                className="max-w-sm"
                activeModal={showDownloadRequestsModal}
                onClose={() => {
                    setShowDownloadRequestsModal(!showDownloadRequestsModal)
                }}
            >
                <DownloadRequestsModal
                    selectedRequestsData={selectedRequestData}
                    isClient={isClient}
                />
            </Modal>
        </>
    )
}
