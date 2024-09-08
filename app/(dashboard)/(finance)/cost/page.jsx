'use client'
import DetailCostForm from '@/components/(finance)/cost/form-detail-biaya/page'
import EditCostForm from '@/components/(finance)/cost/form-edit-biaya/page'
import DeleteCostForm from '@/components/(finance)/cost/form-hapus-biaya/page'
import AddCostForm from '@/components/(finance)/cost/form-tambah-biaya/page'
import Cost from '@/components/(finance)/cost/tabel-biaya/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import http from '@/app/helpers/http.helper'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DownloadCostModal from '@/components/(finance)/cost/download-modal/page'
import Flatpickr from 'react-flatpickr'
import Card from '@/components/ui/Card'

export default function Cost() {
    const [showViewCostModal, setShowViewCostModal] = useState(false)
    const [showAddCostModal, setShowAddCostModal] = useState(false)
    const [showEditCostModal, setShowEditCostModal] = useState(false)
    const [showDeleteCostModal, setShowDeleteCostModal] = useState(false)
    const [showDownloadCostModal, setShowDownloadCostModal] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const [costPage, setCostPage] = useState(1)
    const [costLimit, setCostLimit] = useState(5)
    const [costSearchData, setCostSearchData] = useState('')
    const token = getCookie('token')
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchCost(
        pageData,
        search,
        limitData,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        const { data } = await http(token).get(
            '/cost?page=' +
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
    }

    const handlePageChange = (page) => {
        setCostPage(page)
    }

    const { data: costData } = useQuery({
        queryKey: [
            'cost',
            costPage,
            costSearchData,
            costLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchCost(
                costPage,
                costSearchData,
                costLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    const selectedCostData = useSelector(
        (state) => state.finance.finance.selectedCostData
    )

    return (
        <>
            <div>
                <div className="w-full flex-wrap flex justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div className="flex justify-center items-center">
                            <h5>Data Biaya</h5>
                        </div>
                    </div>
                    <div className="mt-8 xl:mt-0 flex gap-5">
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text="Buat Biaya"
                                onClick={() => {
                                    setShowAddCostModal(!showAddCostModal)
                                }}
                            />
                        </div>
                        <div className="flex gap-5">
                            <Button
                                text="Download"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedCostData?.length == 0
                                        ? toast.error(
                                              'Silahkan ceklis data terlebih dahulu'
                                          )
                                        : setShowDownloadCostModal(
                                              !showDownloadCostModal
                                          )
                                }}
                            />
                        </div>
                    </div>
                </div>
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
                    search={
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder="Cari"
                                className="h-[48px]"
                                onChange={(e) => {
                                    setCostSearchData(e.target.value)
                                }}
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                            />
                        </div>
                    }
                >
                    <Cost
                        setShowViewCostModal={setShowViewCostModal}
                        setShowEditCostModal={setShowEditCostModal}
                        setShowDeleteCostModal={setShowDeleteCostModal}
                        costData={costData}
                    />
                </Card>
                <div className="w-full flex-wrap flex justify-between mt-8">
                    <div className="flex-wrap flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setCostLimit(e.target.value)
                                fetchCost()
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
                            Show {costData?.currentPage} of{' '}
                            {costData?.totalPages} entries
                        </span>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            totalPages={costData?.totalPages}
                            currentPage={costData?.currentPage}
                            handlePageChange={handlePageChange}
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Biaya"
                    label="Tambah Biaya"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddCostModal}
                    onClose={() => {
                        setShowAddCostModal(!showAddCostModal)
                    }}
                >
                    <AddCostForm setShowAddCostModal={setShowAddCostModal} />
                </Modal>
                <Modal
                    title="Edit Biaya"
                    label="Edit Biaya"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditCostModal}
                    onClose={() => {
                        setShowEditCostModal(!showEditCostModal)
                    }}
                >
                    <EditCostForm setShowEditCostModal={setShowEditCostModal} />
                </Modal>
                <Modal
                    title="Detail Biaya"
                    label="Detail Biaya"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewCostModal}
                    onClose={() => {
                        setShowViewCostModal(!showViewCostModal)
                    }}
                >
                    <DetailCostForm
                        setShowDetailCostModal={setShowViewCostModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Biaya"
                    label="Hapus Biaya"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteCostModal}
                    onClose={() => {
                        setShowDeleteCostModal(!showDeleteCostModal)
                    }}
                >
                    <DeleteCostForm
                        setShowDeleteCostModal={setShowDeleteCostModal}
                    />
                </Modal>
                <Modal
                    title="Download"
                    label="Download"
                    labelClass="btn-outline-dark"
                    className="max-w-sm"
                    activeModal={showDownloadCostModal}
                    onClose={() => {
                        setShowDownloadCostModal(!showDownloadCostModal)
                    }}
                >
                    <DownloadCostModal
                        selectedCostData={selectedCostData}
                        isClient={isClient}
                    />
                </Modal>
            </div>
        </>
    )
}
