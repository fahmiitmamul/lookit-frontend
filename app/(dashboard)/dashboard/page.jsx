'use client'
import Card from '@/components/ui/Card'
import React, { useEffect, useRef, useState } from 'react'
import Female from '@/public/assets/images/all-img/woman.png'
import Man from '@/public/assets/images/all-img/male-student.png'
import Checked from '@/public/assets/images/all-img/checked.png'
import Remove from '@/public/assets/images/all-img/remove.png'
import Image from 'next/image'
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import Select from '@/components/ui/Select'
import Flatpickr from 'react-flatpickr'
import ProgressBar from '@/components/ui/ProgressBar'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Mousewheel, Keyboard } from 'swiper'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const [announcementData, setAnnouncementData] = useState([])
    const token = getCookie('token')
    let sliderRef = useRef(null)

    async function fetchAnnouncement() {
        const { data } = await http(token).get('/announcement')
        setAnnouncementData(data.results)
        return data.results
    }

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    const tasksBarData = {
        labels: ['Proses', 'Selesai', 'Batal'],
        datasets: [
            {
                data: [12, 19, 20],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const tasksBarOptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    const requestBarData = {
        labels: ['Proses', 'Disetujui', 'Ditolak', 'Pending'],
        datasets: [
            {
                data: [12, 19, 15, 20],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const requestBarOptions = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    const loanBarData = {
        labels: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            ' Oktober',
            'November',
            'Desember',
        ],
        datasets: [
            {
                data: [12, 19, 15, 20, 34, 21, 23, 54, 12, 23, 54, 89],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
            {
                data: [12, 19, 15, 20, 34, 21, 23, 54, 12, 23, 54, 89],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const loanOptions = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 4,
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    const pieData = {
        labels: ['Magang', 'Probation', 'Kontrak', 'Tetap'],
        options: {
            indexAxis: 'y',
        },
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const areaBranchData = {
        labels: ['Area', 'Cabang'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19],
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
            },
        ],
    }

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            responsive: true,
            maintainAspectRatio: true,
        },
    }

    const areaBranchOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            responsive: true,
            maintainAspectRatio: true,
        },
    }

    const lineOptions = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
    }

    const lineLabels = [
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
        'Minggu',
    ]

    const lineData = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [550, 250, 100, 300, 550, 100, 300],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const mutationOptions = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
        maintainAspectRatio: true,
        aspectRatio: 4,
    }

    const mutationLabels = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    const mutationData = {
        labels: mutationLabels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [
                    550, 250, 100, 300, 550, 100, 300, 400, 300, 450, 200, 320,
                ],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const doughnutOptions = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
        },
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: '14px',
        }),
    }

    const scheduleOptions = [
        {
            value: 'Area',
            label: 'Area',
        },
        {
            value: 'Cabang',
            label: 'Cabang',
        },
    ]

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex flex-auto lg:w-3/4 w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <div>
                            <Card>
                                <div className="flex justify-between mb-4">
                                    <div className="text-xl">Pengumuman</div>
                                </div>
                                {announcementData?.data?.length > 0 ? (
                                    <div className="slider-container">
                                        <div className="relative">
                                            <Swiper
                                                cssMode={true}
                                                navigation={true}
                                                mousewheel={true}
                                                keyboard={true}
                                                modules={[
                                                    Navigation,
                                                    Mousewheel,
                                                    Keyboard,
                                                ]}
                                                className="mySwiper"
                                            >
                                                <div>
                                                    {announcementData?.data?.map(
                                                        (item, index) => {
                                                            return (
                                                                <SwiperSlide>
                                                                    <div className="w-full h-64 rounded-lg relative">
                                                                        <Image
                                                                            src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1711452402/${item.file}`}
                                                                            width={
                                                                                10000
                                                                            }
                                                                            height={
                                                                                10000
                                                                            }
                                                                            alt=""
                                                                            className="object-cover w-full h-full rounded-lg brightness-50"
                                                                        />
                                                                        <div className="absolute top-0 w-full h-full text-white text-center flex justify-center items-center">
                                                                            <div className="w-full h-full flex flex-col justify-center items-center">
                                                                                <h3 className="text-white">
                                                                                    {
                                                                                        item?.announcement_title
                                                                                    }
                                                                                </h3>
                                                                                <h5 className="text-white">
                                                                                    {
                                                                                        item?.announcement_content
                                                                                    }
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </Swiper>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center h-[250px] items-center">
                                        <div className="text-md">
                                            Tidak ada pengumuman
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                        <div className="flex w-full xl:gap-5 gap-2 flex-wrap sm:flex-nowrap">
                            <Card className="w-full bg-white">
                                <div className="lg:text-xl text-md text-black dark:text-white">
                                    Jumlah Karyawan
                                </div>
                                <div className="flex justify-around items-center gap-5 mt-5 flex-wrap">
                                    <div className="flex gap-3 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <Image
                                                src={Man}
                                                width={40}
                                                height={40}
                                            />
                                            <div className="text-xs">Pria</div>
                                        </div>
                                        <div className="text-md lg:text-3xl">
                                            700
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <Image
                                                src={Female}
                                                width={40}
                                                height={40}
                                            />
                                            <div className="text-xs">
                                                Wanita
                                            </div>
                                        </div>
                                        <div className="text-md lg:text-3xl">
                                            500
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className="w-full bg-white">
                                <div className="lg:text-xl text-md text-black dark:text-white">
                                    Status Karyawan
                                </div>
                                <div className="flex justify-around items-center gap-5 mt-5 flex-wrap">
                                    <div className="flex gap-3 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <Image
                                                src={Checked}
                                                width={40}
                                                height={40}
                                            />
                                            <div className="text-xs">Aktif</div>
                                        </div>
                                        <div className="text-md lg:text-3xl">
                                            500
                                        </div>
                                    </div>
                                    <div className="flex gap-3 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center">
                                            <Image
                                                src={Remove}
                                                width={40}
                                                height={40}
                                            />
                                            <div className="text-xs">
                                                Nonaktif
                                            </div>
                                        </div>
                                        <div className="text-md lg:text-3xl">
                                            500
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="flex flex-auto lg:w-1/4 w-full">
                    <div className="flex flex-col gap-5 w-full">
                        <Card className="w-full bg-white flex justify-center items-center">
                            <div className="lg:text-xl text-md">
                                Status Kontrak
                            </div>
                            <div className="flex w-40 justify-center items-center">
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                        </Card>
                        <Card className="w-full bg-white flex justify-center items-center">
                            <div className="lg:text-xl text-md">
                                Area & Cabang
                            </div>
                            <div className="flex w-40 justify-center items-center">
                                <Pie
                                    data={areaBranchData}
                                    options={areaBranchOptions}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap xl:flex-nowrap gap-5">
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Jadwal</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Flatpickr
                                        className="date-picker-control date-picker-control py-2"
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                        options={{
                                            dateFormat: 'd-m-Y',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Line options={lineOptions} data={lineData} />
                    </div>
                </Card>
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Kehadiran</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Flatpickr
                                        className="date-picker-control date-picker-control py-2"
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                        options={{
                                            dateFormat: 'd-m-Y',
                                        }}
                                    />
                                </div>
                                <div className="w-full">
                                    <Flatpickr
                                        className="date-picker-control date-picker-control py-2"
                                        onChange={(selectedDate, dateStr) =>
                                            onChange(dateStr)
                                        }
                                        options={{
                                            dateFormat: 'd-m-Y',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Hadir (H)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Hadir Terlambat (HT)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Pulang Cepat (PC)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Tidak Absen Pulang (TAP)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Alpha (A)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Sakit (S)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Izin (I)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Cuti (C)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Lembur (L)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">
                                    Libur (LB)
                                </label>
                                <ProgressBar
                                    className="bg-success-500"
                                    animate
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Permintaan</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Bar
                            data={requestBarData}
                            options={requestBarOptions}
                        />
                    </div>
                </Card>
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Tugas Karyawan</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center items-center">
                            <Bar
                                data={tasksBarData}
                                options={tasksBarOptions}
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <Card>
                <div className="flex justify-center items-center flex-wrap xl:flex-nowrap gap-5">
                    <div className="w-32 h-32 flex flex-col justify-center items-center">
                        <div>Komunikasi</div>
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                    <div className="w-32 h-32 flex flex-col justify-center items-center">
                        <div>Absensi</div>
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                    <div className="w-40 h-40 flex flex-col justify-center items-center">
                        <div>KPI</div>
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                    <div className="w-32 h-32 flex flex-col justify-center items-center">
                        <div>Responsibility</div>
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                    <div className="w-32 h-32 flex flex-col justify-center items-center">
                        <div>Inisiatif</div>
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                </div>
            </Card>
            <Card className="w-full bg-white">
                <div className="lg:text-xl text-md text-black dark:text-white">
                    <div className="flex justify-between">
                        <div>Mutasi</div>
                        <div className="flex gap-5">
                            <div className="w-full">
                                <Select
                                    className="react-select"
                                    options={scheduleOptions}
                                    styles={styles}
                                    id="blood_type"
                                />
                            </div>
                            <div className="w-full">
                                <Flatpickr
                                    className="date-picker-control date-picker-control py-2"
                                    onChange={(selectedDate, dateStr) =>
                                        onChange(dateStr)
                                    }
                                    options={{
                                        dateFormat: 'd-m-Y',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Line options={mutationOptions} data={mutationData} />
                </div>
            </Card>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
                <Card
                    title="Jumlah Aset"
                    className="w-full flex flex-col justify-center items-center bg-white"
                >
                    <div className="w-32 h-32">
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                </Card>
                <Card
                    title="Jumlah Garansi"
                    className="w-full flex flex-col justify-center items-center bg-white"
                >
                    <div className="w-32 h-32">
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                </Card>
                <Card
                    title="Kontrak Karyawan"
                    className="w-full flex flex-col justify-center items-center bg-white"
                >
                    <div className="w-32 h-32">
                        <Doughnut
                            data={doughnutData}
                            options={doughnutOptions}
                        />
                    </div>
                </Card>
            </div>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Jumlah Tiket</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Bar
                            data={requestBarData}
                            options={requestBarOptions}
                        />
                    </div>
                </Card>
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Keuangan</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center items-center">
                            <Bar
                                data={tasksBarData}
                                options={tasksBarOptions}
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                <Card className="w-full bg-white">
                    <div className="lg:text-xl text-md text-black dark:text-white">
                        <div className="flex justify-between">
                            <div>Pinjaman</div>
                            <div className="flex gap-5">
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select
                                        className="react-select"
                                        options={scheduleOptions}
                                        styles={styles}
                                        id="blood_type"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Bar data={loanBarData} options={loanOptions} />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
