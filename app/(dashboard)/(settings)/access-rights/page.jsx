'use client'
import http from '@/app/helpers/http.helper'
import TabelHakAkses from '@/components/(settings)/access-rights/access-rights-table/page'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { setLoading } from '@/store/loadingReducer'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { toast } from 'react-toastify'

export default function HakAkses() {
    const [permission, setPermission] = useState('')
    const [permissionOptions, setPermissionOptions] = useState([])
    const [permissions, setPermissions] = useState({
        employee_data_all: false,
        employee_data_create: false,
        employee_data_read: false,
        employee_data_update: false,
        employee_data_delete: false,
        employee_records_data_all: false,
        employee_records_data_create: false,
        employee_records_data_read: false,
        employee_records_data_update: false,
        employee_records_data_delete: false,
        schedule_data_all: false,
        schedule_data_create: false,
        schedule_data_read: false,
        schedule_data_update: false,
        schedule_data_delete: false,
        presence_all: false,
        presence_create: false,
        presence_read: false,
        presence_update: false,
        presence_delete: false,
        overtime_all: false,
        overtime_create: false,
        overtime_read: false,
        overtime_update: false,
        overtime_delete: false,
        leave_type_all: false,
        leave_type_create: false,
        leave_type_read: false,
        leave_type_update: false,
        leave_type_delete: false,
        requests_all: false,
        requests_create: false,
        requests_read: false,
        requests_update: false,
        requests_delete: false,
        tasks_all: false,
        tasks_create: false,
        tasks_read: false,
        tasks_update: false,
        tasks_delete: false,
        activity_all: false,
        activity_create: false,
        activity_read: false,
        activity_update: false,
        activity_delete: false,
        kpi_all: false,
        kpi_create: false,
        kpi_read: false,
        kpi_update: false,
        kpi_delete: false,
        mutation_all: false,
        mutation_create: false,
        mutation_read: false,
        mutation_update: false,
        mutation_delete: false,
        inventory_all: false,
        inventory_create: false,
        inventory_read: false,
        inventory_update: false,
        inventory_delete: false,
        contract_all: false,
        contract_create: false,
        contract_read: false,
        contract_update: false,
        contract_delete: false,
        guarantee_all: false,
        guarantee_create: false,
        guarantee_read: false,
        guarantee_update: false,
        guarantee_delete: false,
        announcement_all: false,
        announcement_create: false,
        announcement_read: false,
        announcement_update: false,
        announcement_delete: false,
        ticket_all: false,
        ticket_create: false,
        ticket_read: false,
        ticket_update: false,
        ticket_delete: false,
        make_salary_all: false,
        make_salary_create: false,
        make_salary_read: false,
        make_salary_update: false,
        make_salary_delete: false,
        salary_data_all: false,
        salary_data_create: false,
        salary_data_read: false,
        salary_data_update: false,
        salary_data_delete: false,
        salary_report_all: false,
        salary_report_create: false,
        salary_report_read: false,
        salary_report_update: false,
        salary_report_delete: false,
        loan_all: false,
        loan_create: false,
        loan_read: false,
        loan_update: false,
        loan_delete: false,
        cost_all: false,
        cost_create: false,
        cost_read: false,
        cost_update: false,
        cost_delete: false,
        document_all: false,
        document_create: false,
        document_read: false,
        document_update: false,
        document_delete: false,
        events_all: false,
        events_create: false,
        events_read: false,
        events_update: false,
        events_delete: false,
        company_all: false,
        company_create: false,
        company_read: false,
        company_update: false,
        company_delete: false,
        master_data_all: false,
        master_data_create: false,
        master_data_read: false,
        master_data_update: false,
        master_data_delete: false,
        permission_name_all: false,
        permission_name_create: false,
        permission_name_read: false,
        permission_name_update: false,
        permission_name_delete: false,
    })

    const formValidationSchema = yup.object({
        permission_name: yup.string().required('Harap diisi'),
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formValidationSchema),
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const dispatch = useDispatch()

    const token = getCookie('token')

    const postPermission = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                ...values,
                permissions: JSON.stringify([permissions]),
            })
            return http(token).post(`/permissions`, data)
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] })
            dispatch(setLoading(false))
            data?.data?.message === 'Update permission successfully'
                ? toast.success('Berhasil mengupdate hak akses')
                : toast.success('Berhasil menambah hak akses')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        postPermission.mutate(data)
        dispatch(setLoading(false))
    }
    const handleChangePermission = (e) => {
        setPermission(e.target.value)
    }

    const handleSavePermission = () => {
        setPermissions({})
        if (permission.trim() !== '') {
            const newOption = { value: permission, label: permission }
            setPermissionOptions([...permissionOptions, newOption])
            setPermission('')
        }
    }

    const handleDeletePermission = async (index) => {
        const updatedOptions = [...permissionOptions]
        updatedOptions.splice(index, 1)
        const { data: permissionData } = await http(token).get(
            `/permissions/${permissionOptions[0].value}`
        )
        if (permissionData?.results) {
            await http(token).delete(
                `/permissions/${permissionOptions[0].value}`
            )
        }
        setPermissionOptions(updatedOptions)
        setPermissions({})
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    async function fetchPermissions() {
        const { data } = await http(token).get('/permissions')
        setPermissionOptions(
            data.results.data.map((item) => ({
                value: item.permission_name,
                label: item.permission_name,
            }))
        )
        return data.results
    }

    useEffect(() => {
        fetchPermissions()
    }, [])

    const permissionData = watch('permission_name')

    useEffect(() => {
        if (permissionData) {
            async function fetchPermissionByName() {
                const { data } = await http(token).get(
                    `/permissions/${permissionData}`
                )
                if (data?.results?.permissions) {
                    setPermissions(data.results.permissions[0])
                }
            }
            fetchPermissionByName()
        }
    }, [permissionData])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-xl font-bold">Hak Akses Pengguna</div>

            <div className="flex flex-wrap xl:flex-nowrap w-full gap-10 mt-10">
                <div className="w-full flex gap-3">
                    <div className="w-full flex gap-5">
                        <div>
                            <Textinput
                                label="Role Pengguna"
                                id="pn"
                                type="text"
                                placeholder="Role Pengguna"
                                className="max-w-xl"
                                value={permission}
                                onChange={handleChangePermission}
                            />
                        </div>
                        <div className="mt-8">
                            <div className="flex gap-2">
                                <div>
                                    <Button
                                        text="Hapus"
                                        className="bg-red-500 btn-sm text-white"
                                        onClick={handleDeletePermission}
                                    ></Button>
                                </div>
                                <div>
                                    <Button
                                        text="Simpan"
                                        className="btn-primary btn-sm"
                                        onClick={handleSavePermission}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="guarantee_name"
                                className="form-label "
                            >
                                Silahkan Pilih Hak Akses
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="permission_name"
                                error={errors.permission_name}
                                options={[
                                    ...(permissionOptions?.map((item) => ({
                                        value: item.value,
                                        label: item.label,
                                    })) || []),
                                ]}
                                styles={styles}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-xl font-bold">
                <TabelHakAkses
                    employeeDataCreate={permissions.employee_data_create}
                    employeeDataRead={permissions.employee_data_read}
                    employeeDataUpdate={permissions.employee_data_update}
                    employeeDataDelete={permissions.employee_data_delete}
                    employeeRecordsCreate={
                        permissions.employee_records_data_create
                    }
                    employeeRecordsRead={permissions.employee_records_data_read}
                    employeeRecordsUpdate={
                        permissions.employee_records_data_update
                    }
                    employeeRecordsDelete={
                        permissions.employee_records_data_delete
                    }
                    scheduleCreate={permissions.schedule_data_create}
                    scheduleRead={permissions.schedule_data_read}
                    scheduleUpdate={permissions.schedule_data_update}
                    scheduleDelete={permissions.schedule_data_delete}
                    presenceCreate={permissions.presence_create}
                    presenceRead={permissions.presence_read}
                    presenceUpdate={permissions.presence_update}
                    presenceDelete={permissions.presence_delete}
                    overtimeCreate={permissions.overtime_create}
                    overtimeRead={permissions.overtime_read}
                    overtimeUpdate={permissions.overtime_update}
                    overtimeDelete={permissions.overtime_delete}
                    leaveTypeCreate={permissions.leave_type_create}
                    leaveTypeRead={permissions.leave_type_read}
                    leaveTypeUpdate={permissions.leave_type_update}
                    leaveTypeDelete={permissions.leave_type_delete}
                    requestsCreate={permissions.requests_create}
                    requestsRead={permissions.requests_read}
                    requestsUpdate={permissions.requests_update}
                    requestsDelete={permissions.requests_delete}
                    tasksCreate={permissions.tasks_create}
                    tasksRead={permissions.tasks_read}
                    tasksUpdate={permissions.tasks_update}
                    tasksDelete={permissions.tasks_delete}
                    activityCreate={permissions.activity_create}
                    activityRead={permissions.activity_read}
                    activityUpdate={permissions.activity_update}
                    activityDelete={permissions.activity_delete}
                    kpiCreate={permissions.kpi_create}
                    kpiRead={permissions.kpi_read}
                    kpiUpdate={permissions.kpi_update}
                    kpiDelete={permissions.kpi_delete}
                    mutationCreate={permissions.mutation_create}
                    mutationRead={permissions.mutation_read}
                    mutationUpdate={permissions.mutation_update}
                    mutationDelete={permissions.mutation_delete}
                    inventoryCreate={permissions.inventory_create}
                    inventoryRead={permissions.inventory_read}
                    inventoryUpdate={permissions.inventory_update}
                    inventoryDelete={permissions.inventory_delete}
                    contractCreate={permissions.contract_create}
                    contractRead={permissions.contract_read}
                    contractUpdate={permissions.contract_update}
                    contractDelete={permissions.contract_delete}
                    guaranteeCreate={permissions.guarantee_create}
                    guaranteeRead={permissions.guarantee_read}
                    guaranteeUpdate={permissions.guarantee_update}
                    guaranteeDelete={permissions.guarantee_delete}
                    announcementCreate={permissions.announcement_create}
                    announcementRead={permissions.announcement_read}
                    announcementUpdate={permissions.announcement_update}
                    announcementDelete={permissions.announcement_delete}
                    ticketCreate={permissions.ticket_create}
                    ticketRead={permissions.ticket_read}
                    ticketUpdate={permissions.ticket_update}
                    ticketDelete={permissions.ticket_delete}
                    makeSalaryCreate={permissions.make_salary_create}
                    makeSalaryRead={permissions.make_salary_read}
                    makeSalaryUpdate={permissions.make_salary_update}
                    makeSalaryDelete={permissions.make_salary_delete}
                    salaryDataCreate={permissions.salary_data_create}
                    salaryDataRead={permissions.salary_data_read}
                    salaryDataUpdate={permissions.salary_data_update}
                    salaryDataDelete={permissions.salary_data_delete}
                    salaryReportCreate={permissions.salary_report_create}
                    salaryReportRead={permissions.salary_report_read}
                    salaryReportUpdate={permissions.salary_report_update}
                    salaryReportDelete={permissions.salary_report_delete}
                    loanCreate={permissions.loan_create}
                    loanRead={permissions.loan_read}
                    loanUpdate={permissions.loan_update}
                    loanDelete={permissions.loan_delete}
                    costCreate={permissions.cost_create}
                    costRead={permissions.cost_read}
                    costUpdate={permissions.cost_update}
                    costDelete={permissions.cost_delete}
                    documentCreate={permissions.document_create}
                    documentRead={permissions.document_read}
                    documentUpdate={permissions.document_update}
                    documentDelete={permissions.document_delete}
                    eventsCreate={permissions.events_create}
                    eventsRead={permissions.events_read}
                    eventsUpdate={permissions.events_update}
                    eventsDelete={permissions.events_delete}
                    companyCreate={permissions.company_create}
                    companyRead={permissions.company_read}
                    companyUpdate={permissions.company_update}
                    companyDelete={permissions.company_delete}
                    masterDataCreate={permissions.master_data_create}
                    masterDataRead={permissions.master_data_read}
                    masterDataUpdate={permissions.master_data_update}
                    masterDataDelete={permissions.master_data_delete}
                    permissionNameCreate={permissions.permission_name_create}
                    permissionNameRead={permissions.permission_name_read}
                    permissionNameUpdate={permissions.permission_name_update}
                    permissionNameDelete={permissions.permission_name_delete}
                    permissions={permissions}
                    setPermissions={setPermissions}
                    employeeDataAll={permissions.employee_data_all}
                    employeeRecordsDataAll={
                        permissions.employee_records_data_all
                    }
                    scheduleDataAll={permissions.schedule_data_all}
                    presenceDataAll={permissions.presence_all}
                    overtimeDataAll={permissions.overtime_all}
                    leaveTypeDataAll={permissions.leave_type_all}
                    requestsDataAll={permissions.requests_all}
                    tasksDataAll={permissions.tasks_all}
                    activityDataAll={permissions.activity_all}
                    kpiDataAll={permissions.kpi_all}
                    mutationDataAll={permissions.mutation_all}
                    inventoryDataAll={permissions.inventory_all}
                    contractDataAll={permissions.contract_all}
                    guaranteeDataAll={permissions.guarantee_all}
                    announcementDataAll={permissions.announcement_all}
                    ticketDataAll={permissions.ticket_all}
                    makeSalaryDataAll={permissions.make_salary_all}
                    salaryDataAll={permissions.salary_data_all}
                    salaryReportDataAll={permissions.salary_report_all}
                    loanDataAll={permissions.loan_all}
                    costDataAll={permissions.cost_all}
                    documentDataAll={permissions.document_all}
                    eventsDataAll={permissions.events_all}
                    companyDataAll={permissions.company_all}
                    masterDataAll={permissions.master_data_all}
                    permissionNameDataAll={permissions.permission_name_all}
                />
            </div>

            <div className="flex w-full gap-5 justify-end mt-10">
                <Button type="submit" className="btn btn-success">
                    Simpan
                </Button>
            </div>
        </form>
    )
}
