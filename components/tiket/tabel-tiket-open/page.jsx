import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { setTicketId } from '../store'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useState } from 'react'
import { setSelectedTicket } from '../store'
import Checkbox from '@/components/ui/Checkbox'
import SimpleBar from 'simplebar-react'

export default function OpenTicketTable({
    showEditAllTicket,
    showViewAllTicket,
    showDeleteAllTicket,
    ticketData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : ticketData?.data || [])
        dispatch(setSelectedTicket(selectAll ? [] : ticketData?.data || []))
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

        setSelectAll(updatedSelectedRows.length === ticketData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedTicket(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Judul',
            field: 'ticket_title',
        },

        {
            label: 'Tanggal Aduan',
            field: 'complaint_date',
        },

        {
            label: 'Prioritas',
            field: 'ticket_priority',
        },

        {
            label: 'Status',
            field: 'ticket_status',
        },

        {
            label: 'file',
            field: 'file',
        },

        {
            label: 'Deskripsi',
            field: 'ticket_description',
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
                                    {ticketData?.data?.map((row, i) => (
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
                                                {row?.ticket_title}
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.createdAt).format(
                                                    'DD-MMMM-YYYY'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {row?.ticket_priority == 1
                                                    ? 'Rendah'
                                                    : row?.ticket_priority == 2
                                                      ? 'Sedang'
                                                      : 'Tinggi'}
                                            </td>
                                            <td className="table-td">
                                                {' '}
                                                {row?.ticket_status == 1
                                                    ? 'Open'
                                                    : row?.ticket_status == 2
                                                      ? 'Closed'
                                                      : 'Pending'}
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
                                                {row?.ticket_description}
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
                                                                    setTicketId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showViewAllTicket(
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
                                                                    setTicketId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showEditAllTicket(
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
                                                                    setTicketId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showDeleteAllTicket(
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
                            {ticketData?.data?.length === 0 && (
                                <div className="w-full pt-5 text-xl flex justify-center rows-center">
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
