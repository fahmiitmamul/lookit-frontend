'use client'
import AddLoanForm from '@/components/(finance)/loan/form-tambah-pinjaman/page'
import AddLoan from '@/components/(finance)/loan/tabel-tambah-pinjaman/page'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function Pinjaman() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(6)
    const [showAddSalaryCountModal, setShowAddSalaryCountModal] =
        useState(false)
    const [showEditSalaryCountModal, setShowEditSalaryCountModal] =
        useState(false)
    const [showViewSalaryCountModal, setShowViewSalaryCountModal] =
        useState(false)
    const [showDeleteSalaryCountModal, setShowDeleteSalaryCountModal] =
        useState(false)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div>
                <div className="w-full flex-wrap flex justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>Data Pinjaman</h5>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-5">
                            <Button
                                icon="heroicons-outline:newspaper"
                                text="Import"
                                className="btn-success"
                            />
                            <Button
                                icon="heroicons-outline:newspaper"
                                text="Export"
                                className="btn-primary"
                            />
                        </div>
                    </div>
                </div>
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
                            />
                        </div>
                    }
                >
                    <AddLoan />
                </Card>
                <div className="w-full flex-wrap flex justify-between mt-8">
                    <div className="flex-wrap flex items-center space-x-3 rtl:space-x-reverse">
                        <select className="form-control py-2 w-max">
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
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Pinjaman"
                    label="Pinjaman"
                    centered
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddSalaryCountModal}
                    onClose={() => {
                        setShowAddSalaryCountModal(!showAddSalaryCountModal)
                    }}
                >
                    <AddLoanForm
                        showAddLoanModal={setShowAddSalaryCountModal}
                    />
                </Modal>
                <Modal
                    title="Edit Hitung Gaji"
                    label="Edit Hitung Gaji"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditSalaryCountModal}
                    onClose={() => {
                        setShowEditSalaryCountModal(!showEditSalaryCountModal)
                    }}
                ></Modal>
                <Modal
                    title="Detail Hitung Gaji"
                    label="Detail Hitung Gaji"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewSalaryCountModal}
                    onClose={() => {
                        setShowViewSalaryCountModal(!showViewSalaryCountModal)
                    }}
                ></Modal>
                <Modal
                    title="Hapus Saldo Cuti"
                    label="Hapus Saldo Cuti"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteSalaryCountModal}
                    onClose={() => {
                        setShowDeleteSalaryCountModal(
                            !showDeleteSalaryCountModal
                        )
                    }}
                ></Modal>
            </div>
        </>
    )
}
