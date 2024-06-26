import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import Card from '@/components/ui/Card'
import EmployeeBiodataForm from '../form-biodata-karyawan/page'
import FormKontakDarurat from '../form-kontak-darurat/page'
import FormAlamat from '../form-alamat-sesuai-ktp/page'
import FormPendidikan from '../form-pendidikan/page'
import FormInfoKaryawan from '../form-info-karyawan/page'
import FormSosialMedia from '../form-sosial-media/page'
import FormPengalamanKerja from '../form-input-perusahaan/page'
import FormInputBank from '../form-input-bank/page'
import FormInputBpjs from '../form-input-bpjs/page'
import FormInputAsuransi from '../form-input-asuransi/page'
import { yupResolver } from '@hookform/resolvers/yup'

const AddEmployeeForm = ({ setShowAddModal }) => {
    const token = getCookie('token')
    const [regencyValue, setRegencyData] = useState([])
    const [districtValue, setDistrictData] = useState([])
    const [villageValue, setVillageData] = useState([])
    const [domicileRegencyValue, setDomicileRegencyValue] = useState([])
    const [domicileDistrictValue, setDomicileDistrictValue] = useState([])
    const [domicileVillageValue, setDomicileVillageValue] = useState([])
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [pictureURI, setPictureURI] = useState('')
    const dispatch = useDispatch()

    const validateProfile = yup.object({
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
        control: controlEmployeeProfile,
        register: registerEmployeeProfile,
        trigger: triggerEmployeeProfile,
        handleSubmit: handleSumbitEmployeeProfile,
        watch: watchEmployeeProfile,
        formState: { errors: errorsEmployeeProfile },
    } = useForm({
        resolver: yupResolver(validateEmployeeProfile),
        mode: 'all',
    })

    const {
        control: controlEmergency,
        register: registerEmergency,
        trigger: triggerEmergency,
        handleSubmit: handleSubmitEmergency,
        watch: watchEmergency,
        formState: { errors: errorsEmergency },
    } = useForm({
        resolver: yupResolver(validateEmergency),
        mode: 'all',
    })

    const {
        control: controlAddress,
        register: registerAddress,
        trigger: triggerAddress,
        handleSubmit: handleSubmitAddress,
        watch: watchAddress,
        formState: { errors: errorsAddress },
    } = useForm({
        resolver: yupResolver(validateAddress),
        mode: 'all',
    })

    const {
        control: controlEducation,
        watch: watchEducation,
        register: registerEducation,
        getValues: getValuesEducation,
        formState: { errors: errorsEducation },
    } = useForm({
        defaultValues: {
            educations: [
                {
                    school_name: '',
                    school_level: '',
                    education_start_date: '',
                    education_end_date: '',
                },
            ],
        },
        resolver: yupResolver(validateEducation),
        mode: 'all',
    })

    const {
        control: controlWorkHistory,
        watch: watchWorkHistory,
        register: registerWorkHistory,
        getValues: getValuesWorkHistory,
        formState: { errors: errorsWorkHistory },
    } = useForm({
        defaultValues: {
            work_history: [
                {
                    company_name: '',
                    position_name: '',
                    work_history_start_date: '',
                    work_history_end_date: '',
                },
            ],
        },
        resolver: yupResolver(validateWorkHistory),
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

    const queryClient = useQueryClient()

    const editEmployee = useMutation({
        mutationFn: (data) => {
            const form = new FormData()

            if (selectedPicture) {
                form.append('profile_photo', selectedPicture)
            }
            form.append('name', data.name)
            form.append('nik_ktp', data.nik_ktp)
            form.append('employee_nik', data.employee_nik)
            form.append('npwp', data.npwp)
            form.append('birth_place', data.birth_place)
            form.append('age', data.age)
            form.append('religion', data.religion)
            form.append('gender', data.gender)
            form.append('email', data.email)
            form.append('password', data.password)
            form.append('phone_number', data.phone_number)
            form.append('marital_status', data.marital_status)
            form.append('employee_height', data.employee_height)
            form.append('employee_weight', data.employee_weight)
            form.append('blood_type', data.blood_type)
            form.append('batch', data.batch)
            form.append('e_ktp_province_id', parseInt(data.e_ktp_province_id))
            form.append('e_ktp_regency_id', parseInt(data.e_ktp_regency_id))
            form.append('e_ktp_district_id', parseInt(data.e_ktp_district_id))
            form.append('e_ktp_village_id', parseInt(data.e_ktp_village_id))
            form.append('e_ktp_full_address', data.e_ktp_full_address)
            form.append('e_ktp_postal_code', data.e_ktp_postal_code)
            form.append(
                'domicile_province_id',
                parseInt(data.domicile_province_id)
            )
            form.append(
                'domicile_regency_id',
                parseInt(data.domicile_regency_id)
            )
            form.append(
                'domicile_district_id',
                parseInt(data.domicile_district_id)
            )
            form.append(
                'domicile_village_id',
                parseInt(data.domicile_village_id)
            )
            form.append('domicile_full_address', data.domicile_full_address)
            form.append('domicile_postal_code', data.domicile_postal_code)
            form.append('vaccine_status', data.vaccine_status)
            form.append('urgent_full_name', data.urgent_full_name)
            form.append('urgent_phone_number', data.urgent_phone_number)
            form.append('urgent_full_address', data.urgent_full_address)
            form.append('area_id', parseInt(data.area_id))
            form.append('branch_id', parseInt(data.branch_id))
            form.append('departement_id', parseInt(data.departement_id))
            form.append('position_id', parseInt(data.position_id))
            form.append('level_id', parseInt(data.level_id))
            form.append('employee_status', data.employee_status)
            form.append(
                'educations',
                JSON.stringify({ educations: data.educations }, null, 2)
            )
            form.append(
                'work_history',
                JSON.stringify({ work_history: data.work_history }, null, 2)
            )
            form.append('urgent_brother', data.urgent_brother)
            form.append('urgent_brother_number', data.urgent_brother_number)
            form.append('bpjs', JSON.stringify({ bpjs: data.bpjs }, null, 2))
            form.append(
                'insurance',
                JSON.stringify({ insurance: data.insurance }, null, 2)
            )
            form.append('join_date', data.join_date)
            form.append('end_date', data.end_date)
            form.append('bank_name', data.bank_name)
            form.append('account_number', data.account_number)
            form.append('bank_owner_name', data.bank_owner_name)
            form.append('bank_branch_name', data.bank_branch_name)
            form.append(
                'driver_license',
                JSON.stringify(data.driver_license, null, 2)
            )
            form.append('resign_date', '')
            form.append('resign_applied_date', '')
            form.append('resign_reason', '')
            form.append('facebook', data.facebook)
            form.append('instagram', data.instagram)
            form.append('telegram', data.telegram)
            form.append('twitter', data.twitter)
            form.append('line', data.line)
            form.append('linkedin', data.linkedin)
            form.append('tiktok', data.tiktok)
            form.append('isEmployeeActive', 1)
            return http(token).post('/employee', form)
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
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

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

    const employeeData = getValues()

    const onSubmit = (data) => {
        setShowAddModal(false)
        editEmployee.mutate(data)
        dispatch(setLoading(true))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }

    const selectedEktpProvince = watch('e_ktp_province_id')
    const selectedEktpRegency = watch('e_ktp_regency_id')
    const selectedEktpDistrict = watch('e_ktp_district_id')

    const selectedDomicileProvince = watch('domicile_province_id')
    const selectedDomicileRegency = watch('domicile_regency_id')
    const selectedDomicileDistrict = watch('domicile_district_id')

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

    const nextStep = async () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <Card>
            {currentStep === 0 && (
                <EmployeeBiodataForm
                    employeeData={employeeData}
                    selectedPicture={selectedPicture}
                    pictureURI={pictureURI}
                    handleFileChange={handleFileChange}
                    register={register}
                    errors={errors}
                    genderOptions={genderOptions}
                    religionOptions={religionOptions}
                    maritalOptions={maritalOptions}
                    bloodOptions={bloodOptions}
                    vaccineData={vaccineData}
                    control={control}
                    driverLicenseOptions={driverLicenseOptions}
                    styles={styles}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 1 && (
                <FormKontakDarurat
                    register={register}
                    errors={errors}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 2 && (
                <FormAlamat
                    styles={styles}
                    register={register}
                    errors={errors}
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
                    register={register}
                    errors={errors}
                    schoolLevelOptions={schoolLevelOptions}
                    control={control}
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
                    register={register}
                    errors={errors}
                    styles={styles}
                    employeeStatus={employeeStatus}
                    control={control}
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
                    register={register}
                    errors={errors}
                    steps={totalSteps}
                    stepNumber={currentStep}
                />
            )}
            {currentStep === 6 && (
                <FormPengalamanKerja
                    workHistoryFields={workHistoryFields}
                    register={register}
                    errors={errors}
                    styles={styles}
                    control={control}
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
                    register={register}
                    errors={errors}
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
                    register={register}
                    errors={errors}
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
                    register={register}
                    insuranceData={insuranceData}
                    appendInsurance={appendInsurance}
                    removeInsurance={removeInsurance}
                    styles={styles}
                    errors={errors}
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

export default AddEmployeeForm
