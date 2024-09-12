'use client'
import SalaryCount from '@/components/(finance)/salary-count/salary-count-table/page'
import TotalSalaryForm from '@/components/(finance)/salary-count/add-salary-count-form/page'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function BuatGaji() {
    const [showAddSalaryCountModal, setShowAddSalaryCountModal] =
        useState(false)
    const [showEditSalaryCountModal, setShowEditSalaryCountModal] =
        useState(false)
    const [showViewSalaryCountModal, setShowViewSalaryCountModal] =
        useState(false)
    const [showDeleteSalaryCountModal, setShowDeleteSalaryCountModal] =
        useState(false)

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 justify-between w-full">
                        <div>
                            <div className="flex justify-center items-center">
                                <h5>Data Gaji</h5>
                            </div>
                        </div>
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text="Data Gaji"
                                onClick={() => {
                                    setShowAddSalaryCountModal(
                                        !showAddSalaryCountModal
                                    )
                                }}
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
                    <SalaryCount />
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
                        <Pagination className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto" />
                    </div>
                </div>
                <Modal
                    title="Hitung Gaji"
                    label="Hitung Gaji"
                    centered
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddSalaryCountModal}
                    onClose={() => {
                        setShowAddSalaryCountModal(!showAddSalaryCountModal)
                    }}
                >
                    <TotalSalaryForm
                        setShowTotalSalaryModal={setShowAddSalaryCountModal}
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
