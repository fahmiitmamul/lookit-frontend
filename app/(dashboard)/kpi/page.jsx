'use client'
import EditKPIForm from '@/components/kpi/form-edit-kpi/page'
import DeleteKPIForm from '@/components/kpi/form-hapus-kpi/page'
import AddKPIForm from '@/components/kpi/form-tambah-kpi/page'
import KPITable from '@/components/kpi/tabel-kpi/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import DetailKPIForm from '@/components/kpi/form-detail-kpi/page'
import { useSelector } from 'react-redux'
import Card from '@/components/ui/Card'
import DownloadKPIModal from '@/components/kpi/download-modal/page'
import { toast } from 'react-toastify'

export default function KPI() {
    const [showDownloadKPIModal, setShowDownloadKPIModal] = useState(false)
    const [kpiPage, setKPIPage] = useState(1)
    const [kpiLimit, setKPILimit] = useState(5)
    const [kpiSearchData, setKPISearchData] = useState('')
    const [showAddKPIModal, setShowAddKPIModal] = useState(false)
    const [showEditKPIModal, setShowEditKPIModal] = useState(false)
    const [showDeleteKPIModal, setShowDeleteKPIModal] = useState(false)
    const [showViewKPIModal, setShowViewKPIModal] = useState(false)
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
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: kpiData } = useQuery({
        queryKey: ['kpi', kpiPage, kpiSearchData, kpiLimit],
        queryFn: () => fetchKPI(kpiPage, kpiSearchData, kpiLimit),
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex justify-center items-center">
                            <h5>Data KPI</h5>
                        </div>
                    </div>
                    <div className="mt-8 xl:mt-0 flex gap-5">
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text="Buat KPI"
                                onClick={() => {
                                    setShowAddKPIModal(!showAddKPIModal)
                                }}
                            />
                        </div>
                        <div className="flex gap-5">
                            <Button
                                text="Download"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedKPIData?.length == 0
                                        ? toast.error(
                                              'Silahkan ceklis data terlebih dahulu'
                                          )
                                        : setShowDownloadKPIModal(
                                              !showDownloadKPIModal
                                          )
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Card
                    title={true}
                    search={
                        <div className="flex flex-wrap gap-5">
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    onChange={(e) => {
                                        setKPISearchData(e.target.value)
                                    }}
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
                            </div>
                        </div>
                    }
                >
                    <KPITable
                        setShowViewKPIModal={setShowViewKPIModal}
                        setShowEditKPIModal={setShowEditKPIModal}
                        setShowDeleteKPIModal={setShowDeleteKPIModal}
                        kpiData={kpiData}
                    />
                </Card>
                <div className="w-full flex flex-wrap justify-between mt-8">
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
                    <div className="mt-8 xl:mt-0">
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
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadKPIModal}
                    onClose={() => {
                        setShowDownloadKPIModal(!showDownloadKPIModal)
                    }}
                >
                    <DownloadKPIModal
                        selectedKPIData={selectedKPIData}
                        isClient={isClient}
                    />
                </Modal>
            </div>
        </>
    )
}
