'use client'
import Icon from '@/components/ui/Icon'
import Link from 'next/link'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { setGuaranteeId } from '../store'
import Checkbox from '@/components/ui/Checkbox'
import { setSelectedGuarantee } from '../store'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'

export default function MakeGuaranteeTable({
    setShowViewGuaranteeModal,
    setShowEditGuaranteeModal,
    setShowDeleteGuaranteeModal,
    guaranteeData,
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
            field: 'age',
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
            label: 'Keterangan',
            field: 'guarantee_description',
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
                                    {guaranteeData?.data?.map((row, i) => (
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
                                                {row?.guarantee_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.guarantee_type}
                                            </td>
                                            <td className="table-td">
                                                {row?.guarantee_description}
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
                                                                    setGuaranteeId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowViewGuaranteeModal(
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
                                                                setShowEditGuaranteeModal(
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
                                                                setShowDeleteGuaranteeModal(
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
                            {guaranteeData?.data?.length === 0 && (
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
