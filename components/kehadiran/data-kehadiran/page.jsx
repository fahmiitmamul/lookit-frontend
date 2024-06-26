import { Tab } from '@headlessui/react'
import Tooltip from '@/components/ui/Tooltip'
import PresentTable from '../tabel-hadir/page'
import ArrivingLate from '../tabel-hadir-terlambat/page'
import GoHomeEarly from '../tabel-pulang-cepat/page'
import NotAbsentFromHome from '../tabel-tidak-absen-pulang/page'
import AlphaTable from '../tabel-alpha/page'
import SickTable from '../tabel-sakit/page'
import PermissionTable from '../tabel-izin/page'
import LeaveTypeTable from '../tabel-cuti/page'
import HolidayTable from '../tabel-libur/page'
import { setSelectedPresenceButton } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export default function PresenceData({
    presentData,
    arrivingLateData,
    goEarlyData,
    notAbsentFromHomeData,
    alphaData,
    sickData,
    permissionData,
    leaveData,
    holidayData,
    setShowViewPresentModal,
    setShowEditPresentModal,
    setShowDeletePresentModal,
    setShowViewArriveLateModal,
    setShowEditArriveLateModal,
    setShowDeleteArriveLateModal,
    setShowViewGoEarlyModal,
    setShowEditGoEarlyModal,
    setShowDeleteGoEarlyModal,
    setShowViewNotAbsentModal,
    setShowEditNotAbsentModal,
    setShowDeleteNotAbsentModal,
    setShowViewAlphaModal,
    setShowEditAlphaModal,
    setShowDeleteAlphaModal,
    setShowViewSickModal,
    setShowEditSickModal,
    setShowDeleteSickModal,
    setShowViewPermissionModal,
    setShowEditPermissionModal,
    setShowDeletePermissionModal,
    setShowViewLeaveModal,
    setShowEditLeaveModal,
    setShowDeleteLeaveModal,
    setShowViewHolidayModal,
    setShowEditHolidayModal,
    setShowDeleteHolidayModal,
}) {
    const dispatch = useDispatch()
    const selectedPresenceButton = useSelector(
        (state) => state.presence.presence.selectedPresenceButton
    )

    const buttons = [
        {
            title: 'H',
            icon: 'heroicons-outline:home',
            content: 'Hadir',
        },
        {
            title: 'HT',
            icon: 'heroicons-outline:user',
            content: 'Hadir Terlambat',
        },
        {
            title: 'PC',
            icon: 'heroicons-outline:user',
            content: 'Pulang Cepat',
        },
        {
            title: 'TP',
            icon: 'heroicons-outline:user',
            content: 'Tidak Absen Pulang',
        },
        {
            title: 'A',
            icon: 'heroicons-outline:user',
            content: 'Alpha',
        },
        {
            title: 'S',
            icon: 'heroicons-outline:user',
            content: 'Sakit',
        },
        {
            title: 'I',
            icon: 'heroicons-outline:user',
            content: 'Izin',
        },
        {
            title: 'C',
            icon: 'heroicons-outline:user',
            content: 'Cuti',
        },
        {
            title: 'L',
            icon: 'heroicons-outline:user',
            content: 'Libur',
        },
    ]

    return (
        <>
            <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full align-middle">
                    <div className="px-6">
                        <Tab.Group>
                            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse flex mb-5">
                                {buttons.map((item, i) => (
                                    <Tab key={i}>
                                        {({ selected }) => (
                                            <Tooltip
                                                content={item.content}
                                                position="bottom"
                                                trigger="mouseenter"
                                                animation="fade"
                                            >
                                                <button
                                                    className={`text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
                                            
                                                    ${
                                                        selected
                                                            ? 'text-white bg-primary-500 '
                                                            : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                    }`}
                                                    onClick={() =>
                                                        dispatch(
                                                            setSelectedPresenceButton(
                                                                item.title
                                                            )
                                                        )
                                                    }
                                                >
                                                    {item.title}
                                                </button>
                                            </Tooltip>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                {buttons.map((item, i) => (
                                    <Tab.Panel key={i}>
                                        {selectedPresenceButton === 'H' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <PresentTable
                                                    presentData={presentData}
                                                    setShowViewPresentModal={
                                                        setShowViewPresentModal
                                                    }
                                                    setShowEditPresentModal={
                                                        setShowEditPresentModal
                                                    }
                                                    setShowDeletePresentModal={
                                                        setShowDeletePresentModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'HT' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <ArrivingLate
                                                    arrivingLateData={
                                                        arrivingLateData
                                                    }
                                                    setShowViewArrivingLateModal={
                                                        setShowViewArriveLateModal
                                                    }
                                                    setShowEditArrivingLateModal={
                                                        setShowEditArriveLateModal
                                                    }
                                                    setShowDeleteArrivingLateModal={
                                                        setShowDeleteArriveLateModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'PC' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <GoHomeEarly
                                                    goEarlyData={goEarlyData}
                                                    setShowViewGoHomeEarlyModal={
                                                        setShowViewGoEarlyModal
                                                    }
                                                    setShowEditGoHomeEarlyModal={
                                                        setShowEditGoEarlyModal
                                                    }
                                                    setShowDeleteGoHomeEarlyModal={
                                                        setShowDeleteGoEarlyModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'TP' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <NotAbsentFromHome
                                                    notAbsentFromHomeData={
                                                        notAbsentFromHomeData
                                                    }
                                                    setShowViewNotAbsentFromHomeModal={
                                                        setShowViewNotAbsentModal
                                                    }
                                                    setShowEditNotAbsentFromHomeModal={
                                                        setShowEditNotAbsentModal
                                                    }
                                                    setShowDeleteNotAbsentFromHomeModal={
                                                        setShowDeleteNotAbsentModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'A' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <AlphaTable
                                                    alphaData={alphaData}
                                                    setShowViewAlphaModal={
                                                        setShowViewAlphaModal
                                                    }
                                                    setShowEditAlphaModal={
                                                        setShowEditAlphaModal
                                                    }
                                                    setShowDeleteAlphaModal={
                                                        setShowDeleteAlphaModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'S' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <SickTable
                                                    sickData={sickData}
                                                    setShowViewSickModal={
                                                        setShowViewSickModal
                                                    }
                                                    setShowEditSickModal={
                                                        setShowEditSickModal
                                                    }
                                                    setShowDeleteSickModal={
                                                        setShowDeleteSickModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'I' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <PermissionTable
                                                    permissionData={
                                                        permissionData
                                                    }
                                                    setShowViewPermissionModal={
                                                        setShowViewPermissionModal
                                                    }
                                                    setShowEditPermissionModal={
                                                        setShowEditPermissionModal
                                                    }
                                                    setShowDeletePermissionModal={
                                                        setShowDeletePermissionModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'C' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <LeaveTypeTable
                                                    leaveData={leaveData}
                                                    setShowViewLeaveModal={
                                                        setShowViewLeaveModal
                                                    }
                                                    setShowEditLeaveModal={
                                                        setShowEditLeaveModal
                                                    }
                                                    setShowDeleteLeaveModal={
                                                        setShowDeleteLeaveModal
                                                    }
                                                />
                                            </div>
                                        )}
                                        {selectedPresenceButton === 'L' && (
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <HolidayTable
                                                    holidayData={holidayData}
                                                    setShowViewHolidayModal={
                                                        setShowViewHolidayModal
                                                    }
                                                    setShowEditHolidayModal={
                                                        setShowEditHolidayModal
                                                    }
                                                    setShowDeleteHolidayModal={
                                                        setShowDeleteHolidayModal
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </>
    )
}
