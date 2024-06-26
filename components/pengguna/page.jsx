import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { Menu } from '@headlessui/react'
import Dropdown from '@/components/ui/Dropdown'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'

export default function TabelPengguna() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [searchData, setSearchData] = useState('')
    const token = getCookie('token')

    const actions = [
        {
            name: 'view',
            icon: 'heroicons-outline:eye',
        },
        {
            name: 'edit',
            icon: 'heroicons:pencil-square',
        },
        {
            name: 'delete',
            icon: 'heroicons-outline:trash',
        },
    ]

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
            label: 'Status Karyawan',
            field: 'email',
        },

        {
            label: 'Tipe Cuti',
            field: 'email',
        },

        {
            label: 'Saldo Cuti',
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
        queryKey: ['leave-type', page, searchData, limit],
        queryFn: () => fetchLeaveType(page, searchData, limit),
    })

    console.log(leaveTypeData)

    return (
        <>
            <Card title="Data Saldo Cuti" noborder>
                <div className="overflow-x-auto -mx-6">
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
                                                {row?.employee?.employee_status}
                                            </td>
                                            <td className="table-td">
                                                Cuti Tahunan
                                            </td>
                                            <td className="table-td">
                                                12 Hari
                                            </td>
                                            <td className="table-td">
                                                <Dropdown
                                                    classMenuItems="right-0 w-[140px] top-[110%] "
                                                    label={
                                                        <span className="text-xl text-center block w-full">
                                                            <Icon icon="heroicons-outline:dots-vertical" />
                                                        </span>
                                                    }
                                                >
                                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                                        {actions.map(
                                                            (item, i) => (
                                                                <Menu.Item
                                                                    key={i}
                                                                >
                                                                    <div
                                                                        className={`
                
                  ${
                      item.name === 'delete'
                          ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                          : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                                                                    >
                                                                        <span className="text-base">
                                                                            <Icon
                                                                                icon={
                                                                                    item.icon
                                                                                }
                                                                            />
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </Menu.Item>
                                                            )
                                                        )}
                                                    </div>
                                                </Dropdown>
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
                </div>
            </Card>
        </>
    )
}
