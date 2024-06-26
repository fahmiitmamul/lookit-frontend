import Icon from '@/components/ui/Icon'
import Checkbox from '@/components/ui/Checkbox'
import Tooltip from '@/components/ui/Tooltip'
import { setTasksId } from '../store'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Link from 'next/link'
import { setSelectedTasksData } from '../store'
import SimpleBar from 'simplebar-react'

export default function AllTasks({
    setShowViewAllTasksModal,
    setShowEditAllTasksModal,
    setShowDeleteAllTasksModal,
    allTasksData,
}) {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : allTasksData?.data || [])
        dispatch(
            setSelectedTasksData(selectAll ? [] : allTasksData?.data || [])
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

        setSelectAll(updatedSelectedRows.length === allTasksData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedTasksData(updatedSelectedRows))
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
            label: 'Judul Tugas',
            field: 'tasks_title',
        },

        {
            label: 'Tanggal Tugas',
            field: 'tasks_date',
        },

        {
            label: 'Prioritas Tugas',
            field: 'tasks_priority',
        },

        {
            label: 'File',
            field: 'file',
        },

        {
            label: 'Deskripsi',
            field: 'tasks_description',
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
                                    {allTasksData?.data?.map((row, i) => (
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
                                                {row?.task_start_date}
                                            </td>
                                            <td className="table-td">
                                                {row?.task_priority}
                                            </td>
                                            <td className="table-td">
                                                {row?.task_name}
                                            </td>
                                            <td className="table-td">
                                                <div className="flex">
                                                    {row?.file?.map((item) => (
                                                        <Link
                                                            href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${item?.filename?.replace(
                                                                /\s/g,
                                                                '%20'
                                                            )}`}
                                                        >
                                                            <Icon icon="heroicons-outline:document" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {row?.task_description}
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
                                                                    setTasksId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowViewAllTasksModal(
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
                                                                    setTasksId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowEditAllTasksModal(
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
                                                                    setTasksId(
                                                                        row.id
                                                                    )
                                                                )
                                                                setShowDeleteAllTasksModal(
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
                            {allTasksData?.data?.length === 0 && (
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
