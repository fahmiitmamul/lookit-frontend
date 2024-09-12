import { useDispatch } from 'react-redux'
import { setEmployeeId, setSelectedData } from '../../store'
import Checkbox from '@/components/ui/Checkbox'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import SimpleBar from 'simplebar-react'
import Male from '@/public/assets/images/all-img/male.png'
import Female from '@/public/assets/images/all-img/female.png'

export default function NonactiveEmployeeRecordsTable({
    nonActiveEmployeeData,
}) {
    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedRows(selectAll ? [] : nonActiveEmployeeData?.data || [])
        dispatch(
            setSelectedData(selectAll ? [] : nonActiveEmployeeData?.data || [])
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

        setSelectAll(
            updatedSelectedRows.length === nonActiveEmployeeData?.data?.length
        )
        setSelectedRows(updatedSelectedRows)
        dispatch(setSelectedData(updatedSelectedRows))
    }

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Nama',
            field: 'name',
        },

        {
            label: 'Jabatan',
            field: 'position_id',
        },

        {
            label: 'Cabang',
            field: 'branch_id',
        },

        {
            label: 'Status Karyawan',
            field: 'employee_status',
        },
    ]

    const router = useRouter()

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
                                                className=" table-th"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    {nonActiveEmployeeData?.data?.map(
                                        (row, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                                                onClick={() => {
                                                    router.replace(
                                                        '/employee-records/employee-records-data'
                                                    )
                                                    dispatch(
                                                        setEmployeeId(row.id)
                                                    )
                                                }}
                                            >
                                                <td className="table-td">
                                                    <Checkbox
                                                        value={selectedRows.includes(
                                                            row
                                                        )}
                                                        onChange={() =>
                                                            toggleSelectIndividual(
                                                                row
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="table-td">
                                                    {index + 1}
                                                </td>
                                                <td className="table-td">
                                                    <div className="flex gap-2 items-center">
                                                        {row?.gender ===
                                                        'Perempuan' ? (
                                                            <Image
                                                                src={Male}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={Female}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        )}
                                                        <div className="w-14 h-14 overflow-hidden rounded-full">
                                                            <Image
                                                                src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${row?.profile_photo}`}
                                                                width={500}
                                                                height={500}
                                                                alt=""
                                                                className="object-cover w-full h-full"
                                                            ></Image>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                {row?.name}
                                                            </div>
                                                            <div>
                                                                {
                                                                    row?.employee_nik
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-td">
                                                    {
                                                        row?.position
                                                            ?.position_name
                                                    }
                                                </td>
                                                <td className="table-td">
                                                    {row?.branch?.branch_name}
                                                </td>
                                                <td className="table-td">
                                                    <div className="flex flex-col">
                                                        <div>
                                                            {
                                                                row?.employee_status
                                                            }
                                                        </div>
                                                        <div>
                                                            <Icon
                                                                icon="heroicons:battery-100"
                                                                className="text-4xl"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            {nonActiveEmployeeData?.data?.length === 0 && (
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
