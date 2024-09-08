import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import { setPresenceId } from '../store'
import { useState } from 'react'
import { setSelectedPresenceData } from '../store'
import Checkbox from '@/components/ui/Checkbox'
import { Icon as ScheduleIcon } from '@iconify/react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

export default function HolidayTable({
    setShowViewHolidayModal,
    setShowEditHolidayModal,
    setShowDeleteHolidayModal,
    holidayData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : setSelectedPresenceData?.data || [])
        dispatch(
            setSelectedPresenceData(
                selectAll ? [] : setSelectedPresenceData?.data || []
            )
        )
    }

    const selectedPresenceButton = useSelector(
        (state) => state.presence.presence.selectedPresenceButton
    )

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
            updatedSelectedRows.length === setSelectedPresenceData?.data?.length
        )
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedPresenceData(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Nama',
            field: 'first_name',
        },

        {
            label: 'Jadwal',
            field: 'email',
        },

        {
            label: 'Tanggal',
            field: 'email',
        },

        {
            label: 'Jam Masuk',
            field: 'email',
        },

        {
            label: 'Jam Pulang',
            field: 'email',
        },

        {
            label: 'Total Jam',
            field: 'email',
        },

        {
            label: 'Aksi',
            field: 'email',
        },
    ]

    function getTodayDayName() {
        const today = new Date()
        return today.toLocaleDateString('en-US', { weekday: 'long' })
    }

    const todayDayName = getTodayDayName()

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
                                    {holidayData?.data?.map((row, i) => (
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
                                                <div className="flex flex-col gap-1">
                                                    <div>
                                                        {row?.shift?.shift_name}
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="flex">
                                                            <div>
                                                                <ScheduleIcon
                                                                    fontSize={
                                                                        20
                                                                    }
                                                                    icon="heroicons:arrow-right-circle"
                                                                    color="green"
                                                                />
                                                            </div>
                                                            <div>
                                                                {
                                                                    row?.shift?.shift?.find(
                                                                        (
                                                                            shiftDetail
                                                                        ) =>
                                                                            shiftDetail.day ===
                                                                            todayDayName
                                                                    )?.startTime
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            {
                                                                row?.shift?.shift?.find(
                                                                    (
                                                                        shiftDetail
                                                                    ) =>
                                                                        shiftDetail.day ===
                                                                        todayDayName
                                                                )?.endTime
                                                            }
                                                            <div>
                                                                <ScheduleIcon
                                                                    fontSize={
                                                                        20
                                                                    }
                                                                    icon="heroicons:arrow-left-circle"
                                                                    color="red"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.createdAt).format(
                                                    'DD MMMM YYYY'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                <div>{row?.start_time}</div>
                                            </td>
                                            <td className="table-td">
                                                <div>{row?.end_time}</div>
                                            </td>
                                            <td className="table-td">
                                                <div>
                                                    {row?.end_time
                                                        ? (() => {
                                                              const startTime =
                                                                  new Date(
                                                                      `1970-01-01T${row?.start_time}Z`
                                                                  )
                                                              const endTime =
                                                                  new Date(
                                                                      `1970-01-01T${row?.end_time}Z`
                                                                  )
                                                              const diff =
                                                                  endTime -
                                                                  startTime
                                                              const hours =
                                                                  Math.floor(
                                                                      diff /
                                                                          3600000
                                                                  )
                                                              const minutes =
                                                                  Math.round(
                                                                      (diff %
                                                                          3600000) /
                                                                          60000
                                                                  )
                                                              return `${hours} Jam ${minutes} Menit`
                                                          })()
                                                        : 'Belum Absen Pulang'}
                                                </div>
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
                                                                    setPresenceId(
                                                                        row.id
                                                                    )
                                                                )
                                                                if (
                                                                    selectedPresenceButton ===
                                                                    'L'
                                                                ) {
                                                                    setShowViewHolidayModal(
                                                                        true
                                                                    )
                                                                }
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
                                                                    setPresenceId(
                                                                        row.id
                                                                    )
                                                                )
                                                                if (
                                                                    selectedPresenceButton ===
                                                                    'L'
                                                                ) {
                                                                    setShowEditHolidayModal(
                                                                        true
                                                                    )
                                                                }
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
                                                                    setPresenceId(
                                                                        row.id
                                                                    )
                                                                )
                                                                if (
                                                                    selectedPresenceButton ===
                                                                    'L'
                                                                ) {
                                                                    setShowDeleteHolidayModal(
                                                                        true
                                                                    )
                                                                }
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
                            {holidayData?.data?.length === 0 && (
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
