'use client'
import MainSalaryForm from '@/components/(finance)/make-salary/form-tambah-gaji/page'
import MainSalaryTable from '@/components/(finance)/make-salary/tabel-gaji-pokok/page'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import InputGroup from '@/components/ui/InputGroup'
import Modal from '@/components/ui/Modal'
import Pagination from '@/components/ui/Pagination'
import { Tab } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { useState, Fragment, useEffect } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import AdditionalSalaryTable from '@/components/(finance)/make-salary/tabel-tambahan/page'
import SalaryCutsTable from '@/components/(finance)/make-salary/tabel-potongan/page'
import BpjsTable from '@/components/(finance)/make-salary/tabel-bpjs/page'
import InsuranceTable from '@/components/(finance)/make-salary/tabel-asuransi/page'
import TaxTable from '@/components/(finance)/make-salary/tabel-pajak/page'
import { useDispatch, useSelector } from 'react-redux'
import {
    setInitialState,
    setSelectedMasterGaji,
} from '@/components/(finance)/store'
import { DetailMainSalary } from '@/components/(finance)/make-salary/form-detail-gaji-pokok/page'
import { useForm } from 'react-hook-form'
import { EditMainSalaryModal } from '@/components/(finance)/make-salary/form-edit-gaji-pokok/page'
import Select from '@/components/ui/Select'
import MasterSalaryTambahanTable from '@/components/(finance)/make-salary/tabel-master-gaji-tambahan/page'
import MasterSalaryPotonganTable from '@/components/(finance)/make-salary/tabel-master-gaji-potongan/page'
import MasterGajiTambahanForm from '@/components/(finance)/make-salary/form-tambah-master-gaji-tambahan/page'
import MasterGajiPotonganForm from '@/components/(finance)/make-salary/form-tambah-master-gaji-potongan/page'
import DetailMasterGajiTambahanForm from '@/components/(finance)/make-salary/form-detail-master-gaji-tambahan/page'
import DetailMasterGajiPotonganForm from '@/components/(finance)/make-salary/form-detail-master-gaji-potongan/page'
import EditMasterGajiTambahanForm from '@/components/(finance)/make-salary/form-edit-master-gaji-tambahan/page'
import EditMasterGajiPotonganForm from '@/components/(finance)/make-salary/form-edit-master-gaji-potongan/page'
import HapusMasterGajiTambahanForm from '@/components/(finance)/make-salary/form-hapus-master-gaji-tambahan/page'
import HapusMasterGajiPotonganForm from '@/components/(finance)/make-salary/form-hapus-master-gaji-potongan/page'
import DeleteMainSalaryForm from '@/components/(finance)/make-salary/form-hapus-gaji-pokok/page'
import { DetailAdditionalSalaryModal } from '@/components/(finance)/make-salary/form-detail-tambahan/page'
import { EditAdditionalSalaryModal } from '@/components/(finance)/make-salary/form-edit-tambahan/page'
import DeleteTambahanForm from '@/components/(finance)/make-salary/form-hapus-tambahan/page'
import { DetailSalaryCutsModal } from '@/components/(finance)/make-salary/form-detail-potongan/page'
import { EditSalaryCutsForm } from '@/components/(finance)/make-salary/form-edit-potongan/page'
import DeleteSalaryCutsForm from '@/components/(finance)/make-salary/form-hapus-potongan/page'
import { EditBPJSModal } from '@/components/(finance)/make-salary/form-edit-bpjs/page'
import DeleteBpjsForm from '@/components/(finance)/make-salary/form-hapus-bpjs/page'
import { DetailInsuranceModal } from '@/components/(finance)/make-salary/form-detail-asuransi/page'
import { EditInsuranceModal } from '@/components/(finance)/make-salary/form-edit-asuransi/page'
import DeleteInsuranceForm from '@/components/(finance)/make-salary/form-hapus-asuransi/page'
import { DetailTaxForm } from '@/components/(finance)/make-salary/form-detail-pajak/page'
import { EditTaxForm } from '@/components/(finance)/make-salary/form-edit-pajak/page'
import DeleteTaxForm from '@/components/(finance)/make-salary/form-hapus-pajak/page'
import { DetailBpjsModal } from '@/components/(finance)/make-salary/form-detail-bpjs/page'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function MakeSalary() {
    const [showAddSalaryModal, setShowAddSalaryModal] = useState(false)
    const [showViewMainSalaryModal, setShowViewMainSalaryModal] =
        useState(false)
    const [showEditMainSalaryModal, setShowEditMainSalaryModal] =
        useState(false)
    const [showDeleteMainSalaryModal, setShowDeleteMainSalaryModal] =
        useState(false)
    const [showViewAdditionalSalaryModal, setShowViewAdditionalSalaryModal] =
        useState(false)
    const [showEditAdditionalSalaryModal, setShowEditAdditionalSalaryModal] =
        useState(false)
    const [
        showDeleteAdditionalSalaryModal,
        setShowDeleteAdditionalSalaryModal,
    ] = useState(false)
    const [showViewSalaryCutsModal, setShowViewSalaryCutsModal] =
        useState(false)
    const [showEditSalaryCutsModal, setShowEditSalaryCutsModal] =
        useState(false)
    const [showDeleteSalaryCutsModal, setShowDeleteSalaryCutsModal] =
        useState(false)
    const [showViewBpjsModal, setShowViewBpjsModal] = useState(false)
    const [showEditBpjsModal, setShowEditBpjsModal] = useState(false)
    const [showDeleteBpjsModal, setShowDeleteBpjsModal] = useState(false)
    const [showViewInsuranceModal, setShowViewInsuranceModal] = useState(false)
    const [showEditInsuranceModal, setShowEditInsuranceModal] = useState(false)
    const [showDeleteInsuranceModal, setShowDeleteInsuranceModal] =
        useState(false)
    const [showViewTaxModal, setShowViewTaxModal] = useState(false)
    const [showEditTaxModal, setShowEditTaxModal] = useState(false)
    const [showDeleteTaxModal, setShowDeleteTaxModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('Master Gaji')
    const [sortBy, setSortBy] = useState('id')
    const [sortByMasterGaji, setSortByMasterGaji] =
        useState('master_salary_code')
    const [sortOrder, setSortOrder] = useState('asc')
    const [mainSalaryPage, setMainSalaryPage] = useState(1)
    const [mainSalaryLimit, setMainSalaryLimit] = useState(5)
    const [mainSalarySearchData, setMainSalarySearchData] = useState('')
    const [mainSalaryAdditionPage, setMainSalaryAdditionPage] = useState(1)
    const [mainSalaryAdditionLimit, setMainSalaryAdditionLimit] = useState(5)
    const [mainSalaryAdditionSearchData, setMainSalaryAdditionSearchData] =
        useState('')
    const [mainSalaryDeductionPage, setMainSalaryDeductionPage] = useState(1)
    const [mainSalaryDeductionLimit, setMainSalaryDeductionLimit] = useState(5)
    const [mainSalaryDeductionSearchData, setMainSalaryDeductionSearchData] =
        useState('')
    const [mainSalaryBpjsPage, setMainSalaryBpjsPage] = useState(1)
    const [mainSalaryBpjsLimit, setMainSalaryBpjsLimit] = useState(5)
    const [mainSalaryBpjsSearchData, setMainSalaryBpjsSearchData] = useState('')
    const [mainSalaryInsurancePage, setMainSalaryInsurancePage] = useState(1)
    const [mainSalaryInsuranceLimit, setMainSalaryInsuranceLimit] = useState(5)
    const [mainSalaryInsuranceSearchData, setMainSalaryInsuranceSearchData] =
        useState('')
    const [mainSalaryTaxPage, setMainSalaryTaxPage] = useState(1)
    const [mainSalaryTaxLimit, setMainSalaryTaxLimit] = useState(5)
    const [mainSalaryTaxSearchData, setMainSalaryTaxSearchData] = useState('')
    const token = getCookie('token')
    const dispatch = useDispatch()
    const [showAddMasterGajiTambahan, setShowAddMasterGajiTambahan] =
        useState(false)
    const [showAddMasterGajiPotongan, setShowAddMasterGajiPotongan] =
        useState(false)
    const [showViewMasterGajiTambahan, setShowViewMasterGajiTambahan] =
        useState(false)
    const [showEditMasterGajiTambahan, setShowEditMasterGajiTambahan] =
        useState(false)
    const [showDeleteMasterGajiTambahan, setShowDeleteMasterGajiTambahan] =
        useState(false)
    const [showViewMasterGajiPotongan, setShowViewMasterGajiPotongan] =
        useState(false)
    const [showEditMasterGajiPotongan, setShowEditMasterGajiPotongan] =
        useState(false)
    const [showDeleteMasterGajiPotongan, setShowDeleteMasterGajiPotongan] =
        useState(false)
    const [masterGajiTambahanSearchData, setMasterGajiTambahanSearchData] =
        useState('')
    const [masterGajiTambahanPage, setMasterGajiTambahanPage] = useState(1)
    const [masterGajiTambahanLimit, setMasterGajiTambahanLimit] = useState(5)
    const [masterGajiPotonganSearchData, setMasterGajiPotonganSearchData] =
        useState('')
    const [masterGajiPotonganPage, setMasterGajiPotonganPage] = useState(1)
    const [masterGajiPotonganLimit, setMasterGajiPotonganLimit] = useState(5)
    const selectedMasterGaji = useSelector(
        (state) => state.finance.finance.selected_master_gaji
    )

    const validateMainSalary = yup.object({
        employee_id: yup.string().required('Harap diisi'),
        main_salary: yup.string().required('Harap diisi'),
        main_salary_count: yup.string().required('Harap diisi'),
    })

    const validateAdditionalSalary = yup.object({
        main_salary_addition_value: yup.array().of(
            yup.object().shape({
                additional_salary_name: yup.string().required('Harap diisi'),
                additional_salary_value: yup.string().required('Harap diisi'),
                additional_salary_percentage: yup
                    .string()
                    .required('Harap diisi'),
                additional_salary_results: yup.string().required('Harap diisi'),
                additional_salary_fixed_value: yup
                    .string()
                    .required('Harap diisi'),
                additional_salary_calculation: yup
                    .string()
                    .required('Harap diisi'),
            })
        ),
    })

    const validateSalaryCuts = yup.object({
        main_salary_deduction_value: yup.array().of(
            yup.object().shape({
                salary_cuts_name: yup.string().required('Harap diisi'),
                salary_cuts_value: yup.string().required('Harap diisi'),
                salary_cuts_percentage: yup.string().required('Harap diisi'),
                salary_cuts_results: yup.string().required('Harap diisi'),
                salary_cuts_fixed_value: yup.string().required('Harap diisi'),
                salary_cuts_calculation: yup.string().required('Harap diisi'),
            })
        ),
    })

    const validateInsurance = yup.object({
        main_salary_insurance_value: yup.array().of(
            yup.object().shape({
                insurance_name: yup.string().required('Harap diisi'),
                insurance_value: yup.string().required('Harap diisi'),
                insurance_percentage: yup.string().required('Harap diisi'),
                insurance_results: yup.string().required('Harap diisi'),
                insurance_fixed_value: yup.string().required('Harap diisi'),
            })
        ),
    })

    const validateTax = yup.object({
        main_salary_tax_value: yup.array().of(
            yup.object().shape({
                tax_name: yup.string().required('Harap diisi'),
                tax_value: yup.string().required('Harap diisi'),
                tax_percentage: yup.string().required('Harap diisi'),
                tax_results: yup.string().required('Harap diisi'),
                tax_fixed_value: yup.string().required('Harap diisi'),
            })
        ),
    })

    const [currentStep, setCurrentStep] = useState(1)

    const mainSalaryId = useSelector(
        (state) => state.finance.finance.selectedMainSalaryId
    )

    const emp_id = useSelector((state) => state.finance.finance.employee_id)

    const {
        control: controlMainSalary,
        register: registerMainSalary,
        trigger: triggerMainSalary,
        handleSubmit: handleSubmitMainSalary,
        watch: watchMainSalary,
        reset: resetMainSalary,
        formState: { errors: errorsMainSalary },
    } = useForm({
        resolver: yupResolver(validateMainSalary),
        mode: 'all',
    })

    const {
        control: additionalSalaryControl,
        register: additionalSalaryRegister,
        formState: { errors: errorsAdditionalSalary },
        clearErrors: clearErrorsAdditionalSalary,
        trigger: triggerAdditionalSalary,
        setValue: setValueAdditionalSalary,
        handleSubmit: handleSubmitAdditionalSalary,
        reset: resetAdditionalSalary,
    } = useForm({
        defaultValues: {
            main_salary_addition_value: [
                {
                    additional_salary_name: '',
                    additional_salary_value: '',
                    additional_salary_percentage: '',
                    additional_salary_fixed_value: '',
                    additional_salary_calculation: '',
                },
            ],
        },
        resolver: yupResolver(validateAdditionalSalary),
        mode: 'all',
    })

    const {
        control: salaryCutsControl,
        register: salaryCutsRegister,
        formState: { errors: errorsSalaryCuts },
        setValue: setValueSalaryCuts,
        trigger: triggerSalaryCuts,
        clearErrors: clearErrorsSalaryCuts,
        handleSubmit: handleSubmitSalaryCuts,
        reset: resetSalaryCuts,
    } = useForm({
        defaultValues: {
            main_salary_deduction_value: [
                {
                    salary_cuts_name: '',
                    salary_cuts_value: '',
                    salary_cuts_percentage: '',
                    salary_cuts_fixed_value: '',
                    salary_cuts_calculation: '',
                },
            ],
        },
        resolver: yupResolver(validateSalaryCuts),
        mode: 'all',
    })

    const {
        control: bpjsControl,
        register: bpjsRegister,
        formState: { errors: errorsBpjs },
        setValue: setValueBpjs,
        handleSubmit: handleSubmitBpjs,
        reset: resetBpjs,
    } = useForm({
        mode: 'all',
    })

    const {
        control: insuranceControl,
        register: insuranceRegister,
        formState: { errors: errorsInsurance },
        setValue: setValueInsurance,
        trigger: triggerInsurance,
        handleSubmit: handleSubmitInsurance,
        clearErrors: clearErrorsInsurance,
        reset: resetInsurance,
    } = useForm({
        defaultValues: {
            main_salary_insurance_value: [
                {
                    insurance_name: '',
                    insurance_value: '',
                    insurance_percentage: '',
                    insurance_fixed_value: '',
                },
            ],
        },
        resolver: yupResolver(validateInsurance),
        mode: 'all',
    })

    const {
        control: taxControl,
        register: taxRegister,
        formState: { errors: errorsTax },
        setValue: setValueTax,
        trigger: triggerTax,
        handleSubmit: handleSubmitTax,
        clearErrors: clearErrorsTax,
        reset: resetTax,
    } = useForm({
        defaultValues: {
            main_salary_tax_value: [
                {
                    tax_name: '',
                    tax_value: '',
                    tax_percentage: '',
                    tax_fixed_value: '',
                },
            ],
        },
        resolver: yupResolver(validateTax),
        mode: 'all',
    })

    const selectedTitle = useSelector(
        (state) => state.finance.finance.selected_item
    )

    const handlePageChange = (page) => {
        if (selectedItem === 'Gaji Pokok') {
            setMainSalaryPage(page)
        } else if (selectedItem === 'Tambahan') {
            setMainSalaryAdditionPage(page)
        } else if (selectedItem === 'Potongan') {
            setMainSalaryDeductionPage(page)
        } else if (selectedItem === 'BPJS') {
            setMainSalaryBpjsPage(page)
        } else if (selectedItem === 'Asuransi') {
            setMainSalaryInsurancePage(page)
        } else if (selectedItem === 'Pajak') {
            setMainSalaryTaxPage(page)
        } else if (selectedItem === 'Master Gaji') {
            setMasterGajiPotonganPage(page)
            setMasterGajiTambahanPage(page)
        }
    }

    const buttons = [
        {
            title: 'Master Gaji',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Gaji Pokok',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Tambahan',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Potongan',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'BPJS',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Asuransi',
            icon: 'heroicons-outline:user',
        },
        {
            title: 'Pajak',
            icon: 'heroicons-outline:user',
        },
    ]

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    async function fetchMainSalary(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortBy=' +
                    sortBy +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryData } = useQuery({
        queryKey: [
            'main-salary',
            mainSalaryPage,
            mainSalarySearchData,
            mainSalaryLimit,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            fetchMainSalary(
                mainSalaryPage,
                mainSalarySearchData,
                mainSalaryLimit
            ),
    })

    async function fetchMainSalaryAddition(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary-addition?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryAdditionData } = useQuery({
        queryKey: [
            'main-salary-addition',
            mainSalaryAdditionPage,
            mainSalaryAdditionSearchData,
            mainSalaryAdditionLimit,
        ],
        queryFn: () =>
            fetchMainSalaryAddition(
                mainSalaryAdditionPage,
                mainSalaryAdditionSearchData,
                mainSalaryAdditionLimit
            ),
    })

    async function fetchMainSalaryDeduction(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary-deduction?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryDeductionData } = useQuery({
        queryKey: [
            'main-salary-deduction',
            mainSalaryDeductionPage,
            mainSalaryDeductionSearchData,
            mainSalaryDeductionLimit,
        ],
        queryFn: () =>
            fetchMainSalaryDeduction(
                mainSalaryDeductionPage,
                mainSalaryDeductionSearchData,
                mainSalaryDeductionLimit
            ),
    })

    async function fetchMainSalaryBpjs(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary-bpjs?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryBpjs } = useQuery({
        queryKey: [
            'main-salary-bpjs',
            mainSalaryBpjsPage,
            mainSalaryBpjsSearchData,
            mainSalaryBpjsLimit,
        ],
        queryFn: () =>
            fetchMainSalaryBpjs(
                mainSalaryBpjsPage,
                mainSalaryBpjsSearchData,
                mainSalaryBpjsLimit
            ),
    })

    async function fetchMainSalaryInsurance(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary-insurance?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryInsuranceData } = useQuery({
        queryKey: [
            'main-salary-insurance',
            mainSalaryInsurancePage,
            mainSalaryInsuranceSearchData,
            mainSalaryInsuranceLimit,
        ],
        queryFn: () =>
            fetchMainSalaryInsurance(
                mainSalaryInsurancePage,
                mainSalaryInsuranceSearchData,
                mainSalaryInsuranceLimit
            ),
    })

    async function fetchMainSalaryTax(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/main-salary-tax?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: mainSalaryTax } = useQuery({
        queryKey: [
            'main-salary-tax',
            mainSalaryTaxPage,
            mainSalaryTaxSearchData,
            mainSalaryTaxLimit,
        ],
        queryFn: () =>
            fetchMainSalaryTax(
                mainSalaryTaxPage,
                mainSalaryTaxSearchData,
                mainSalaryTaxLimit
            ),
    })

    async function fetchMasterGajiTambahan(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/master-salary-addition?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortBy=' +
                    sortByMasterGaji +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: masterSalaryTambahanData } = useQuery({
        queryKey: [
            'master-salary-tambahan',
            masterGajiTambahanPage,
            masterGajiTambahanSearchData,
            masterGajiTambahanLimit,
        ],
        queryFn: () =>
            fetchMasterGajiTambahan(
                masterGajiTambahanPage,
                masterGajiTambahanSearchData,
                masterGajiTambahanLimit
            ),
    })

    async function fetchMasterSalaryPotongan(pageData, search, limitData) {
        try {
            const { data } = await http(token).get(
                '/master-salary-deduction?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&sortBy=' +
                    sortByMasterGaji +
                    '&sortOrder=' +
                    sortOrder
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: masterSalaryPotonganData } = useQuery({
        queryKey: [
            'master-salary-potongan',
            masterGajiPotonganPage,
            masterGajiPotonganSearchData,
            masterGajiPotonganLimit,
        ],
        queryFn: () =>
            fetchMasterSalaryPotongan(
                masterGajiPotonganPage,
                masterGajiPotonganSearchData,
                masterGajiPotonganLimit
            ),
    })

    const queryClient = useQueryClient()

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(column)
            setSortByMasterGaji(column)
            setSortOrder('asc')
        }

        fetchMainSalary(mainSalaryPage, mainSalaryLimit, mainSalarySearchData)

        queryClient.invalidateQueries({ queryKey: ['main-salary'] })
        queryClient.invalidateQueries({ queryKey: ['main-salary-addition'] })
        queryClient.invalidateQueries({ queryKey: ['main-salary-deduction'] })
        queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
        queryClient.invalidateQueries({ queryKey: ['main-salary-insurance'] })
        queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
    }

    useEffect(() => {
        dispatch(setSelectedMasterGaji('Tambahan'))
    }, [])

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div>
                        <div className="flex justify-center items-center">
                            <h5>Pengaturan Gaji</h5>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5">
                        <div>
                            {selectedItem === 'Master Gaji' ? (
                                <Button
                                    icon="heroicons-outline:plus"
                                    onClick={() => {
                                        if (selectedMasterGaji === 'Tambahan') {
                                            setShowAddMasterGajiTambahan(
                                                !showAddMasterGajiTambahan
                                            )
                                            setCurrentStep(1)
                                        } else {
                                            setShowAddMasterGajiPotongan(
                                                !showAddMasterGajiPotongan
                                            )
                                            setCurrentStep(1)
                                        }
                                        setCurrentStep(1)
                                    }}
                                    className="btn-success"
                                    text="Buat Master Gaji"
                                />
                            ) : selectedItem === 'Gaji Pokok' ? (
                                <Button
                                    icon="heroicons-outline:plus"
                                    onClick={() => {
                                        setShowAddSalaryModal(
                                            !showAddSalaryModal
                                        )
                                        dispatch(setInitialState())
                                        setCurrentStep(1)
                                    }}
                                    className="btn-success"
                                    text="Buat Gaji Pokok"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
                <Card
                    noborder
                    title={true}
                    salary={
                        <div className="flex w-full h-16">
                            {selectedItem === 'Master Gaji' && (
                                <div>
                                    <Select
                                        className="w-40 h-[48px]"
                                        onChange={(e) => {
                                            dispatch(
                                                setSelectedMasterGaji(
                                                    e.target.value
                                                )
                                            )
                                        }}
                                        defaultValue="Tambahan"
                                        options={[
                                            {
                                                label: 'Tambahan',
                                                value: 'Tambahan',
                                            },
                                            {
                                                label: 'Potongan',
                                                value: 'Potongan',
                                            },
                                        ]}
                                    />
                                </div>
                            )}
                        </div>
                    }
                    search={
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder="Cari"
                                className="h-[48px]"
                                onChange={(e) => {
                                    if (selectedItem === 'Master Gaji') {
                                        setMasterGajiPotonganSearchData(
                                            e.target.value
                                        )
                                        setMasterGajiTambahanSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Gaji Pokok') {
                                        setMainSalarySearchData(e.target.value)
                                    } else if (selectedItem === 'Tambahan') {
                                        setMainSalaryAdditionSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Potongan') {
                                        setMainSalaryDeductionSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'BPJS') {
                                        setMainSalaryBpjsSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Asuransi') {
                                        setMainSalaryInsuranceSearchData(
                                            e.target.value
                                        )
                                    } else if (selectedItem === 'Pajak') {
                                        setMainSalaryTaxSearchData(
                                            e.target.value
                                        )
                                    }
                                }}
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                            />
                        </div>
                    }
                >
                    <div className="overflow-x-auto -mx-6">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden px-6">
                                <Tab.Group>
                                    <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                                        {buttons.map((item, i) => (
                                            <Tab as={Fragment} key={i}>
                                                {({ selected }) => (
                                                    <button
                                                        className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                                        ${
                                                            selected
                                                                ? 'text-white bg-primary-500 '
                                                                : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                        } `}
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        {item.title}
                                                    </button>
                                                )}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    <Tab.Panels>
                                        {selectedMasterGaji === 'Tambahan' ? (
                                            <Tab.Panel>
                                                <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                    <MasterSalaryTambahanTable
                                                        setShowViewMasterGajiTambahan={
                                                            setShowViewMasterGajiTambahan
                                                        }
                                                        setShowEditMasterGajiTambahan={
                                                            setShowEditMasterGajiTambahan
                                                        }
                                                        setShowDeleteMasterGajiTambahan={
                                                            setShowDeleteMasterGajiTambahan
                                                        }
                                                        masterSalaryTambahanData={
                                                            masterSalaryTambahanData
                                                        }
                                                    />
                                                </div>
                                            </Tab.Panel>
                                        ) : (
                                            <Tab.Panel>
                                                <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                    <MasterSalaryPotonganTable
                                                        setShowViewMasterGajiPotongan={
                                                            setShowViewMasterGajiPotongan
                                                        }
                                                        setShowEditMasterGajiPotongan={
                                                            setShowEditMasterGajiPotongan
                                                        }
                                                        setShowDeleteMasterGajiPotongan={
                                                            setShowDeleteMasterGajiPotongan
                                                        }
                                                        masterSalaryPotonganData={
                                                            masterSalaryPotonganData
                                                        }
                                                    />
                                                </div>
                                            </Tab.Panel>
                                        )}
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <MainSalaryTable
                                                    setShowViewMainSalaryModal={
                                                        setShowViewMainSalaryModal
                                                    }
                                                    setShowEditMainSalaryModal={
                                                        setShowEditMainSalaryModal
                                                    }
                                                    setShowDeleteMainSalaryModal={
                                                        setShowDeleteMainSalaryModal
                                                    }
                                                    mainSalaryData={
                                                        mainSalaryData
                                                    }
                                                />
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <AdditionalSalaryTable
                                                    setShowViewAdditionalSalaryModal={
                                                        setShowViewAdditionalSalaryModal
                                                    }
                                                    setShowEditAdditionalSalaryModal={
                                                        setShowEditAdditionalSalaryModal
                                                    }
                                                    setShowDeleteAdditionalSalaryModal={
                                                        setShowDeleteAdditionalSalaryModal
                                                    }
                                                    additionalSalaryData={
                                                        mainSalaryAdditionData
                                                    }
                                                />
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <SalaryCutsTable
                                                    setShowViewSalaryCutsModal={
                                                        setShowViewSalaryCutsModal
                                                    }
                                                    setShowEditSalaryCutsModal={
                                                        setShowEditSalaryCutsModal
                                                    }
                                                    setShowDeleteSalaryCutsModal={
                                                        setShowDeleteSalaryCutsModal
                                                    }
                                                    salaryCutsData={
                                                        mainSalaryDeductionData
                                                    }
                                                />
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <BpjsTable
                                                    setShowViewBpjsModal={
                                                        setShowViewBpjsModal
                                                    }
                                                    setShowEditBpjsModal={
                                                        setShowEditBpjsModal
                                                    }
                                                    setShowDeleteBpjsModal={
                                                        setShowDeleteBpjsModal
                                                    }
                                                    bpjsData={mainSalaryBpjs}
                                                />
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <InsuranceTable
                                                    setShowViewInsuranceModal={
                                                        setShowViewInsuranceModal
                                                    }
                                                    setShowEditInsuranceModal={
                                                        setShowEditInsuranceModal
                                                    }
                                                    setShowDeleteInsuranceModal={
                                                        setShowDeleteInsuranceModal
                                                    }
                                                    insuranceData={
                                                        mainSalaryInsuranceData
                                                    }
                                                />
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                                <TaxTable
                                                    setShowViewTaxModal={
                                                        setShowViewTaxModal
                                                    }
                                                    setShowEditTaxModal={
                                                        setShowEditTaxModal
                                                    }
                                                    setShowDeleteTaxModal={
                                                        setShowDeleteTaxModal
                                                    }
                                                    taxData={mainSalaryTax}
                                                />
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Master Gaji') {
                                    setMasterGajiPotonganLimit(e.target.value)
                                    setMasterGajiTambahanLimit(e.target.value)
                                    fetchMasterGajiTambahan()
                                    fetchMasterSalaryPotongan()
                                } else if (selectedItem === 'Gaji Pokok') {
                                    setMainSalaryLimit(e.target.value)
                                    fetchMainSalary()
                                } else if (selectedItem === 'Tambahan') {
                                    setMainSalaryAdditionLimit(e.target.value)
                                    fetchMainSalaryAddition()
                                } else if (selectedItem === 'Potongan') {
                                    setMainSalaryDeductionLimit(e.target.value)
                                    fetchMainSalaryDeduction()
                                } else if (selectedItem === 'BPJS') {
                                    setMainSalaryBpjsLimit(e.target.value)
                                    fetchMainSalaryBpjs()
                                } else if (selectedItem === 'Asuransi') {
                                    setMainSalaryInsuranceLimit(e.target.value)
                                    fetchMainSalaryInsurance()
                                } else if (selectedItem === 'Pajak') {
                                    setMainSalaryTaxLimit(e.target.value)
                                    fetchMainSalaryTax()
                                }
                            }}
                            className="form-control py-2 w-max"
                            defaultValue=""
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option
                                    key={pageSize}
                                    defaultValue=""
                                    value={pageSize}
                                >
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Master Gaji' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {masterSalaryTambahanData?.currentPage} of{' '}
                                {masterSalaryTambahanData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Gaji Pokok' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryData?.currentPage} of{' '}
                                {mainSalaryData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Tambahan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryAdditionData?.currentPage} of{' '}
                                {mainSalaryAdditionData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Potongan' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryDeductionData?.currentPage} of{' '}
                                {mainSalaryDeductionData?.totalPages} entries
                            </span>
                        ) : selectedItem === 'BPJS' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryBpjs?.currentPage} of{' '}
                                {mainSalaryBpjs?.totalPages} entries
                            </span>
                        ) : selectedItem === 'Asuransi' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryInsuranceData?.currentPage} of{' '}
                                {mainSalaryInsuranceData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {mainSalaryTax?.currentPage} of{' '}
                                {mainSalaryTax?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Master Gaji'
                                    ? masterSalaryTambahanData?.totalPages
                                    : selectedItem === 'Gaji Pokok'
                                      ? mainSalaryData?.totalPages
                                      : selectedItem === 'Tambahan'
                                        ? mainSalaryAdditionData?.totalPages
                                        : selectedItem === 'Potongan'
                                          ? mainSalaryDeductionData?.totalPages
                                          : selectedItem === 'BPJS'
                                            ? mainSalaryBpjs?.totalPages
                                            : selectedItem === 'Asuransi'
                                              ? mainSalaryInsuranceData?.totalPages
                                              : mainSalaryTax?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Master Gaji'
                                    ? masterSalaryTambahanData?.currentPage
                                    : selectedItem === 'Gaji Pokok'
                                      ? mainSalaryData?.currentPage
                                      : selectedItem === 'Tambahan'
                                        ? mainSalaryAdditionData?.currentPage
                                        : selectedItem === 'Potongan'
                                          ? mainSalaryDeductionData?.currentPage
                                          : selectedItem === 'BPJS'
                                            ? mainSalaryBpjs?.currentPage
                                            : selectedItem === 'Asuransi'
                                              ? mainSalaryInsuranceData?.currentPage
                                              : mainSalaryTax?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
                <Modal
                    title={`Input ${selectedTitle}`}
                    label={`Input ${selectedTitle}`}
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddSalaryModal}
                    onClose={() => {
                        setShowAddSalaryModal(!showAddSalaryModal)
                    }}
                >
                    <MainSalaryForm
                        setShowAddSalaryModals={setShowAddSalaryModal}
                        handleSubmitMainSalary={handleSubmitMainSalary}
                        handleSubmitSalaryCuts={handleSubmitSalaryCuts}
                        handleSubmitAdditionalSalary={
                            handleSubmitAdditionalSalary
                        }
                        handleSubmitBpjs={handleSubmitBpjs}
                        handleSubmitInsurance={handleSubmitInsurance}
                        handleSubmitTax={handleSubmitTax}
                        currentStep={currentStep}
                        watchMainSalary={watchMainSalary}
                        controlMainSalary={controlMainSalary}
                        registerMainSalary={registerMainSalary}
                        triggerMainSalary={triggerMainSalary}
                        triggerAdditionalSalary={triggerAdditionalSalary}
                        triggerSalaryCuts={triggerSalaryCuts}
                        triggerInsurance={triggerInsurance}
                        triggerTax={triggerTax}
                        errorsMainSalary={errorsMainSalary}
                        setCurrentStep={setCurrentStep}
                        clearErrorsAdditionalSalary={
                            clearErrorsAdditionalSalary
                        }
                        clearErrorsSalaryCuts={clearErrorsSalaryCuts}
                        clearErrorsInsurance={clearErrorsInsurance}
                        clearErrorsTax={clearErrorsTax}
                        controlAdditionalSalary={additionalSalaryControl}
                        registerAdditionalSalary={additionalSalaryRegister}
                        errorsAdditionalSalary={errorsAdditionalSalary}
                        setValueAdditionalSalary={setValueAdditionalSalary}
                        controlSalaryCuts={salaryCutsControl}
                        registerSalaryCuts={salaryCutsRegister}
                        errorsSalaryCuts={errorsSalaryCuts}
                        setValueSalaryCuts={setValueSalaryCuts}
                        bpjsControl={bpjsControl}
                        bpjsRegister={bpjsRegister}
                        bpjsErrors={errorsBpjs}
                        setValueBpjs={setValueBpjs}
                        insuranceControl={insuranceControl}
                        insuranceRegister={insuranceRegister}
                        insuranceErrors={errorsInsurance}
                        insuranceSetValue={setValueInsurance}
                        taxControl={taxControl}
                        taxRegister={taxRegister}
                        taxErrors={errorsTax}
                        taxSetValue={setValueTax}
                        resetMainSalary={resetMainSalary}
                        resetAdditionalSalary={resetAdditionalSalary}
                        resetSalaryCuts={resetSalaryCuts}
                        resetBpjs={resetBpjs}
                        resetInsurance={resetInsurance}
                        resetTax={resetTax}
                    />
                </Modal>
                <Modal
                    title="Tambah Master Gaji Tambahan"
                    label="Tambah Master Gaji Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddMasterGajiTambahan}
                    onClose={() => {
                        setShowAddMasterGajiTambahan(!showAddMasterGajiTambahan)
                    }}
                >
                    <MasterGajiTambahanForm
                        showAddMasterGajiTambahanForm={
                            setShowAddMasterGajiTambahan
                        }
                    />
                </Modal>
                <Modal
                    title="Tambah Master Gaji Potongan"
                    label="Tambah Master Gaji Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showAddMasterGajiPotongan}
                    onClose={() => {
                        setShowAddMasterGajiPotongan(!showAddMasterGajiPotongan)
                    }}
                >
                    <MasterGajiPotonganForm
                        showAddMasterGajiPotonganForm={
                            setShowAddMasterGajiPotongan
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Master Gaji Tambahan"
                    label="Detail Master Gaji Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewMasterGajiTambahan}
                    onClose={() => {
                        setShowViewMasterGajiTambahan(
                            !showViewMasterGajiTambahan
                        )
                    }}
                >
                    <DetailMasterGajiTambahanForm
                        showViewMasterGajiTambahanModal={
                            setShowViewMasterGajiTambahan
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Master Gaji Potongan"
                    label="Detail Master Gaji Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewMasterGajiPotongan}
                    onClose={() => {
                        setShowViewMasterGajiPotongan(
                            !showViewMasterGajiPotongan
                        )
                    }}
                >
                    <DetailMasterGajiPotonganForm
                        showViewMasterGajiPotonganModal={
                            setShowViewMasterGajiPotongan
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Master Gaji Tambahan"
                    label="Edit Master Gaji Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditMasterGajiTambahan}
                    onClose={() => {
                        setShowEditMasterGajiTambahan(
                            !showEditMasterGajiTambahan
                        )
                    }}
                >
                    <EditMasterGajiTambahanForm
                        showEditMasterGajiTambahanModal={
                            setShowEditMasterGajiTambahan
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Master Gaji Potongan"
                    label="Edit Master Gaji Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditMasterGajiPotongan}
                    onClose={() => {
                        setShowEditMasterGajiPotongan(
                            !showEditMasterGajiPotongan
                        )
                    }}
                >
                    <EditMasterGajiPotonganForm
                        showEditMasterGajiPotonganModal={
                            setShowEditMasterGajiPotongan
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Master Gaji Tambahan"
                    label="Hapus Master Gaji Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteMasterGajiTambahan}
                    onClose={() => {
                        setShowDeleteMasterGajiTambahan(
                            !showDeleteMasterGajiTambahan
                        )
                    }}
                >
                    <HapusMasterGajiTambahanForm
                        setShowDeleteMasterGajiTambahan={
                            setShowDeleteMasterGajiTambahan
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Master Gaji Potongan"
                    label="Hapus Master Gaji Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteMasterGajiPotongan}
                    onClose={() => {
                        setShowDeleteMasterGajiPotongan(
                            !showDeleteMasterGajiPotongan
                        )
                    }}
                >
                    <HapusMasterGajiPotonganForm
                        setShowDeleteMasterGajiPotongan={
                            setShowDeleteMasterGajiPotongan
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Gaji Pokok"
                    label="Detail Gaji Pokok"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewMainSalaryModal}
                    onClose={() => {
                        setShowViewMainSalaryModal(!showViewMainSalaryModal)
                    }}
                >
                    <DetailMainSalary
                        setShowViewMainSalaryModal={setShowViewMainSalaryModal}
                    />
                </Modal>
                <Modal
                    title="Edit Gaji Pokok"
                    label="Edit Gaji Pokok"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditMainSalaryModal}
                    onClose={() => {
                        setShowEditMainSalaryModal(!showEditMainSalaryModal)
                    }}
                >
                    <EditMainSalaryModal
                        setShowEditMainSalaryModal={setShowEditMainSalaryModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Gaji Pokok"
                    label="Hapus Gaji Pokok"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteMainSalaryModal}
                    onClose={() => {
                        setShowDeleteMainSalaryModal(!showDeleteMainSalaryModal)
                    }}
                >
                    <DeleteMainSalaryForm
                        setShowDeleteMainSalaryModal={
                            setShowDeleteMainSalaryModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Tambahan"
                    label="Detail Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewAdditionalSalaryModal}
                    onClose={() => {
                        setShowViewAdditionalSalaryModal(
                            !showViewAdditionalSalaryModal
                        )
                    }}
                >
                    <DetailAdditionalSalaryModal
                        setShowViewAdditionalSalaryModal={
                            setShowViewAdditionalSalaryModal
                        }
                    />
                </Modal>
                <Modal
                    title="Edit Tambahan"
                    label="Edit Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditAdditionalSalaryModal}
                    onClose={() => {
                        setShowEditAdditionalSalaryModal(
                            !showEditAdditionalSalaryModal
                        )
                    }}
                >
                    <EditAdditionalSalaryModal
                        setShowEditAdditionalSalaryModal={
                            setShowEditAdditionalSalaryModal
                        }
                    />
                </Modal>
                <Modal
                    title="Hapus Tambahan"
                    label="Hapus Tambahan"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteAdditionalSalaryModal}
                    onClose={() => {
                        setShowDeleteAdditionalSalaryModal(
                            !showDeleteAdditionalSalaryModal
                        )
                    }}
                >
                    <DeleteTambahanForm
                        setShowDeleteTambahanModal={
                            setShowDeleteAdditionalSalaryModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Potongan"
                    label="Detail Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewSalaryCutsModal}
                    onClose={() => {
                        setShowViewSalaryCutsModal(!showViewSalaryCutsModal)
                    }}
                >
                    <DetailSalaryCutsModal
                        setShowViewSalaryCutsModal={setShowViewSalaryCutsModal}
                    />
                </Modal>
                <Modal
                    title="Edit Potongan"
                    label="Edit Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditSalaryCutsModal}
                    onClose={() => {
                        setShowEditSalaryCutsModal(!showEditSalaryCutsModal)
                    }}
                >
                    <EditSalaryCutsForm
                        setShowEditSalaryCutsModal={setShowEditSalaryCutsModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Potongan"
                    label="Hapus Potongan"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteSalaryCutsModal}
                    onClose={() => {
                        setShowDeleteSalaryCutsModal(!showDeleteSalaryCutsModal)
                    }}
                >
                    <DeleteSalaryCutsForm
                        showDeletePotonganModal={setShowDeleteSalaryCutsModal}
                    />
                </Modal>
                <Modal
                    title="Detail BPJS"
                    label="Detail BPJS"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewBpjsModal}
                    onClose={() => {
                        setShowViewBpjsModal(!showViewBpjsModal)
                    }}
                >
                    <DetailBpjsModal
                        setShowViewBpjsModal={setShowViewBpjsModal}
                    />
                </Modal>
                <Modal
                    title="Edit BPJS"
                    label="Edit BPJS"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditBpjsModal}
                    onClose={() => {
                        setShowEditBpjsModal(!showEditBpjsModal)
                    }}
                >
                    <EditBPJSModal
                        setShowEditBpjsModal={setShowEditBpjsModal}
                    />
                </Modal>
                <Modal
                    title="Hapus BPJS"
                    label="Hapus BPJS"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteBpjsModal}
                    onClose={() => {
                        setShowDeleteBpjsModal(!showDeleteBpjsModal)
                    }}
                >
                    <DeleteBpjsForm
                        setShowDeleteBpjsModal={setShowDeleteBpjsModal}
                    />
                </Modal>
                <Modal
                    title="Detail Asuransi"
                    label="Detail Asuransi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewInsuranceModal}
                    onClose={() => {
                        setShowViewInsuranceModal(!showViewInsuranceModal)
                    }}
                >
                    <DetailInsuranceModal
                        setShowViewInsuranceModal={setShowViewInsuranceModal}
                    />
                </Modal>
                <Modal
                    title="Edit Asuransi"
                    label="Edit Asuransi"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditInsuranceModal}
                    onClose={() => {
                        setShowEditInsuranceModal(!showEditInsuranceModal)
                    }}
                >
                    <EditInsuranceModal
                        setShowEditInsuranceModal={setShowEditInsuranceModal}
                    />
                </Modal>
                <Modal
                    title="Hapus Asuransi"
                    label="Hapus Asuransi"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteInsuranceModal}
                    onClose={() => {
                        setShowDeleteInsuranceModal(!showDeleteInsuranceModal)
                    }}
                >
                    <DeleteInsuranceForm
                        setShowDeleteInsuranceModal={
                            setShowDeleteInsuranceModal
                        }
                    />
                </Modal>
                <Modal
                    title="Detail Pajak"
                    label="Detail Pajak"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showViewTaxModal}
                    onClose={() => {
                        setShowViewTaxModal(!showViewTaxModal)
                    }}
                >
                    <DetailTaxForm setShowViewTaxModal={setShowViewTaxModal} />
                </Modal>
                <Modal
                    title="Edit Pajak"
                    label="Edit Pajak"
                    labelClass="btn-outline-dark"
                    className="max-w-5xl"
                    activeModal={showEditTaxModal}
                    onClose={() => {
                        setShowEditTaxModal(!showEditTaxModal)
                    }}
                >
                    <EditTaxForm setShowEditTaxModal={setShowEditTaxModal} />
                </Modal>
                <Modal
                    title="Hapus Pajak"
                    label="Hapus Pajak"
                    labelClass="btn-outline-dark"
                    className="max-w-xl"
                    activeModal={showDeleteTaxModal}
                    onClose={() => {
                        setShowDeleteTaxModal(!showDeleteTaxModal)
                    }}
                >
                    <DeleteTaxForm
                        setShowDeleteTaxModal={setShowDeleteTaxModal}
                    />
                </Modal>
            </div>
        </>
    )
}
