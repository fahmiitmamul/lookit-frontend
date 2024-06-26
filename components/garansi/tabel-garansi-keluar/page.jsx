'use client'
import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { setGuaranteeId } from '../store'
import dayjs from 'dayjs'
import Checkbox from '@/components/ui/Checkbox'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'

export default function OutgoingGuaranteeForm({
    setShowViewOutgoingGuaranteeModal,
    setShowEditOutgoingGuaranteeModal,
    setShowDeleteOutgoingGuaranteeModal,
    outgoingGuaranteeData,
}) {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : guaranteeData?.data || [])
        dispatch(
            setSelectedGuarantee(selectAll ? [] : guaranteeData?.data || [])
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

        setSelectAll(updatedSelectedRows.length === guaranteeData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedGuarantee(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Nama',
            field: 'name',
        },

        {
            label: 'Jabatan',
            field: 'position',
        },

        {
            label: 'Tanggal Keluar',
            field: 'out_date',
        },

        {
            label: 'Nama Garansi',
            field: 'guarantee_name',
        },

        {
            label: 'Tipe Garansi',
            field: 'guarantee_type',
        },

        {
            label: 'Kondisi Garansi',
            field: 'guarantee_condition',
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
                                    {outgoingGuaranteeData?.data?.map(
                                        (row, i) => (
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
                                                    {row?.employee?.name}
                                                </td>
                                                <td className="table-td">
                                                    {
                                                        row?.employee?.position
                                                            ?.position_name
                                                    }
                                                </td>
                                                <td className="table-td">
                                                    {dayjs(
                                                        row?.out_date
                                                    ).format('DD-MMMM-YYYY')}
                                                </td>
                                                <td className="table-td">
                                                    {row?.guarantee_name}
                                                </td>
                                                <td className="table-td">
                                                    {row?.guarantee_type}
                                                </td>
                                                <td className="table-td">
                                                    {row?.guarantee_condition}
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
                                                                        setGuaranteeId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowViewOutgoingGuaranteeModal(
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
                                                                        setGuaranteeId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowEditOutgoingGuaranteeModal(
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
                                                                        setGuaranteeId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowDeleteOutgoingGuaranteeModal(
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
                                        )
                                    )}
                                </tbody>
                            </table>
                            {outgoingGuaranteeData?.data?.length === 0 && (
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
