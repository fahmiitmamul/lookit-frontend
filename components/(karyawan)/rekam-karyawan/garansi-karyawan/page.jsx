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
import { useQuery } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import MakeGuaranteeTable from '@/components/garansi/tabel-buat-garansi/page'
import IncomingGuaranteeTable from '@/components/garansi/tabel-garansi-masuk/page'
import OutgoingGuaranteeTable from '@/components/garansi/tabel-garansi-keluar/page'
import IncomingGuaranteeForm from '@/components/garansi/form-garansi-masuk/page'
import AddGuaranteeForm from '@/components/garansi/form-buat-garansi/page'
import EditGuaranteeForm from '@/components/garansi/form-edit-garansi/page'
import DetailGuaranteeForm from '@/components/garansi/form-detail-garansi/page'
import DeleteGuaranteeForm from '@/components/garansi/form-hapus-garansi/page'
import EditOutgoingGuaranteeForm from '@/components/garansi/form-edit-garansi-keluar/page'
import DetailIncomingGuaranteeForm from '@/components/garansi/form-detail-garansi-masuk/page'
import DeleteOutgoingGuaranteeForm from '@/components/garansi/form-hapus-garansi-keluar/page'
import AddOutgoingGuaranteeForm from '@/components/garansi/form-garansi-keluar/page'
import DetailOutgoingGuaranteeForm from '@/components/garansi/form-detail-garansi-keluar/page'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import EditIncomingGuaranteeForm from '@/components/garansi/form-edit-garansi-masuk/page'
import DeleteIncomingGuaranteeForm from '@/components/garansi/form-hapus-garansi-masuk/page'
import { toast } from 'react-toastify'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import GuaranteeDocument from '@/components/garansi/download-pdf-garansi/page'
import IncomingGuaranteeDocument from '@/components/garansi/download-pdf-garansi-masuk/page'
import OutgoingGuaranteeDocument from '@/components/garansi/download-pdf-garansi-keluar/page'

