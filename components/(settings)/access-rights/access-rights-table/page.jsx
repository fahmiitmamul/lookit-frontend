import Checkbox from '@/components/ui/Checkbox'
import SimpleBar from 'simplebar-react'

export default function TabelHakAkses({
    employeeDataCreate,
    employeeDataRead,
    employeeDataUpdate,
    employeeDataDelete,
    employeeRecordsCreate,
    employeeRecordsRead,
    employeeRecordsUpdate,
    employeeRecordsDelete,
    scheduleCreate,
    scheduleRead,
    scheduleUpdate,
    scheduleDelete,
    presenceCreate,
    presenceRead,
    presenceUpdate,
    presenceDelete,
    overtimeCreate,
    overtimeRead,
    overtimeUpdate,
    overtimeDelete,
    leaveTypeCreate,
    leaveTypeRead,
    leaveTypeUpdate,
    leaveTypeDelete,
    requestsCreate,
    requestsRead,
    requestsUpdate,
    requestsDelete,
    tasksCreate,
    tasksRead,
    tasksUpdate,
    tasksDelete,
    activityCreate,
    activityRead,
    activityUpdate,
    activityDelete,
    kpiCreate,
    kpiRead,
    kpiUpdate,
    kpiDelete,
    mutationCreate,
    mutationRead,
    mutationUpdate,
    mutationDelete,
    inventoryCreate,
    inventoryRead,
    inventoryUpdate,
    inventoryDelete,
    contractCreate,
    contractRead,
    contractUpdate,
    contractDelete,
    guaranteeCreate,
    guaranteeRead,
    guaranteeUpdate,
    guaranteeDelete,
    announcementCreate,
    announcementRead,
    announcementUpdate,
    announcementDelete,
    ticketCreate,
    ticketRead,
    ticketUpdate,
    ticketDelete,
    makeSalaryCreate,
    makeSalaryRead,
    makeSalaryUpdate,
    makeSalaryDelete,
    salaryDataCreate,
    salaryDataRead,
    salaryDataUpdate,
    salaryDataDelete,
    salaryReportCreate,
    salaryReportRead,
    salaryReportUpdate,
    salaryReportDelete,
    loanCreate,
    loanRead,
    loanUpdate,
    loanDelete,
    costCreate,
    costRead,
    costUpdate,
    costDelete,
    documentCreate,
    documentRead,
    documentUpdate,
    documentDelete,
    eventsCreate,
    eventsRead,
    eventsUpdate,
    eventsDelete,
    companyCreate,
    companyRead,
    companyUpdate,
    companyDelete,
    masterDataCreate,
    masterDataRead,
    masterDataUpdate,
    masterDataDelete,
    permissionNameCreate,
    permissionNameRead,
    permissionNameUpdate,
    permissionNameDelete,
    permissions,
    setPermissions,
    employeeDataAll,
    employeeRecordsDataAll,
    scheduleDataAll,
    presenceDataAll,
    overtimeDataAll,
    leaveTypeDataAll,
    requestsDataAll,
    tasksDataAll,
    activityDataAll,
    kpiDataAll,
    mutationDataAll,
    inventoryDataAll,
    contractDataAll,
    guaranteeDataAll,
    announcementDataAll,
    ticketDataAll,
    makeSalaryDataAll,
    salaryDataAll,
    salaryReportDataAll,
    loanDataAll,
    costDataAll,
    documentDataAll,
    eventsDataAll,
    companyDataAll,
    masterDataAll,
    permissionNameDataAll,
}) {
    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Modul',
            field: 'modul',
        },

        {
            label: 'All',
            field: 'all',
        },

        {
            label: 'Create',
            field: 'create',
        },

        {
            label: 'Read',
            field: 'read',
        },

        {
            label: 'Update',
            field: 'update',
        },

        {
            label: 'Delete',
            field: 'delete',
        },
    ]

    return (
        <>
            <div className="m-6">
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
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">1</td>
                                            <td className="table-td w-full">
                                                Data Karyawan
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_data_all:
                                                                !permissions.employee_data_all,
                                                            employee_data_create:
                                                                !permissions.employee_data_create,
                                                            employee_data_read:
                                                                !permissions.employee_data_read,
                                                            employee_data_update:
                                                                !permissions.employee_data_update,
                                                            employee_data_delete:
                                                                !permissions.employee_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeDataCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_data_create:
                                                                !permissions.employee_data_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeDataRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_data_read:
                                                                !permissions.employee_data_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeDataUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_data_update:
                                                                !permissions.employee_data_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeDataDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_data_delete:
                                                                !permissions.employee_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">2</td>
                                            <td className="table-td w-full">
                                                Rekam Karyawan
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={
                                                        employeeRecordsDataAll
                                                    }
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_records_data_all:
                                                                !permissions.employee_records_data_all,
                                                            employee_records_data_create:
                                                                !permissions.employee_records_data_create,
                                                            employee_records_data_read:
                                                                !permissions.employee_records_data_read,
                                                            employee_records_data_update:
                                                                !permissions.employee_records_data_update,
                                                            employee_records_data_delete:
                                                                !permissions.employee_records_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={
                                                        employeeRecordsCreate
                                                    }
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_records_data_create:
                                                                !permissions.employee_records_data_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={employeeRecordsRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_records_data_read:
                                                                !permissions.employee_records_data_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={
                                                        employeeRecordsUpdate
                                                    }
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_records_data_update:
                                                                !permissions.employee_records_data_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={
                                                        employeeRecordsDelete
                                                    }
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            employee_records_data_delete:
                                                                !permissions.employee_records_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">3</td>
                                            <td className="table-td w-[300px]">
                                                Jadwal
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={scheduleDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            schedule_data_all:
                                                                !permissions.schedule_data_all,
                                                            schedule_data_create:
                                                                !permissions.schedule_data_create,
                                                            schedule_data_read:
                                                                !permissions.schedule_data_read,
                                                            schedule_data_update:
                                                                !permissions.schedule_data_update,
                                                            schedule_data_delete:
                                                                !permissions.schedule_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={scheduleCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            schedule_data_create:
                                                                !permissions.schedule_data_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={scheduleRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            schedule_data_read:
                                                                !permissions.schedule_data_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={scheduleUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            schedule_data_update:
                                                                !permissions.schedule_data_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={scheduleDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            schedule_data_delete:
                                                                !permissions.schedule_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">4</td>
                                            <td className="table-td w-[300px]">
                                                Kehadiran
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={presenceDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            presence_all:
                                                                !permissions.presence_all,
                                                            presence_create:
                                                                !permissions.presence_create,
                                                            presence_read:
                                                                !permissions.presence_read,
                                                            presence_update:
                                                                !permissions.presence_update,
                                                            presence_delete:
                                                                !permissions.presence_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={presenceCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            presence_create:
                                                                !permissions.presence_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={presenceRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            presence_read:
                                                                !permissions.presence_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={presenceUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            presence_update:
                                                                !permissions.presence_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={presenceDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            presence_delete:
                                                                !permissions.presence_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">5</td>
                                            <td className="table-td w-[300px]">
                                                Lembur
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={overtimeDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            overtime_all:
                                                                !permissions.overtime_all,
                                                            overtime_create:
                                                                !permissions.overtime_create,
                                                            overtime_read:
                                                                !permissions.overtime_read,
                                                            overtime_update:
                                                                !permissions.overtime_update,
                                                            overtime_delete:
                                                                !permissions.overtime_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={overtimeCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            overtime_create:
                                                                !permissions.overtime_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={overtimeRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            overtime_read:
                                                                !permissions.overtime_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={overtimeUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            overtime_update:
                                                                !permissions.overtime_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={overtimeDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            overtime_delete:
                                                                !permissions.overtime_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">6</td>
                                            <td className="table-td w-[300px]">
                                                Saldo Cuti
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={leaveTypeDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            leave_type_all:
                                                                !permissions.leave_type_all,
                                                            leave_type_create:
                                                                !permissions.leave_type_create,
                                                            leave_type_read:
                                                                !permissions.leave_type_read,
                                                            leave_type_update:
                                                                !permissions.leave_type_update,
                                                            leave_type_delete:
                                                                !permissions.leave_type_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={leaveTypeCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            leave_type_create:
                                                                !permissions.leave_type_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={leaveTypeRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            leave_type_read:
                                                                !permissions.leave_type_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={leaveTypeUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            leave_type_update:
                                                                !permissions.leave_type_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={leaveTypeDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            leave_type_delete:
                                                                !permissions.leave_type_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">7</td>
                                            <td className="table-td w-[300px]">
                                                Permintaan
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={requestsDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            requests_all:
                                                                !permissions.requests_all,
                                                            requests_create:
                                                                !permissions.requests_create,
                                                            requests_read:
                                                                !permissions.requests_read,
                                                            requests_update:
                                                                !permissions.requests_update,
                                                            requests_delete:
                                                                !permissions.requests_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={requestsCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            requests_create:
                                                                !permissions.requests_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={requestsRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            requests_read:
                                                                !permissions.requests_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={requestsUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            requests_update:
                                                                !permissions.requests_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={requestsDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            requests_delete:
                                                                !permissions.requests_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">8</td>
                                            <td className="table-td w-[300px]">
                                                Tugas
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={tasksDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            tasks_all:
                                                                !permissions.tasks_all,
                                                            tasks_create:
                                                                !permissions.tasks_create,
                                                            tasks_read:
                                                                !permissions.tasks_read,
                                                            tasks_update:
                                                                !permissions.tasks_update,
                                                            tasks_delete:
                                                                !permissions.tasks_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={tasksCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            tasks_create:
                                                                !permissions.tasks_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={tasksRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            tasks_read:
                                                                !permissions.tasks_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={tasksUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            tasks_update:
                                                                !permissions.tasks_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={tasksDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            tasks_delete:
                                                                !permissions.tasks_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">9</td>
                                            <td className="table-td w-[300px]">
                                                Aktivitas
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={activityDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            activity_all:
                                                                !permissions.activity_all,
                                                            activity_create:
                                                                !permissions.activity_create,
                                                            activity_read:
                                                                !permissions.activity_read,
                                                            activity_update:
                                                                !permissions.activity_update,
                                                            activity_delete:
                                                                !permissions.activity_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={activityCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            activity_create:
                                                                !permissions.activity_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={activityRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            activity_read:
                                                                !permissions.activity_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={activityUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            activity_update:
                                                                !permissions.activity_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={activityDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            activity_delete:
                                                                !permissions.activity_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">10</td>
                                            <td className="table-td w-[300px]">
                                                KPI
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={kpiDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            kpi_all:
                                                                !permissions.kpi_all,
                                                            kpi_create:
                                                                !permissions.kpi_create,
                                                            kpi_read:
                                                                !permissions.kpi_read,
                                                            kpi_update:
                                                                !permissions.kpi_update,
                                                            kpi_delete:
                                                                !permissions.kpi_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={kpiCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            kpi_create:
                                                                !permissions.kpi_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={kpiRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            kpi_read:
                                                                !permissions.kpi_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={kpiUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            kpi_update:
                                                                !permissions.kpi_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={kpiDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            kpi_delete:
                                                                !permissions.kpi_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">11</td>
                                            <td className="table-td w-[300px]">
                                                Mutasi
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={mutationDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            mutation_all:
                                                                !permissions.mutation_all,
                                                            mutation_create:
                                                                !permissions.mutation_create,
                                                            mutation_read:
                                                                !permissions.mutation_read,
                                                            mutation_update:
                                                                !permissions.mutation_update,
                                                            mutation_delete:
                                                                !permissions.mutation_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={mutationCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            mutation_create:
                                                                !permissions.mutation_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={mutationRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            mutation_read:
                                                                !permissions.mutation_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={mutationUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            mutation_update:
                                                                !permissions.mutation_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={mutationDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            mutation_delete:
                                                                !permissions.mutation_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">12</td>
                                            <td className="table-td w-[300px]">
                                                Inventaris
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={inventoryDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            inventory_all:
                                                                !permissions.inventory_all,
                                                            inventory_create:
                                                                !permissions.inventory_create,
                                                            inventory_read:
                                                                !permissions.inventory_read,
                                                            inventory_update:
                                                                !permissions.inventory_update,
                                                            inventory_delete:
                                                                !permissions.inventory_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={inventoryCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            inventory_create:
                                                                !permissions.inventory_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={inventoryRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            inventory_read:
                                                                !permissions.inventory_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={inventoryUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            inventory_update:
                                                                !permissions.inventory_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={inventoryDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            inventory_delete:
                                                                !permissions.inventory_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">13</td>
                                            <td className="table-td w-[300px]">
                                                Kontrak
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={contractDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            contract_all:
                                                                !permissions.contract_all,
                                                            contract_create:
                                                                !permissions.contract_create,
                                                            contract_read:
                                                                !permissions.contract_read,
                                                            contract_update:
                                                                !permissions.contract_update,
                                                            contract_delete:
                                                                !permissions.contract_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={contractCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            contract_create:
                                                                !permissions.contract_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={contractRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            contract_read:
                                                                !permissions.contract_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={contractUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            contract_update:
                                                                !permissions.contract_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={contractDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            contract_delete:
                                                                !permissions.contract_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">14</td>
                                            <td className="table-td w-[300px]">
                                                Garansi
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={guaranteeDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            guarantee_all:
                                                                !permissions.guarantee_all,
                                                            guarantee_create:
                                                                !permissions.guarantee_create,
                                                            guarantee_read:
                                                                !permissions.guarantee_read,
                                                            guarantee_update:
                                                                !permissions.guarantee_update,
                                                            guarantee_delete:
                                                                !permissions.guarantee_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={guaranteeCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            guarantee_create:
                                                                !permissions.guarantee_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={guaranteeRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            guarantee_read:
                                                                !permissions.guarantee_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={guaranteeUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            guarantee_update:
                                                                !permissions.guarantee_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={guaranteeDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            guarantee_delete:
                                                                !permissions.guarantee_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">15</td>
                                            <td className="table-td w-[300px]">
                                                Pengumuman
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={announcementDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            announcement_all:
                                                                !permissions.announcement_all,
                                                            announcement_create:
                                                                !permissions.announcement_create,
                                                            announcement_read:
                                                                !permissions.announcement_read,
                                                            announcement_update:
                                                                !permissions.announcement_update,
                                                            announcement_delete:
                                                                !permissions.announcement_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={announcementCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            announcement_create:
                                                                !permissions.announcement_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={announcementRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            announcement_read:
                                                                !permissions.announcement_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={announcementUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            announcement_update:
                                                                !permissions.announcement_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={announcementDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            announcement_delete:
                                                                !permissions.announcement_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">16</td>
                                            <td className="table-td w-[300px]">
                                                Tiket
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={ticketDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            ticket_all:
                                                                !permissions.ticket_all,
                                                            ticket_create:
                                                                !permissions.ticket_create,
                                                            ticket_read:
                                                                !permissions.ticket_read,
                                                            ticket_update:
                                                                !permissions.ticket_update,
                                                            ticket_delete:
                                                                !permissions.ticket_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={ticketCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            ticket_create:
                                                                !permissions.ticket_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={ticketRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            ticket_read:
                                                                !permissions.ticket_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={ticketUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            ticket_update:
                                                                !permissions.ticket_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={ticketDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            ticket_delete:
                                                                !permissions.ticket_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">17</td>
                                            <td className="table-td w-[300px]">
                                                Buat Gaji
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={makeSalaryDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            make_salary_all:
                                                                !permissions.make_salary_all,
                                                            make_salary_create:
                                                                !permissions.make_salary_create,
                                                            make_salary_read:
                                                                !permissions.make_salary_read,
                                                            make_salary_update:
                                                                !permissions.make_salary_update,
                                                            make_salary_delete:
                                                                !permissions.make_salary_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={makeSalaryCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            make_salary_create:
                                                                !permissions.make_salary_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={makeSalaryRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            make_salary_read:
                                                                !permissions.make_salary_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={makeSalaryUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            make_salary_update:
                                                                !permissions.make_salary_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={makeSalaryDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            make_salary_delete:
                                                                !permissions.make_salary_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">18</td>
                                            <td className="table-td w-[300px]">
                                                Data Gaji
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_data_all:
                                                                !permissions.salary_data_all,
                                                            salary_data_create:
                                                                !permissions.salary_data_create,
                                                            salary_data_read:
                                                                !permissions.salary_data_read,
                                                            salary_data_update:
                                                                !permissions.salary_data_update,
                                                            salary_data_delete:
                                                                !permissions.salary_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryDataCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_data_create:
                                                                !permissions.salary_data_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryDataRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_data_read:
                                                                !permissions.salary_data_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryDataUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_data_update:
                                                                !permissions.salary_data_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryDataDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_data_delete:
                                                                !permissions.salary_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">19</td>
                                            <td className="table-td w-[300px]">
                                                Laporan
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryReportDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_report_all:
                                                                !permissions.salary_report_all,
                                                            salary_report_create:
                                                                !permissions.salary_report_create,
                                                            salary_report_read:
                                                                !permissions.salary_report_read,
                                                            salary_report_update:
                                                                !permissions.salary_report_update,
                                                            salary_report_delete:
                                                                !permissions.salary_report_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryReportCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_report_create:
                                                                !permissions.salary_report_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryReportRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_report_read:
                                                                !permissions.salary_report_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryReportUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_report_update:
                                                                !permissions.salary_report_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={salaryReportDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            salary_report_delete:
                                                                !permissions.salary_report_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">20</td>
                                            <td className="table-td w-[300px]">
                                                Pinjaman
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={loanDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            loan_all:
                                                                !permissions.loan_all,
                                                            loan_create:
                                                                !permissions.loan_create,
                                                            loan_read:
                                                                !permissions.loan_read,
                                                            loan_update:
                                                                !permissions.loan_update,
                                                            loan_delete:
                                                                !permissions.loan_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={loanCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            loan_create:
                                                                !permissions.loan_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={loanRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            loan_read:
                                                                !permissions.loan_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={loanUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            loan_update:
                                                                !permissions.loan_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={loanDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            loan_delete:
                                                                !permissions.loan_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">21</td>
                                            <td className="table-td w-[300px]">
                                                Biaya
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={costDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            cost_all:
                                                                !permissions.cost_all,
                                                            cost_create:
                                                                !permissions.cost_create,
                                                            cost_read:
                                                                !permissions.cost_read,
                                                            cost_update:
                                                                !permissions.cost_update,
                                                            cost_delete:
                                                                !permissions.cost_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={costCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            cost_create:
                                                                !permissions.cost_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={costRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            cost_read:
                                                                !permissions.cost_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={costUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            cost_update:
                                                                !permissions.cost_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={costDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            cost_delete:
                                                                !permissions.cost_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">22</td>
                                            <td className="table-td w-[300px]">
                                                Dokumen
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={documentDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            document_all:
                                                                !permissions.document_all,
                                                            document_create:
                                                                !permissions.document_create,
                                                            document_read:
                                                                !permissions.document_read,
                                                            document_update:
                                                                !permissions.document_update,
                                                            document_delete:
                                                                !permissions.document_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={documentCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            document_create:
                                                                !permissions.document_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={documentRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            document_read:
                                                                !permissions.document_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={documentUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            document_update:
                                                                !permissions.document_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={documentDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            document_delete:
                                                                !permissions.document_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">23</td>
                                            <td className="table-td w-[300px]">
                                                Acara
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={eventsDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            events_all:
                                                                !permissions.events_all,
                                                            events_create:
                                                                !permissions.events_create,
                                                            events_read:
                                                                !permissions.events_read,
                                                            events_update:
                                                                !permissions.events_update,
                                                            events_delete:
                                                                !permissions.events_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={eventsCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            events_create:
                                                                !permissions.events_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={eventsRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            events_read:
                                                                !permissions.events_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={eventsUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            events_update:
                                                                !permissions.events_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={eventsDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            events_delete:
                                                                !permissions.events_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">24</td>
                                            <td className="table-td w-[300px]">
                                                Perusahaan
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={companyDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            company_all:
                                                                !permissions.company_all,
                                                            company_create:
                                                                !permissions.company_create,
                                                            company_read:
                                                                !permissions.company_read,
                                                            company_update:
                                                                !permissions.company_update,
                                                            company_delete:
                                                                !permissions.company_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={companyCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            company_create:
                                                                !permissions.company_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={companyRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            company_read:
                                                                !permissions.company_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={companyUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            company_update:
                                                                !permissions.company_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={companyDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            company_delete:
                                                                !permissions.company_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">25</td>
                                            <td className="table-td w-[300px]">
                                                Master Data
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={masterDataAll}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            master_data_all:
                                                                !permissions.master_data_all,
                                                            master_data_create:
                                                                !permissions.master_data_create,
                                                            master_data_read:
                                                                !permissions.master_data_read,
                                                            master_data_update:
                                                                !permissions.master_data_update,
                                                            master_data_delete:
                                                                !permissions.master_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={masterDataCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            master_data_create:
                                                                !permissions.master_data_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={masterDataRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            master_data_read:
                                                                !permissions.master_data_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={masterDataUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            master_data_update:
                                                                !permissions.master_data_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={masterDataDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            master_data_delete:
                                                                !permissions.master_data_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">26</td>
                                            <td className="table-td w-[300px]">
                                                Hak Akses
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={
                                                        permissionNameDataAll
                                                    }
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            permission_name_all:
                                                                !permissions.permission_name_all,
                                                            permission_name_create:
                                                                !permissions.permission_name_create,
                                                            permission_name_read:
                                                                !permissions.permission_name_read,
                                                            permission_name_update:
                                                                !permissions.permission_name_update,
                                                            permission_name_delete:
                                                                !permissions.permission_name_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={permissionNameCreate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            permission_name_create:
                                                                !permissions.permission_name_create,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={permissionNameRead}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            permission_name_read:
                                                                !permissions.permission_name_read,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={permissionNameUpdate}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            permission_name_update:
                                                                !permissions.permission_name_update,
                                                        })
                                                    }}
                                                />
                                            </td>
                                            <td className="table-td">
                                                <Checkbox
                                                    value={permissionNameDelete}
                                                    onChange={(e) => {
                                                        setPermissions({
                                                            ...permissions,
                                                            permission_name_delete:
                                                                !permissions.permission_name_delete,
                                                        })
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </>
    )
}
