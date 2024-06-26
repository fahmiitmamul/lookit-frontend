import React from 'react'
import Textinput from '@/components/ui/Textinput'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import Select from '@/components/ui/Select'
import ReactSelect from 'react-select'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import Button from '@/components/ui/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Fileinput from '@/components/ui/Fileinput'
import Card from '@/components/ui/Card'

const DetailEmployeeForm = ({ setShowViewModal }) => {
    const token = getCookie('token')
    const [regencyValue, setRegencyData] = useState([])
    const [districtValue, setDistrictData] = useState([])
    const [villageValue, setVillageData] = useState([])
    const [domicileRegencyValue, setDomicileRegencyValue] = useState([])
    const [domicileDistrictValue, setDomicileDistrictValue] = useState([])
    const [domicileVillageValue, setDomicileVillageValue] = useState([])
    const [selectedDriverLicense, setSelectedDriverLicense] = useState([])
    const [selectedPicture, setSelectedPicture] = useState(null)
    const employeeId = useSelector(
        (state) => state.employee.employee.employee_id
    )

    const FormValidationSchema = yup.object({
        npwp: yup.string().required('Harap diisi'),
        account_number: yup.string().required('Harap diisi'),
        area_id: yup.string().required('Harap diisi'),
        bank_name: yup.string().required('Harap diisi'),
        bank_owner_name: yup.string().required('Harap diisi'),
        bank_branch_name: yup.string().required('Harap diisi'),
        batch: yup.string().required('Harap diisi'),
        age: yup.string().required('Harap diisi'),
        birth_place: yup.string().required('Harap diisi'),
        blood_type: yup.string().required('Harap diisi'),
        branch_id: yup.string().required('Harap diisi'),
        departement_id: yup.string().required('Harap diisi'),
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
        email: yup.string().required('Harap diisi'),
        employee_nik: yup.string().required('Harap diisi'),
        employee_status: yup.string().required('Harap diisi'),
        employee_weight: yup.string().required('Harap diisi'),
        employee_height: yup.string().required('Harap diisi'),
        end_date: yup.string().required('Harap diisi'),
        facebook: yup.string().required('Harap diisi'),
        gender: yup.string().required('Harap diisi'),
        instagram: yup.string().required('Harap diisi'),
        join_date: yup.string().required('Harap diisi'),
        end_date: yup.string().required('Harap diisi'),
        level_id: yup.string().required('Harap diisi'),
        line: yup.string().required('Harap diisi'),
        linkedin: yup.string().required('Harap diisi'),
        marital_status: yup.string().required('Harap diisi'),
        name: yup.string().required('Harap diisi'),
        nik_ktp: yup.string().required('Harap diisi'),
        npwp: yup.string().required('Harap diisi'),
        phone_number: yup.string().required('Harap diisi'),
        religion: yup.string().required('Harap diisi'),
        resign_applied_date: yup.string().required('Harap diisi'),
        resign_date: yup.string().required('Harap diisi'),
        resign_reason: yup.string().required('Harap diisi'),
        telegram: yup.string().required('Harap diisi'),
        twitter: yup.string().required('Harap diisi'),
        tiktok: yup.string().required('Harap diisi'),
        urgent_brother: yup.string().required('Harap diisi'),
        urgent_brother_number: yup.string().required('Harap diisi'),
        urgent_full_address: yup.string().required('Harap diisi'),
        urgent_full_name: yup.string().required('Harap diisi'),
        urgent_phone_number: yup.string().required('Harap diisi'),
        vaccine_status: yup.string().required('Harap diisi'),
        position_id: yup.string().required('Harap diisi'),
        driver_license: yup
            .array()
            .min(1, 'Harap diisi')
            .required('Harap diisi'),

        education: yup.array().of(
            yup.object().shape({
                school_name: yup.string().required('Harap diisi'),
                school_level: yup.string().required('Harap diisi'),
                education_start_date: yup.string().required('Harap diisi'),
                education_end_date: yup.string().required('Harap diisi'),
                graduation_status: yup.string().required('Harap diisi'),
            })
        ),
        work_history: yup.array().of(
            yup.object().shape({
                company_name: yup.string().required('Harap diisi'),
                position_name: yup.string().required('Harap diisi'),
                work_history_start_date: yup.string().required('Harap diisi'),
                work_history_end_date: yup.string().required('Harap diisi'),
                work_status: yup.string().required('Harap diisi'),
            })
        ),
        bpjs: yup.array().of(
            yup.object().shape({
                bpjs_name: yup.string().required('Harap diisi'),
                bpjs_number: yup.string().required('Harap diisi'),
            })
        ),
        insurance: yup.array().of(
            yup.object().shape({
                insurance_name: yup.string().required('Harap diisi'),
                insurance_number: yup.string().required('Harap diisi'),
            })
        ),
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
    const vaccineOptions = [
        {
            value: 'Vaksin Pertama (I)',
            label: 'Vaksin Pertama (I)',
        },
        {
            value: 'Vaksin Kedua (II)',
            label: 'Vaksin Kedua (II)',
        },
        {
            value: 'Vaksin Ketiga (III)',
            label: 'Vaksin Ketiga (III)',
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

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const {
        control,
        register,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            try {
                const { data } = await http(token).get(
                    `/employee/${employeeId}`
                )
                await Promise.all([
                    fetchRegencyById(data.results.e_ktp_province_id),
                    fetchDistrictById(data.results.e_ktp_regency_id),
                    fetchVillageById(data.results.e_ktp_district_id),
                    fetchDomicileRegencyById(data.results.domicile_province_id),
                    fetchDomicileDistrictById(data.results.domicile_regency_id),
                    fetchDomicileVillageById(data.results.domicile_district_id),
                ])

                const parsedData = {
                    ...data.results,
                    educations: data.results.educations.educations,
                    work_history: data.results.work_history.work_history,
                    bpjs: data.results.bpjs.bpjs,
                    insurance: data.results.insurance.insurance,
                    driver_license: data.results.driver_license,
                }
                setSelectedDriverLicense(data.results.driver_license)
                return parsedData
            } catch (err) {
                console.log('Error')
            }
        },
        resolver: yupResolver(FormValidationSchema),
        mode: 'onChange',
    })

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control: control,
        name: 'educations',
    })

    const {
        fields: workHistoryFields,
        append: appendWorkHistory,
        remove: removeWorkHistory,
    } = useFieldArray({
        control: control,
        name: 'work_history',
    })

    const {
        fields: bpjsFields,
        append: appendBpjs,
        remove: removeBpjs,
    } = useFieldArray({
        control: control,
        name: 'bpjs',
    })

    const {
        fields: insuranceFields,
        append: appendInsurance,
        remove: removeInsurance,
    } = useFieldArray({
        control: control,
        name: 'insurance',
    })

    const employeeData = getValues()

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

    return (
        <Card>
            <form className="lg:grid-cols-1 grid gap-5 grid-cols-1 rounded-md">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <h6 className="font-bold">Profil Karyawan</h6>
                    </div>
                    <div></div>
                    <div className="flex gap-5">
                        <div className="flex flex-col justify-center items-center gap-5 max-w-48">
                            <div>
                                {employeeData?.profile_photo &&
                                !selectedPicture ? (
                                    <div>
                                        <Image
                                            src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${employeeData?.profile_photo}`}
                                            width={200}
                                            height={200}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        ></Image>
                                    </div>
                                ) : selectedPicture ? (
                                    <div>
                                        <Image
                                            src={pictureURI}
                                            width={200}
                                            height={200}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        ></Image>
                                    </div>
                                ) : (
                                    <div className="border w-[160px] h-[160px] flex justify-center items-center">
                                        Pilih File
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Textinput
                                label="NIK"
                                type="number"
                                placeholder="Masukkan NIK"
                                name="nik_ktp"
                                register={register}
                                error={errors.nik_ktp}
                            />
                            <Textinput
                                label="NPWP"
                                type="number"
                                placeholder="Masukkan NPWP"
                                name="npwp"
                                register={register}
                                error={errors.npwp}
                            />

                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Jenis Kelamin
                                </label>
                                <Select
                                    className="react-select"
                                    name="gender"
                                    register={register}
                                    options={genderOptions}
                                    styles={styles}
                                    id="gender"
                                    error={errors.gender}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Textinput
                            label="Nama"
                            type="text"
                            disabled
                            placeholder="Masukkan Nama"
                            name="name"
                            register={register}
                            error={errors.name}
                        />
                        <Textinput
                            label="Tempat Tanggal Lahir"
                            type="text"
                            disabled
                            placeholder="Masukkan Tempat Tanggal Lahir"
                            name="birth_place"
                            register={register}
                            error={errors.birth_place}
                        />
                        <div>
                            <label htmlFor="religion" className="form-label">
                                Agama
                            </label>
                            <Select
                                className="react-select"
                                disabled
                                name="religion"
                                register={register}
                                options={religionOptions}
                                styles={styles}
                                id="religion"
                                error={errors.religion}
                            />
                        </div>
                    </div>
                    <Textinput
                        label="Nomor Telepon"
                        type="text"
                        disabled
                        placeholder="Masukkan Nomor Telepon"
                        name="phone_number"
                        register={register}
                        error={errors.phone_number}
                    />
                    <Textinput
                        label="Email"
                        type="text"
                        disabled
                        placeholder="Masukkan Email"
                        name="email"
                        register={register}
                        error={errors.email}
                    />
                    <Textinput
                        label="Berat Badan"
                        type="text"
                        disabled
                        placeholder="Masukkan Berat Badan"
                        name="employee_weight"
                        register={register}
                        error={errors.employee_weight}
                    />
                    <Textinput
                        label="Tinggi Badan"
                        type="text"
                        disabled
                        placeholder="Masukkan Tinggi Badan"
                        name="employee_height"
                        register={register}
                        error={errors.employee_height}
                    />
                    <Textinput
                        label="Umur"
                        type="number"
                        placeholder="Masukkan Umur"
                        name="age"
                        register={register}
                        error={errors.age}
                    />
                    <div>
                        <label htmlFor="marital_status" className="form-label">
                            Status Nikah
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="marital_status"
                            register={register}
                            options={maritalOptions}
                            styles={styles}
                            id="marital_status"
                            error={errors.marital_status}
                        />
                    </div>
                    <div>
                        <label htmlFor="blood_type" className="form-label">
                            Golongan Darah
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="blood_type"
                            register={register}
                            options={bloodOptions}
                            styles={styles}
                            id="blood_type"
                            error={errors.blood_type}
                        />
                    </div>
                    <div>
                        <label htmlFor="vaccine_status" className="form-label">
                            Status Vaksin
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="vaccine_status"
                            register={register}
                            options={vaccineOptions}
                            styles={styles}
                            id="vaccine_status"
                            error={errors.vaccine_status}
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="driver_license">
                            SIM
                        </label>
                        <Controller
                            name="driver_license"
                            control={control}
                            render={({
                                field: { onChange },
                                ...fieldProps
                            }) => (
                                <ReactSelect
                                    {...fieldProps}
                                    styles={styles}
                                    isMulti
                                    isDisabled
                                    value={employeeData.driver_license}
                                    name="driver_license"
                                    options={driverLicenseOptions}
                                    className={
                                        errors?.driver_license
                                            ? 'border-danger-500 border rounded-md'
                                            : 'react-select'
                                    }
                                    id="driver_license"
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions)
                                    }}
                                />
                            )}
                        />
                        {errors?.driver_license && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.driver_license?.message}
                            </div>
                        )}
                    </div>
                    <div></div>
                </div>
                <div>
                    <h6 className="font-bold">Pendidikan</h6>
                </div>
                <div></div>
                <div>
                    {educationFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={item.id}
                        >
                            <Textinput
                                label="Nama"
                                type="text"
                                disabled
                                placeholder="Nama Sekolah"
                                register={register}
                                name={`education[${index}].school_name`}
                                error={errors?.education?.[index]?.school_name}
                                defaultValue={item.school_name}
                            />
                            <div>
                                <label
                                    htmlFor="school_level"
                                    className="form-label"
                                >
                                    Pendidikan
                                </label>
                                <Select
                                    className="react-select"
                                    disabled
                                    register={register}
                                    name={`education[${index}].school_level`}
                                    defaultValue={item.school_level}
                                    options={schoolLevelOptions}
                                    styles={styles}
                                    id="school_level"
                                    error={
                                        errors?.education?.[index]?.school_level
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Mulai
                                </label>
                                <Controller
                                    disabled
                                    name={`education[${index}].education_start_date`}
                                    defaultValue={item.education_start_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.education?.[index]
                                                    ?.education_start_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.education?.[index]
                                    ?.education_start_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.education?.[index]
                                                ?.education_start_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Akhir
                                </label>
                                <Controller
                                    disabled
                                    name={`education[${index}].education_end_date`}
                                    defaultValue={item.education_end_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.education?.[index]
                                                    ?.education_end_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.education?.[index]
                                    ?.education_end_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.education?.[index]
                                                ?.education_end_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="graduation_status"
                                    className="form-label"
                                >
                                    Status
                                </label>
                                <Select
                                    className="react-select"
                                    disabled
                                    name={`education[${index}].graduation_status`}
                                    defaultValue={item.graduation_status}
                                    register={register}
                                    options={graduationStatus}
                                    styles={styles}
                                    id="graduation_status"
                                    error={
                                        errors?.education?.[index]
                                            ?.graduation_status
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h6 className="font-bold">Pengalaman Kerja</h6>
                </div>
                <div></div>
                <div>
                    {workHistoryFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-5 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={index}
                        >
                            <Textinput
                                label="Nama Perusahaan"
                                type="text"
                                disabled
                                id="company_name"
                                placeholder="Nama Perusahaan"
                                register={register}
                                name={`work_history[${index}].company_name`}
                                defaultValue={item.company_name}
                                error={
                                    errors?.work_history?.[index]?.company_name
                                }
                            />
                            <div>
                                <label
                                    htmlFor="position_name"
                                    className="form-label"
                                >
                                    Jabatan
                                </label>
                                <Select
                                    className="react-select"
                                    disabled
                                    styles={styles}
                                    name={`work_history[${index}].position_name`}
                                    defaultValue={item.position_name}
                                    register={register}
                                    options={[
                                        ...(positionData?.data?.map((item) => ({
                                            value: item?.position_name,
                                            label: item?.position_name,
                                        })) || []),
                                    ]}
                                    id="position_name"
                                    error={
                                        errors?.work_history?.[index]
                                            ?.position_name
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Mulai
                                </label>
                                <Controller
                                    disabled
                                    name={`work_history[${index}].work_history_start_date`}
                                    defaultValue={item.work_history_start_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.work_history?.[index]
                                                    ?.work_history_start_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.work_history?.[index]
                                    ?.work_history_start_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.work_history?.[index]
                                                ?.work_history_start_date
                                                ?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Akhir
                                </label>
                                <Controller
                                    disabled
                                    name={`work_history[${index}].work_history_end_date`}
                                    defaultValue={item.work_history_end_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.work_history?.[index]
                                                    ?.work_history_end_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.work_history?.[index]
                                    ?.work_history_end_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.work_history?.[index]
                                                ?.work_history_end_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="work_status"
                                    className="form-label"
                                >
                                    Status Kerja
                                </label>
                                <Select
                                    className="react-select"
                                    disabled
                                    options={workStatusData}
                                    register={register}
                                    name={`work_history[${index}].work_status`}
                                    defaultValue={item.work_status}
                                    styles={styles}
                                    id="work_status"
                                    error={
                                        errors?.work_history?.[index]
                                            ?.work_status
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h6 className="font-bold">Akun Bank</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="bank_name" className="form-label">
                            Pilih Bank
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="bank_name"
                            register={register}
                            options={[
                                ...(bankData?.data?.map((item) => ({
                                    value: item?.name,
                                    label: item?.name,
                                })) || []),
                            ]}
                            styles={styles}
                            id="bank_name"
                            error={errors.bank_name}
                        />
                    </div>
                    <Textinput
                        label="No Rekening"
                        type="text"
                        disabled
                        placeholder="Masukkan No Rekening"
                        name="account_number"
                        register={register}
                        error={errors.account_number}
                    />
                    <Textinput
                        label="Nama Bank"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Bank"
                        name="bank_branch_name"
                        register={register}
                        error={errors.bank_branch_name}
                    />
                    <Textinput
                        label="Nama Pemilik Rekening"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Pemilik Rekening"
                        name="bank_owner_name"
                        register={register}
                        error={errors.bank_owner_name}
                    />
                </div>
                <div>
                    <h6 className="font-bold">Data BPJS</h6>
                </div>
                <div>
                    {bpjsFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={index}
                        >
                            <div>
                                <label
                                    htmlFor={`bpjs[${index}].bpjs_type`}
                                    className="form-label"
                                >
                                    Pilih Tipe Bpjs
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    disabled
                                    name={`bpjs[${index}].bpjs_type`}
                                    defaultValue={item.bpjs_type}
                                    options={[
                                        ...(bpjsData?.data?.map((item) => ({
                                            value: item?.bpjs_type || '',
                                            label: item?.bpjs_type || '',
                                        })) || []),
                                    ]}
                                    styles={styles}
                                    id={`bpjs[${index}].bpjs_type`}
                                    error={errors?.bpjs?.[index]?.bpjs_type}
                                />
                            </div>
                            <div className="flex justify-between items-end space-x-5">
                                <div className="w-full">
                                    <Textinput
                                        label="Nomor BPJS"
                                        type="number"
                                        id="bpjs_number"
                                        disabled
                                        placeholder="Nomor BPJS"
                                        register={register}
                                        name={`bpjs[${index}].bpjs_number`}
                                        defaultValue={item.bpjs_number}
                                        error={
                                            errors?.bpjs?.[index]?.bpjs_number
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h6 className="font-bold">Data Asuransi</h6>
                </div>
                <div>
                    {insuranceFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={index}
                        >
                            <div>
                                <label
                                    htmlFor={`insurance[${index}].insurance_name`}
                                    className="form-label"
                                >
                                    Pilih Tipe Asuransi
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    disabled
                                    name={`insurance[${index}].insurance_name`}
                                    defaultValue={item.insurance_name}
                                    options={[
                                        ...(insuranceData?.data?.map(
                                            (item) => ({
                                                value:
                                                    item?.insurance_name || '',
                                                label:
                                                    item?.insurance_name || '',
                                            })
                                        ) || []),
                                    ]}
                                    styles={styles}
                                    id={`insurance[${index}].insurance_name`}
                                    error={
                                        errors?.insurance?.[index]
                                            ?.insurance_name
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-end space-x-5">
                                <div className="w-full">
                                    <Textinput
                                        label="Nomor Asuransi"
                                        type="text"
                                        disabled
                                        id="insurance_number"
                                        placeholder="Nomor Asuransi"
                                        register={register}
                                        name={`insurance[${index}].insurance_number`}
                                        defaultValue={item.insurance_number}
                                        error={
                                            errors?.insurance?.[index]
                                                ?.insurance_number
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h6 className="font-bold">Sosial Media</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Facebook"
                        type="text"
                        disabled
                        placeholder="Masukkan Facebook"
                        name="facebook"
                        register={register}
                        error={errors.facebook}
                    />
                    <Textinput
                        label="Instagram"
                        type="text"
                        disabled
                        placeholder="Masukkan Instagram"
                        name="instagram"
                        register={register}
                        error={errors.instagram}
                    />
                    <Textinput
                        label="Telegram"
                        type="text"
                        disabled
                        placeholder="Masukkan Telegram"
                        name="telegram"
                        register={register}
                        error={errors.telegram}
                    />
                    <Textinput
                        label="Twitter"
                        type="text"
                        disabled
                        placeholder="Masukkan Twitter"
                        name="twitter"
                        register={register}
                        error={errors.twitter}
                    />
                    <Textinput
                        label="Line"
                        type="text"
                        disabled
                        placeholder="Masukkan Line"
                        name="line"
                        register={register}
                        error={errors.line}
                    />
                    <Textinput
                        label="LinkedIn"
                        type="text"
                        disabled
                        placeholder="Masukkan LinkedIn"
                        name="linkedin"
                        register={register}
                        error={errors.linkedin}
                    />
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Tiktok"
                            type="text"
                            disabled
                            placeholder="Masukkan Tiktok"
                            name="tiktok"
                            register={register}
                            error={errors.tiktok}
                        />
                    </div>
                    <div></div>
                </div>
                <div>
                    <h6 className="font-bold">Kontak Darurat</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Orang Tua"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Orang Tua"
                        name="urgent_full_name"
                        register={register}
                        error={errors.urgent_full_name}
                    />
                    <Textinput
                        label="Nama Saudara"
                        type="text"
                        disabled
                        placeholder="Masukkan Nama Saudara"
                        name="urgent_brother"
                        register={register}
                        error={errors.urgent_brother}
                    />
                    <Textinput
                        label="Nomor Handphone Orang Tua"
                        type="text"
                        disabled
                        placeholder="Masukkan Nomor Handphone Orang Tua"
                        name="urgent_phone_number"
                        register={register}
                        error={errors.urgent_phone_number}
                    />
                    <Textinput
                        label="Nomor Handphone Saudara"
                        type="text"
                        disabled
                        placeholder="Masukkan Nomor Handphone Saudara"
                        name="urgent_brother_number"
                        register={register}
                        error={errors.urgent_brother_number}
                    />
                </div>
                <div>
                    <Textarea
                        label="Alamat Lengkap"
                        type="text"
                        disabled
                        name="urgent_full_address"
                        register={register}
                        id="df"
                        placeholder="Alamat Lengkap"
                        error={errors.urgent_full_address}
                    />
                </div>
                <div>
                    <h6 className="font-bold">Alamat Lengkap Sesuai E-KTP</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="e_ktp_province_id"
                            className="form-label"
                        >
                            Provinsi
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            register={register}
                            name="e_ktp_province_id"
                            options={provinceData?.data?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="e_ktp_province_id"
                            error={errors.e_ktp_province_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="e_ktp_regency_id"
                            className="form-label"
                        >
                            Kota / Kabupaten
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="e_ktp_regency_id"
                            options={regencyValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            disabled
                            styles={styles}
                            id="e_ktp_regency_id"
                            error={errors.e_ktp_regency_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="e_ktp_district_id"
                            className="form-label"
                        >
                            Kecamatan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="e_ktp_district_id"
                            disabled
                            options={districtValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="e_ktp_district_id"
                            error={errors.e_ktp_district_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="e_ktp_village" className="form-label">
                            Kelurahan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="e_ktp_village_id"
                            disabled
                            options={villageValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="e_ktp_village"
                            error={errors.e_ktp_village_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Kode POS"
                            type="text"
                            disabled
                            placeholder="Masukkan Kode POS"
                            name="e_ktp_postal_code"
                            register={register}
                            error={errors.e_ktp_postal_code}
                        />
                    </div>
                </div>
                <div>
                    <Textarea
                        label="Alamat Lengkap sesuai E-KTP"
                        type="text"
                        disabled
                        name="e_ktp_full_address"
                        register={register}
                        id="df"
                        placeholder="Alamat Lengkap sesuai E-KTP"
                        error={errors.e_ktp_full_address}
                    />
                </div>
                <div>
                    <h6 className="font-bold">
                        Alamat Lengkap Sesuai Domisili
                    </h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label
                            htmlFor="domicile_province_id"
                            className="form-label"
                        >
                            Provinsi
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            register={register}
                            name="domicile_province_id"
                            options={provinceDomicileData?.data?.map(
                                (item) => ({
                                    value: item?.id,
                                    label: item?.name,
                                })
                            )}
                            styles={styles}
                            id="domicile_province_id"
                            error={errors.domicile_province_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="domicile_regency_id"
                            className="form-label"
                        >
                            Kota / Kabupaten
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="domicile_regency_id"
                            disabled
                            options={domicileRegencyValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="domicile_regency_id"
                            error={errors.domicile_regency_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="domicile_district_id"
                            className="form-label"
                        >
                            Kecamatan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="domicile_district_id"
                            disabled
                            options={domicileDistrictValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="domicile_district_id"
                            error={errors.domicile_district_id}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="domicile_village_id"
                            className="form-label"
                        >
                            Kelurahan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="domicile_village_id"
                            disabled
                            options={domicileVillageValue?.map((item) => ({
                                value: item?.id,
                                label: item?.name,
                            }))}
                            styles={styles}
                            id="domicile_village_id"
                            error={errors.domicile_village_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Kode POS"
                            type="text"
                            disabled
                            placeholder="Masukkan Kode POS"
                            name="domicile_postal_code"
                            register={register}
                            error={errors.domicile_postal_code}
                        />
                    </div>
                </div>
                <div>
                    <Textarea
                        label="Alamat Lengkap sesuai Domisili"
                        type="text"
                        disabled
                        name="domicile_full_address"
                        register={register}
                        id="df"
                        placeholder="Alamat Lengkap sesuai Domisili"
                        error={errors.domicile_full_address}
                    />
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <h6 className="font-bold">Data Karyawan</h6>
                    </div>
                    <div></div>
                    <Textinput
                        label="NIK Karyawan"
                        type="text"
                        disabled
                        placeholder="Masukkan NIK Karyawan"
                        name="employee_nik"
                        register={register}
                        error={errors.employee_nik}
                    />
                    <div>
                        <label htmlFor="employee_status" className="form-label">
                            Status Karyawan
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            register={register}
                            name="employee_status"
                            options={employeeStatus}
                            styles={styles}
                            id="employee_status"
                            error={errors.employee_status}
                        />
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Masuk Kerja
                        </label>
                        <Controller
                            disabled
                            name="join_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.join_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        dateFormat: 'd-m-Y',
                                    }}
                                />
                            )}
                        />
                        {errors?.join_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.join_date?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Berakhir Kerja
                        </label>
                        <Controller
                            disabled
                            name="end_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.end_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        dateFormat: 'd-m-Y',
                                    }}
                                />
                            )}
                        />
                        {errors?.end_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.end_date?.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="area_id" className="form-label">
                            Area
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            register={register}
                            name="area_id"
                            styles={styles}
                            options={[
                                ...(areaData?.data?.map((item) => ({
                                    value: item?.area_code,
                                    label: item?.area_name,
                                })) || []),
                            ]}
                            id="area_id"
                            error={errors.area_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="branch_id" className="form-label">
                            Cabang
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            register={register}
                            name="branch_id"
                            styles={styles}
                            options={[
                                ...(branchData?.data?.map((item) => ({
                                    value: item?.branch_code,
                                    label: item?.branch_name,
                                })) || []),
                            ]}
                            id="branch_id"
                            error={errors.branch_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Batch"
                            type="text"
                            disabled
                            placeholder="Masukkan Batch"
                            name="batch"
                            register={register}
                            error={errors.batch}
                        />
                    </div>
                    <div>
                        <label htmlFor="division" className="form-label">
                            Divisi
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="departement_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(divisionData?.data?.map((item) => ({
                                    value: item?.division_code,
                                    label: item?.division_name,
                                })) || []),
                            ]}
                            id="division"
                            error={errors.departement_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="position_id" className="form-label">
                            Jabatan
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="position_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(positionData?.data?.map((item) => ({
                                    value: item?.position_code,
                                    label: item?.position_name,
                                })) || []),
                            ]}
                            id="position_id"
                            error={errors.position_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="level_id" className="form-label">
                            Level
                        </label>
                        <Select
                            className="react-select"
                            disabled
                            name="level_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(levelData?.data?.map((item) => ({
                                    value: item?.level_code,
                                    label: item?.level_name,
                                })) || []),
                            ]}
                            id="level_id"
                            error={errors.level_id}
                        />
                    </div>
                </div>
                <div>
                    <h6 className="font-bold">Data Resign</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Pengajuan
                        </label>

                        <Controller
                            disabled
                            name="resign_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.resign_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        dateFormat: 'd-m-Y',
                                    }}
                                />
                            )}
                        />
                        {errors?.resign_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.resign_date?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Efektif
                        </label>

                        <Controller
                            disabled
                            name="resign_applied_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.resign_applied_date
                                            ? 'border-danger-500 border date-picker-control py-2'
                                            : 'date-picker-control py-2'
                                    }
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        dateFormat: 'd-m-Y',
                                    }}
                                />
                            )}
                        />
                        {errors?.resign_applied_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.resign_applied_date?.message}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div>
                        <Textarea
                            label="Alasan Resign"
                            type="text"
                            disabled
                            register={register}
                            id="df"
                            name="resign_reason"
                            placeholder="Alasan Resign"
                            error={errors.resign_reason}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewModal(false)
                        }}
                    />
                </div>
            </form>
        </Card>
    )
}

export default DetailEmployeeForm
