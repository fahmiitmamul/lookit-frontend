'use client'
import DetailAnnouncementForm from '@/components/announcement/form-detail-pengumuman/page'
import EditAnnouncement from '@/components/announcement/form-edit-pengumuman/page'
import DeleteAnnouncementForm from '@/components/announcement/form-hapus-pengumuman/page'
import AddAnnouncement from '@/components/announcement/form-tambah-pengumuman/page'
import AnnouncementTable from '@/components/announcement/tabel-pengumuman/page'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import Dropdown from '@/components/ui/Dropdown'
import Card from '@/components/ui/Card'

export default function Pengumuman() {
    const [announcementPage, setAnnouncementPage] = useState(1)
    const [announcementLimit, setAnnouncementLimit] = useState(5)
    const [announcementSearchData, setAnnouncementSearchData] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const [showAddAnnouncementModal, setShowAddAnnouncementModal] =
        useState(false)
    const [showEditAnnouncementModal, setShowEditAnnouncementModal] =
        useState(false)
    const [showViewAnnouncementModal, setShowViewAnnouncementModal] =
        useState(false)
    const [showDeleteAnnouncementModal, setShowDeleteAnnouncementModal] =
        useState(false)
    const token = getCookie('token')

    async function fetchAnnouncement(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/announcement?page=' +
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

    const { data: announcementData } = useQuery({
        queryKey: [
            'announcement',
            announcementPage,
            announcementSearchData,
            announcementLimit,
        ],
        queryFn: () =>
            fetchAnnouncement(
                announcementPage,
                announcementSearchData,
                announcementLimit
            ),
    })

    const queryClient = useQueryClient()

    const handlePageChange = (page) => {
        setAnnouncementPage(page)
    }

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }
        fetchAnnouncement(
            announcementPage,
            announcementSearchData,
            announcementLimit
        )

        queryClient.invalidateQueries({ queryKey: ['announcement'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 w-full justify-between">
                        <div className="flex justify-center items-center">
                            <h5>Data Pengumuman</h5>
                        </div>
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                className="btn-success"
                                text="Buat Pengumuman"
                                onClick={() => {
                                    setShowAddAnnouncementModal(
                                        !showAddAnnouncementModal
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
                                onChange={(e) =>
                                    setAnnouncementSearchData(e.target.value)
                                }
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                            />
                        </div>
                    }
                >
                    <AnnouncementTable
                        setShowViewAnnouncementModal={
                            setShowViewAnnouncementModal
                        }
                        setShowEditAnnouncementModal={
                            setShowEditAnnouncementModal
                        }
                        setShowDeleteAnnouncementModal={
                            setShowDeleteAnnouncementModal
                        }
                        announcementData={announcementData}
                    />
                </Card>
                <div className="w-full flex-wrap flex justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setAnnouncementLimit(e.target.value)
                                fetchAnnouncement()
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
                            Show {announcementData?.currentPage} of{' '}
                            {announcementData?.totalPages} entries
                        </span>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={announcementData?.totalPages}
                            currentPage={announcementData?.currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title="Tambah Pengumuman"
                    label="Tambah Pengumuman"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddAnnouncementModal}
                    onClose={() => {
                        setShowAddAnnouncementModal(!showAddAnnouncementModal)
                    }}
                >
                    <AddAnnouncement
                        setShowAddAnnouncementModal={
                            setShowAddAnnouncementModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Pengumuman"
                    label="Edit Pengumuman"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showEditAnnouncementModal}
                    onClose={() => {
                        setShowEditAnnouncementModal(!showEditAnnouncementModal)
                    }}
                >
                    <EditAnnouncement
                        setShowEditAnnouncementModal={
                            setShowEditAnnouncementModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Pengumuman"
                    label="Detail Pengumuman"
                    className="max-w-5xl"
                    labelClass="btn-outline-dark"
                    activeModal={showViewAnnouncementModal}
                    onClose={() => {
                        setShowViewAnnouncementModal(!showViewAnnouncementModal)
                    }}
                >
                    <DetailAnnouncementForm
                        setShowViewAnnouncementModal={
                            setShowViewAnnouncementModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Pengumuman"
                    label="Hapus Pengumuman"
                    labelClass="btn-outline-dark"
                    activeModal={showDeleteAnnouncementModal}
                    onClose={() => {
                        setShowDeleteAnnouncementModal(
                            !showDeleteAnnouncementModal
                        )
                    }}
                >
                    <DeleteAnnouncementForm
                        showDeleteAnnouncementModal={
                            setShowDeleteAnnouncementModal
                        }
                    />
                </Modal>
            </div>
        </>
    )
}
