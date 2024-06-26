import React from 'react'
import SimpleBar from 'simplebar-react'
import { useSelector } from 'react-redux'
import Icon from '@/components/ui/Icon'
import Image from 'next/image'
import dayjs from 'dayjs'

const socials = [
    {
        name: 'facebook',
        icon: 'bi:facebook',
        link: '#',
    },
    {
        name: 'twitter',
        link: '#',
        icon: 'bi:twitter',
    },
    {
        name: 'instagram',
        link: '#',
        icon: 'bi:instagram',
    },
]

const Info = () => {
    const { activechat, user } = useSelector((state) => state.chat)
    return (
        <SimpleBar className="h-full p-6">
            <h4 className="text-xl text-slate-900 font-medium mb-8">About</h4>
            <div className="h-[100px] w-[100px] rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                    src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${user?.profile_photo}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center">
                <h5 className="text-base text-slate-600 dark:text-slate-300 font-medium mb-1">
                    {user?.name}
                </h5>
                <h6 className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                    {user?.role}
                </h6>
            </div>
            <ul className="list-item mt-5 space-y-4 border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
                    <div className="flex space-x-2 items-start rtl:space-x-reverse">
                        <Icon
                            icon="heroicons-outline:location-marker"
                            className="text-base"
                        />
                        <span>Lokasi</span>
                    </div>
                    <div className="font-medium">
                        {user?.domicile_province?.name}
                    </div>
                </li>
                <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
                    <div className="flex space-x-2 items-start rtl:space-x-reverse">
                        <Icon
                            icon="heroicons-outline:user"
                            className="text-base"
                        />
                        <span>Join Date</span>
                    </div>
                    <div className="font-medium">{user?.join_date}</div>
                </li>
                <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
                    <div className="flex space-x-2 items-start rtl:space-x-reverse">
                        <Icon
                            icon="heroicons-outline:user-circle"
                            className="text-base"
                        />
                        <span>Gender</span>
                    </div>
                    <div className="font-medium">{user?.gender}</div>
                </li>
            </ul>
        </SimpleBar>
    )
}

export default Info
