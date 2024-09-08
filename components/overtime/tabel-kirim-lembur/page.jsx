import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import { setOvertimeId } from '../store'
import dayjs from 'dayjs'
import { useState } from 'react'
import { setSelectedOvertimeData } from '../store'
import Checkbox from '@/components/ui/Checkbox'

export default function SendOvertimeTable({
    setShowViewSendOvertimeModal,
    setShowEditSendOvertimeModal,
    setShowDeleteSendOvertimeModal,
    sendOvertimeData,
}) {
    const dispatch = useDispatch()
    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Nama',
            field: 'name',
        },

        {
            label: 'TIpe Lembur',
            field: 'name',
        },

        {
            label: 'Mulai Lembur',
            field: 'start_time',
        },

        {
            label: 'Selesai Lembur',
            field: 'end_time',
        },

        {
            label: 'Status',
            field: 'status',
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
                                    {sendOvertimeData?.data?.map((row, i) => (
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
                                                {row?.overtime_type?.name}
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.start_date).format(
                                                    'DD MMMM YYYY HH:mm'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.end_date).format(
                                                    'DD MMMM YYYY HH:mm'
                                                )}
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
                                                                    setOvertimeId(
                                                                        row.id
                                                                    )
                                                                )

                                                                setShowViewSendOvertimeModal(
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
                                                                    setOvertimeId(
                                                                        row.id
                                                                    )
                                                                )

                                                                setShowEditSendOvertimeModal(
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
                                                                    setOvertimeId(
                                                                        row.id
                                                                    )
                                                                )

                                                                setShowDeleteSendOvertimeModal(
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
                            {sendOvertimeData?.data?.length === 0 && (
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
