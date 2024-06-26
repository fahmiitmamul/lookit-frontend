'use client'
import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { setGuaranteeId } from '../store'
import dayjs from 'dayjs'
import Checkbox from '@/components/ui/Checkbox'
import { setSelectedGuarantee } from '../store'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'

export default function IncomingGuaranteeTable({
    setShowViewIncomingGuaranteeModal,
    setShowEditIncomingGuaranteeModal,
    setShowDeleteIncomingGuaranteeModal,
    incomingGuaranteeData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : incomingGuaranteeData?.data || [])
        dispatch(
            setSelectedGuarantee(
                selectAll ? [] : incomingGuaranteeData?.data || []
            )
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

        setSelectAll(
            updatedSelectedRows.length === incomingGuaranteeData?.data?.length
        )
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
            label: 'Tanggal Masuk',
            field: 'start_date',
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
                                    {incomingGuaranteeData?.data?.map(
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
                                                        row?.start_date
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
                                                                    setShowViewIncomingGuaranteeModal(
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
                                                                    setShowEditIncomingGuaranteeModal(
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
                                                                    setShowDeleteIncomingGuaranteeModal(
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
                            {incomingGuaranteeData?.data?.length === 0 && (
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
