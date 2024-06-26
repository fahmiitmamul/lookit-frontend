'use client'
import ActivityData from '@/components/aktifitas/tabel-aktifitas/page'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Icon } from '@iconify/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import DeleteActivityForm from '@/components/aktifitas/form-hapus-aktivitas/page'
import DetailActivityForm from '@/components/aktifitas/form-detail-aktivitas/page'
import http from '@/app/helpers/http.helper'
import CommentActivityForm from '@/components/aktifitas/form-komen-aktivitas/page'
import { useSelector } from 'react-redux'

export default function Aktivitas() {
    const [showViewActivityModal, setShowViewActivityModal] = useState(false)
    const [showCommentActivityModal, setShowCommentActivityModal] =
        useState(false)
    const [showDeleteActivityModal, setShowDeleteActivityModal] =
        useState(false)
    const [activityPage, setActivityPage] = useState(1)
    const [activityLimit, setActivityLimit] = useState(5)
    const [activitySearchData, setActivitySearchData] = useState('')
    const [sortBy, setSortBy] = useState('id')
    const [sortOrder, setSortOrder] = useState('asc')
    const token = getCookie('token')

    const { employee_id } = useSelector((state) => state.employee.employee)

    async function fetchActivity(pageData, search, limitData) {
        const { data } = await http(token).get(
            '/activity?page=' +
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
    }

    const handlePageChange = (page) => {
        setActivityPage(page)
    }

    const { data: activityData } = useQuery({
        queryKey: [
            'activity',
            activityPage,
            activitySearchData,
            activityLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchActivity(activityPage, activitySearchData, activityLimit),
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortOrder('asc')
        }

        fetchActivity(activityPage, activitySearchData, activityLimit)

        queryClient.invalidateQueries({ queryKey: ['activity'] })
    }

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5">
                        <div>
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
                                            handleSort('activity_name')
                                        },
                                    },
                                ]}
                                classMenuItems="left-0  w-[220px] top-[110%]"
                                label={
                                    <Button
                                        className="btn-primary"
                                        icon="heroicons-outline:arrows-up-down"
                                        div
                                    />
                                }
                            ></Dropdown>
                        </div>
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder="Cari Aktivitas"
                                className="h-[48px]"
                                onChange={(e) => {
                                    setActivitySearchData(e.target.value)
                                }}
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                            />
                        </div>
                    </div>
                </div>
                <ActivityData
                    setShowViewActivityModal={setShowViewActivityModal}
                    setShowDeleteActivityModal={setShowDeleteActivityModal}
                    setShowCommentActivityModal={setShowCommentActivityModal}
                    activityData={activityData}
                />
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                setActivityLimit(e.target.value)
                                fetchActivity()
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
                            Page <span>1 of 5</span>
                        </span>
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={activityData?.totalPages}
                            currentPage={activityData?.currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal
                title="Detail Aktivitas"
                label="Detail Aktivitas"
                labelClass="btn-outline-dark"
                className="max-w-5xl"
                activeModal={showViewActivityModal}
                onClose={() => {
                    setShowViewActivityModal(!showViewActivityModal)
                }}
            >
                <DetailActivityForm
                    setShowViewActivityModal={setShowViewActivityModal}
                />
            </Modal>
            <Modal
                title="Komen Aktivitas"
                label="Komen Aktivitas"
                labelClass="btn-outline-dark"
                className="max-w-5xl"
                activeModal={showCommentActivityModal}
                onClose={() => {
                    setShowCommentActivityModal(!showCommentActivityModal)
                }}
            >
                <CommentActivityForm
                    setShowActivityCommentModal={setShowCommentActivityModal}
                />
            </Modal>
            <Modal
                title="Hapus Aktivitas"
                label="Hapus Aktivitas"
                labelClass="btn-outline-dark"
                className="max-w-xl"
                activeModal={showDeleteActivityModal}
                onClose={() => {
                    setShowDeleteActivityModal(!showDeleteActivityModal)
                }}
            >
                <DeleteActivityForm
                    setShowDeleteActivityModal={setShowDeleteActivityModal}
                />
            </Modal>
        </>
    )
}