export default function GuaranteeRecordTable() {
    const [makeGuaranteePage, setMakeGuaranteePage] = useState(1)
    const [makeGuaranteeLimit, setMakeGuaranteeLimit] = useState(5)
    const [makeGuaranteeSearchData, setMakeGuaranteeSearchData] = useState('')
    const [incomingGuaranteePage, setIncomingGuaranteePage] = useState(1)
    const [incomingGuaranteeLimit, setIncomingGuaranteeLimit] = useState(5)
    const [incomingGuaranteeSearchData, setIncomingGuaranteeSearchData] =
        useState('')
    const [outgoingGuaranteePage, setOutgoingGuaranteePage] = useState(1)
    const [outgoingGuaranteeLimit, setOutgoingGuaranteeLimit] = useState(5)
    const [outgoingGuaranteeSearchData, setOutgoingGuaranteeSearchData] =
        useState('')
    const [showAddGuaranteeModal, setShowAddGuaranteeModal] = useState(false)
    const [showEditGuaranteeModal, setShowEditGuaranteeModal] = useState(false)
    const [showDeleteGuaranteeModal, setShowDeleteGuaranteeModal] =
        useState(false)
    const [showViewGuaranteeModal, setShowViewGuaranteeModal] = useState(false)
    const [showAddIncomingGuaranteeModal, setShowAddIncomingGuaranteeModal] =
        useState(false)
    const [showEditIncomingGuaranteeModal, setShowEditIncomingGuaranteeModal] =
        useState(false)
    const [
        showDeleteIncomingGuaranteeModal,
        setShowDeleteIncomingGuaranteeModal,
    ] = useState(false)
    const [showViewIncomingGuaranteeModal, setShowViewIncomingGuaranteeModal] =
        useState(false)
    const [showAddOutgoingGuaranteeModal, setShowAddOutgoingGuaranteeModal] =
        useState(false)
    const [showEditOutgoingGuaranteeModal, setShowEditOutgoingGuaranteeModal] =
        useState(false)
    const [
        showDeleteOutgoingGuaranteeModal,
        setShowDeleteOutgoingGuaranteeModal,
    ] = useState(false)
    const [showViewOutgoingGuaranteeModal, setShowViewOutgoingGuaranteeModal] =
        useState(false)

    const token = getCookie('token')
    const [selectedItem, setSelectedItem] = useState('Buat Garansi')
    const [isClient, setIsClient] = useState(false)
    const selectedGuaranteeData = useSelector(
        (state) => state.guarantee.guarantee.selectedGuarantee
    )

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Buat Garansi') {
            setMakeGuaranteePage(page)
        } else if (selectedItem === 'Garansi Masuk') {
            setIncomingGuaranteePage(page)
        } else {
            setOutgoingGuaranteePage(page)
        }
    }

    const buttons = [
        {
            title: 'Buat Garansi',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Garansi Masuk',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Garansi Keluar',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchGuarantee(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/guarantee?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: guaranteeData } = useQuery({
        queryKey: [
            'make-guarantee',
            makeGuaranteePage,
            makeGuaranteeSearchData,
            makeGuaranteeLimit,
        ],
        queryFn: () =>
            fetchGuarantee(
                makeGuaranteePage,
                makeGuaranteeSearchData,
                makeGuaranteeLimit
            ),
    })

    async function fetchIncomingGuarantee(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/incoming-guarantee?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: incomingGuaranteeData } = useQuery({
        queryKey: [
            'incoming-guarantee',
            incomingGuaranteePage,
            incomingGuaranteeSearchData,
            incomingGuaranteeLimit,
        ],
        queryFn: () =>
            fetchIncomingGuarantee(
                incomingGuaranteePage,
                incomingGuaranteeSearchData,
                incomingGuaranteeLimit
            ),
    })

    async function fetchOutgoingGuarantee(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/outgoing-guarantee?page=' +
                pageData +
                '&search=' +
                search +
                '&limit=' +
                limitData
        )
        return data.results
    }

    const { data: outgoingGuaranteeData } = useQuery({
        queryKey: [
            'outgoing-guarantee',
            outgoingGuaranteePage,
            outgoingGuaranteeSearchData,
            outgoingGuaranteeLimit,
        ],
        queryFn: () =>
            fetchOutgoingGuarantee(
                outgoingGuaranteePage,
                outgoingGuaranteeSearchData,
                outgoingGuaranteeLimit
            ),
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(false))
    }, [])

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
                            placeholder="Cari Garansi"
                            className="h-[48px]"
                            append={<Icon icon="heroicons-outline:search" />}
                            onChange={(e) => {
                                setMakeGuaranteeSearchData(e.target.value)
                                setIncomingGuaranteeSearchData(e.target.value)
                                setOutgoingGuaranteeSearchData(e.target.value)
                                fetchGuarantee()
                                fetchIncomingGuarantee()
                                fetchOutgoingGuarantee()
                            }}
                        />
                    </div>
                    {isClient ? (
                        <Button
                            text="Download PDF"
                            icon="heroicons-outline:newspaper"
                            className="bg-warning-500 text-white"
                            onClick={() => {
                                selectedGuaranteeData?.length == 0 &&
                                    toast.error(
                                        'Silahkan ceklis data terlebih dahulu'
                                    )
                            }}
                            children={
                                selectedGuaranteeData?.length >= 1 ? (
                                    <div>
                                        <PDFDownloadLink
                                            document={
                                                selectedItem ===
                                                'Buat Garansi' ? (
                                                    <GuaranteeDocument
                                                        data={
                                                            selectedGuaranteeData
                                                        }
                                                    />
                                                ) : selectedItem ===
                                                  'Garansi Masuk' ? (
                                                    <IncomingGuaranteeDocument
                                                        data={
                                                            selectedGuaranteeData
                                                        }
                                                    />
                                                ) : (
                                                    <OutgoingGuaranteeDocument
                                                        data={
                                                            selectedGuaranteeData
                                                        }
                                                    />
                                                )
                                            }
                                            fileName="data-garansi.pdf"
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
                                                className={` text-sm font-medium mb-7 capitalize bg-white
             dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
              transition duration-150 before:transition-all before:duration-150 relative 
              before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 
              before:-translate-x-1/2 
              
              ${
                  selected
                      ? 'text-primary-500 before:w-full'
                      : 'text-slate-500 before:w-0 dark:text-slate-300'
              }
              `}
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
                                        <MakeGuaranteeTable
                                            setShowViewGuaranteeModal={
                                                setShowViewGuaranteeModal
                                            }
                                            setShowEditGuaranteeModal={
                                                setShowEditGuaranteeModal
                                            }
                                            setShowDeleteGuaranteeModal={
                                                setShowDeleteGuaranteeModal
                                            }
                                            guaranteeData={guaranteeData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <IncomingGuaranteeTable
                                            setShowViewIncomingGuaranteeModal={
                                                setShowViewIncomingGuaranteeModal
                                            }
                                            setShowEditIncomingGuaranteeModal={
                                                setShowEditIncomingGuaranteeModal
                                            }
                                            setShowDeleteIncomingGuaranteeModal={
                                                setShowDeleteIncomingGuaranteeModal
                                            }
                                            incomingGuaranteeData={
                                                incomingGuaranteeData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <OutgoingGuaranteeTable
                                            setShowViewOutgoingGuaranteeModal={
                                                setShowViewOutgoingGuaranteeModal
                                            }
                                            setShowEditOutgoingGuaranteeModal={
                                                setShowEditOutgoingGuaranteeModal
                                            }
                                            setShowDeleteOutgoingGuaranteeModal={
                                                setShowDeleteOutgoingGuaranteeModal
                                            }
                                            outgoingGuaranteeData={
                                                outgoingGuaranteeData
                                            }
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
                                if (selectedItem === 'Buat Garansi') {
                                    setMakeGuaranteeLimit(e.target.value)
                                    fetchGuarantee()
                                } else if (selectedItem === 'Garansi Masuk') {
                                    setIncomingGuaranteeLimit(e.target.value)
                                    fetchIncomingGuarantee()
                                } else {
                                    setOutgoingGuaranteeLimit(e.target.value)
                                    fetchOutgoingGuarantee()
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
                        {selectedItem === 'Buat Garansi' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {guaranteeData?.currentPage} of{' '}
                                {guaranteeData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Garansi Masuk' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {incomingGuaranteeData?.currentPage} of{' '}
                                {incomingGuaranteeData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {outgoingGuaranteeData?.currentPage} of{' '}
                                {outgoingGuaranteeData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div>
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Buat Garansi'
                                    ? makeGuaranteePage?.totalPages
                                    : selectedItem === 'Garansi Masuk'
                                      ? incomingGuaranteeData?.totalPages
                                      : outgoingGuaranteeData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Buat Garansi'
                                    ? makeGuaranteePage?.currentPage
                                    : selectedItem === 'Garansi Masuk'
                                      ? incomingGuaranteeData?.currentPage
                                      : outgoingGuaranteeData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Garansi"
                    label="Tambah Garansi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddGuaranteeModal}
                    onClose={() => {
                        setShowAddGuaranteeModal(!showAddGuaranteeModal)
                    }}
                >
                    <AddGuaranteeForm
                        setShowAddGuaranteeModal={setShowAddGuaranteeModal}
                    />
                </Modal>
                <Modal
                    title="Edit Garansi"
                    label="Edit Garansi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditGuaranteeModal}
                    onClose={() => {
                        setShowEditGuaranteeModal(!showEditGuaranteeModal)
                    }}
                >
                    <EditGuaranteeForm
                        setShowEditGuaranteeModal={setShowEditGuaranteeModal}
                    />
                </Modal>
                <Modal
                    title="Detail Garansi"
                    label="Detail Garansi"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewGuaranteeModal}
                    onClose={() => {
                        setShowViewGuaranteeModal(!showViewGuaranteeModal)
                    }}
                >
                    <DetailGuaranteeForm
                        setShowViewGuaranteeModal={setShowViewGuaranteeModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Garansi"
                    label="Hapus Garansi"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteGuaranteeModal}
                    onClose={() => {
                        setShowDeleteGuaranteeModal(!showDeleteGuaranteeModal)
                    }}
                >
                    <DeleteGuaranteeForm
                        setShowDeleteGuaranteeModal={
                            setShowDeleteGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Garansi Masuk"
                    label="Tambah Garansi Masuk"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddIncomingGuaranteeModal}
                    onClose={() => {
                        setShowAddIncomingGuaranteeModal(
                            !showAddIncomingGuaranteeModal
                        )
                    }}
                >
                    <IncomingGuaranteeForm
                        setShowAddIncomingGuaranteeModal={
                            setShowAddIncomingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Garansi Masuk"
                    label="Edit Garansi Masuk"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditIncomingGuaranteeModal}
                    onClose={() => {
                        setShowEditIncomingGuaranteeModal(
                            !showEditIncomingGuaranteeModal
                        )
                    }}
                >
                    <EditIncomingGuaranteeForm
                        setShowEditIncomingGuaranteeModal={
                            setShowEditIncomingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Garansi Masuk"
                    label="Detail Garansi Masuk"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewIncomingGuaranteeModal}
                    onClose={() => {
                        setShowViewIncomingGuaranteeModal(
                            !showViewIncomingGuaranteeModal
                        )
                    }}
                >
                    <DetailIncomingGuaranteeForm
                        setShowViewIncomingGuaranteeModal={
                            setShowViewIncomingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Garansi Masuk"
                    label="Hapus Garansi Masuk"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteIncomingGuaranteeModal}
                    onClose={() => {
                        setShowDeleteIncomingGuaranteeModal(
                            !showDeleteIncomingGuaranteeModal
                        )
                    }}
                >
                    <DeleteIncomingGuaranteeForm
                        showDeleteIncomingGuaranteeModal={
                            setShowDeleteIncomingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Garansi Keluar"
                    label="Tambah Garansi Keluar"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddOutgoingGuaranteeModal}
                    onClose={() => {
                        setShowAddOutgoingGuaranteeModal(
                            !showAddOutgoingGuaranteeModal
                        )
                    }}
                >
                    <AddOutgoingGuaranteeForm
                        setShowAddOutgoingGuaranteeModal={
                            setShowAddOutgoingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Garansi Keluar"
                    label="Edit Garansi Keluar"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditOutgoingGuaranteeModal}
                    onClose={() => {
                        setShowEditOutgoingGuaranteeModal(
                            !showEditOutgoingGuaranteeModal
                        )
                    }}
                >
                    <EditOutgoingGuaranteeForm
                        setShowEditOutgoingGuaranteeModal={
                            setShowEditOutgoingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Garansi Keluar"
                    label="Detail Garansi Keluar"
                    className="max-w-6xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewOutgoingGuaranteeModal}
                    onClose={() => {
                        setShowViewOutgoingGuaranteeModal(
                            !showViewOutgoingGuaranteeModal
                        )
                    }}
                >
                    <DetailOutgoingGuaranteeForm
                        setShowViewOutgoingGuaranteeModal={
                            setShowViewOutgoingGuaranteeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Garansi Keluar"
                    label="Hapus Garansi Keluar"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteOutgoingGuaranteeModal}
                    onClose={() => {
                        setShowDeleteOutgoingGuaranteeModal(
                            !showDeleteOutgoingGuaranteeModal
                        )
                    }}
                >
                    <DeleteOutgoingGuaranteeForm
                        showDeleteOutgoingGuaranteeModal={
                            setShowDeleteOutgoingGuaranteeModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
