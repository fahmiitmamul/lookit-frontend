import Icon from '@/components/ui/Icon'
import Checkbox from '@/components/ui/Checkbox'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'
import {
    setEmployeeId,
    setMainSalary,
    setSelectedBpjsData,
    setSelectedBpjsId,
} from '../../store'
import { fetchEmployee as fetchEmployeeData } from '../../action'
import { getCookie } from 'cookies-next'

export default function BPJSTable({
    setShowViewBpjsModal,
    setShowEditBpjsModal,
    setShowDeleteBpjsModal,
    bpjsData,
}) {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()
    const token = getCookie('token')

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : bpjsData?.data || [])
        dispatch(setSelectedBpjsData(selectAll ? [] : bpjsData?.data || []))
    }

    const toggleSelectIndividual = (row) => {
        const updatedSelectedRows = [...selectedRows]
        const index = updatedSelectedRows.findIndex(
            (selectedRow) => selectedRow === row
        )

        if (index === -1) {
            updatedSelectedRows.push(row)
        } else {
            updatedSelectedRows.splice(index, 1)
        }

        setSelectAll(updatedSelectedRows.length === bpjsData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedBpjsData(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Nama Karyawan',
            field: 'name',
        },
        {
            label: 'Jabatan',
            field: 'position',
        },
        {
            label: 'Cabang',
            field: 'branch',
        },
        {
            label: 'Jumlah Anak',
            field: 'child_name',
        },
        {
            label: 'Total Potongan',
            field: 'employee_deduction',
        },
        {
            label: 'Total Tunjangan',
            field: 'employee_insurance',
        },
        {
            label: 'Aksi',
            field: 'action',
        },
    ]

    return (
        <>
            <div className="overflow-x-auto -mx-6">
                <SimpleBar className="overflow-auto w-full bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-400 rounded-md">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        <td className="table-td">
                                            <Checkbox
                                                value={selectAll}
                                                onChange={toggleSelectAll}
                                            />
                                        </td>
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
                                    {bpjsData?.data?.map((item, index) => (
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">
                                                <Checkbox
                                                    onChange={
                                                        toggleSelectIndividual
                                                    }
                                                />
                                            </td>
                                            <td className="table-td">
                                                {index + 1}
                                            </td>
                                            <td className="table-td">
                                                <div>
                                                    {item?.employee?.name}
                                                </div>
                                                <div className="text-xs">
                                                    {
                                                        item?.employee
                                                            ?.employee_nik
                                                    }
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {
                                                    item?.employee?.position
                                                        ?.position_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {
                                                    item?.employee?.branch
                                                        ?.branch_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {item?.main_salary_bpjs_value?.map(
                                                    (item) => {
                                                        if (item.kesehatan) {
                                                            return item
                                                                .kesehatan
                                                                .jumlah_anak
                                                        }
                                                    }
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {item?.main_salary_bpjs_value?.map(
                                                    (item) =>
                                                        `Rp${item.total_potongan_karyawan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {item?.main_salary_bpjs_value?.map(
                                                    (item) =>
                                                        `Rp${item.total_tunjangan_dibiayai_perusahaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                                )}
                                            </td>
                                            <td className="table-td">
                                                <div className="flex space-x-3 rtl:space-x-reverse">
                                                    <Tooltip
                                                        content="View"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setSelectedBpjsId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowViewBpjsModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:eye" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Edit"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setSelectedBpjsId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowEditBpjsModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    fetchEmployeeData(
                                                                        item
                                                                            ?.employee
                                                                            ?.id
                                                                    )
                                                                )
                                                                dispatch(
                                                                    setEmployeeId(
                                                                        item
                                                                            ?.employee
                                                                            ?.id
                                                                    )
                                                                )
                                                                dispatch(
                                                                    setMainSalary(
                                                                        item?.main_salary
                                                                    )
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:pencil-square" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Delete"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                        theme="danger"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setSelectedBpjsId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowDeleteBpjsModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:trash" />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {bpjsData?.data?.length === 0 && (
                                <div className="w-full pt-5 text-xl flex justify-center items-center">
                                    <div>No data found</div>
                                </div>
                            )}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </>
    )
}
