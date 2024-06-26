'use client'
import React from 'react'
import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/ui/Modal'
import { getCookie } from 'cookies-next'
import DocumentTable from '@/components/dokumen/tabel-dokumen/page'
import AddDocumetForm from '@/components/dokumen/form-tambah-dokumen/page'
import EditDocumentForm from '@/components/dokumen/form-edit-dokumen/page'
import DetailDocumentForm from '@/components/dokumen/form-detail-dokumen/page'
import DeleteDocumentForm from '@/components/dokumen/form-hapus-dokumen/page'
import Dropdown from '@/components/ui/Dropdown'
import Card from '@/components/ui/Card'

export default function Document() {
    const [showAddDocumentModal, setShowAddDocumentModal] = useState(false)
    const [showEditDocumentModal, setShowEditDocumentModal] = useState(false)
    const [showViewDocumentModal, setShowViewDocumentModal] = useState(false)
    const [showDeleteDocumentModal, setShowDeleteDocumentModal] =
        useState(false)
    const [documentPage, setDocumentPage] = useState(1)
    const [documentLimit, setDocumentLimit] = useState(5)
    const [documentSearchData, setDocumentSearchData] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const token = getCookie('token')

    async function fetchDocument(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/document?page=' +
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
    }

    const { data: documentData } = useQuery({
        queryKey: [
            'document',
            documentPage,
            documentSearchData,
            documentLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchDocument(documentPage, documentSearchData, documentLimit),
    })

    const handlePageChange = (page) => {
        setDocumentPage(page)
    }

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }

        fetchDocument(documentPage, documentSearchData, documentLimit)

        queryClient.invalidateQueries({ queryKey: ['document'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 w-full justify-between">
                        <div className="flex justify-center items-center">
                            <h5>Data Dokumen</h5>
                        </div>
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text="Buat Dokumen"
                                onClick={() => {
                                    setShowAddDocumentModal(true)
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
                                        setDocumentSearchData(e.target.value)
                                    }}
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
                            </div>
                        }
                    >
                        <DocumentTable
                            showViewDocumentModal={setShowViewDocumentModal}
                            showEditDocumentModal={setShowEditDocumentModal}
                            showDeleteDocumentModal={setShowDeleteDocumentModal}
                            documentData={documentData}
                        />
                    </Card>
                </div>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex flex-wrap items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setDocumentLimit(e.target.value)
                                fetchDocument()
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
                            Show {documentData?.currentPage} of{' '}
                            {documentData?.totalPages} entries
                        </span>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={documentData?.totalPages}
                            currentPage={documentData?.currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Dokumen"
                    label="Tambah Dokumen"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showAddDocumentModal}
                    onClose={() => {
                        setShowAddDocumentModal(!showAddDocumentModal)
                    }}
                >
                    <AddDocumetForm
                        showAddDocumentModal={setShowAddDocumentModal}
                    />
                </Modal>
                <Modal
                    title="Edit Dokumen"
                    label="Edit Dokumen"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditDocumentModal}
                    onClose={() => {
                        setShowEditDocumentModal(!showEditDocumentModal)
                    }}
                >
                    <EditDocumentForm
                        showEditDocumentModal={setShowEditDocumentModal}
                    />
                </Modal>
                <Modal
                    title="Detail Dokumen"
                    label="Detail Dokumen"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewDocumentModal}
                    onClose={() => {
                        setShowViewDocumentModal(!showViewDocumentModal)
                    }}
                >
                    <DetailDocumentForm
                        showViewDocumentModal={setShowViewDocumentModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Dokumen"
                    label="Hapus Dokumen"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteDocumentModal}
                    onClose={() => {
                        setShowDeleteDocumentModal(!showDeleteDocumentModal)
                    }}
                >
                    <DeleteDocumentForm
                        showDeleteDocumentModal={setShowDeleteDocumentModal}
                    />
                </Modal>
            </div>
        </>
    )
}
