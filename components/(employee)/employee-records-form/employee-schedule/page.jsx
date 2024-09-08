import SimpleBar from 'simplebar-react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setScheduleId, setStartDate } from '@/components/schedule/store'

export default function ScheduleRecordTable({
    scheduleData,
    employeeData,
    setShowEditScheduleModal,
}) {
    const [currentMonth, setCurrentMonth] = useState('')
    const calendarRef = useRef()
    const dispatch = useDispatch()

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

    return (
        <>
            {employeeData?.length >= 1 && (
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">Jadwal Karyawan</div>
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
                        <div className="overflow-hidden calendar-container">
                            {employeeData?.length === 0 ? (
                                <div className="absolute text-xl top-0 left-0 w-full h-full bg-white dark:bg-slate-700 bg-opacity-50 dark:bg-opacity-50 z-10 flex justify-center items-center">
                                    No data available
                                </div>
                            ) : (
                                <FullCalendar
                                    eventClick={(data) => {
                                        setShowEditScheduleModal(true)
                                        dispatch(setScheduleId(data.event.id))
                                        dispatch(setStartDate(data.event.start))
                                    }}
                                    plugins={[resourceTimelinePlugin]}
                                    ref={calendarRef}
                                    initialView="resourceTimelineMonth"
                                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                                    resources={employeeData?.map((item) => ({
                                        id: item?.id,
                                        name: item?.name,
                                        position_of_work:
                                            item?.position?.position_name,
                                        branch: item?.branch?.branch_name,
                                        month: currentMonth,
                                    }))}
                                    datesSet={(dateInfo) => {
                                        const monthIndex =
                                            dateInfo.start.getMonth()
                                        const monthName = monthNames[monthIndex]
                                        const year =
                                            dateInfo.start.getFullYear()
                                        setCurrentMonth(`${monthName} ${year}`)
                                    }}
                                    headerToolbar={false}
                                    events={scheduleData?.data?.map((item) => ({
                                        id: item?.id,
                                        title: item?.is_holiday
                                            ? 'Libur'
                                            : item?.shift.shift_code,
                                        start: item?.start,
                                        end: item?.end,
                                        resourceId: item?.employee_id,
                                        start_time: item?.start_time,
                                        end_time: item?.end_time,
                                    }))}
                                    eventContent={(data) => {
                                        return (
                                            <div className="pt-3">
                                                {data?.event?.title ===
                                                'Libur' ? (
                                                    <div className="flex justify-center items-center">
                                                        <div className="text-red-500 font-bold text-xl pt-3">
                                                            Libur
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <div className="text-base text-green-500 font-bold">
                                                            {data?.event?.title}
                                                        </div>
                                                        <div className="flex text-slate-600 gap-2">
                                                            <div className="flex justify-center items-center">
                                                                <div>
                                                                    <Icon
                                                                        fontSize={
                                                                            25
                                                                        }
                                                                        icon="heroicons:arrow-right-circle"
                                                                        color="green"
                                                                    />
                                                                </div>
                                                                <div className="text-sm">
                                                                    {
                                                                        data
                                                                            ?.event
                                                                            ?.extendedProps
                                                                            ?.start_time
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center items-center">
                                                                <div className="text-sm">
                                                                    {
                                                                        data
                                                                            ?.event
                                                                            ?.extendedProps
                                                                            ?.end_time
                                                                    }
                                                                </div>
                                                                <div>
                                                                    <Icon
                                                                        fontSize={
                                                                            25
                                                                        }
                                                                        icon="heroicons:arrow-left-circle"
                                                                        color="red"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }}
                                    height="auto"
                                    resourceAreaWidth="50%"
                                    resourceAreaColumns={[
                                        {
                                            field: 'name',
                                            headerContent: 'Nama Karyawan',
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
                                            field: 'month',
                                            headerContent: 'Bulan',
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
