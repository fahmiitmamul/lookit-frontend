import { useState } from 'react'
import {
    setAfterPotonganKaryawan,
    setBpjsKesehatan,
    setBpjsKesehatanActive,
    setBpjsKesehatanPotonganKaryawanValue,
    setBpjsKesehatanPotonganTambahanKaryawanValue,
    setBpjsKesehatanTunjanganPerusahaanValue,
    setBpjsKetenagakerjaan,
    setBpjsKetenagakerjaanActive,
    setBpjsKetenagakerjaanPotonganJHTValue,
    setBpjsKetenagakerjaanPotonganJKKValue,
    setBpjsKetenagakerjaanPotonganJKMValue,
    setBpjsKetenagakerjaanPotonganJPValue,
    setBpjsKetenagakerjaanTunjanganJHTValue,
    setBpjsKetenagakerjaanTunjanganJKKValue,
    setBpjsKetenagakerjaanTunjanganJKMValue,
    setBpjsKetenagakerjaanTunjanganJPValue,
    setJHTActive,
    setJKKActive,
    setJKMActive,
    setJPActive,
    setJumlahAnak,
    setMainSalary,
} from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import Switch from '@/components/ui/Switch'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import Tooltip from '@/components/ui/Tooltip'
import { Icon } from '@iconify/react'
import Textinput from '@/components/ui/Textinput'
import Button from '@/components/ui/Button'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'

