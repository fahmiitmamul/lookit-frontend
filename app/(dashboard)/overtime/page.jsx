'use client'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import AddOvertimeForm from '@/components/overtime/add-send-overtime-form/page'
import EditOvertimeForm from '@/components/overtime/edit-send-overtime-form/page'
import DetailOvertimeForm from '@/components/overtime/detail-send-overtime-form/page'
import DeleteOvertimeForm from '@/components/overtime/delete-send-overtime-form/page'
import SendOvertimeTable from '@/components/overtime/send-overtime-table/page'
import OvertimeDataTable from '@/components/overtime/overtime-data-table/page'
import ApprovedOvertimeTable from '@/components/overtime/approved-overtime-table/page'
import DeclinedOvertimeTable from '@/components/overtime/rejected-overtime-table/page'
import EditOvertimeDataForm from '@/components/overtime/edit-overtime-data-form/page'
import DetailOvertimeDataForm from '@/components/overtime/detail-overtime-data-form/page'
import DeleteOvertimeDataForm from '@/components/overtime/delete-overtime-data-form/page'
import EditApprovedOvertimeForm from '@/components/overtime/edit-approved-overtime-form/page'
import DetailApprovedOvertimeForm from '@/components/overtime/detail-approved-overtime-form/page'
import DeleteApprovedOvertimeForm from '@/components/overtime/delete-approved-overtime-form/page'
import EditDeclinedOvertimeForm from '@/components/overtime/edit-rejected-overtime-form/page'
import DetailDeclinedOvertimeForm from '@/components/overtime/detail-rejected-overtime-form/page'
import DeleteDeclinedOvertimeForm from '@/components/overtime/delete-rejected-overtime-form/page'
import { useDispatch, useSelector } from 'react-redux'
import { setShowVerificationModal } from '@/components/overtime/store'
import VerificationOvertimeForm from '@/components/overtime/overtime-verification-data-form/page'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import Flatpickr from 'react-flatpickr'
import DownloadOvertimeForm from '@/components/overtime/download-overtime-form/page'

