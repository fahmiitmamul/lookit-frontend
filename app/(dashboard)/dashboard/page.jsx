'use client'
import Card from '@/components/ui/Card'
import React, { useEffect, useRef, useState } from 'react'
import Female from '@/public/assets/images/all-img/woman.png'
import Man from '@/public/assets/images/all-img/male-student.png'
import Checked from '@/public/assets/images/all-img/checked.png'
import Remove from '@/public/assets/images/all-img/remove.png'
import Image from 'next/image'
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
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Mousewheel, Keyboard } from 'swiper'
import { useQuery } from '@tanstack/react-query'

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

    async function fetchActiveEmployee() {
        try {
            const { data } = await http(token).get('/employee/active')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: activeEmployeeData } = useQuery({
        queryKey: ['active-employee'],
        queryFn: () => fetchActiveEmployee(),
    })

    async function fetchNonactiveEmployee() {
        try {
            const { data } = await http(token).get('/employee/non-active')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: nonActiveEmployeeData } = useQuery({
        queryKey: ['non-active-employee'],
        queryFn: () => fetchNonactiveEmployee(),
    })

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
                                            {activeEmployeeData?.data?.length}
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
                                            {
                                                nonActiveEmployeeData?.data
                                                    ?.length
                                            }
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
                                            {activeEmployeeData?.data?.length}
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
                                                {
                                                    nonActiveEmployeeData?.data
                                                        ?.length
                                                }
                                            </div>
                                        </div>
                                        <div className="text-md lg:text-3xl">
                                            {activeEmployeeData?.data?.length}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
