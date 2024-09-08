import Icon from '@/components/ui/Icon'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setMutationId, setSelectedMutationData } from '../store'
import Tooltip from '@/components/ui/Tooltip'
import dayjs from 'dayjs'
import Checkbox from '@/components/ui/Checkbox'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'

export default function PositionMutationTable({
    setShowViewMutationPositionModal,
    setShowEditMutationPositionModal,
    setShowDeleteMutationPositionModal,
    positionMutationData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : positionMutationData?.data || [])
        dispatch(
            setSelectedMutationData(
                selectAll ? [] : positionMutationData?.data || []
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
            updatedSelectedRows.length === positionMutationData?.data?.length
        )
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedMutationData(updatedSelectedRows))
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
            label: 'Tanggal Efektif',
            field: 'effective_date',
        },

        {
            label: 'Posisi Sebelum',
            field: 'previous_position',
        },

        {
            label: 'Posisi Sesudah',
            field: 'current_position',
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
                                    {positionMutationData?.data?.map(
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
                                                        row?.date_applied
                                                    ).format('DD-MMMM-YYYY')}
                                                </td>
                                                <td className="table-td">
                                                    {
                                                        row?.last_position
                                                            ?.position_name
                                                    }
                                                </td>
                                                <td className="table-td">
                                                    {
                                                        row?.employee?.position
                                                            ?.position_name
                                                    }
                                                </td>
                                                <td className="table-td">
                                                    {row?.mutation_description}
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
                                                                        setMutationId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowViewMutationPositionModal(
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
                                                                        setMutationId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowEditMutationPositionModal(
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
                                                                        setMutationId(
                                                                            row.id
                                                                        )
                                                                    )
                                                                    setShowDeleteMutationPositionModal(
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
                            {positionMutationData?.data?.length === 0 && (
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
