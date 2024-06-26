import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'
import { useDispatch } from 'react-redux'
import { setActivityId } from '../store'

export default function ActivityData({
    setShowViewActivityModal,
    setShowDeleteActivityModal,
    setShowCommentActivityModal,
    activityData,
}) {
    const dispatch = useDispatch()

    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Nama',
            field: 'first_name',
        },

        {
            label: 'Jabatan',
            field: 'position',
        },

        {
            label: 'Cabang',
            field: 'branch',
        },

        {
            label: 'TGL Aktifitas',
            field: 'activity_date',
        },

        {
            label: 'Aktifitas',
            field: 'activity',
        },

        {
            label: 'Deskripsi',
            field: 'description',
        },

        {
            label: 'File',
            field: 'file',
        },

        {
            label: 'Status',
            field: 'activity_status',
        },

        {
            label: 'Aksi',
            field: 'email',
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
                                    {activityData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.employee?.name}
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.employee?.position
                                                        ?.position_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.employee?.branch
                                                        ?.branch_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {row?.activity_date}
                                            </td>
                                            <td className="table-td">
                                                {row?.activity_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.activity_description}
                                            </td>
                                            <td className="table-td">
                                                <Link
                                                    href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${row?.file?.replace(
                                                        /\s/g,
                                                        '%20'
                                                    )}`}
                                                >
                                                    <Icon icon="heroicons-outline:document" />
                                                </Link>
                                            </td>
                                            <td className="table-td">
                                                {row?.status}
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
                                                                    setActivityId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowViewActivityModal(
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
                                                                    setActivityId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowCommentActivityModal(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            <Icon icon="heroicons:chat-bubble-bottom-center" />
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
                                                                    setActivityId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowDeleteActivityModal(
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
                            {activityData?.data?.length === 0 && (
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
