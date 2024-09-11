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
import MakeGuaranteeTable from '@/components/guarantee/make-guarantee-table/page'
import IncomingGuaranteeTable from '@/components/guarantee/incoming-guarantee-table/page'
import OutgoingGuaranteeTable from '@/components/guarantee/outgoing-guarantee-table/page'
import IncomingGuaranteeForm from '@/components/guarantee/incoming-guarantee-form/page'
import AddGuaranteeForm from '@/components/guarantee/make-guarantee-form/page'
import EditGuaranteeForm from '@/components/guarantee/edit-guarantee-form/page'
import DetailGuaranteeForm from '@/components/guarantee/detail-guarantee-form/page'
import DeleteGuaranteeForm from '@/components/guarantee/delete-guarantee-form/page'
import EditOutgoingGuaranteeForm from '@/components/guarantee/edit-outgoing-guarantee-form/page'
import DetailIncomingGuaranteeForm from '@/components/guarantee/detail-incoming-guarantee-form/page'
import DeleteOutgoingGuaranteeForm from '@/components/guarantee/delete-outgoing-guarantee-table/page'
import AddOutgoingGuaranteeForm from '@/components/guarantee/outgoing-guarantee-from/page'
import DetailOutgoingGuaranteeForm from '@/components/guarantee/detail-outgoing-guarantee-form/page'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import EditIncomingGuaranteeForm from '@/components/guarantee/edit-incoming-guarantee-form/page'
import DeleteIncomingGuaranteeForm from '@/components/guarantee/delete-incoming-guarantee-table/page'
import { toast } from 'react-toastify'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSelector } from 'react-redux'
import GuaranteeDocument from '@/components/guarantee/download-pdf-guarantee/page'
import IncomingGuaranteeDocument from '@/components/guarantee/download-pdf-incoming-guarantee/page'
import OutgoingGuaranteeDocument from '@/components/guarantee/download-pdf-outgoing-guarantee/page'
import Dropdown from '@/components/ui/Dropdown'
import DownloadGuaranteeModal from '@/components/guarantee/download-modal-guarantee/page'
import DownloadIncomingGuaranteeModal from '@/components/guarantee/download-modal-incoming-guarantee/page'
import DownloadOutgoingGuaranteeModal from '@/components/guarantee/download-modal-outgoing-guarantee/page'

export default function Guarantee() {
    const [showDownloadGuaranteeModal, setShowDownloadGuaranteeModal] =
        useState(false)
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
    const [selectedItem, setSelectedItem] = useState('Data Garansi')
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
        if (selectedItem === 'Data Garansi') {
            setMakeGuaranteePage(page)
        } else if (selectedItem === 'Garansi Masuk') {
            setIncomingGuaranteePage(page)
        } else {
            setOutgoingGuaranteePage(page)
        }
    }

    const buttons = [
        {
            title: 'Data Garansi',
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
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex justify-center items-center">
                            <h5>
                                {selectedItem === 'Data Garansi'
                                    ? 'Data Garansi'
                                    : selectedItem === 'Garansi Masuk'
                                      ? 'Data Garansi Masuk'
                                      : 'Data Garansi Keluar'}
                            </h5>
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 flex gap-5">
                        <div>
                            <Button
                                onClick={() => {
                                    if (selectedItem === 'Data Garansi') {
                                        setShowAddGuaranteeModal(
                                            !showAddGuaranteeModal
                                        )
                                    } else if (
                                        selectedItem === 'Garansi Masuk'
                                    ) {
                                        setShowAddIncomingGuaranteeModal(
                                            !showAddIncomingGuaranteeModal
                                        )
                                    } else {
                                        setShowAddOutgoingGuaranteeModal(
                                            !showAddOutgoingGuaranteeModal
                                        )
                                    }
                                }}
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text={
                                    selectedItem === 'Data Garansi'
                                        ? 'Buat Garansi'
                                        : selectedItem === 'Garansi Masuk'
                                          ? 'Buat Garansi Masuk'
                                          : 'Buat Garansi Keluar'
                                }
                            />
                        </div>
                        <div className="flex gap-5">
                            <Button
                                text="Download"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedGuaranteeData?.length == 0
                                        ? toast.error(
                                              'Silahkan ceklis data terlebih dahulu'
                                          )
                                        : setShowDownloadGuaranteeModal(
                                              !showDownloadGuaranteeModal
                                          )
                                }}
                            />
                        </div>
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
                                        setMakeGuaranteeSearchData(
                                            e.target.value
                                        )
                                        setIncomingGuaranteeSearchData(
                                            e.target.value
                                        )
                                        setOutgoingGuaranteeSearchData(
                                            e.target.value
                                        )
                                        fetchGuarantee()
                                        fetchIncomingGuarantee()
                                        fetchOutgoingGuarantee()
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
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Data Garansi') {
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
                        {selectedItem === 'Data Garansi' ? (
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
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Data Garansi'
                                    ? makeGuaranteePage?.totalPages
                                    : selectedItem === 'Garansi Masuk'
                                      ? incomingGuaranteeData?.totalPages
                                      : outgoingGuaranteeData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Data Garansi'
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
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadGuaranteeModal}
                    onClose={() => {
                        setShowDownloadGuaranteeModal(
                            !showDownloadGuaranteeModal
                        )
                    }}
                >
                    {selectedItem === 'Garansi' ? (
                        <DownloadGuaranteeModal
                            selectedGuaranteeData={selectedGuaranteeData}
                            isClient={isClient}
                        />
                    ) : selectedItem === 'Garansi Masuk' ? (
                        <DownloadIncomingGuaranteeModal
                            selectedGuaranteeData={selectedGuaranteeData}
                            isClient={isClient}
                        />
                    ) : (
                        <DownloadOutgoingGuaranteeModal
                            selectedGuarantee={selectedGuaranteeData}
                            isClient={isClient}
                        />
                    )}
                </Modal>
            </div>
        </>
    )
}
