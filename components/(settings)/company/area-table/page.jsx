import Icon from '@/components/ui/Icon'
import { setAreaId } from '../store'
import { useDispatch } from 'react-redux'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'

export default function AreaTable({
    showViewAreaModal,
    showEditAreaModal,
    showDeleteAreaModal,
    areaData,
}) {
    const dispatch = useDispatch()

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Kode Area',
            field: 'area_code',
        },

        {
            label: 'Nama Area',
            field: 'area_name',
        },

        {
            label: 'Deskripsi Area',
            field: 'area_description',
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
                                    {areaData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.area_code}
                                            </td>
                                            <td className="table-td">
                                                {row?.area_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.area_description}
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
                                                                showViewAreaModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    setAreaId(
                                                                        row.area_code
                                                                    )
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
                                                                showEditAreaModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    setAreaId(
                                                                        row.area_code
                                                                    )
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
                                                                showDeleteAreaModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    setAreaId(
                                                                        row.area_code
                                                                    )
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
                            {areaData?.data?.length === 0 && (
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