export const EditBPJSModal = ({ setShowEditBpjsModal }) => {
    const dispatch = useDispatch()
    const token = getCookie('token')
    const bpjsData = useSelector((state) => state.finance.finance.bpjs)
    const [afterData, setAfterData] = useState(0)
    const { jumlah_anak } = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan
    )

    const filteredBpjsData = [bpjsData].filter(
        (item) => item.kesehatan.isActive || item.ketenagakerjaan.isActive
    )

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Jenis',
            field: 'type',
        },

        {
            label: 'Nominal',
            field: 'nominal',
        },
    ]

    const columnsKetenagakerjaan = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Jenis',
            field: 'type',
        },
        {
            label: 'Status',
            field: 'type',
        },

        {
            label: 'Tunjangan',
            field: 'Tunjangan',
        },

        {
            label: 'Potongan',
            field: 'Potongan',
        },
    ]

    const [toggledBpjsKesehatan, setToggledBpjsKesehatan] = useState(false)
    const [toggledBpjsKetenagakerjaan, setToggledBpjsKetenagakerjaan] =
        useState(false)
    const [toggledJHT, setToggledJHT] = useState(false)
    const [toggledJKK, setToggledJKK] = useState(false)
    const [toggledJKM, setToggledJKM] = useState(false)
    const [toggledJP, setToggledJP] = useState(false)
    const [tunjanganPerusahaan, setTunjanganPerusahaan] = useState(false)
    const [potonganKaryawan, setPotonganKaryawan] = useState(false)
    const [potonganTambahanKaryawan, setPotonganTambahanKaryawan] =
        useState(false)
    const [tunjanganHariTua, setTunjanganHariTua] = useState(false)
    const [potonganHariTua, setPotonganHariTua] = useState(false)
    const [tunjanganKecelakaan, setTunjanganKecelakaan] = useState(false)
    const [potonganKecelakaan, setPotonganKecelakaan] = useState(false)
    const [tunjanganKematian, setTunjanganKematian] = useState(false)
    const [potonganKematian, setPotonganKematian] = useState(false)
    const [tunjanganPensiun, setTunjanganPensiun] = useState(false)
    const [potonganPensiun, setPotonganPensiun] = useState(false)
    const [tunjanganPerusahaanValue, setTunjanganPerusahaanValue] =
        useState('2,00%')
    const [potonganKaryawanValue, setPotonganKaryawanValue] = useState('2,00%')
    const [potonganTambahanKaryawanValue, setPotonganTambahanKaryawanValue] =
        useState('2,00%')
    const [tunjanganHariTuaValue, setTunjanganHariTuaValue] = useState('0,00%')
    const [potonganHariTuaValue, setPotonganHariTuaValue] = useState('0,00%')
    const [tunjanganKecelakaanValue, setTunjanganKecelakaanValue] =
        useState('0,00%')
    const [potonganKecelakaanValue, setPotonganKecelakaanValue] =
        useState('0,00%')
    const [tunjanganKematianValue, setTunjanganKematianValue] =
        useState('0,00%')
    const [potonganKematianValue, setPotonganKematianValue] = useState('0,00%')
    const [tunjanganPensiunValue, setTunjanganPensiunValue] = useState('0,00%')
    const [potonganPensiunValue, setPotonganPensiunValue] = useState('0,00%')
    const { bpjs } = useSelector((state) => state.finance.finance.employee)
    const { main_salary } = useSelector((state) => state.finance.finance)

    const isJhtActive = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.isJhtActive
    )

    const isJkkActive = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.isJkkActive
    )

    const isJkmActive = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.isJkmActive
    )

    const isJpActive = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.isJpActive
    )

    const tunjanganBpjsKesehatanPerusahaan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.tunjangan_perusahaan
    )

    const potonganBpjsKesehatanPerusahaan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.potongan_karyawan
    )

    const afterPotonganKaryawan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.after_potongan_karyawan
    )

    const tunjanganBpjsKetenagakerjaanHariTua = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jht
    )

    const potonganBpjsKetenagakerjaanHariTua = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.potongan_jht
    )

    const tunjanganBpjsKetenagakerjaanKecelakaanKerja = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jkk
    )

    const tunjanganBpjsKetenagakerjaanKematian = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jkm
    )

    const tunjanganBpjsKetenagakerjaanPensiun = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jp
    )

    const potonganBpjsKetenagakerjaanPensiun = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.potongan_jp
    )

    const isBpjsKesehatanActive = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.isActive
    )

    const isBpjsKetenagakerjaanActive = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.isActive
    )

    const selectedBpjsId = useSelector(
        (state) => state.finance.finance.selectedBpjsId
    )

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/main-salary-bpjs/${selectedBpjsId}`
            )
            const main_salary_data = await http(token).get(
                `/main-salary/employee/${data.results.employee_id}`
            )

            dispatch(
                setBpjsKesehatan(
                    data.results.main_salary_bpjs_value[0].kesehatan
                )
            )
            dispatch(
                setBpjsKetenagakerjaan(
                    data.results.main_salary_bpjs_value[0].ketenagakerjaan
                )
            )
            setToggledBpjsKesehatan(
                data.results.main_salary_bpjs_value[0].kesehatan.isActive
            )
            dispatch(
                setMainSalary(main_salary_data?.data?.results?.main_salary)
            )
            return data.results
        },
        mode: 'all',
    })

    const queryClient = useQueryClient()
    const emp_id = useSelector((state) => state.finance.finance.employee_id)
    const bpjsId = useSelector((state) => state.finance.finance.selectedBpjsId)

    const patchBpjs = useMutation({
        mutationFn: async (values) => {
            const bpjsForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_bpjs_value: JSON.stringify(filteredBpjsData),
            })

            return http(token).patch(`/main-salary-bpjs/${bpjsId}`, bpjsForm)
        },
        onSuccess: () => {
            toast.success('Berhasil mengupdate data bpjs')
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const onSubmit = (data) => {
        setShowEditBpjsModal(false)
        patchBpjs.mutate(data)
        dispatch(setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <h6>Konfigurasi BPJS</h6>

                {bpjs?.find((bpjs) => bpjs.bpjs_type === 'BPJS Kesehatan') && (
                    <div className="flex flex-col gap-5">
                        <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                            <div>BPJS Kesehatan</div>
                            <div className="flex w-full justify-end">
                                <Switch
                                    value={toggledBpjsKesehatan}
                                    onChange={() => {
                                        setToggledBpjsKesehatan(
                                            !toggledBpjsKesehatan
                                        )
                                        dispatch(setBpjsKesehatanActive(true))
                                    }}
                                />
                            </div>
                        </div>

                        <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
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
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 relative">
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">1</td>
                                        <td className="table-td">
                                            Tunjangan Perusahaan
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {tunjanganPerusahaan ? (
                                                    <Controller
                                                        name="tunjanganPerusahaanValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganPerusahaanValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setTunjanganPerusahaanValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganPerusahaanValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKesehatanTunjanganPerusahaanValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {
                                                            tunjanganPerusahaanValue
                                                        }
                                                    </div>
                                                )}
                                                <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                setTunjanganPerusahaan(
                                                                    !tunjanganPerusahaan
                                                                )
                                                            }}
                                                        >
                                                            <Icon
                                                                icon={
                                                                    tunjanganPerusahaan
                                                                        ? `heroicons:check`
                                                                        : `heroicons:pencil`
                                                                }
                                                            />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">2</td>
                                        <td className="table-td">
                                            Potongan Karyawan
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganKaryawan ? (
                                                    <Controller
                                                        name="potonganKaryawanValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="potonganKaryawanValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganKaryawanValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'potonganKaryawanValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        if (
                                                                            parseInt(
                                                                                jumlah_anak
                                                                            ) >
                                                                            2
                                                                        ) {
                                                                            const value =
                                                                                mainSalaryValue *
                                                                                limitedValue

                                                                            dispatch(
                                                                                setBpjsKesehatanPotonganKaryawanValue(
                                                                                    value *
                                                                                        (parseInt(
                                                                                            jumlah_anak
                                                                                        ) -
                                                                                            2)
                                                                                )
                                                                            )
                                                                            dispatch(
                                                                                setAfterPotonganKaryawan(
                                                                                    value *
                                                                                        (parseInt(
                                                                                            jumlah_anak
                                                                                        ) -
                                                                                            2)
                                                                                )
                                                                            )
                                                                        } else {
                                                                            dispatch(
                                                                                setBpjsKesehatanPotonganKaryawanValue(
                                                                                    mainSalaryValue *
                                                                                        limitedValue
                                                                                )
                                                                            )
                                                                            dispatch(
                                                                                setAfterPotonganKaryawan(
                                                                                    mainSalaryValue *
                                                                                        limitedValue
                                                                                )
                                                                            )
                                                                        }
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {potonganKaryawanValue}
                                                    </div>
                                                )}
                                                <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                setPotonganKaryawan(
                                                                    !potonganKaryawan
                                                                )
                                                            }}
                                                        >
                                                            <Icon
                                                                icon={
                                                                    potonganKaryawan
                                                                        ? `heroicons:check`
                                                                        : `heroicons:pencil`
                                                                }
                                                            />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">3</td>
                                        <td className="table-td">
                                            Potongan Tambahan Karyawan
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganTambahanKaryawan ? (
                                                    <Controller
                                                        name="potonganTambahanKaryawanValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="potonganTambahanKaryawanValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganTambahanKaryawanValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'potonganTambahanKaryawanValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        if (
                                                                            parseInt(
                                                                                jumlah_anak
                                                                            ) >
                                                                            2
                                                                        ) {
                                                                            const value =
                                                                                mainSalaryValue *
                                                                                limitedValue

                                                                            dispatch(
                                                                                setBpjsKesehatanPotonganTambahanKaryawanValue(
                                                                                    value *
                                                                                        (parseInt(
                                                                                            jumlah_anak
                                                                                        ) -
                                                                                            2)
                                                                                )
                                                                            )
                                                                            dispatch(
                                                                                setAfterPotonganKaryawan(
                                                                                    value *
                                                                                        (parseInt(
                                                                                            jumlah_anak
                                                                                        ) -
                                                                                            2)
                                                                                )
                                                                            )
                                                                        } else {
                                                                            dispatch(
                                                                                setBpjsKesehatanPotonganTambahanKaryawanValue(
                                                                                    mainSalaryValue *
                                                                                        limitedValue
                                                                                )
                                                                            )
                                                                            dispatch(
                                                                                setAfterPotonganKaryawan(
                                                                                    mainSalaryValue *
                                                                                        limitedValue
                                                                                )
                                                                            )
                                                                        }
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {
                                                            potonganTambahanKaryawanValue
                                                        }
                                                    </div>
                                                )}
                                                <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                setPotonganTambahanKaryawan(
                                                                    !potonganTambahanKaryawan
                                                                )
                                                            }}
                                                        >
                                                            <Icon
                                                                icon={
                                                                    potonganTambahanKaryawan
                                                                        ? `heroicons:check`
                                                                        : `heroicons:pencil`
                                                                }
                                                            />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {!isBpjsKesehatanActive && (
                                        <div className="w-full h-full bg-gray-50 opacity-50  absolute top-0"></div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {bpjs?.find(
                    (bpjs) => bpjs.bpjs_type === 'BPJS Ketenagakerjaan'
                ) && (
                    <div>
                        <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                            <div>BPJS TK</div>
                            <div className="flex w-full justify-end">
                                <Switch
                                    value={toggledBpjsKetenagakerjaan}
                                    onChange={() => {
                                        setToggledBpjsKetenagakerjaan(
                                            !toggledBpjsKetenagakerjaan
                                        )
                                        dispatch(
                                            setBpjsKetenagakerjaanActive(true)
                                        )
                                    }}
                                />
                            </div>
                        </div>

                        <div className="lg:grid-cols-1 grid gap-5 grid-cols-1 mt-5">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        {columnsKetenagakerjaan.map(
                                            (column, i) => (
                                                <th
                                                    key={i}
                                                    scope="col"
                                                    className=" table-th "
                                                >
                                                    {column.label}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 relative">
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">1</td>
                                        <td className="table-td">
                                            Jaminan Hari Tua (JHT)
                                        </td>
                                        <td className="table-td">
                                            <Switch
                                                value={toggledJHT}
                                                onChange={() => {
                                                    setToggledJHT(!toggledJHT)
                                                    dispatch(setJHTActive())
                                                }}
                                            />
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {tunjanganHariTua ? (
                                                    <Controller
                                                        name="tunjanganHariTuaValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganHariTuaValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setTunjanganHariTuaValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganHariTuaValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanTunjanganJHTValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {tunjanganHariTuaValue}
                                                    </div>
                                                )}
                                                {isJhtActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setTunjanganHariTua(
                                                                        !tunjanganHariTua
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        tunjanganHariTua
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganHariTua ? (
                                                    <Controller
                                                        name="potonganHariTuaValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="potonganHariTuaValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganHariTuaValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'potonganHariTuaValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanPotonganJHTValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {potonganHariTuaValue}
                                                    </div>
                                                )}
                                                {isJhtActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setPotonganHariTua(
                                                                        !potonganHariTua
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        potonganHariTua
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">2</td>
                                        <td className="table-td">
                                            Jaminan Kecelakaan Kerja (JKK)
                                        </td>
                                        <td className="table-td">
                                            <Switch
                                                value={toggledJKK}
                                                onChange={() => {
                                                    setToggledJKK(!toggledJKK)
                                                    dispatch(setJKKActive())
                                                }}
                                            />
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {tunjanganKecelakaan ? (
                                                    <Controller
                                                        name="tunjanganKecelakaanValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganKecelakaanValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setTunjanganKecelakaanValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganKecelakaanValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanTunjanganJKKValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {
                                                            tunjanganKecelakaanValue
                                                        }
                                                    </div>
                                                )}
                                                {isJkkActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setTunjanganKecelakaan(
                                                                        !tunjanganKecelakaan
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        tunjanganKecelakaan
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganKecelakaan ? (
                                                    <Controller
                                                        name="tunjanganKecelakaanValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganKecelakaanValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganKecelakaanValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'potonganKecelakaanValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanPotonganJKKValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {
                                                            potonganKecelakaanValue
                                                        }
                                                    </div>
                                                )}
                                                {isJkkActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setPotonganKecelakaan(
                                                                        !potonganKecelakaan
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        potonganKecelakaan
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">3</td>
                                        <td className="table-td">
                                            Jaminan Kematian (JKM)
                                        </td>
                                        <td className="table-td">
                                            <Switch
                                                value={toggledJKM}
                                                onChange={() => {
                                                    setToggledJKM(!toggledJKM)
                                                    dispatch(setJKMActive())
                                                }}
                                            />
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {tunjanganKematian ? (
                                                    <Controller
                                                        name="tunjanganKematianValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganKematianValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setTunjanganKematianValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganKematianValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanTunjanganJKMValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {tunjanganKematianValue}
                                                    </div>
                                                )}
                                                {isJkmActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setTunjanganKematian(
                                                                        !tunjanganKematian
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        tunjanganKematian
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganKematian ? (
                                                    <Controller
                                                        name="potonganKematianValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="potonganKematianValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganKematianValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganKematianValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanPotonganJKMValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {potonganKematianValue}
                                                    </div>
                                                )}
                                                {isJkmActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setPotonganKematian(
                                                                        !potonganKematian
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        potonganKematian
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <td className="table-td">4</td>
                                        <td className="table-td">
                                            Jaminan Pensiun (JP)
                                        </td>
                                        <td className="table-td">
                                            <Switch
                                                value={toggledJP}
                                                onChange={() => {
                                                    setToggledJP(!toggledJP)
                                                    dispatch(setJPActive())
                                                }}
                                            />
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {tunjanganPensiun ? (
                                                    <Controller
                                                        name="tunjanganPensiunValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganPensiunValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setTunjanganPensiunValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganPensiunValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanTunjanganJPValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {tunjanganPensiunValue}
                                                    </div>
                                                )}
                                                {isJpActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setTunjanganPensiun(
                                                                        !tunjanganPensiun
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        tunjanganPensiun
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="table-td">
                                            <div className="flex items-center gap-2">
                                                {potonganPensiun ? (
                                                    <Controller
                                                        name="tunjanganPensiunValue"
                                                        control={control}
                                                        render={({
                                                            fields,
                                                        }) => {
                                                            return (
                                                                <NumericFormat
                                                                    {...fields}
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    allowNegative={
                                                                        false
                                                                    }
                                                                    decimalScale={
                                                                        2
                                                                    }
                                                                    suffix="%"
                                                                    className="w-16 border-none"
                                                                    name="tunjanganPensiunValue"
                                                                    placeholder="0,00"
                                                                    isAllowed={({
                                                                        value,
                                                                    }) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                value
                                                                            ) ||
                                                                            0
                                                                        return (
                                                                            numericValue <=
                                                                            9.99
                                                                        )
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const numericValue =
                                                                            parseFloat(
                                                                                e.target.value.replace(
                                                                                    '%',
                                                                                    ''
                                                                                )
                                                                            ) /
                                                                            100
                                                                        const limitedValue =
                                                                            numericValue >
                                                                            0.0999
                                                                                ? 0.0999
                                                                                : numericValue
                                                                        const formattedValue =
                                                                            (
                                                                                limitedValue *
                                                                                100
                                                                            ).toFixed(
                                                                                2
                                                                            ) +
                                                                            '%'
                                                                        setPotonganPensiunValue(
                                                                            formattedValue
                                                                        )
                                                                        setValue(
                                                                            'tunjanganPensiunValue',
                                                                            formattedValue
                                                                        )

                                                                        const mainSalaryValue =
                                                                            main_salary
                                                                                .replace(
                                                                                    'Rp',
                                                                                    ''
                                                                                )
                                                                                .replace(
                                                                                    /,/g,
                                                                                    ''
                                                                                )
                                                                        dispatch(
                                                                            setBpjsKetenagakerjaanPotonganJPValue(
                                                                                mainSalaryValue *
                                                                                    limitedValue
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            )
                                                        }}
                                                    ></Controller>
                                                ) : (
                                                    <div>
                                                        {potonganPensiunValue}
                                                    </div>
                                                )}
                                                {isJpActive && (
                                                    <div className="flex space-x-3 rtl:space-x-reverse">
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
                                                                    setPotonganPensiun(
                                                                        !potonganPensiun
                                                                    )
                                                                }}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        potonganPensiun
                                                                            ? `heroicons:check`
                                                                            : `heroicons:pencil`
                                                                    }
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    {!isBpjsKetenagakerjaanActive && (
                                        <div className="w-full h-full bg-gray-50 opacity-50  absolute top-0"></div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <h6>Master BPJS</h6>

                <div className="lg:grid-cols-2 gap-5 grid grid-cols-1">
                    {bpjs?.find(
                        (bpjs) => bpjs.bpjs_type === 'BPJS Kesehatan'
                    ) ? (
                        <div className="flex flex-col gap-3">
                            <div>BPJS Kesehatan</div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Nomor BPJS Kesehatan
                                </div>
                                <div className="text-sm">
                                    {
                                        bpjs.find(
                                            (bpjs) =>
                                                bpjs.bpjs_type ===
                                                'BPJS Kesehatan'
                                        )?.bpjs_number
                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <div className="text-sm w-full">
                                    Jumlah Anak
                                </div>
                                <div className="w-full">
                                    <Textinput
                                        type="number"
                                        placeholder="0"
                                        className="w-16"
                                        defaultValue={jumlah_anak}
                                        onChange={(e) => {
                                            const inputValue = parseInt(
                                                e.target.value
                                            )
                                            dispatch(
                                                setJumlahAnak(e.target.value)
                                            )
                                            const multiplier = inputValue - 2
                                            if (
                                                parseInt(e.target.value) !==
                                                    1 ||
                                                parseInt(e.target.value !== 2)
                                            ) {
                                                if (multiplier !== 0) {
                                                    dispatch(
                                                        setAfterPotonganKaryawan(
                                                            potonganBpjsKesehatanPerusahaan *
                                                                multiplier
                                                        )
                                                    )
                                                    if (!isNaN(multiplier)) {
                                                        {
                                                            setAfterData(
                                                                potonganBpjsKesehatanPerusahaan *
                                                                    multiplier
                                                            )
                                                        }
                                                    }
                                                }
                                            }
                                            if (e.target.value == '') {
                                                dispatch(
                                                    setAfterPotonganKaryawan(
                                                        afterData
                                                    )
                                                )
                                            }

                                            if (
                                                parseInt(e.target.value === 2)
                                            ) {
                                                dispatch(
                                                    setAfterPotonganKaryawan(
                                                        potonganBpjsKesehatanPerusahaan *
                                                            multiplier
                                                    )
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKesehatanPerusahaan)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKesehatanPerusahaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Potongan Karyawan</div>
                                <div className="text-sm">
                                    {isNaN(afterPotonganKaryawan)
                                        ? `Rp${0},00`
                                        : !isNaN(afterPotonganKaryawan)
                                          ? `Rp${afterPotonganKaryawan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                          : isNaN(
                                                  potonganBpjsKesehatanPerusahaan
                                              )
                                            ? `Rp${0},00`
                                            : `Rp${potonganBpjsKesehatanPerusahaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {bpjs?.find(
                        (bpjs) => bpjs.bpjs_type === 'BPJS Ketenagakerjaan'
                    ) ? (
                        <div className="flex flex-col gap-3">
                            <div>BPJS Ketenagakerjaan</div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm"> Nomor BPJS TK</div>
                                <div className="text-sm">
                                    {
                                        bpjs.find(
                                            (bpjs) =>
                                                bpjs.bpjs_type ===
                                                'BPJS Ketenagakerjaan'
                                        )?.bpjs_number
                                    }
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan JHT Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanHariTua)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanHariTua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Pot. JHT Karyawan</div>
                                <div className="text-sm">
                                    {isNaN(potonganBpjsKetenagakerjaanHariTua)
                                        ? `Rp${0},00`
                                        : `Rp${potonganBpjsKetenagakerjaanHariTua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Tunjangan JKK</div>
                                <div className="text-sm">
                                    {isNaN(
                                        tunjanganBpjsKetenagakerjaanKecelakaanKerja
                                    )
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanKecelakaanKerja.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Tunjangan JKM</div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanKematian)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanKematian.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan JP Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanPensiun)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanPensiun.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Pot. JP Karyawan</div>
                                <div className="text-sm">
                                    {isNaN(potonganBpjsKetenagakerjaanPensiun)
                                        ? `Rp${0},00`
                                        : `Rp${potonganBpjsKetenagakerjaanPensiun.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                <h6>Total Perhitungan</h6>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>Total Potongan Karyawan</div>
                    <div className="text-sm">
                        {isNaN(
                            potonganBpjsKesehatanPerusahaan +
                                potonganBpjsKetenagakerjaanHariTua +
                                potonganBpjsKetenagakerjaanPensiun
                        )
                            ? `Rp${0},00`
                            : isNaN(afterPotonganKaryawan)
                              ? `Rp${0},00`
                              : `Rp${(
                                    potonganBpjsKesehatanPerusahaan +
                                    potonganBpjsKetenagakerjaanHariTua +
                                    potonganBpjsKetenagakerjaanPensiun +
                                    (afterPotonganKaryawan -
                                        potonganBpjsKesehatanPerusahaan)
                                )
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>Total Tunjangan Dibiayai Perusahaan</div>
                    <div className="text-sm">
                        {isNaN(
                            tunjanganBpjsKesehatanPerusahaan +
                                tunjanganBpjsKetenagakerjaanHariTua +
                                tunjanganBpjsKetenagakerjaanKecelakaanKerja +
                                tunjanganBpjsKetenagakerjaanKematian +
                                tunjanganBpjsKetenagakerjaanPensiun
                        )
                            ? `Rp${0},00`
                            : `Rp${(
                                  tunjanganBpjsKesehatanPerusahaan +
                                  tunjanganBpjsKetenagakerjaanHariTua +
                                  tunjanganBpjsKetenagakerjaanKecelakaanKerja +
                                  tunjanganBpjsKetenagakerjaanKematian +
                                  tunjanganBpjsKetenagakerjaanPensiun
                              )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                    </div>
                </div>
            </div>
            <div className="pt-10">
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowEditBpjsModal(false)
                        }}
                    />
                    <Button
                        text="Simpan"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </div>
        </form>
    )
}
