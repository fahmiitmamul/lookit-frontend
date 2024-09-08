'use client'
import RemainingLeaveTypeTable from '@/components/leave-balance/tabel-saldo-cuti/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import AddLeaveTypeDataForm from '@/components/leave-balance/form-tambah-saldo-cuti/page'
import EditLeaveTypeDataForm from '@/components/leave-balance/form-edit-saldo-cuti/page'
import DetailLeaveTypeDataForm from '@/components/leave-balance/form-detail-saldo-cuti/page'
import DeleteLeaveTypeDataForm from '@/components/leave-balance/form-hapus-saldo-cuti/page'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import DownloadLeaveTypeModal from '@/components/leave-balance/download-modal/page'

export default function SaldoCuti() {
    const [leaveTypePage, setLeaveTypePage] = useState(1)
    const [leaveTypeLimit, setLeaveTypeLimit] = useState(5)
    const [leaveTypeSearchData, setLeaveTypeSearchData] = useState('')
    const [showAddLeaveTypeModal, setShowAddLeaveTypeModal] = useState(false)
    const [showEditLeaveTypeModal, setShowEditLeaveTypeModal] = useState(false)
    const [showViewLeaveTypeModal, setShowViewLeaveTypeModal] = useState(false)
    const [showDownloadLeaveTypeModal, setShowDownloadLeaveTypeModal] =
        useState(false)
    const [isClient, setIsClient] = useState(false)
    const selectedLeaveTypeData = useSelector(
        (state) => state.leave_type.leave_type.selectedLeaveType
    )
    const [showDeleteLeaveTypeModal, setShowDeleteLeaveTypeModal] =
        useState(false)
    const token = getCookie('token')

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handlePageChange = (page) => {
        setLeaveTypePage(page)
    }

    async function fetchLeaveType(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/leave-type?page=' +
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

    const { data: leaveTypeData } = useQuery({
        queryKey: ['leave', leaveTypePage, leaveTypeSearchData, leaveTypeLimit],
        queryFn: () =>
            fetchLeaveType(leaveTypePage, leaveTypeSearchData, leaveTypeLimit),
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>Data Saldo Cuti</h5>
                    </div>
                    <div className="mt-4 xl:mt-0 flex gap-5">
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                text="Buat Saldo Cuti"
                                onClick={() => {
                                    setShowAddLeaveTypeModal(true)
                                }}
                                className="btn-success"
                            />
                        </div>
                        <div className="flex gap-5">
                            <Button
                                text="Download"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedLeaveTypeData?.length == 0
                                        ? toast.error(
                                              'Silahkan ceklis data terlebih dahulu'
                                          )
                                        : setShowDownloadLeaveTypeModal(
                                              !showDownloadLeaveTypeModal
                                          )
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Card
                    title={true}
                    noborder
                    search={
                        <div className="flex flex-wrap gap-5">
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    onChange={(e) => {
                                        setLeaveTypeSearchData(e.target.value)
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
                    <RemainingLeaveTypeTable
                        setShowEditLeaveTypeModal={setShowEditLeaveTypeModal}
                        setShowViewLeaveTypeModal={setShowViewLeaveTypeModal}
                        setShowDeleteLeaveTypeModal={
                            setShowDeleteLeaveTypeModal
                        }
                        leaveTypeData={leaveTypeData}
                    />
                </Card>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setLeaveTypeLimit(e.target.value)
                                fetchLeaveType()
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[5, 10].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Show {leaveTypeData?.currentPage} of{' '}
                            {leaveTypeData?.totalPages} entries
                        </span>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={leaveTypeData?.totalPages}
                            currentPage={leaveTypeData?.currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal
                title="Tambah Saldo Cuti"
                label="Tambah Saldo Cuti"
                labelClass="btn-outline-dark"
                className="max-w-5xl"
                activeModal={showAddLeaveTypeModal}
                onClose={() => {
                    setShowAddLeaveTypeModal(!showAddLeaveTypeModal)
                }}
            >
                <AddLeaveTypeDataForm
                    setShowAddLeaveTypeModal={setShowAddLeaveTypeModal}
                />
            </Modal>
            <Modal
                title="Edit Saldo Cuti"
                label="Edit Saldo Cuti"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showEditLeaveTypeModal}
                onClose={() => {
                    setShowEditLeaveTypeModal(!showEditLeaveTypeModal)
                }}
            >
                <EditLeaveTypeDataForm
                    setShowEditLeaveTypeModal={setShowEditLeaveTypeModal}
                />
            </Modal>
            <Modal
                title="Detail Saldo Cuti"
                label="Detail Saldo Cuti"
                className="max-w-5xl"
                labelClass="btn-outline-dark"
                activeModal={showViewLeaveTypeModal}
                onClose={() => {
                    setShowViewLeaveTypeModal(!showViewLeaveTypeModal)
                }}
            >
                <DetailLeaveTypeDataForm
                    setShowViewLeaveTypeModal={setShowViewLeaveTypeModal}
                />
            </Modal>
            <Modal
                title="Hapus Saldo Cuti"
                label="Hapus Saldo Cuti"
                labelClass="btn-outline-dark"
                activeModal={showDeleteLeaveTypeModal}
                onClose={() => {
                    setShowDeleteLeaveTypeModal(!showDeleteLeaveTypeModal)
                }}
            >
                <DeleteLeaveTypeDataForm
                    setShowDeleteLeaveTypeModal={setShowDeleteLeaveTypeModal}
                />
            </Modal>
            <Modal
                title="Download"
                label="Download"
                labelClass="btn-outline-dark"
                className="max-w-sm"
                activeModal={showDownloadLeaveTypeModal}
                onClose={() => {
                    setShowDownloadLeaveTypeModal(!showDownloadLeaveTypeModal)
                }}
            >
                <DownloadLeaveTypeModal
                    selectedLeaveTypeData={selectedLeaveTypeData}
                    isClient={isClient}
                />
            </Modal>
        </>
    )
}