export default function Lembur() {
    const [sendOvertimePage, setSendOvertimePage] = useState(1)
    const [sendOvertimeLimit, setSendOvertimeLimit] = useState(5)
    const [sendOvertimeSearchData, setSendOvertimeSearchData] = useState('')
    const [overtimeDataPage, setOvertimeDataPage] = useState(1)
    const [overtimeDataLimit, setOvertimeDataLimit] = useState(5)
    const [overtimeDataSearchData, setOvertimeDataSearchData] = useState('')
    const [approvedOvertimeDataPage, setApprovedOvertimeDataPage] = useState(1)
    const [approvedOvertimeDataLimit, setApprovedOvertimeDataLimit] =
        useState(5)
    const [approvedOvertimeDataSearchData, setApprovedOvertimeDataSearchData] =
        useState('')
    const [declinedOvertimeDataPage, setDeclinedOvertimeDataPage] = useState(1)
    const [declinedOvertimeDataLimit, setDeclinedOvertimeDataLimit] =
        useState(5)
    const [declinedOvertimeDataSearchData, setDeclinedOvertimeDataSearchData] =
        useState('')
    const [showAddSendOvertimeModal, setShowAddSendOvertimeModal] =
        useState(false)
    const [showEditSendOvertimeModal, setShowEditSendOvertimeModal] =
        useState(false)
    const [showViewSendOvertimeModal, setShowViewSendOvertimeModal] =
        useState(false)
    const [showDeleteSendOvertimeModal, setShowDeleteSendOvertimeModal] =
        useState(false)
    const [showEditOvertimeDataModal, setShowEditOvertimeDataModal] =
        useState(false)
    const [showViewOvertimeDataModal, setShowViewOvertimeDataModal] =
        useState(false)
    const [showDeleteOvertimeDataModal, setShowDeleteOvertimeDataModal] =
        useState(false)
    const [showEditApprovedOvertimeModal, setShowEditApprovedOvertimeModal] =
        useState(false)
    const [showViewApprovedOvertimeModal, setShowViewApprovedOvertimeModal] =
        useState(false)
    const [
        showDeleteApprovedOvertimeModal,
        setShowDeleteApprovedOvertimeModal,
    ] = useState(false)
    const [showEditDeclinedOvertimeModal, setShowEditDeclinedOvertimeModal] =
        useState(false)
    const [showViewDeclinedOvertimeModal, setShowViewDeclinedOvertimeModal] =
        useState(false)
    const [
        showDeleteDeclinedOvertimeModal,
        setShowDeleteDeclinedOvertimeModal,
    ] = useState(false)
    const [selectedItem, setSelectedItem] = useState('Kirim Lembur')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [showDownloadOvertimeModal, setShowDownloadOvertimeModal] =
        useState(false)
    const token = getCookie('token')
    const [isClient, setIsClient] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsClient(true)
    }, [])

    const showVerificationModal = useSelector(
        (state) => state.overtime.overtime.showVerificationModal
    )

    const selectedOvertimeData = useSelector(
        (state) => state.overtime.overtime.selectedOvertimeData
    )

    const buttons = [
        {
            title: 'Kirim Lembur',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Data Lembur',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Setuju',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Tolak',
            icon: 'heroicons-outline:home',
        },
    ]

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    async function fetchSendOvertime(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/overtime/send?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: sendOvertimeData } = useQuery({
        queryKey: [
            'send-overtime',
            sendOvertimePage,
            sendOvertimeSearchData,
            sendOvertimeLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchSendOvertime(
                sendOvertimePage,
                sendOvertimeSearchData,
                sendOvertimeLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchOvertimeData(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/overtime/data?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: overtimeData } = useQuery({
        queryKey: [
            'overtime',
            overtimeDataPage,
            overtimeDataSearchData,
            overtimeDataLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchOvertimeData(
                overtimeDataPage,
                overtimeDataSearchData,
                overtimeDataLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchApprovedOvertime(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/overtime/approved?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: approvedOvertimeData } = useQuery({
        queryKey: [
            'approved-overtime',
            approvedOvertimeDataPage,
            approvedOvertimeDataSearchData,
            approvedOvertimeDataLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchApprovedOvertime(
                approvedOvertimeDataPage,
                approvedOvertimeDataSearchData,
                approvedOvertimeDataLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchDeclinedOvertime(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/overtime/declined?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: declinedOvertimeData } = useQuery({
        queryKey: [
            'declined-overtime',
            declinedOvertimeDataPage,
            declinedOvertimeDataSearchData,
            declinedOvertimeDataLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchDeclinedOvertime(
                declinedOvertimeDataPage,
                declinedOvertimeDataSearchData,
                declinedOvertimeDataLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    const handlePageChange = (page) => {
        if (selectedItem === 'Kirim Lembur') {
            setSendOvertimePage(page)
        } else if (selectedItem === 'Data Lembur') {
            setOvertimeDataPage(page)
        } else if (selectedItem === 'Setuju') {
            setApprovedOvertimeDataPage(page)
        } else {
            setDeclinedOvertimeDataPage(page)
        }
    }

    const queryClient = useQueryClient()

    const patchApprovedOvertime = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                status: 'Setuju',
                selectedOvertimeData: selectedOvertimeData.map(
                    (item) => item.id
                ),
            }).toString()
            return http(token).patch(`/overtime/status`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengupdate data lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const patchDeclinedOvertime = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                status: 'Tolak',
                selectedOvertimeData: selectedOvertimeData.map(
                    (item) => item.id
                ),
            }).toString()
            return http(token).patch(`/overtime/status`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime'] })
            dispatch(setLoading(false))
            toast.success('Berhasil mengupdate data lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap gap-5 justify-between mb-5">
                    <div className="flex flex-wrap gap-5 justify-between w-full">
                        <div className="flex justify-center items-center">
                            <h5>
                                {selectedItem === 'Kirim Lembur'
                                    ? 'Kirim Lembur'
                                    : selectedItem === 'Setuju'
                                      ? 'Data Lembur Setuju'
                                      : selectedItem === 'Tolak'
                                        ? 'Data Lembur Tolak'
                                        : 'Data Lembur'}
                            </h5>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-5">
                                <div>
                                    {selectedItem === 'Kirim Lembur' && (
                                        <div>
                                            <Button
                                                onClick={() => {
                                                    setShowAddSendOvertimeModal(
                                                        !showAddSendOvertimeModal
                                                    )
                                                }}
                                                icon="heroicons-outline:plus"
                                                text="Kirim Lembur"
                                                className="btn-success"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        download={
                            <div className="flex gap-5">
                                {isClient && selectedItem !== 'Kirim Lembur' ? (
                                    <div className="flex gap-5">
                                        <Button
                                            text="Download"
                                            icon="heroicons-outline:newspaper"
                                            className="bg-warning-500 text-white"
                                            onClick={() => {
                                                selectedOvertimeData?.length ==
                                                0
                                                    ? toast.error(
                                                          'Silahkan ceklis data terlebih dahulu'
                                                      )
                                                    : setShowDownloadOvertimeModal(
                                                          !showDownloadOvertimeModal
                                                      )
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        }
                        period={
                            <div className="flex gap-2">
                                <div className="flex justify-center items-center gap-3">
                                    <div>
                                        <Flatpickr
                                            value={selectedPeriod}
                                            defaultValue={new Date()}
                                            id="period"
                                            placeholder="Periode Awal - Periode Akhir"
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
                            selectedItem === 'Data Lembur' && (
                                <div className="flex gap-5">
                                    <Button
                                        icon="heroicons-outline:check"
                                        text="Setujui Semua"
                                        className="btn-success"
                                        onClick={() => {
                                            if (
                                                selectedOvertimeData.length ===
                                                0
                                            ) {
                                                toast.error(
                                                    'Silahkan checklist data terlebih dahulu'
                                                )
                                            } else {
                                                patchApprovedOvertime.mutate()
                                            }
                                        }}
                                    />
                                    <Button
                                        icon="heroicons-outline:check"
                                        text="Tolak Semua"
                                        className="btn-danger"
                                        onClick={() => {
                                            if (
                                                selectedOvertimeData.length ===
                                                0
                                            ) {
                                                toast.error(
                                                    'Silahkan checklist data terlebih dahulu'
                                                )
                                            } else {
                                                patchDeclinedOvertime.mutate()
                                            }
                                        }}
                                    />
                                </div>
                            )
                        }
                        search={
                            <div className="flex gap-5">
                                <div>
                                    <InputGroup
                                        id="largesize"
                                        type="text"
                                        onChange={(e) => {
                                            if (
                                                selectedItem === 'Kirim Lembur'
                                            ) {
                                                setSendOvertimeSearchData(
                                                    e.target.value
                                                )
                                            } else if (
                                                selectedItem === 'Data Lembur'
                                            ) {
                                                setOvertimeDataSearchData(
                                                    e.target.value
                                                )
                                            } else if (
                                                selectedItem === 'Setuju'
                                            ) {
                                                setApprovedOvertimeDataSearchData(
                                                    e.target.value
                                                )
                                            } else {
                                                setDeclinedOvertimeDataSearchData(
                                                    e.target.value
                                                )
                                            }
                                        }}
                                        placeholder="Cari"
                                        className="h-[48px]"
                                        append={
                                            <Icon icon="heroicons-outline:search" />
                                        }
                                    />
                                </div>
                            </div>
                        }
                    >
                        <Tab.Group>
                            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                                {buttons.map((item, i) => (
                                    <Tab as={Fragment} key={i}>
                                        {({ selected }) => (
                                            <button
                                                className={`mr-4 text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
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
                                        <SendOvertimeTable
                                            setShowViewSendOvertimeModal={
                                                setShowViewSendOvertimeModal
                                            }
                                            setShowEditSendOvertimeModal={
                                                setShowEditSendOvertimeModal
                                            }
                                            setShowDeleteSendOvertimeModal={
                                                setShowDeleteSendOvertimeModal
                                            }
                                            sendOvertimeData={sendOvertimeData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <OvertimeDataTable
                                            setShowViewOvertimeDataModal={
                                                setShowViewOvertimeDataModal
                                            }
                                            setShowEditOvertimeDataModal={
                                                setShowEditOvertimeDataModal
                                            }
                                            setShowDeleteOvertimeDataModal={
                                                setShowDeleteOvertimeDataModal
                                            }
                                            overtimeData={overtimeData}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <ApprovedOvertimeTable
                                            setShowViewApprovedOvertimeModal={
                                                setShowViewApprovedOvertimeModal
                                            }
                                            setShowEditApprovedOvertimeModal={
                                                setShowEditApprovedOvertimeModal
                                            }
                                            setShowDeleteApprovedOvertimeModal={
                                                setShowDeleteApprovedOvertimeModal
                                            }
                                            approvedOvertimeData={
                                                approvedOvertimeData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <DeclinedOvertimeTable
                                            setShowViewDeclinedOvertimeModal={
                                                setShowViewDeclinedOvertimeModal
                                            }
                                            setShowEditDeclinedOvertimeModal={
                                                setShowEditDeclinedOvertimeModal
                                            }
                                            setShowDeleteDeclinedOvertimeModal={
                                                setShowDeleteDeclinedOvertimeModal
                                            }
                                            declinedOvertimeData={
                                                declinedOvertimeData
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
                                if (selectedItem === 'Kirim Lembur') {
                                    setSendOvertimeLimit(e.target.value)
                                    fetchSendOvertime()
                                } else if (selectedItem === 'Data Lembur') {
                                    setOvertimeDataLimit(e.target.value)
                                    fetchOvertimeData()
                                } else if (selectedItem === 'Setuju') {
                                    setApprovedOvertimeDataLimit(e.target.value)
                                    fetchApprovedOvertime()
                                } else {
                                    setDeclinedOvertimeDataLimit(e.target.value)
                                    fetchDeclinedOvertime()
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[5, 10, 25].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Kirim Lembur' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {sendOvertimeData?.currentPage} of{' '}
                                {sendOvertimeData?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Data Lembur' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {overtimeData?.currentPage} of{' '}
                                {overtimeData?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Setuju' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {approvedOvertimeData?.currentPage} of{' '}
                                {approvedOvertimeData?.totalPages} entries
                            </span>
                        )}
                        {selectedItem === 'Tolak' && (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {declinedOvertimeData?.currentPage} of{' '}
                                {declinedOvertimeData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Kirim Lembur'
                                    ? sendOvertimeData?.totalPages
                                    : selectedItem === 'Setuju'
                                      ? approvedOvertimeData?.totalPages
                                      : selectedItem === 'Tolak'
                                        ? declinedOvertimeData?.totalPages
                                        : overtimeData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Kirim Lembur'
                                    ? sendOvertimeData?.currentPage
                                    : selectedItem === 'Setuju'
                                      ? approvedOvertimeData?.currentPage
                                      : selectedItem === 'Tolak'
                                        ? declinedOvertimeData?.currentPage
                                        : overtimeData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Lembur"
                    label="Tambah Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddSendOvertimeModal}
                    onClose={() => {
                        setShowAddSendOvertimeModal(!showAddSendOvertimeModal)
                    }}
                >
                    <AddOvertimeForm
                        setShowAddSendOvertimeModal={
                            setShowAddSendOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Lembur"
                    label="Edit Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditSendOvertimeModal}
                    onClose={() => {
                        setShowEditSendOvertimeModal(!showEditSendOvertimeModal)
                    }}
                >
                    <EditOvertimeForm
                        setShowEditSendOvertimeModal={
                            setShowEditSendOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Lembur"
                    label="Detail Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewSendOvertimeModal}
                    onClose={() => {
                        setShowViewSendOvertimeModal(!showViewSendOvertimeModal)
                    }}
                >
                    <DetailOvertimeForm
                        setShowViewSendOvertimeModal={
                            setShowViewSendOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Lembur"
                    label="Hapus Lembur"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteSendOvertimeModal}
                    onClose={() => {
                        setShowDeleteSendOvertimeModal(
                            !showDeleteSendOvertimeModal
                        )
                    }}
                >
                    <DeleteOvertimeForm
                        setShowDeleteSendOvertimeModal={
                            setShowDeleteSendOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Data Lembur"
                    label="Edit Data Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditOvertimeDataModal}
                    onClose={() => {
                        setShowEditOvertimeDataModal(!showEditOvertimeDataModal)
                    }}
                >
                    <EditOvertimeDataForm
                        setShowEditOvertimeDataModal={
                            setShowEditOvertimeDataModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Data Lembur"
                    label="Detail Data Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewOvertimeDataModal}
                    onClose={() => {
                        setShowViewOvertimeDataModal(!showViewOvertimeDataModal)
                    }}
                >
                    <DetailOvertimeDataForm
                        setShowViewOvertimeDataModal={
                            setShowViewOvertimeDataModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Data Lembur"
                    label="Hapus Data Lembur"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteOvertimeDataModal}
                    onClose={() => {
                        setShowDeleteOvertimeDataModal(
                            !showDeleteOvertimeDataModal
                        )
                    }}
                >
                    <DeleteOvertimeDataForm
                        setShowDeleteOvertimeDataModal={
                            setShowDeleteOvertimeDataModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Lembur Setuju"
                    label="Edit Lembur Setuju"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditApprovedOvertimeModal}
                    onClose={() => {
                        setShowEditApprovedOvertimeModal(
                            !showEditApprovedOvertimeModal
                        )
                    }}
                >
                    <EditApprovedOvertimeForm
                        setShowEditApprovedOvertimeModal={
                            setShowEditApprovedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Lembur Setuju"
                    label="Detail Lembur Setuju"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewApprovedOvertimeModal}
                    onClose={() => {
                        setShowViewApprovedOvertimeModal(
                            !showViewApprovedOvertimeModal
                        )
                    }}
                >
                    <DetailApprovedOvertimeForm
                        setShowViewApprovedOvertimeModal={
                            setShowViewApprovedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Lembur Setuju"
                    label="Hapus Lembur Setuju"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteApprovedOvertimeModal}
                    onClose={() => {
                        setShowDeleteApprovedOvertimeModal(
                            !showDeleteApprovedOvertimeModal
                        )
                    }}
                >
                    <DeleteApprovedOvertimeForm
                        setShowDeleteApprovedOvertimeModal={
                            setShowDeleteApprovedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Lembur Tolak"
                    label="Edit Lembur Tolak"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditDeclinedOvertimeModal}
                    onClose={() => {
                        setShowEditDeclinedOvertimeModal(
                            !showEditDeclinedOvertimeModal
                        )
                    }}
                >
                    <EditDeclinedOvertimeForm
                        setShowEditOvertimeModal={
                            setShowEditDeclinedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Lembur Tolak"
                    label="Detail Lembur Tolak"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewDeclinedOvertimeModal}
                    onClose={() => {
                        setShowViewDeclinedOvertimeModal(
                            !showViewDeclinedOvertimeModal
                        )
                    }}
                >
                    <DetailDeclinedOvertimeForm
                        setShowViewDeclinedOvertimeModal={
                            setShowViewDeclinedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Lembur Tolak"
                    label="Hapus Lembur Tolak"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteDeclinedOvertimeModal}
                    onClose={() => {
                        setShowDeleteDeclinedOvertimeModal(
                            !showDeleteDeclinedOvertimeModal
                        )
                    }}
                >
                    <DeleteDeclinedOvertimeForm
                        setShowDeleteDeclinedOvertimeModal={
                            setShowDeleteDeclinedOvertimeModal
                        }
                    />
                </Modal>
                <Modal
                    title="Verifikasi Lembur"
                    label="Verifikasi Lembur"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showVerificationModal}
                    onClose={() => {
                        dispatch(setShowVerificationModal(false))
                    }}
                >
                    <VerificationOvertimeForm />
                </Modal>
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadOvertimeModal}
                    onClose={() => {
                        setShowDownloadOvertimeModal(!showDownloadOvertimeModal)
                    }}
                >
                    <DownloadOvertimeForm
                        selectedOvertimeData={selectedOvertimeData}
                        isClient={isClient}
                    />
                </Modal>
            </div>
        </>
    )
}
