'use client'
import EditKPIForm from '@/components/kpi/edit-kpi-form/page'
import DeleteKPIForm from '@/components/kpi/delete-kpi-form/page'
import AddKPIForm from '@/components/kpi/add-kpi-form/page'
import KPITable from '@/components/kpi/kpi-table/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import DetailKPIForm from '@/components/kpi/detail-kpi-form/page'
import Dropdown from '@/components/ui/Dropdown'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import KpiDocument from '@/components/kpi/download-pdf-kpi/page'

export default function KPIRecordsTable() {
    const [kpiPage, setKPIPage] = useState(1)
    const [kpiLimit, setKPILimit] = useState(5)
    const [kpiSearchData, setKPISearchData] = useState('')
    const [showAddKPIModal, setShowAddKPIModal] = useState(false)
    const [showEditKPIModal, setShowEditKPIModal] = useState(false)
    const [showDeleteKPIModal, setShowDeleteKPIModal] = useState(false)
    const [showViewKPIModal, setShowViewKPIModal] = useState(false)
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const [isClient, setIsClient] = useState(false)
    const token = getCookie('token')
    const selectedKPIData = useSelector((state) => state.kpi.kpi.selectedKPI)

    const handlePageChange = (page) => {
        setKPIPage(page)
    }

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchKPI(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/kpi?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortBy=' +
                    sortBy +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: kpiData } = useQuery({
        queryKey: ['kpi', kpiPage, kpiSearchData, kpiLimit, sortBy, sortOrder],
        queryFn: () => fetchKPI(kpiPage, kpiSearchData, kpiLimit),
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
        fetchKPI(kpiPage, kpiSearchData, kpiLimit)

        queryClient.invalidateQueries({ queryKey: ['kpi'] })
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
                            onChange={(e) => {
                                setKPISearchData(e.target.value)
                            }}
                            placeholder="Cari KPI"
                            className="h-[48px]"
                            append={<Icon icon="heroicons-outline:search" />}
                        />
                    </div>
                    {isClient ? (
                        <Button
                            text="Download PDF"
                            icon="heroicons-outline:newspaper"
                            className="bg-warning-500 text-white"
                            onClick={() => {
                                selectedKPIData?.length == 0 &&
                                    toast.error(
                                        'Silahkan ceklis data terlebih dahulu'
                                    )
                            }}
                            children={
                                selectedKPIData?.length >= 1 ? (
                                    <div>
                                        <PDFDownloadLink
                                            document={
                                                <KpiDocument
                                                    data={selectedKPIData}
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
                <KPITable
                    setShowViewKPIModal={setShowViewKPIModal}
                    setShowEditKPIModal={setShowEditKPIModal}
                    setShowDeleteKPIModal={setShowDeleteKPIModal}
                    kpiData={kpiData}
                />
                <div className="w-full flex justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setKPILimit(e.target.value)
                                fetchKPI()
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
                            Show {kpiData?.currentPage} of {kpiData?.totalPages}{' '}
                            entries
                        </span>
                    </div>
                    <div>
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={kpiData?.totalPages}
                            currentPage={kpiData?.currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Penilaian Karyawan"
                    label="Penilaian Karyawan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddKPIModal}
                    onClose={() => {
                        setShowAddKPIModal(!showAddKPIModal)
                    }}
                >
                    <AddKPIForm setShowAddKPIModal={setShowAddKPIModal} />
                </Modal>
                <Modal
                    title="Edit KPI"
                    label="Edit KPI"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditKPIModal}
                    onClose={() => {
                        setShowEditKPIModal(!showEditKPIModal)
                    }}
                >
                    <EditKPIForm setShowEditKPIModal={setShowEditKPIModal} />
                </Modal>
                <Modal
                    title="Detail KPI"
                    label="Detail KPI"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewKPIModal}
                    onClose={() => {
                        setShowViewKPIModal(!showViewKPIModal)
                    }}
                >
                    <DetailKPIForm setShowViewKPIModal={setShowViewKPIModal} />
                </Modal>
                <Modal
                    title="Hapus KPI"
                    label="Hapus KPI"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteKPIModal}
                    onClose={() => {
                        setShowDeleteKPIModal(!showDeleteKPIModal)
                    }}
                >
                    <DeleteKPIForm
                        setShowDeleteKPIModal={setShowDeleteKPIModal}
                    />
                </Modal>
            </div>
        </>
    )
}
