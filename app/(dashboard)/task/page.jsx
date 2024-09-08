'use client'
import React, { Fragment, useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import ProcessedTasks from '@/components/tasks/processed-tasks-table/page'
import FinishedTasks from '@/components/tasks/completed-tasks-table/page'
import CanceledTasks from '@/components/tasks/canceled-tasks-table/page'
import Modal from '@/components/ui/Modal'
import Flatpickr from 'react-flatpickr'
import AddFinishedTasksForm from '@/components/tasks/form-tambah-tugas-selesai/page'
import AddProcessedTaskForm from '@/components/tasks/form-tambah-tugas-proses/page'
import EditProcessedTaskForm from '@/components/tasks/form-edit-tugas-proses/page'
import DeleteProcessedTaskForm from '@/components/tasks/form-hapus-tugas-proses/page'
import DetailProcessedTaskForm from '@/components/tasks/form-detail-tugas-proses/page'
import EditFinishedTaskForm from '@/components/tasks/form-edit-tugas-selesai/page'
import DetailFinishedTaskForm from '@/components/tasks/form-detail-tugas-selesai/page'
import DeleteFinishedTaskForm from '@/components/tasks/form-hapus-tugas-selesai/page'
import AddCanceledTaskForm from '@/components/tasks/form-tambah-tugas-dibatalkan/page'
import EditCanceledTasksForm from '@/components/tasks/form-edit-tugas-dibatalkan/page'
import DetailCanceledTaskForm from '@/components/tasks/form-detail-tugas-dibatalkan/page'
import DeleteCanceledTaskForm from '@/components/tasks/form-hapus-tugas-dibatalkan/page'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { useSelector } from 'react-redux'
import AllTasks from '@/components/tasks/all-tasks-table/page'
import EditAllTasksForm from '@/components/tasks/form-edit-tugas-all/page'
import DetailAllTasksForm from '@/components/tasks/all-tasks-detail-form/page'
import DeleteAllTasksForm from '@/components/tasks/form-hapus-tugas-all/page'
import DownloadTasksModal from '@/components/tasks/download-modal/page'

export default function Tugas() {
    const [selectedItem, setSelectedItem] = useState('Data Tugas')
    const [showDownloadTasksModal, setShowDownloadTasksModal] = useState(false)
    const [showAddProcessedTaskModal, setShowAddProcessedTaskModal] =
        useState(false)
    const [showViewProcessedTaskModal, setShowViewProcessedTaskModal] =
        useState(false)
    const [showEditProcessedTaskModal, setShowEditProcessedTaskModal] =
        useState(false)
    const [showDeleteProcessedTaskModal, setShowDeleteProcessedTaskModal] =
        useState(false)
    const [showViewAllTaskModal, setShowViewAllTaskModal] = useState(false)
    const [showEditAllTaskModal, setShowEditAllTaskModal] = useState(false)
    const [showDeleteAllTaskModal, setShowDeleteAllTaskModal] = useState(false)
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
    const [allTasksPage, setAllTasksPage] = useState(1)
    const [allTasksLimit, setAllTasksLimit] = useState(5)
    const [allTasksSearchData, setAllTasksSearchData] = useState('')
    const [finishedTasksPage, setFinishedTasksPage] = useState(1)
    const [finishedTasksLimit, setFinishedTasksLimit] = useState(5)
    const [finishedTasksSearchData, setFinishedTasksSearchData] = useState('')
    const [canceledTasksPage, setCanceledTasksPage] = useState(1)
    const [canceledTasksLimit, setCanceledTasksLimit] = useState(5)
    const [canceledTasksSearchData, setCanceledTasksSearchData] = useState('')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const token = getCookie('token')
    const [isClient, setIsClient] = useState(false)
    const selectedTasksData = useSelector(
        (state) => state.tasks.tasks.selectedTasks
    )
    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

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
        } else if (selectedItem === 'Data Tugas') {
            setAllTasksPage(page)
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

    async function fetchAllTasks(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/tasks?page=' +
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

    const { data: allTasksData } = useQuery({
        queryKey: [
            'all-tasks',
            allTasksPage,
            allTasksSearchData,
            allTasksLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchAllTasks(
                allTasksPage,
                allTasksSearchData,
                allTasksLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchProcessedTasks(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/tasks/process?page=' +
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

    const { data: processedTasksData } = useQuery({
        queryKey: [
            'processed-tasks',
            processedTasksPage,
            processedTasksSearchData,
            processedTasksLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchProcessedTasks(
                processedTasksPage,
                processedTasksSearchData,
                processedTasksLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchFinishedTasks(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/tasks/finished?page=' +
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

    const { data: finishedTasksData } = useQuery({
        queryKey: [
            'finished-tasks',
            finishedTasksPage,
            finishedTasksLimit,
            finishedTasksSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchFinishedTasks(
                finishedTasksPage,
                finishedTasksSearchData,
                finishedTasksLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchCanceledTasks(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/tasks/canceled?page=' +
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

    const { data: canceledTasksData } = useQuery({
        queryKey: [
            'canceled-tasks',
            canceledTasksPage,
            canceledTasksLimit,
            canceledTasksSearchData,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchCanceledTasks(
                canceledTasksPage,
                canceledTasksSearchData,
                canceledTasksLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex justify-center items-center">
                            <h5>Data Tugas</h5>
                        </div>
                    </div>
                    <div className="mt-8 xl:mt-0 flex gap-5">
                        {selectedItem === 'Data Tugas' && (
                            <div>
                                <Button
                                    icon="heroicons-outline:plus"
                                    text="Buat Tugas"
                                    className="btn-success"
                                    onClick={() => {
                                        setShowAddProcessedTaskModal(
                                            !showAddProcessedTaskModal
                                        )
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex gap-5">
                            <Button
                                text="Download"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedTasksData?.length == 0
                                        ? toast.error(
                                              'Silahkan ceklis data terlebih dahulu'
                                          )
                                        : setShowDownloadTasksModal(
                                              !showDownloadTasksModal
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
                                    onChange={(e) => {
                                        setProcessedTasksSearchData(
                                            e.target.value
                                        )
                                        setAllTasksSearchData(e.target.value)
                                        setFinishedTasksSearchData(
                                            e.target.value
                                        )
                                        setCanceledTasksSearchData(
                                            e.target.value
                                        )
                                        fetchProcessedTasks()
                                        fetchFinishedTasks()
                                        fetchCanceledTasks()
                                    }}
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
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
                                        <AllTasks
                                            setShowViewAllTasksModal={
                                                setShowViewAllTaskModal
                                            }
                                            setShowEditAllTasksModal={
                                                setShowEditAllTaskModal
                                            }
                                            setShowDeleteAllTasksModal={
                                                setShowDeleteAllTaskModal
                                            }
                                            allTasksData={allTasksData}
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
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Proses') {
                                    setProcessedTasksLimit(e.target.value)
                                    fetchProcessedTasks()
                                } else if (selectedItem === 'Selesai') {
                                    setFinishedTasksLimit(e.target.value)
                                    fetchFinishedTasks()
                                } else if (selectedItem === 'Dibatalkan') {
                                    setCanceledTasksLimit(e.target.value)
                                    fetchCanceledTasks()
                                } else {
                                    setAllTasksLimit(e.target.value)
                                    fetchAllTasks()
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
                        ) : selectedItem === 'Dibatalkan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {canceledTasksData?.currentPage} of{' '}
                                {canceledTasksData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {allTasksData?.currentPage} of{' '}
                                {allTasksData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Proses'
                                    ? processedTasksData?.totalPages
                                    : selectedItem === 'Selesai'
                                      ? finishedTasksData?.totalPages
                                      : selectedItem === 'Dibatalkan'
                                        ? canceledTasksData?.totalPages
                                        : allTasksData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Proses'
                                    ? processedTasksData?.currentPage
                                    : selectedItem === 'Selesai'
                                      ? finishedTasksData?.currentPage
                                      : selectedItem === 'Dibatalkan'
                                        ? canceledTasksData?.currentPage
                                        : allTasksData?.currentPage
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
                <Modal
                    title="Edit Tugas"
                    label="Edit Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditAllTaskModal}
                    onClose={() => {
                        setShowEditAllTaskModal(!showEditAllTaskModal)
                    }}
                >
                    <EditAllTasksForm
                        setShowEditAllTasksModal={setShowEditAllTaskModal}
                    />
                </Modal>
                <Modal
                    title="Detail Tugas"
                    label="Detail Tugas"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewAllTaskModal}
                    onClose={() => {
                        setShowViewAllTaskModal(!showViewAllTaskModal)
                    }}
                >
                    <DetailAllTasksForm
                        setShowDetailAllTasksModal={setShowViewAllTaskModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Tugas"
                    label="Hapus Tugas"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteAllTaskModal}
                    onClose={() => {
                        setShowDeleteAllTaskModal(!showDeleteAllTaskModal)
                    }}
                >
                    <DeleteAllTasksForm
                        setShowDeleteAllTasksModal={setShowDeleteAllTaskModal}
                    />
                </Modal>
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadTasksModal}
                    onClose={() => {
                        setShowDownloadTasksModal(!showDownloadTasksModal)
                    }}
                >
                    <DownloadTasksModal
                        selectedTasksData={selectedTasksData}
                        isClient={isClient}
                    />
                </Modal>
            </div>
        </>
    )
}
