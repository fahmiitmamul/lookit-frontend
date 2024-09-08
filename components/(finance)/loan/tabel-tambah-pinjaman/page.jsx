import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'
import SimpleBar from 'simplebar-react'

export default function AddLoan() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [searchData, setSearchData] = useState('')
    const token = getCookie('token')

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
            label: 'Jabatan',
            field: 'email',
        },

        {
            label: 'Cabang',
            field: 'email',
        },

        {
            label: 'Jenis Pinjaman',
            field: 'email',
        },

        {
            label: 'Jumlah Pinjaman',
            field: 'email',
        },

        {
            label: 'Jumlah Cicilan',
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

    async function fetchLeaveType(
        pageData = page,
        search = searchData,
        limitData = limit
    ) {
        try {
            const { data } = await http(token).get(
                '/leave-type?page=' +
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

    const { data: leaveTypeData } = useQuery({
        queryKey: ['leave', page, searchData, limit],
        queryFn: () => fetchLeaveType(page, searchData, limit),
    })

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
                                    {leaveTypeData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.employee?.name}
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.employee?.position
                                                        ?.position_name
                                                }
                                            </td>
                                            <td className="table-td">
                                                {
                                                    row?.employee?.branch
                                                        ?.branch_name
                                                }
                                            </td>
                                            <td className="table-td">Uang</td>
                                            <td className="table-td">
                                                Rp. 400.000
                                            </td>
                                            <td className="table-td">3x</td>
                                            <td className="table-td">
                                                Belum Lunas
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
                            {leaveTypeData?.data?.length === 0 && (
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
