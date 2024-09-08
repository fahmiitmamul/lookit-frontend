import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import EmployeeBiodataForm from '../employee-profile-form/page'
import FormKontakDarurat from '../employee-emergency-contact-form/page'
import FormAlamat from '../address-form-id-card/page'
import FormPendidikan from '../employee-education-form/page'
import FormInfoKaryawan from '../employee-information-form/page'
import FormSosialMedia from '../social-media-form/page'
import FormPengalamanKerja from '../input-company-form/page'
import FormInputBank from '../bank-input-form/page'
import FormInputBpjs from '../input-bpjs-form/page'
import FormInputAsuransi from '../insurance-input-form/page'
import { yupResolver } from '@hookform/resolvers/yup'

const DetailEmployeeForm = ({ setShowViewModal }) => {
    const token = getCookie('token')
    const [regencyValue, setRegencyData] = useState([])
    const [districtValue, setDistrictData] = useState([])
    const [villageValue, setVillageData] = useState([])
    const [domicileRegencyValue, setDomicileRegencyValue] = useState([])
    const [domicileDistrictValue, setDomicileDistrictValue] = useState([])
    const [domicileVillageValue, setDomicileVillageValue] = useState([])
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [pictureURI, setPictureURI] = useState('')
    const [employeeContent, setEmployeeContent] = useState({})
    const [selectedSIM, setSelectedSIM] = useState([])
    const dispatch = useDispatch()

    const employeeId = useSelector(
        (state) => state.employee.employee.employee_id
    )

    const validateProfile = yup.object({
        profile_photo: yup.string().required('Harap diisi'),
        nik_ktp: yup.string().required('Harap diisi'),
        npwp: yup.string().required('Harap diisi'),
        gender: yup.string().required('Harap diisi'),
        name: yup.string().required('Harap diisi'),
        birth_place: yup.string().required('Harap diisi'),
        religion: yup.string().required('Harap diisi'),
        email: yup.string().required('Harap diisi'),
        password: yup.string().required('Harap diisi'),
        employee_weight: yup.string().required('Harap diisi'),
        employee_height: yup.string().required('Harap diisi'),
        age: yup.string().required('Harap diisi'),
        marital_status: yup.string().required('Harap diisi'),
        blood_type: yup.string().required('Harap diisi'),
        vaccine_status: yup.string().required('Harap diisi'),
        phone_number: yup.string().required('Harap diisi'),
        driver_license: yup
            .array()
            .min(1, 'Harap diisi')
            .required('Harap diisi'),
    })

    const validateEmergency = yup.object({
        urgent_full_name: yup.string().required('Harap diisi'),
        urgent_brother: yup.string().required('Harap diisi'),
        urgent_brother_number: yup.string().required('Harap diisi'),
        urgent_phone_number: yup.string().required('Harap diisi'),
        urgent_full_address: yup.string().required('Harap diisi'),
    })

    const validateAddress = yup.object({
        domicile_district_id: yup.string().required('Harap diisi'),
        domicile_postal_code: yup.string().required('Harap diisi'),
        domicile_province_id: yup.string().required('Harap diisi'),
        domicile_regency_id: yup.string().required('Harap diisi'),
        domicile_village_id: yup.string().required('Harap diisi'),
        e_ktp_district_id: yup.string().required('Harap diisi'),
        e_ktp_postal_code: yup.string().required('Harap diisi'),
        e_ktp_province_id: yup.string().required('Harap diisi'),
        e_ktp_regency_id: yup.string().required('Harap diisi'),
        e_ktp_village_id: yup.string().required('Harap diisi'),
        domicile_full_address: yup.string().required('Harap diisi'),
        e_ktp_full_address: yup.string().required('Harap diisi'),
    })

    const validateEducation = yup.object({
        educations: yup.array().of(
            yup.object().shape({
                school_name: yup.string().required('Harap diisi'),
                school_level: yup.string().required('Harap diisi'),
                education_start_date: yup.string().required('Harap diisi'),
                education_end_date: yup.string().required('Harap diisi'),
                graduation_status: yup.string().required('Harap diisi'),
            })
        ),
    })

    const validateWorkHistory = yup.object({
        work_history: yup.array().of(
            yup.object().shape({
                company_name: yup.string().required('Harap diisi'),
                position_name: yup.string().required('Harap diisi'),
                work_history_start_date: yup.string().required('Harap diisi'),
                work_history_end_date: yup.string().required('Harap diisi'),
                work_status: yup.string().required('Harap diisi'),
            })
        ),
    })

    const validateEmployeeProfile = yup.object({
        employee_nik: yup.string().required('Harap diisi'),
        employee_status: yup.string().required('Harap diisi'),
        join_date: yup.string().required('Harap diisi'),
        end_date: yup.string().required('Harap diisi'),
        area_id: yup.string().required('Harap diisi'),
        branch_id: yup.string().required('Harap diisi'),
        batch: yup.string().required('Harap diisi'),
        departement_id: yup.string().required('Harap diisi'),
        position_id: yup.string().required('Harap diisi'),
        level_id: yup.string().required('Harap diisi'),
    })

    const validateSocialMedia = yup.object({
        facebook: yup.string().required('Harap diisi'),
        instagram: yup.string().required('Harap diisi'),
        line: yup.string().required('Harap diisi'),
        linkedin: yup.string().required('Harap diisi'),
        telegram: yup.string().required('Harap diisi'),
        twitter: yup.string().required('Harap diisi'),
        tiktok: yup.string().required('Harap diisi'),
    })

    const validateBankAccount = yup.object({
        account_number: yup.string().required('Harap diisi'),
        bank_name: yup.string().required('Harap diisi'),
        bank_owner_name: yup.string().required('Harap diisi'),
        bank_branch_name: yup.string().required('Harap diisi'),
    })

    const validateBPJS = yup.object({
        bpjs: yup.array().of(
            yup.object().shape({
                bpjs_type: yup.string().required('Harap diisi'),
                bpjs_number: yup.string().required('Harap diisi'),
            })
        ),
    })

    const validateInsurance = yup.object({
        insurance: yup.array().of(
            yup.object().shape({
                insurance_name: yup.string().required('Harap diisi'),
                insurance_number: yup.string().required('Harap diisi'),
            })
        ),
    })

    const {
        control: controlProfile,
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        trigger: triggerProfile,
        setValue: setProfileValue,
        clearErrors: clearErrorsProfile,
        formState: { errors: errorsProfile },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            setSelectedSIM(data.results.driver_license)
            return data.results
        },
        resolver: yupResolver(validateProfile),
        mode: 'all',
    })

    const {
        control: controlEmployeeProfile,
        register: registerEmployeeProfile,
        trigger: triggerEmployeeProfile,
        handleSubmit: handleSubmitEmployeeProfile,
        getValues: getValuesEmployeeProfile,
        formState: { errors: errorsEmployeeProfile },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            return data.results
        },
        resolver: yupResolver(validateEmployeeProfile),
        mode: 'all',
    })

    const employeeData = getValuesEmployeeProfile()

    const {
        register: registerEmergency,
        trigger: triggerEmergency,
        handleSubmit: handleSubmitEmergency,
        formState: { errors: errorsEmergency },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            return data.results
        },
        resolver: yupResolver(validateEmergency),
        mode: 'all',
    })

    const {
        register: registerAddress,
        trigger: triggerAddress,
        handleSubmit: handleSubmitAddress,
        watch: watchAddress,
        formState: { errors: errorsAddress },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            return data.results
        },
        resolver: yupResolver(validateAddress),
        mode: 'all',
    })

    const {
        register: registerSocialMedia,
        trigger: triggerSocialMedia,
        handleSubmit: handleSubmitSocialMedia,
        formState: { errors: errorsSocialMedia },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            return data.results
        },
        resolver: yupResolver(validateSocialMedia),
        mode: 'all',
    })

    const {
        register: registerBankAccount,
        trigger: triggerBankAccount,
        handleSubmit: handleSubmitBankAccount,
        formState: { errors: errorsBankAccount },
    } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(`/employee/${employeeId}`)
            return data.results
        },
        resolver: yupResolver(validateBankAccount),
        mode: 'all',
    })

    const {
        control: controlEducation,
        register: registerEducation,
        trigger: triggerEducation,
        handleSubmit: handleSubmitEducation,
        formState: { errors: errorsEducation },
    } = useForm({
        defaultValues: async () => {
            if (employeeId) {
                const { data } = await http(token).get(
                    `/employee/${employeeId}`
                )
                return data.results
                    ? data.results
                    : {
                          educations: [
                              {
                                  school_name: '',
                                  school_level: '',
                                  education_start_date: '',
                                  education_end_date: '',
                              },
                          ],
                      }
            }
        },
        resolver: yupResolver(validateEducation),
        mode: 'all',
    })

    const {
        control: controlWorkHistory,
        register: registerWorkHistory,
        trigger: triggerWorkHistory,
        handleSubmit: handleSubmitWorkHistory,
        formState: { errors: errorsWorkHistory },
    } = useForm({
        defaultValues: async () => {
            if (employeeId) {
                const { data } = await http(token).get(
                    `/employee/${employeeId}`
                )
                return data.results
                    ? data.results
                    : {
                          work_history: [
                              {
                                  company_name: '',
                                  position_name: '',
                                  work_history_start_date: '',
                                  work_history_end_date: '',
                              },
                          ],
                      }
            }
        },
        resolver: yupResolver(validateWorkHistory),
        mode: 'all',
    })

    const {
        control: controlBpjs,
        register: registerBpjs,
        trigger: triggerBpjs,
        handleSubmit: handleSubmitBpjs,
        formState: { errors: errorsBpjs },
    } = useForm({
        defaultValues: async () => {
            if (employeeId) {
                const { data } = await http(token).get(
                    `/employee/${employeeId}`
                )
                return data.results
                    ? data.results
                    : {
                          bpjs: [
                              {
                                  bpjs_name: '',
                                  bpjs_number: '',
                              },
                          ],
                      }
            }
        },
        resolver: yupResolver(validateBPJS),
        mode: 'all',
    })

    const {
        control: controlInsurance,
        register: registerInsurance,
        trigger: triggerInsurance,
        handleSubmit: handleSubmitInsurance,
        formState: { errors: errorsInsurance },
    } = useForm({
        defaultValues: async () => {
            if (employeeId) {
                const { data } = await http(token).get(
                    `/employee/${employeeId}`
                )
                return data.results
                    ? data.results
                    : {
                          insurance: [
                              {
                                  insurance_name: '',
                                  insurance_number: '',
                              },
                          ],
                      }
            }
        },
        resolver: yupResolver(validateInsurance),
        mode: 'all',
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control: controlEducation,
        name: 'educations',
    })

    const {
        fields: workHistoryFields,
        append: appendWorkHistory,
        remove: removeWorkHistory,
    } = useFieldArray({
        control: controlWorkHistory,
        name: 'work_history',
    })

    const {
        fields: bpjsFields,
        append: appendBpjs,
        remove: removeBpjs,
    } = useFieldArray({
        control: controlBpjs,
        name: 'bpjs',
    })

    const {
        fields: insuranceFields,
        append: appendInsurance,
        remove: removeInsurance,
    } = useFieldArray({
        control: controlInsurance,
        name: 'insurance',
    })

    const queryClient = useQueryClient()

    const editEmployee = useMutation({
        mutationFn: () => {
            const form = new FormData()
            if (selectedPicture) {
                form.append('profile_photo', selectedPicture)
            }
            form.append('name', employeeContent.name)
            form.append('nik_ktp', employeeContent.nik_ktp)
            form.append('employee_nik', employeeContent.employee_nik)
            form.append('npwp', employeeContent.npwp)
            form.append('birth_place', employeeContent.birth_place)
            form.append('age', employeeContent.age)
            form.append('religion', employeeContent.religion)
            form.append('gender', employeeContent.gender)
            form.append('email', employeeContent.email)
            form.append('password', employeeContent.password)
            form.append('phone_number', employeeContent.phone_number)
            form.append('marital_status', employeeContent.marital_status)
            form.append('employee_height', employeeContent.employee_height)
            form.append('employee_weight', employeeContent.employee_weight)
            form.append('blood_type', employeeContent.blood_type)
            form.append('batch', employeeContent.batch)
            form.append(
                'e_ktp_province_id',
                parseInt(employeeContent.e_ktp_province_id)
            )
            form.append(
                'e_ktp_regency_id',
                parseInt(employeeContent.e_ktp_regency_id)
            )
            form.append(
                'e_ktp_district_id',
                parseInt(employeeContent.e_ktp_district_id)
            )
            form.append(
                'e_ktp_village_id',
                parseInt(employeeContent.e_ktp_village_id)
            )
            form.append(
                'e_ktp_full_address',
                employeeContent.e_ktp_full_address
            )
            form.append('e_ktp_postal_code', employeeContent.e_ktp_postal_code)
            form.append(
                'domicile_province_id',
                parseInt(employeeContent.domicile_province_id)
            )
            form.append(
                'domicile_regency_id',
                parseInt(employeeContent.domicile_regency_id)
            )
            form.append(
                'domicile_district_id',
                parseInt(employeeContent.domicile_district_id)
            )
            form.append(
                'domicile_village_id',
                parseInt(employeeContent.domicile_village_id)
            )
            form.append(
                'domicile_full_address',
                employeeContent.domicile_full_address
            )
            form.append(
                'domicile_postal_code',
                employeeContent.domicile_postal_code
            )
            form.append('vaccine_status', employeeContent.vaccine_status)
            form.append('urgent_full_name', employeeContent.urgent_full_name)
            form.append(
                'urgent_phone_number',
                employeeContent.urgent_phone_number
            )
            form.append(
                'urgent_full_address',
                employeeContent.urgent_full_address
            )
            form.append('area_id', parseInt(employeeContent.area_id))
            form.append('branch_id', parseInt(employeeContent.branch_id))
            form.append(
                'departement_id',
                parseInt(employeeContent.departement_id)
            )
            form.append('position_id', parseInt(employeeContent.position_id))
            form.append('level_id', parseInt(employeeContent.level_id))
            form.append('employee_status', employeeContent.employee_status)
            form.append(
                'educations',
                JSON.stringify(employeeContent.educations, null, 2)
            )
            form.append(
                'work_history',
                JSON.stringify(employeeContent.work_history, null, 2)
            )
            form.append('urgent_brother', employeeContent.urgent_brother)
            form.append(
                'urgent_brother_number',
                employeeContent.urgent_brother_number
            )
            form.append('bpjs', JSON.stringify(employeeContent.bpjs, null, 2))
            form.append(
                'insurance',
                JSON.stringify(employeeContent.insurance, null, 2)
            )
            form.append('join_date', employeeContent.join_date)
            form.append('end_date', employeeContent.end_date)
            form.append('bank_name', employeeContent.bank_name)
            form.append('account_number', employeeContent.account_number)
            form.append('bank_owner_name', employeeContent.bank_owner_name)
            form.append('bank_branch_name', employeeContent.bank_branch_name)
            form.append(
                'driver_license',
                JSON.stringify(employeeContent.driver_license, null, 2)
            )
            form.append('resign_date', '')
            form.append('resign_applied_date', '')
            form.append('resign_reason', '')
            form.append('facebook', employeeContent.facebook)
            form.append('instagram', employeeContent.instagram)
            form.append('telegram', employeeContent.telegram)
            form.append('twitter', employeeContent.twitter)
            form.append('line', employeeContent.line)
            form.append('linkedin', employeeContent.linkedin)
            form.append('tiktok', employeeContent.tiktok)
            form.append('isEmployeeActive', 1)
            return http(token).patch(`/employee/${employeeId}`, form)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['active-employee'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah karyawan')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const religionOptions = [
        {
            value: 'Islam',
            label: 'Islam',
        },
        {
            value: 'Kristen',
            label: 'Kristen',
        },
        {
            value: 'Hindu',
            label: 'Hindu',
        },
    ]

    const genderOptions = [
        {
            value: 'Laki-Laki',
            label: 'Laki-Laki',
        },
        {
            value: 'Perempuan',
            label: 'Perempuan',
        },
    ]

    const maritalOptions = [
        {
            value: 'Menikah',
            label: 'Menikah',
        },
        {
            value: 'Belum Menikah',
            label: 'Belum Menikah',
        },
    ]

    const bloodOptions = [
        {
            value: 'A',
            label: 'A',
        },
        {
            value: 'B',
            label: 'B',
        },
    ]

    const driverLicenseOptions = [
        {
            value: 'SIM A',
            label: 'A',
        },
        {
            value: 'SIM B',
            label: 'B',
        },
    ]

    const graduationStatus = [
        {
            value: 'Lulus',
            label: 'Lulus',
        },
        {
            value: 'Tidak Lulus',
            label: 'Tidak Lulus',
        },
    ]

    const employeeStatus = [
        {
            value: 'Magang',
            label: 'Magang',
        },
        {
            value: 'Kontrak',
            label: 'Kontrak',
        },
        {
            value: 'Tetap',
            label: 'Tetap',
        },
    ]

    const schoolLevelOptions = [
        {
            value: 'SD',
            label: 'SD',
        },
        {
            value: 'SMP',
            label: 'SMP',
        },
        {
            value: 'SMA',
            label: 'SMA',
        },
    ]

    const workStatusData = [
        {
            value: 'Resign',
            label: 'Resign',
        },
        {
            value: 'PHK',
            label: 'PHK',
        },
    ]

    async function fetchProvince() {
        const { data } = await http(token).get('/province')
        return data.results
    }

    const { data: provinceData } = useQuery({
        queryKey: ['province'],
        queryFn: () => fetchProvince(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchRegencyById(id) {
        const { data } = await http(token).get(`/regency/${id}`)
        setRegencyData(data.results)
        return data.results
    }

    async function fetchDistrictById(id) {
        const { data } = await http(token).get(`/district/${id}`)
        setDistrictData(data.results)
        return data.results
    }

    async function fetchVillageById(id) {
        const { data } = await http(token).get(`/village/${id}`)
        setVillageData(data.results)
        return data.results
    }

    async function fetchProvinceDomicile() {
        const { data } = await http(token).get('/province')
        return data.results
    }

    const { data: provinceDomicileData } = useQuery({
        queryKey: ['province'],
        queryFn: () => fetchProvinceDomicile(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchDomicileRegencyById(id) {
        const { data } = await http(token).get(`/regency/${id}`)
        setDomicileRegencyValue(data.results)
        return data.results
    }

    async function fetchDomicileDistrictById(id) {
        const { data } = await http(token).get(`/district/${id}`)
        setDomicileDistrictValue(data.results)
        return data.results
    }

    async function fetchDomicileVillageById(id) {
        const { data } = await http(token).get(`/village/${id}`)
        setDomicileVillageValue(data.results)
        return data.results
    }

    async function fetchArea() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    async function fetchPositionOfWork() {
        const { data } = await http(token).get('/position-of-work')
        return data.results
    }

    const { data: positionData } = useQuery({
        queryKey: ['position-of-work'],
        queryFn: () => fetchPositionOfWork(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const { data: areaData } = useQuery({
        queryKey: ['area'],
        queryFn: () => fetchArea(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchBranch() {
        const { data } = await http(token).get('/branch')
        return data.results
    }

    const { data: branchData } = useQuery({
        queryKey: ['branch'],
        queryFn: () => fetchBranch(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchDivision() {
        const { data } = await http(token).get('/division')
        return data.results
    }

    const { data: divisionData } = useQuery({
        queryKey: ['division'],
        queryFn: () => fetchDivision(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchLevel() {
        const { data } = await http(token).get('/level')
        return data.results
    }

    const { data: levelData } = useQuery({
        queryKey: ['level'],
        queryFn: () => fetchLevel(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchBank() {
        const { data } = await http(token).get('/bank?limit=100')
        return data.results
    }

    const { data: bankData } = useQuery({
        queryKey: ['bank'],
        queryFn: () => fetchBank(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchBpjs() {
        const { data } = await http(token).get('/bpjs?limit=100')
        return data.results
    }

    const { data: bpjsData } = useQuery({
        queryKey: ['bpjs'],
        queryFn: () => fetchBpjs(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchInsurance() {
        const { data } = await http(token).get('/insurance?limit=100')
        return data.results
    }

    const { data: insuranceData } = useQuery({
        queryKey: ['insurance'],
        queryFn: () => fetchInsurance(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchVaccineStatus() {
        const { data } = await http(token).get('/vaccine?limit=100')
        return data.results
    }

    const { data: vaccineData } = useQuery({
        queryKey: ['vaccine'],
        queryFn: () => fetchVaccineStatus(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const styles = {
        control: (provided) => ({
            ...provided,
            padding: '0px',
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                border: 'none',
            },
        }),
        placeholder: (provided, state) => ({
            ...provided,
            padding: '0px',
        }),
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        setProfileValue('profile_photo', 'Has a value')
        clearErrorsProfile('profile_photo')
        fileToDataUrl(file)
    }

    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }

    const selectedEktpProvince = watchAddress('e_ktp_province_id')
    const selectedEktpRegency = watchAddress('e_ktp_regency_id')
    const selectedEktpDistrict = watchAddress('e_ktp_district_id')

    const selectedDomicileProvince = watchAddress('domicile_province_id')
    const selectedDomicileRegency = watchAddress('domicile_regency_id')
    const selectedDomicileDistrict = watchAddress('domicile_district_id')

    useEffect(() => {
        if (selectedEktpProvince) {
            fetchRegencyById(parseInt(selectedEktpProvince))
        }
        if (selectedEktpRegency) {
            fetchDistrictById(parseInt(selectedEktpRegency))
        }
        if (selectedEktpDistrict) {
            fetchVillageById(parseInt(selectedEktpDistrict))
        }
        if (selectedDomicileProvince) {
            fetchDomicileRegencyById(parseInt(selectedDomicileProvince))
        }
        if (selectedDomicileRegency) {
            fetchDomicileDistrictById(parseInt(selectedDomicileRegency))
        }
        if (selectedDomicileDistrict) {
            fetchDomicileVillageById(parseInt(selectedDomicileDistrict))
        }
    }, [
        selectedEktpProvince,
        selectedEktpRegency,
        selectedEktpDistrict,
        selectedDomicileProvince,
        selectedDomicileRegency,
        selectedDomicileDistrict,
    ])

    const [currentStep, setCurrentStep] = useState(0)

    const totalSteps = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
    ]

    const onSubmitProfile = (data) => {
        setEmployeeContent(data)
    }
    const onSubmitEmergency = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitAddress = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitEducation = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitEmployeeProfile = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitSocialMedia = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitWorkHistory = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitBankAccount = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitBpjs = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
    }
    const onSubmitInsurance = (data) => {
        setEmployeeContent((prevData) => ({ ...prevData, ...data }))
        setShowViewModal(false)
        dispatch(setLoading(true))
        editEmployee.mutate()
    }

    const nextStep = async () => {
        if (errorsProfile.profile_photo) {
            alert('Foto Profil harap diisi')
        }
        if (currentStep === 0) {
            const triggerProfileData = await triggerProfile()
            if (triggerProfileData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 1) {
            const triggerEmergencyData = await triggerEmergency()
            if (triggerEmergencyData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 2) {
            const triggerAddressData = await triggerAddress()
            if (triggerAddressData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 3) {
            const triggerEducationData = await triggerEducation()
            if (triggerEducationData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 4) {
            const triggerEmployeeProfileData = await triggerEmployeeProfile()
            if (triggerEmployeeProfileData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 5) {
            const triggerSocialMediaData = await triggerSocialMedia()
            if (triggerSocialMediaData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 6) {
            const triggerWorkHistoryData = await triggerWorkHistory()
            if (triggerWorkHistoryData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 7) {
            const triggerBankAccountData = await triggerBankAccount()
            if (triggerBankAccountData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 8) {
            const triggerBpjsData = await triggerBpjs()
            if (triggerBpjsData) {
                setCurrentStep(currentStep + 1)
            }
        }

        if (currentStep === 9) {
            const triggerInsuranceData = await triggerInsurance()
            if (triggerInsuranceData) {
                if (currentStep === totalSteps.length - 1) {
                    handleSubmitProfile(onSubmitProfile)()
                    handleSubmitEmergency(onSubmitEmergency)()
                    handleSubmitAddress(onSubmitAddress)()
                    handleSubmitEducation(onSubmitEducation)()
                    handleSubmitEmployeeProfile(onSubmitEmployeeProfile)()
                    handleSubmitSocialMedia(onSubmitSocialMedia)()
                    handleSubmitWorkHistory(onSubmitWorkHistory)()
                    handleSubmitBankAccount(onSubmitBankAccount)()
                    handleSubmitBpjs(onSubmitBpjs)()
                    handleSubmitInsurance(onSubmitInsurance)()
                } else {
                    setCurrentStep(currentStep + 1)
                }
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const isDetail = true

    return (
        <Card>
            {currentStep === 0 && (
                <EmployeeBiodataForm
                    employeeData={employeeData}
                    selectedPicture={selectedPicture}
                    pictureURI={pictureURI}
                    handleFileChange={handleFileChange}
                    register={registerProfile}
                    errors={errorsProfile}
                    genderOptions={genderOptions}
                    religionOptions={religionOptions}
                    maritalOptions={maritalOptions}
                    bloodOptions={bloodOptions}
                    vaccineData={vaccineData}
                    control={controlProfile}
                    driverLicenseOptions={driverLicenseOptions}
                    styles={styles}
                    steps={totalSteps}
                    stepNumber={currentStep}
                    isDetail={isDetail}
                    selectedSIM={selectedSIM}
                />
            )}
            {currentStep === 1 && (
                <FormKontakDarurat
                    register={registerEmergency}
                    errors={errorsEmergency}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 2 && (
                <FormAlamat
                    styles={styles}
                    register={registerAddress}
                    errors={errorsAddress}
                    provinceData={provinceData}
                    regencyValue={regencyValue}
                    districtValue={districtValue}
                    villageValue={villageValue}
                    provinceDomicileData={provinceDomicileData}
                    domicileRegencyValue={domicileRegencyValue}
                    domicileDistrictValue={domicileDistrictValue}
                    domicileVillageValue={domicileVillageValue}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 3 && (
                <FormPendidikan
                    educationFields={educationFields}
                    register={registerEducation}
                    errors={errorsEducation}
                    schoolLevelOptions={schoolLevelOptions}
                    control={controlEducation}
                    graduationStatus={graduationStatus}
                    appendEducation={appendEducation}
                    removeEducation={removeEducation}
                    styles={styles}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 4 && (
                <FormInfoKaryawan
                    register={registerEmployeeProfile}
                    errors={errorsEmployeeProfile}
                    styles={styles}
                    employeeStatus={employeeStatus}
                    control={controlEmployeeProfile}
                    areaData={areaData}
                    branchData={branchData}
                    divisionData={divisionData}
                    positionData={positionData}
                    levelData={levelData}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 5 && (
                <FormSosialMedia
                    register={registerSocialMedia}
                    errors={errorsSocialMedia}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 6 && (
                <FormPengalamanKerja
                    workHistoryFields={workHistoryFields}
                    register={registerWorkHistory}
                    errors={errorsWorkHistory}
                    styles={styles}
                    control={controlWorkHistory}
                    workStatusData={workStatusData}
                    positionData={positionData}
                    appendWorkHistory={appendWorkHistory}
                    removeWorkHistory={removeWorkHistory}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 7 && (
                <FormInputBank
                    register={registerBankAccount}
                    errors={errorsBankAccount}
                    bankData={bankData}
                    styles={styles}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 8 && (
                <FormInputBpjs
                    bpjsFields={bpjsFields}
                    bpjsData={bpjsData}
                    register={registerBpjs}
                    errors={errorsBpjs}
                    appendBpjs={appendBpjs}
                    removeBpjs={removeBpjs}
                    styles={styles}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 9 && (
                <FormInputAsuransi
                    insuranceFields={insuranceFields}
                    register={registerInsurance}
                    insuranceData={insuranceData}
                    appendInsurance={appendInsurance}
                    removeInsurance={removeInsurance}
                    styles={styles}
                    errors={errorsInsurance}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            <div className="w-full flex gap-5 mt-5 justify-end">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={prevStep}
                >
                    Kembali
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={nextStep}
                >
                    Selanjutnya
                </button>
            </div>
        </Card>
    )
}

export default DetailEmployeeForm
