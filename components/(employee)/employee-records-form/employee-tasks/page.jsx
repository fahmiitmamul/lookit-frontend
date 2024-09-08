'use client'
import React, { Fragment, useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import ProcessedTasks from '@/components/tugas/tabel-tugas-proses/page'
import FinishedTasks from '@/components/tugas/tabel-tugas-selesai/page'
import CanceledTasks from '@/components/tugas/tabel-tugas-dibatalkan/page'
import Modal from '@/components/ui/Modal'
import Flatpickr from 'react-flatpickr'
import AddFinishedTasksForm from '@/components/tugas/form-tambah-tugas-selesai/page'
import AddProcessedTaskForm from '@/components/tugas/form-tambah-tugas-proses/page'
import EditProcessedTaskForm from '@/components/tugas/form-edit-tugas-proses/page'
import DeleteProcessedTaskForm from '@/components/tugas/form-hapus-tugas-proses/page'
import DetailProcessedTaskForm from '@/components/tugas/form-detail-tugas-proses/page'
import EditFinishedTaskForm from '@/components/tugas/form-edit-tugas-selesai/page'
import DetailFinishedTaskForm from '@/components/tugas/form-detail-tugas-selesai/page'
import DeleteFinishedTaskForm from '@/components/tugas/form-hapus-tugas-selesai/page'
import AddCanceledTaskForm from '@/components/tugas/form-tambah-tugas-dibatalkan/page'
import EditCanceledTasksForm from '@/components/tugas/form-edit-tugas-dibatalkan/page'
import DetailCanceledTaskForm from '@/components/tugas/form-detail-tugas-dibatalkan/page'
import DeleteCanceledTaskForm from '@/components/tugas/form-hapus-tugas-dibatalkan/page'
import { toast } from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { useSelector } from 'react-redux'
import TasksDocument from '@/components/tugas/download-pdf-tugas/page'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Dropdown from '@/components/ui/Dropdown'

export default function TaskRecordsTable() {
    const [selectedItem, setSelectedItem] = useState('Proses')
    const [showAddProcessedTaskModal, setShowAddProcessedTaskModal] =
        useState(false)
    const [showViewProcessedTaskModal, setShowViewProcessedTaskModal] =
        useState(false)
    const [showEditProcessedTaskModal, setShowEditProcessedTaskModal] =
        useState(false)
    const [showDeleteProcessedTaskModal, setShowDeleteProcessedTaskModal] =
        useState(false)
    const [showAddCanceledTaskModal, setShowAddCanceledTaskModal] =
        useState(false)
    const [showViewCanceledTaskModal, setShowViewCanceledTaskModal] =
        useState(false)
    const [showEditCanceledTaskModal, setShowEditCanceledTaskModal] =
        useState(false)
    const [showDeleteCanceledTaskModal, setShowDeleteCanceledTaskModal] =
        useState(false)
    const [showAddFinishedTaskModal, setShowAddFinishedTaskModal] =
        useState(false)
    const [showViewFinishedTaskModal, setShowViewFinishedTaskModal] =
        useState(false)
    const [showEditFinishedTaskModal, setShowEditFinishedTaskModal] =
        useState(false)
    const [showDeleteFinishedTaskModal, setShowDeleteFinishedTaskModal] =
        useState(false)
    const [processedTasksPage, setProcessedTasksPage] = useState(1)
    const [processedTasksLimit, setProcessedTasksLimit] = useState(5)
    const [processedTasksSearchData, setProcessedTasksSearchData] = useState('')
    const [finishedTasksPage, setFinishedTasksPage] = useState(1)
    const [finishedTasksLimit, setFinishedTasksLimit] = useState(5)
    const [finishedTasksSearchData, setFinishedTasksSearchData] = useState('')
    const [canceledTasksPage, setCanceledTasksPage] = useState(1)
    const [canceledTasksLimit, setCanceledTasksLimit] = useState(5)
    const [canceledTasksSearchData, setCanceledTasksSearchData] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const token = getCookie('token')
    const [isClient, setIsClient] = useState(false)
    const selectedTasksData = useSelector(
        (state) => state.tasks.tasks.selectedTasks
    )
    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const { employee_id } = useSelector((state) => state.employee.employee)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handlePageChange = (page) => {
        if (selectedItem === 'Proses') {
            setProcessedTasksPage(page)
        } else if (selectedItem === 'Selesai') {
            setFinishedTasksPage(page)
        } else if (selectedItem === 'Dibatalkan') {
            setCanceledTasksPage(page)
        }
    }

    const buttons = [
        {
            title: 'Data Tugas',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Proses',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Selesai',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Dibatalkan',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchProcessedTasks(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/tasks/process/employee?page=' +
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
        } catch (err) {
            console.log(err)
        }
    }

    const { data: processedTasksData } = useQuery({
        queryKey: [
            'processed-tasks',
            processedTasksPage,
            processedTasksSearchData,
            processedTasksLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchProcessedTasks(
                processedTasksPage,
                processedTasksSearchData,
                processedTasksLimit
            ),
    })

    console.log(processedTasksData)

    async function fetchFinishedTasks(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/tasks/finished/employee?page=' +
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
        } catch (err) {
            console.log(err)
        }
    }

    const { data: finishedTasksData } = useQuery({
        queryKey: [
            'finished-tasks',
            finishedTasksPage,
            finishedTasksLimit,
            finishedTasksSearchData,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchFinishedTasks(
                finishedTasksPage,
                finishedTasksSearchData,
                finishedTasksLimit
            ),
    })

    async function fetchCanceledTasks(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/tasks/canceled/employee?page=' +
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
        } catch (err) {
            console.log(err)
        }
    }

    const { data: canceledTasksData } = useQuery({
        queryKey: [
            'canceled-tasks',
            canceledTasksPage,
            canceledTasksLimit,
            canceledTasksSearchData,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchCanceledTasks(
                canceledTasksPage,
                canceledTasksSearchData,
                canceledTasksLimit
            ),
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
        fetchProcessedTasks(
            processedTasksPage,
            processedTasksSearchData,
            processedTasksLimit
        )
        fetchFinishedTasks(
            finishedTasksPage,
            finishedTasksSearchData,
            finishedTasksLimit
        )
        fetchCanceledTasks(
            canceledTasksPage,
            canceledTasksSearchData,
            canceledTasksLimit
        )
        queryClient.invalidateQueries({ queryKey: ['processed-tasks'] })
        queryClient.invalidateQueries({ queryKey: ['finished-tasks'] })
        queryClient.invalidateQueries({ queryKey: ['canceled-tasks'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex justify-between mb-5">
                    <div className="flex gap-5">
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
                                />
                            }
                        ></Dropdown>
                        <InputGroup
                            id="largesize"
                            type="text"
                            placeholder={
                                selectedItem === 'Proses'
                                    ? 'Cari Tugas Proses'
                                    : selectedItem === 'Selesai'
                                      ? 'Cari Tugas Selesai'
                                      : 'Cari Tugas Dibatalkan'
                            }
                            className="h-[48px]"
                            onChange={(e) => {
                                setProcessedTasksSearchData(e.target.value)
                                setFinishedTasksSearchData(e.target.value)
                                setCanceledTasksSearchData(e.target.value)
                                fetchProcessedTasks()
                                fetchFinishedTasks()
                                fetchCanceledTasks()
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
                                selectedTasksData?.length == 0 &&
                                    toast.error(
                                        'Silahkan ceklis data terlebih dahulu'
                                    )
                            }}
                            children={
                                selectedTasksData?.length >= 1 ? (
                                    <div>
                                        <PDFDownloadLink
                                            document={
                                                <TasksDocument
                                                    data={selectedTasksData}
                                                />
                                            }
                                            fileName="data-tugas.pdf"
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
                                        <ProcessedTasks
                                            setShowViewProcessedTaskModal={
                                                setShowViewProcessedTaskModal
                                            }
                                            setShowEditProcessedTaskModal={
                                                setShowEditProcessedTaskModal
                                            }
                                            setShowDeleteProcessedTaskModal={
                                                setShowDeleteProcessedTaskModal
                                            }
                                            processedTasksData={
                                                processedTasksData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <ProcessedTasks
                                            setShowViewProcessedTaskModal={
                                                setShowViewProcessedTaskModal
                                            }
                                            setShowEditProcessedTaskModal={
                                                setShowEditProcessedTaskModal
                                            }
                                            setShowDeleteProcessedTaskModal={
                                                setShowDeleteProcessedTaskModal
                                            }
                                            processedTasksData={
                                                processedTasksData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <FinishedTasks
                                            setShowViewFinishedTaskModal={
                                                setShowViewFinishedTaskModal
                                            }
                                            setShowEditFinishedTaskModal={
                                                setShowEditFinishedTaskModal
                                            }
                                            setShowDeleteFinishedTaskModal={
                                                setShowDeleteFinishedTaskModal
                                            }
                                            finishedTasksData={
                                                finishedTasksData
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <CanceledTasks
                                            setShowViewCanceledTaskModal={
                                                setShowViewCanceledTaskModal
                                            }
                                            setShowEditCanceledTaskModal={
                                                setShowEditFinishedTaskModal
                                            }
                                            setShowDeleteCanceledTaskModal={
                                                setShowDeleteFinishedTaskModal
                                            }
                                            canceledTasksData={
                                                canceledTasksData
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
                                if (selectedItem === 'Proses') {
                                    setProcessedTasksLimit(e.target.value)
                                    fetchProcessedTasks()
                                } else if (selectedItem === 'Selesai') {
                                    setFinishedTasksLimit(e.target.value)
                                    fetchFinishedTasks()
                                } else {
                                    setCanceledTasksLimit(e.target.value)
                                    fetchCanceledTasks()
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
                                Show {processedTasksData?.currentPage} of{' '}
                                {processedTasksData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Selesai' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {finishedTasksData?.currentPage} of{' '}
                                {finishedTasksData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {canceledTasksData?.currentPage} of{' '}
                                {canceledTasksData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div>
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Proses'
                                    ? processedTasksData?.totalPages
                                    : selectedItem === 'Selesai'
                                      ? finishedTasksData?.totalPages
                                      : canceledTasksData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Proses'
                                    ? processedTasksData?.currentPage
                                    : selectedItem === 'Selesai'
                                      ? finishedTasksData?.currentPage
                                      : canceledTasksData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Buat Tugas"
                    label="Buat Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddProcessedTaskModal}
                    onClose={() => {
                        setShowAddProcessedTaskModal(!showAddProcessedTaskModal)
                    }}
                >
                    <AddProcessedTaskForm
                        showAddProcessedTasksModal={
                            setShowAddProcessedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Tugas"
                    label="Edit Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditProcessedTaskModal}
                    onClose={() => {
                        setShowEditProcessedTaskModal(
                            !showEditProcessedTaskModal
                        )
                    }}
                >
                    <EditProcessedTaskForm
                        showEditProcessedTasksModal={
                            setShowEditProcessedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tugas"
                    label="Detail Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewProcessedTaskModal}
                    onClose={() => {
                        setShowViewProcessedTaskModal(
                            !showViewProcessedTaskModal
                        )
                    }}
                >
                    <DetailProcessedTaskForm
                        showViewProcessedTasksModal={
                            setShowViewProcessedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tugas"
                    label="Hapus Tugas"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteProcessedTaskModal}
                    onClose={() => {
                        setShowDeleteProcessedTaskModal(
                            !showDeleteProcessedTaskModal
                        )
                    }}
                >
                    <DeleteProcessedTaskForm
                        showDeleteProcessedTasksModal={
                            setShowDeleteProcessedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Tugas"
                    label="Tambah Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddFinishedTaskModal}
                    onClose={() => {
                        setShowAddFinishedTaskModal(!showAddFinishedTaskModal)
                    }}
                >
                    <AddFinishedTasksForm
                        showAddFinishedTasksModal={setShowAddFinishedTaskModal}
                    />
                </Modal>
                <Modal
                    title="Edit Tugas"
                    label="Edit Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditFinishedTaskModal}
                    onClose={() => {
                        setShowEditFinishedTaskModal(!showEditFinishedTaskModal)
                    }}
                >
                    <EditFinishedTaskForm
                        showEditFinishedTasksModal={
                            setShowEditFinishedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tugas"
                    label="Detail Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewFinishedTaskModal}
                    onClose={() => {
                        setShowViewFinishedTaskModal(!showViewFinishedTaskModal)
                    }}
                >
                    <DetailFinishedTaskForm
                        showViewFinishedTasksModal={
                            setShowViewFinishedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tugas"
                    label="Hapus Tugas"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteFinishedTaskModal}
                    onClose={() => {
                        setShowDeleteFinishedTaskModal(
                            !showDeleteFinishedTaskModal
                        )
                    }}
                >
                    <DeleteFinishedTaskForm
                        showDeleteFinishedTasksModal={
                            setShowDeleteFinishedTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Tugas"
                    label="Tambah Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddCanceledTaskModal}
                    onClose={() => {
                        setShowAddCanceledTaskModal(!showAddCanceledTaskModal)
                    }}
                >
                    <AddCanceledTaskForm
                        showAddCanceledTasksModal={setShowAddCanceledTaskModal}
                    />
                </Modal>
                <Modal
                    title="Edit Tugas"
                    label="Edit Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditCanceledTaskModal}
                    onClose={() => {
                        setShowEditCanceledTaskModal(!showEditCanceledTaskModal)
                    }}
                >
                    <EditCanceledTasksForm
                        showEditCanceledTasksModal={
                            setShowEditCanceledTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tugas"
                    label="Detail Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewCanceledTaskModal}
                    onClose={() => {
                        setShowViewCanceledTaskModal(!showViewCanceledTaskModal)
                    }}
                >
                    <DetailCanceledTaskForm
                        showViewCanceledTasksModal={
                            setShowViewCanceledTaskModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tugas"
                    label="Hapus Tugas"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteCanceledTaskModal}
                    onClose={() => {
                        setShowDeleteCanceledTaskModal(
                            !showDeleteCanceledTaskModal
                        )
                    }}
                >
                    <DeleteCanceledTaskForm
                        showDeleteCanceledTasksModal={
                            setShowDeleteCanceledTaskModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
