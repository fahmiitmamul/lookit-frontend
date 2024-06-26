import Icon from '@/components/ui/Icon'
import Link from 'next/link'
import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import SimpleBar from 'simplebar-react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { setContractId } from '../store'

export default function FinishedContractTable({
    setShowViewFinishedContractModal,
    setShowStatusFinishedContractModal,
    setShowDeleteFinishedContractModal,
    contractData,
}) {
    const dispatch = useDispatch()
    const columns = [
        {
            label: 'No',
            field: 'age',
        },
        {
            label: 'Nama',
            field: 'first_name',
        },

        {
            label: 'Tanggal Mulai',
            field: 'email',
        },

        {
            label: 'Tanggal Selesai',
            field: 'email',
        },

        {
            label: 'Judul',
            field: 'email',
        },

        {
            label: 'Lampiran File',
            field: 'email',
        },

        {
            label: 'Status',
            field: 'email',
        },

        {
            label: 'Aksi',
            field: 'email',
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
                                    {contractData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                <div className="flex flex-col gap-1">
                                                    <div>
                                                        {row?.employee?.name}
                                                    </div>
                                                    <div>
                                                        {
                                                            row?.employee
                                                                ?.employee_nik
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.start_date).format(
                                                    'DD MMMM YYYY'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {dayjs(row?.end_date).format(
                                                    'DD MMMM YYYY'
                                                )}
                                            </td>
                                            <td className="table-td">
                                                {row?.contract_name}
                                            </td>
                                            <td className="table-td">
                                                <div className="flex flex-col justify-center items-center gap-2 pr-10">
                                                    <Link
                                                        href={row?.file}
                                                        target="_blank"
                                                    >
                                                        <Icon
                                                            width={25}
                                                            icon="heroicons-outline:document"
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="table-td">
                                                {row?.status === 'Selesai' && (
                                                    <Button className="bg-green-500 text-white btn-sm">
                                                        Selesai
                                                    </Button>
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
                                                                setShowViewFinishedContractModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    setContractId(
                                                                        row.id
                                                                    )
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:eye" />
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
                                                                setShowDeleteFinishedContractModal(
                                                                    true
                                                                )
                                                                dispatch(
                                                                    setContractId(
                                                                        row.id
                                                                    )
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
                            {contractData?.data?.length === 0 && (
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
