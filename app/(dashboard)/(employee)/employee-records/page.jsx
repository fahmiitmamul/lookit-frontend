'use client'
import React, { Fragment } from 'react'
import Card from '@/components/ui/Card'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import { Tab } from '@headlessui/react'
import EmployeeRecordsTable from '@/components/(karyawan)/rekam-karyawan/tabel-rekam-karyawan/page'
import NonactiveEmployeeRecordsTable from '@/components/(karyawan)/rekam-karyawan/tabel-rekam-karyawan-nonaktif/page'
import Flatpickr from 'react-flatpickr'

export default function EmployeeRecordsData() {
    const [activeEmployeePage, setActiveEmployeePage] = useState(1)
    const [activeEmployeeLimit, setActiveEmployeeLimit] = useState(5)
    const [activeEmployeeSearchData, setActiveEmployeeSearchData] = useState('')
    const [selectedItem, setSelectedItem] = useState('Aktif')
    const [nonActiveEmployeePage, setNonActiveEmployeePage] = useState(1)
    const [nonActiveEmployeelimit, setNonActiveEmployeeLimit] = useState(5)
    const [nonActiveEmployeeSearchData, setNonActiveEmployeeSearchData] =
        useState('')
    const [selectedPeriod, setSelectedPeriod] = useState('')
    const token = getCookie('token')

    const handleButtonClick = (item) => {
        setSelectedItem(item.title)
    }

    const handlePageChange = (page) => {
        if (selectedItem === 'Aktif') {
            setActiveEmployeePage(page)
        } else {
            setNonActiveEmployeePage(page)
        }
    }

    async function fetchActiveEmployee(
        pageData = activeEmployeePage,
        search = activeEmployeeSearchData,
        limitData = activeEmployeeLimit,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/employee/active?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: activeEmployeeData } = useQuery({
        queryKey: [
            'active-employee',
            activeEmployeePage,
            activeEmployeeSearchData,
            activeEmployeeLimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchActiveEmployee(
                activeEmployeePage,
                activeEmployeeSearchData,
                activeEmployeeLimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    async function fetchNonActiveEmployee(
        pageData = nonActiveEmployeePage,
        search = nonActiveEmployeeSearchData,
        limitData = nonActiveEmployeelimit,
        startDate = selectedPeriod[0] || '',
        endDate = selectedPeriod[1] || new Date()
    ) {
        try {
            const { data } = await http(token).get(
                '/employee/non-active?page=' +
                    pageData +
                    '&search=' +
                    search +
                    '&limit=' +
                    limitData +
                    '&startDate=' +
                    startDate +
                    '&endDate=' +
                    endDate
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: nonActiveEmployeeData } = useQuery({
        queryKey: [
            'non-active-employee',
            nonActiveEmployeePage,
            nonActiveEmployeeSearchData,
            nonActiveEmployeelimit,
            selectedPeriod[0],
            selectedPeriod[1],
        ],
        queryFn: () =>
            fetchNonActiveEmployee(
                nonActiveEmployeePage,
                nonActiveEmployeeSearchData,
                nonActiveEmployeelimit,
                selectedPeriod[0],
                selectedPeriod[1]
            ),
    })

    const buttons = [
        {
            title: 'Aktif',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Nonaktif',
            icon: 'heroicons-outline:user',
        },
    ]

    return (
        <>
            <div>
                <div className="w-full flex justify-between mb-5">
                    <div className="flex justify-center items-center">
                        <h5>Data Rekam Karyawan</h5>
                    </div>
                </div>
                <Card
                    title={true}
                    period={
                        <div className="flex gap-2">
                            <div className="flex justify-center items-center gap-3">
                                <div>
                                    <Flatpickr
                                        value={selectedPeriod}
                                        defaultValue={new Date()}
                                        id="period"
                                        placeholder="Periode Awal - Periode Akhir"
                                        className="date-picker-control w-[210px] py-2 h-[48px]"
                                        onChange={(date) =>
                                            setSelectedPeriod(date)
                                        }
                                        options={{
                                            mode: 'range',
                                            defaultDate: new Date(),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    search={
                        <div>
                            <InputGroup
                                id="largesize"
                                type="text"
                                placeholder="Cari"
                                className="h-[48px]"
                                append={
                                    <Icon icon="heroicons-outline:search" />
                                }
                                onChange={(e) => {
                                    if (selectedItem === 'Aktif') {
                                        setActiveEmployeeSearchData(
                                            e.target.value
                                        )
                                        fetchActiveEmployee()
                                    } else {
                                        setNonActiveEmployeeSearchData(
                                            e.target.value
                                        )
                                        fetchNonActiveEmployee()
                                    }
                                }}
                            />
                        </div>
                    }
                >
                    <Tab.Group>
                        <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                            {buttons.map((item, i) => (
                                <Tab as={Fragment} key={i}>
                                    {({ selected }) => (
                                        <button
                                            className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                            ${
                                                selected
                                                    ? 'text-white bg-primary-500 '
                                                    : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                            }`}
                                            onClick={() =>
                                                handleButtonClick(item)
                                            }
                                        >
                                            {item.title}
                                        </button>
                                    )}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                    <EmployeeRecordsTable
                                        activeEmployeeData={activeEmployeeData}
                                    />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                    <NonactiveEmployeeRecordsTable
                                        nonActiveEmployeeData={
                                            nonActiveEmployeeData
                                        }
                                    />
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </Card>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedItem === 'Aktif') {
                                    setActiveEmployeeLimit(e.target.value)
                                    fetchActiveEmployee()
                                } else {
                                    setNonActiveEmployeeLimit(e.target.value)
                                    fetchNonActiveEmployee()
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[5, 10].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedItem === 'Aktif' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {activeEmployeeData?.currentPage} of{' '}
                                {activeEmployeeData?.totalPages} entries
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Show {nonActiveEmployeeData?.currentPage} of{' '}
                                {nonActiveEmployeeData?.totalPages} entries
                            </span>
                        )}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            text
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedItem === 'Aktif'
                                    ? activeEmployeeData?.totalPages
                                    : nonActiveEmployeeData?.totalPages
                            }
                            currentPage={
                                selectedItem === 'Aktif'
                                    ? activeEmployeeData?.currentPage
                                    : nonActiveEmployeeData?.currentPage
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
