import Icon from '@/components/ui/Icon'
import { useDispatch } from 'react-redux'
import { setDivisionId } from '../store'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'

export default function DivisionTable({
    showViewDivisionModal,
    showEditDivisionModal,
    showDeleteDivisionModal,
    divisionData,
}) {
    const dispatch = useDispatch()

    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Kode Divisi',
            field: 'first_name',
        },

        {
            label: 'Nama Divisi',
            field: 'email',
        },

        {
            label: 'Deskripsi Divisi',
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
                                    {divisionData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.division_code}
                                            </td>
                                            <td className="table-td">
                                                {row?.division_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.description}
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
                                                                    setDivisionId(
                                                                        row.division_code
                                                                    )
                                                                )
                                                                showViewDivisionModal(
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
                                                                    setDivisionId(
                                                                        row.division_code
                                                                    )
                                                                )
                                                                showEditDivisionModal(
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
                                                                    setDivisionId(
                                                                        row.division_code
                                                                    )
                                                                )
                                                                showDeleteDivisionModal(
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
                            {divisionData?.data?.length === 0 && (
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
