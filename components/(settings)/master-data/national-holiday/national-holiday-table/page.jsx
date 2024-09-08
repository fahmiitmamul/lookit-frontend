import Icon from '@/components/ui/Icon'
import { useDispatch } from 'react-redux'
import { setNationalHolidayId } from '../../store'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'

export default function NationalHoliday({
    showViewNationalHolidayModal,
    showEditNationalHolidayModal,
    showDeleteNationalHolidayModal,
    nationalHoliday,
}) {
    const dispatch = useDispatch()

    const actions = [
        {
            name: 'view',
            icon: 'heroicons-outline:eye',
        },
        {
            name: 'edit',
            icon: 'heroicons:pencil-square',
        },
        {
            name: 'delete',
            icon: 'heroicons-outline:trash',
        },
    ]

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Tanggal',
            field: 'date',
        },

        {
            label: 'Nama Libur Nasional',
            field: 'name',
        },

        {
            label: 'Deskripsi Libur Nasional',
            field: 'description',
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
                                    {nationalHoliday?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.date}
                                            </td>
                                            <td className="table-td">
                                                {row?.holiday_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.holiday_description}
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
                                                                    setNationalHolidayId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showViewNationalHolidayModal(
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
                                                                    setNationalHolidayId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showEditNationalHolidayModal(
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
                                                                    setNationalHolidayId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showDeleteNationalHolidayModal(
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
                            {nationalHoliday?.data?.length === 0 && (
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
