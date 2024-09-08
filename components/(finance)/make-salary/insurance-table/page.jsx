import Icon from '@/components/ui/Icon'
import Checkbox from '@/components/ui/Checkbox'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import SimpleBar from 'simplebar-react'
import { setSelectedInsuranceData } from '../../store'
import { setSelectedInsuranceId } from '../../store'

export default function InsuranceTable({
    setShowViewInsuranceModal,
    setShowEditInsuranceModal,
    setShowDeleteInsuranceModal,
    insuranceData,
}) {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : insuranceData?.data || [])
        dispatch(
            setSelectedInsuranceData(selectAll ? [] : insuranceData?.data || [])
        )
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

        setSelectAll(updatedSelectedRows.length === insuranceData?.data?.length)
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedInsuranceData(updatedSelectedRows))
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
            field: 'name',
        },
        {
            label: 'Cabang',
            field: 'name',
        },
        ...insuranceData?.data?.flatMap((item) =>
            item?.main_salary_insurance_value?.map((additionalItem) => ({
                label: additionalItem?.insurance_name,
                value: additionalItem?.insurance_name,
            }))
        ),
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
                                    {insuranceData?.data?.map((item, index) => (
                                        <tr className="hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <td className="table-td">
                                                <Checkbox
                                                    onChange={() =>
                                                        toggleSelectIndividual(
                                                            item
                                                        )
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
                                                <div>
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
                                            {columns
                                                .slice(4, -1)
                                                .map((column, columnIndex) => {
                                                    const insuranceData =
                                                        item?.main_salary_insurance_value?.find(
                                                            (additional) =>
                                                                additional.insurance_name ===
                                                                column.label
                                                        )
                                                    return (
                                                        <td
                                                            key={columnIndex}
                                                            className="table-td"
                                                        >
                                                            {insuranceData
                                                                ? insuranceData.insurance_value
                                                                : '-'}
                                                        </td>
                                                    )
                                                })}
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
                                                                    setSelectedInsuranceId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowViewInsuranceModal(
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
                                                                    setSelectedInsuranceId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowEditInsuranceModal(
                                                                    true
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
                                                                    setSelectedInsuranceId(
                                                                        item?.id
                                                                    )
                                                                )
                                                                setShowDeleteInsuranceModal(
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
                            {insuranceData?.data?.length === 0 && (
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
