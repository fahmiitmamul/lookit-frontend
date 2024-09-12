import Icon from '@/components/ui/Icon'
import FullCalendar from '@fullcalendar/react'
import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import {
    setPresenceId,
    setPresenceRecordsData,
    setSelectedMonth,
} from '@/components/presence/store'
import Checkbox from '@/components/ui/Checkbox'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'

export default function PresenceRecordsTable({
    presenceData,
    employeeData,
    setShowEditPresenceModal,
}) {
    const [currentMonth, setCurrentMonth] = useState('')
    const calendarRef = useRef()
    const dispatch = useDispatch()
    const token = getCookie('token')
    const [selectedIds, setSelectedIds] = useState([])
    const [checked, setChecked] = useState([])

    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    useEffect(() => {
        async function fetchEmployee() {
            const { data } = await http(token).get(
                `/employee/presence/${selectedIds}`
            )

            dispatch(setPresenceRecordsData(data.results))
        }

        if (selectedIds.length !== 0) {
            fetchEmployee()
        }
    }, [selectedIds])

    const handleSelectAll = (selectAll) => {
        if (selectAll) {
            const allIds = employeeData.data.map((item) => parseInt(item.id))
            setSelectedIds(allIds)
            setChecked(allIds)
        } else {
            setSelectedIds([])
            setChecked([])
        }
    }

    return (
        <>
            {employeeData?.data?.length >= 1 && (
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">Rekap Kehadiran</div>
                    <div className="flex items-center">
                        <button
                            className="mr-2 p-2 bg-blue-500 text-white rounded"
                            onClick={() => calendarRef.current.getApi().prev()}
                        >
                            <Icon icon="akar-icons:chevron-left" />
                        </button>
                        <button
                            className="p-2 bg-blue-500 text-white rounded"
                            onClick={() => calendarRef.current.getApi().next()}
                        >
                            <Icon icon="akar-icons:chevron-right" />
                        </button>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto -mx-6">
                <SimpleBar className="overflow-auto w-full bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-400 rounded-md">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden presence-table">
                            {employeeData?.data?.length === 0 ? (
                                <div className="absolute text-xl top-0 left-0 w-full h-full bg-white dark:bg-slate-700 bg-opacity-50 dark:bg-opacity-50 z-10 flex justify-center items-center">
                                    No data available
                                </div>
                            ) : (
                                <FullCalendar
                                    eventClick={(data) => {
                                        setShowEditPresenceModal(true)
                                        dispatch(setPresenceId(data.event.id))
                                    }}
                                    plugins={[resourceTimelinePlugin]}
                                    ref={calendarRef}
                                    initialView="resourceTimelineMonth"
                                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                                    resources={employeeData?.data?.map(
                                        (item) => ({
                                            id: item?.id,
                                            name: item?.name,
                                            position_of_work:
                                                item?.position?.position_name,
                                            branch: item?.branch?.branch_name,
                                            month: currentMonth,
                                        })
                                    )}
                                    datesSet={(dateInfo) => {
                                        const monthIndex =
                                            dateInfo.start.getMonth()
                                        const monthName = monthNames[monthIndex]
                                        const year =
                                            dateInfo.start.getFullYear()
                                        setCurrentMonth(`${monthName} ${year}`)
                                        dispatch(
                                            setSelectedMonth(dateInfo.startStr)
                                        )
                                    }}
                                    headerToolbar={false}
                                    events={presenceData?.data?.map((item) => ({
                                        id: item?.id,
                                        title: item?.presence_status
                                            ?.presence_status_code,
                                        start: item?.start,
                                        end: item?.end,
                                        resourceId: item?.employee_id,
                                    }))}
                                    eventContent={(data) => {
                                        return (
                                            <div>
                                                <div className="pt-2.5 text-xl font-bold text-green-500 text-center">
                                                    {data.event.title}
                                                </div>
                                            </div>
                                        )
                                    }}
                                    height="auto"
                                    resourceAreaWidth="50%"
                                    resourceAreaColumns={[
                                        {
                                            field: 'select',
                                            headerContent: () => (
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        value={
                                                            selectedIds.length ===
                                                            employeeData?.data
                                                                ?.length
                                                        }
                                                        onChange={(e) =>
                                                            handleSelectAll(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ),
                                            cellContent: (params) => (
                                                <div className="flex justify-center items-center">
                                                    <Checkbox
                                                        value={checked.includes(
                                                            parseInt(
                                                                params.resource
                                                                    .id
                                                            )
                                                        )}
                                                        onChange={() => {
                                                            const resourceId =
                                                                parseInt(
                                                                    params
                                                                        .resource
                                                                        .id,
                                                                    10
                                                                )
                                                            if (
                                                                selectedIds.includes(
                                                                    resourceId
                                                                )
                                                            ) {
                                                                setSelectedIds(
                                                                    selectedIds.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            resourceId
                                                                    )
                                                                )
                                                            } else {
                                                                setSelectedIds([
                                                                    ...selectedIds,
                                                                    resourceId,
                                                                ])
                                                            }
                                                            if (
                                                                checked.includes(
                                                                    resourceId
                                                                )
                                                            ) {
                                                                setChecked(
                                                                    checked.filter(
                                                                        (id) =>
                                                                            id !==
                                                                            resourceId
                                                                    )
                                                                )
                                                            } else {
                                                                setChecked([
                                                                    ...checked,
                                                                    resourceId,
                                                                ])
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ),
                                        },
                                        {
                                            field: 'id',
                                            headerContent: 'No',
                                        },
                                        {
                                            field: 'name',
                                            headerContent: 'Nama',
                                        },
                                        {
                                            field: 'position_of_work',
                                            headerContent: 'Jabatan',
                                        },
                                        {
                                            field: 'branch',
                                            headerContent: 'Cabang',
                                        },
                                        {
                                            field: 'time',
                                            headerContent: 'Total Jam',
                                        },
                                    ]}
                                    slotLabelFormat={[
                                        {
                                            month: 'short',
                                            day: '2-digit',
                                            omitCommas: true,
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </>
    )
}
