import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import {
    setSelectedOvertimeData,
    setOvertimeId,
    setShowVerificationModal,
} from '../store'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { useState } from 'react'

export default function OvertimeDataTable({
    setShowViewOvertimeDataModal,
    setShowEditOvertimeDataModal,
    setShowDeleteOvertimeDataModal,
    overtimeData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : overtimeData?.data || [])
        dispatch(
            setSelectedOvertimeData(selectAll ? [] : overtimeData?.data || [])
        )
    }

    const toggleSelectIndividual = (row) => {
        const updatedSelectedRows = [...selectedRows]
        const index = updatedSelectedRows.findIndex(
            (selectedRow) => selectedRow === row
        )

        if (index === -1) {
            updatedSelectedRows.push(row)
        } else {
            updatedSelectedRows.splice(index, 1)
        }

        setSelectAll(updatedSelectedRows.length === overtimeData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedOvertimeData(updatedSelectedRows))
    }

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
                                        <td className="pl-3">
                                            <Checkbox
                                                value={selectAll}
                                                onChange={toggleSelectAll}
                                            />
                                        </td>
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
                                    {overtimeData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="pl-3">
                                                <Checkbox
                                                    value={selectedRows.includes(
                                                        row
                                                    )}
                                                    onChange={() =>
                                                        toggleSelectIndividual(
                                                            row
                                                        )
                                                    }
                                                />
                                            </td>
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
                                                {row?.status === 'Setuju' && (
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(
                                                                setShowVerificationModal(
                                                                    true
                                                                )
                                                            )
                                                            dispatch(
                                                                setOvertimeId(
                                                                    row?.id
                                                                )
                                                            )
                                                        }}
                                                        className="btn-success btn-sm text-sm w-[80px]"
                                                    >
                                                        {row?.status}
                                                    </Button>
                                                )}
                                                {row?.status === 'Tolak' && (
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(
                                                                setShowVerificationModal(
                                                                    true
                                                                )
                                                            )
                                                            dispatch(
                                                                setOvertimeId(
                                                                    row?.id
                                                                )
                                                            )
                                                        }}
                                                        className="btn-danger btn-sm text-sm w-[80px]"
                                                    >
                                                        {row?.status}
                                                    </Button>
                                                )}
                                                {row?.status ===
                                                    'Verifikasi' && (
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(
                                                                setShowVerificationModal(
                                                                    true
                                                                )
                                                            )
                                                            dispatch(
                                                                setOvertimeId(
                                                                    row?.id
                                                                )
                                                            )
                                                        }}
                                                        className="btn-warning btn-sm text-sm w-[80px]"
                                                    >
                                                        {row?.status}
                                                    </Button>
                                                )}
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

                                                                setShowViewOvertimeDataModal(
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

                                                                setShowEditOvertimeDataModal(
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

                                                                setShowDeleteOvertimeDataModal(
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
                            {overtimeData?.data?.length === 0 && (
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
