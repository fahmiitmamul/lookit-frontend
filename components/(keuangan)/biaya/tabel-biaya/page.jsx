import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'
import { setCostId, setSelectedCostData } from '../../store'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useState } from 'react'
import Checkbox from '@/components/ui/Checkbox'

export default function CostTable({
    setShowViewCostModal,
    setShowDeleteCostModal,
    setShowEditCostModal,
    costData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : costData?.data || [])
        dispatch(setSelectedCostData(selectAll ? [] : costData?.data || []))
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

        setSelectAll(updatedSelectedRows.length === costData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedCostData(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Nama Biaya',
            field: 'first_name',
        },

        {
            label: 'Jenis Biaya',
            field: 'email',
        },

        {
            label: 'Tanggal Pembayaran',
            field: 'email',
        },

        {
            label: 'Jumlah',
            field: 'email',
        },

        {
            label: 'Status',
            field: 'email',
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
                                    {costData?.data?.map((row, i) => (
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
                                                {row?.cost_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.cost_type}
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.cost_date).format(
                                                    'DD-MMMM-YYYY'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {`Rp${row.cost_grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                            </td>
                                            <td className="table-td">
                                                {row?.cost_status ===
                                                'Belum Dibayar' ? (
                                                    <div className="text-red-500">
                                                        Belum Dibayar
                                                    </div>
                                                ) : (
                                                    <div className="text-green-500">
                                                        Sudah Dibayar
                                                    </div>
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
                                                                    setCostId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowViewCostModal(
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
                                                                    setCostId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowEditCostModal(
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
                                                                    setCostId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowDeleteCostModal(
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
                            {costData?.data?.length === 0 && (
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
