import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { setLeaveTypeDataId, setSelectedLeaveTypeData } from '../store'
import { useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'
import SimpleBar from 'simplebar-react'

export default function RemainingLeaveTypeTable({
    setShowEditLeaveTypeModal,
    setShowViewLeaveTypeModal,
    setShowDeleteLeaveTypeModal,
    leaveTypeData,
}) {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : leaveTypeData?.data || [])
        dispatch(
            setSelectedLeaveTypeData(selectAll ? [] : leaveTypeData?.data || [])
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

        setSelectAll(updatedSelectedRows.length === leaveTypeData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedLeaveTypeData(updatedSelectedRows))
    }

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
            label: 'Status Karyawan',
            field: 'employee_status',
        },

        {
            label: 'Tipe Cuti',
            field: 'leave_type',
        },

        {
            label: 'Saldo Cuti',
            field: 'leave_type',
        },

        {
            label: 'Digunakan',
            field: 'used_leave_type',
        },

        {
            label: 'Sisa',
            field: 'remaining_leave_type',
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
                                        <td className="table-td">
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
                                    {leaveTypeData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
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
                                                <div className="flex flex-col">
                                                    <div>
                                                        {row?.employee?.name}
                                                    </div>
                                                    <div>
                                                        {
                                                            row?.employee
                                                                ?.employee_nik
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.employee?.position
                                                        ?.position_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {row?.employee?.employee_status}
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.leave_type_master
                                                        ?.leave_type_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {row?.leave_type} Hari
                                            </td>
                                            <td className="table-td">
                                                {row?.used_leave_type} Hari
                                            </td>
                                            <td className="table-td">
                                                {row?.remaining_leave_type} Hari
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
                                                            onClick={() => {
                                                                dispatch(
                                                                    setLeaveTypeDataId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowViewLeaveTypeModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
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
                                                            onClick={() => {
                                                                dispatch(
                                                                    setLeaveTypeDataId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowEditLeaveTypeModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
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
                                                            onClick={() => {
                                                                dispatch(
                                                                    setLeaveTypeDataId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowDeleteLeaveTypeModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
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
                            {leaveTypeData?.data?.length === 0 && (
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
