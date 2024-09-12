'use client'
import React, { Fragment } from 'react'
import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import AddTicketForm from '@/components/ticket/add-ticket-form/page'
import EditTicketForm from '@/components/ticket/edit-ticket-form/page'
import DetailTicketForm from '@/components/ticket/detail-ticket-form/page'
import DeleteTicketForm from '@/components/ticket/delete-ticket-form/page'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import { getCookie } from 'cookies-next'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import OpenTicketTable from '@/components/ticket/open-ticket-table/page'
import ClosedTicketTable from '@/components/ticket/closed-ticket-table/page'
import PendingTicketTable from '@/components/ticket/pending-ticket-table/page'
import DownloadTicketModal from '@/components/ticket/download-modal/page'
import AllTicketTable from '@/components/ticket/all-ticket-table/page'

export default function Ticket() {
    const [showDownloadTicketModal, setShowDownloadTicketModal] =
        useState(false)
    const [showAddTicketModal, setShowAddTicketModal] = useState(false)
    const [showEditTicketModal, setShowEditTicketModal] = useState(false)
    const [showViewTicketModal, setShowViewTicketModal] = useState(false)
    const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false)
    const [openTicketPage, setOpenTicketPage] = useState(1)
    const [openTicketLimit, setOpenTicketLimit] = useState(5)
    const [openTicketSearchData, setOpenTicketSearchData] = useState('')
    const [allTicketPage, setAllTicketPage] = useState(1)
    const [allTicketLimit, setAllTicketLimit] = useState(5)
    const [allTicketSearchData, setAllTicketSearchData] = useState('')
    const [closedTicketPage, setClosedTicketPage] = useState(1)
    const [closedTicketLimit, setClosedTicketLimit] = useState(5)
    const [closedTicketSearchData, setClosedTicketSearchData] = useState('')
    const [pendingTicketPage, setPendingTicketPage] = useState(1)
    const [pendingTicketLimit, setPendingTicketLimit] = useState(5)
    const [pendingTicketSearchData, setPendingTicketSearchData] = useState('')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Data Tiket')
    const [isClient, setIsClient] = useState(false)
    const selectedTicketData = useSelector(
        (state) => state.ticket.ticket.selectedTicket
    )

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchAllTicket(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/tickets?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: allTicketData } = useQuery({
        queryKey: [
            'all-ticket',
            allTicketPage,
            allTicketSearchData,
            allTicketLimit,
            sortBy,
            sortOrder,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchAllTicket(
                allTicketPage,
                allTicketSearchData,
                allTicketLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchOpenTicket(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/tickets/open?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: openTicketData } = useQuery({
        queryKey: [
            'open-ticket',
            openTicketPage,
            openTicketSearchData,
            openTicketLimit,
            sortBy,
            sortOrder,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchOpenTicket(
                openTicketPage,
                openTicketSearchData,
                openTicketLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchClosedTicket(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/tickets/closed?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: closedTicketData } = useQuery({
        queryKey: [
            'closed-ticket',
            closedTicketPage,
            closedTicketSearchData,
            closedTicketLimit,
            sortBy,
            sortOrder,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchClosedTicket(
                closedTicketPage,
                closedTicketSearchData,
                closedTicketLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchPendingTicket(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/tickets/pending?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData +
                '&sortBy=' +
                sortBy +
                '&sortOrder=' +
                sortOrder +
                '&startDate=' +
                startDate +
                '&endDate=' +
                endDate
        )
        return data.results
    }

    const { data: pendingTicketData } = useQuery({
        queryKey: [
            'pending-ticket',
            pendingTicketPage,
            pendingTicketSearchData,
            pendingTicketLimit,
            sortBy,
            sortOrder,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchPendingTicket(
                pendingTicketPage,
                pendingTicketSearchData,
                pendingTicketLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    const handlePageChange = (page) => {
        if (selectedItem === 'Open') {
            setOpenTicketPage(page)
        } else if (selectedItem === 'Closed') {
            setClosedTicketPage(page)
        } else {
            setPendingTicketPage(page)
        }
    }

    const buttons = [
        {
            title: 'Data Tiket',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Open',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Closed',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Pending',
            icon: 'heroicons-outline:user',
        },
    ]

    const queryClient = useQueryClient()

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 w-full justify-between">
                        <div className="flex gap-5">
                            <h5>
                                {selectedItem === 'Data Tiket'
                                    ? 'Data Tiket'
                                    : selectedItem === 'Open'
                                      ? 'Data Tiket Open'
                                      : selectedItem === 'Closed'
                                        ? 'Data Tiket Closed'
                                        : 'Data Tiket Pending'}
                            </h5>
                        </div>
                        <div className="mt-8 xl:mt-0 flex gap-5">
                            <div>
                                <Button
                                    icon="heroicons-outline:plus"
                                    text="Buat Tiket"
                                    className="btn-success"
                                    onClick={() => {
                                        setShowAddTicketModal(true)
                                    }}
                                />
                            </div>
                            <div className="flex gap-5">
                                <Button
                                    text="Download"
                                    icon="heroicons-outline:newspaper"
                                    className="bg-warning-500 text-white"
                                    onClick={() => {
                                        selectedTicketData?.length == 0
                                            ? toast.error(
                                                  'Silahkan ceklis data terlebih dahulu'
                                              )
                                            : setShowDownloadTicketModal(
                                                  !showDownloadTicketModal
                                              )
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        period={
                            <div className="flex gap-2">
                                <div className="flex justify-center items-center gap-3">
                                    <div>
                                        <Flatpickr
                                            value={selectedPeriod}
                                            defaultValue={new Date()}
                                            id="period"
                                            placeholder="Awal - Akhir"
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
                        search={
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    onChange={(e) => {
                                        if (selectedItem === 'Open') {
                                            setOpenTicketSearchData(
                                                e.target.value
                                            )
                                        } else if (selectedItem === 'Closed') {
                                            setClosedTicketSearchData(
                                                e.target.value
                                            )
                                        } else if (selectedItem === 'Pending') {
                                            setPendingTicketSearchData(
                                                e.target.value
                                            )
                                        } else {
                                            setAllTicketSearchData(
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
                                        <AllTicketTable
                                            showEditAllTicket={
                                                setShowEditTicketModal
                                            }
                                            showViewAllTicket={
                                                setShowViewTicketModal
                                            }
                                            showDeleteAllTicket={
                                                setShowDeleteTicketModal
                                            }
                                            allTicketData={allTicketData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <OpenTicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={openTicketData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <ClosedTicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={closedTicketData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <PendingTicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={pendingTicketData}
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
                                if (selectedItem === 'Open') {
                                    setOpenTicketLimit(e.target.value)
                                    fetchOpenTicket()
                                } else if (selectedItem === 'Closed') {
                                    setClosedTicketLimit(e.target.value)
                                    fetchClosedTicket()
                                } else if (selectedItem === 'Pending') {
                                    setPendingTicketLimit(e.target.value)
                                    fetchPendingTicket()
                                } else {
                                    setAllTicketLimit(e.target.value)
                                    fetchAllTicket()
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
                        {selectedItem === 'Open' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {openTicketData?.currentPage} of{' '}
                                {openTicketData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Closed' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {closedTicketData?.currentPage} of{' '}
                                {closedTicketData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Pending' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {pendingTicketData?.currentPage} of{' '}
                                {pendingTicketData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {allTicketData?.currentPage} of{' '}
                                {allTicketData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Open'
                                    ? openTicketData?.totalPages
                                    : selectedItem === 'Closed'
                                      ? closedTicketData?.totalPages
                                      : selectedItem === 'Pending'
                                        ? pendingTicketData?.totalPages
                                        : allTicketData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Open'
                                    ? openTicketData?.currentPage
                                    : selectedItem === 'Closed'
                                      ? closedTicketData?.currentPage
                                      : selectedItem === 'Pending'
                                        ? pendingTicketData?.currentPage
                                        : allTicketData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Tiket"
                    label="Tambah Tiket"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddTicketModal}
                    onClose={() => {
                        setShowAddTicketModal(!showAddTicketModal)
                    }}
                >
                    <AddTicketForm showAddTicketModal={setShowAddTicketModal} />
                </Modal>
                <Modal
                    title="Edit Tiket"
                    label="Edit Tiket"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditTicketModal}
                    onClose={() => {
                        setShowEditTicketModal(!showEditTicketModal)
                    }}
                >
                    <EditTicketForm
                        showEditTicketModal={setShowEditTicketModal}
                    />
                </Modal>
                <Modal
                    title="Detail Tiket"
                    label="Detail Tiket"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewTicketModal}
                    onClose={() => {
                        setShowViewTicketModal(!showViewTicketModal)
                    }}
                >
                    <DetailTicketForm
                        showDetailTicketModal={setShowViewTicketModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Tiket"
                    label="Hapus Tiket"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteTicketModal}
                    onClose={() => {
                        setShowDeleteTicketModal(!showDeleteTicketModal)
                    }}
                >
                    <DeleteTicketForm
                        showDeleteTicketModal={setShowDeleteTicketModal}
                    />
                </Modal>
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadTicketModal}
                    onClose={() => {
                        setShowDownloadTicketModal(!showDownloadTicketModal)
                    }}
                >
                    <DownloadTicketModal
                        selectedTicketData={selectedTicketData}
                        isClient={isClient}
                    />
                </Modal>
            </div>
        </>
    )
}
