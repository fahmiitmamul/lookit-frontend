import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'
import { useDispatch } from 'react-redux'
import { setAnnouncementId } from '../store'
import dayjs from 'dayjs'

export default function AnnouncementTable({
    setShowViewAnnouncementModal,
    setShowEditAnnouncementModal,
    setShowDeleteAnnouncementModal,
    announcementData,
}) {
    const dispatch = useDispatch()

    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Judul Pengumuman',
            field: 'notification_title',
        },

        {
            label: 'Isi Pengumuman',
            field: 'notification_content',
        },

        {
            label: 'File',
            field: 'file',
        },

        {
            label: 'Tanggal Expired',
            field: 'expired_date',
        },

        {
            label: 'Aksi',
            field: 'action',
        },
    ]

    return (
        <>
            <div className="overflow-x-auto -mx-6">
                <SimpleBar className="overflow-auto w-full bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-400 rounded-md">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        {columns.map((column, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className=" table-th "
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    {announcementData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.announcement_title}
                                            </td>
                                            <td className="table-td">
                                                {row?.announcement_content}
                                            </td>
                                            <td className="table-td">
                                                <Link
                                                    download={row?.file}
                                                    target="_blank"
                                                    href={`https://res.cloudinary.com/dxnewldiy/image/upload/v1713496646/${row.file}.png`}
                                                >
                                                    <Icon icon="heroicons-outline:document" />
                                                </Link>
                                            </td>
                                            <td className="table-td">
                                                {dayjs(
                                                    row?.announcement_expiration_date
                                                ).format('DD-MM-YYYY')}
                                            </td>
                                            <td className="table-td">
                                                <div className="flex space-x-3 rtl:space-x-reverse">
                                                    <Tooltip
                                                        content="View"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            className="action-btn"
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(
                                                                    setAnnouncementId(
                                                                        row?.id
                                                                    )
                                                                )
                                                                setShowViewAnnouncementModal(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            <Icon icon="heroicons:eye" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Edit"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            className="action-btn"
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(
                                                                    setAnnouncementId(
                                                                        row?.id
                                                                    )
                                                                )
                                                                setShowEditAnnouncementModal(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            <Icon icon="heroicons:pencil-square" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Delete"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                        theme="danger"
                                                    >
                                                        <button
                                                            className="action-btn"
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(
                                                                    setAnnouncementId(
                                                                        row?.id
                                                                    )
                                                                )
                                                                setShowDeleteAnnouncementModal(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            <Icon icon="heroicons:trash" />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {announcementData?.data?.length === 0 && (
                                <div className="w-full pt-5 text-xl flex justify-center items-center">
                                    <div>No data found</div>
                                </div>
                            )}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </>
    )
}
