'use client'
import React, { Fragment } from 'react'
import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import TicketTable from '@/components/tiket/tabel-tiket-open/page'
import AddTicketForm from '@/components/tiket/form-tambah-tiket/page'
import EditTicketForm from '@/components/tiket/form-edit-tiket/page'
import DetailTicketForm from '@/components/tiket/form-detail-tiket/page'
import DeleteTicketForm from '@/components/tiket/form-hapus-tiket/page'
import { useQuery } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import { getCookie } from 'cookies-next'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useEffect } from 'react'
import TicketDocument from '@/components/tiket/download-pdf-tiket/page'
import { toast } from 'react-toastify'

export default function TicketRecordsTable() {
    const [showAddTicketModal, setShowAddTicketModal] = useState(false)
    const [showEditTicketModal, setShowEditTicketModal] = useState(false)
    const [showViewTicketModal, setShowViewTicketModal] = useState(false)
    const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false)
    const [ticketPage, setTicketPage] = useState(1)
    const [ticketLimit, setTicketLimit] = useState(5)
    const [ticketSearchData, setTicketSearchData] = useState('')
    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Open')
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

    async function fetchTickets(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/tickets?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: ticketData } = useQuery({
        queryKey: ['open-ticket', ticketPage, ticketSearchData, ticketLimit],
        queryFn: () => fetchTickets(ticketPage, ticketSearchData, ticketLimit),
    })

    const handlePageChange = (page) => {
        setTicketPage(page)
    }

    const buttons = [
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

    return (
        <>
            <div>
                <div className="w-full flex justify-between mb-5">
                    <div className="flex gap-5">
                        <Button
                            icon="heroicons-outline:funnel"
                            className="btn-primary"
                        />
                        <InputGroup
                            id="largesize"
                            type="text"
                            placeholder="Cari Tiket"
                            className="h-[48px]"
                            onChange={(e) => {
                                setTicketSearchData(e.target.value)
                            }}
                            append={<Icon icon="heroicons-outline:search" />}
                        />
                        <div className="flex gap-2 mr-5">
                            <div>
                                <Flatpickr
                                    className="date-picker-control py-2"
                                    placeholder="Periode Awal"
                                />
                            </div>
                            <div>
                                <Flatpickr
                                    className="date-picker-control py-2"
                                    placeholder="Periode Akhir"
                                />
                            </div>
                        </div>
                    </div>
                    {isClient ? (
                        <Button
                            text="Download PDF"
                            icon="heroicons-outline:newspaper"
                            className="bg-warning-500 text-white"
                            onClick={() => {
                                selectedTicketData?.length == 0 &&
                                    toast.error(
                                        'Silahkan ceklis data terlebih dahulu'
                                    )
                            }}
                            children={
                                selectedTicketData?.length >= 1 ? (
                                    <div>
                                        <PDFDownloadLink
                                            document={
                                                <TicketDocument
                                                    data={selectedTicketData}
                                                />
                                            }
                                            fileName="data-tiket.pdf"
                                        >
                                            {({ blob, url, loading, error }) =>
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
                <div className="grid grid-cols-1 gap-6">
                    <Card>
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
                                                }   `}
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
                                        <TicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={ticketData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <TicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={ticketData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <TicketTable
                                            showViewTicketModal={
                                                setShowViewTicketModal
                                            }
                                            showEditTicketModal={
                                                setShowEditTicketModal
                                            }
                                            showDeleteTicketModal={
                                                setShowDeleteTicketModal
                                            }
                                            ticketData={ticketData}
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setTicketLimit(e.target.value)
                                fetchTickets()
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page <span>1 of 5</span>
                        </span>
                    </div>
                    <div>
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={ticketData?.totalPages}
                            currentPage={ticketData?.currentPage}
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
            </div>
        </>
    )
}
