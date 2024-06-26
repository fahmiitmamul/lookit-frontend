import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openChat } from './store'
import { useQuery } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'

const Contacts = ({ contact }) => {
    const dispatch = useDispatch()
    const [isClient, setIsClient] = useState(false)
    const token = getCookie('token')
    const { employee } = useSelector((state) => state.employee)

    async function getUser() {
        const { data } = await http(token).get('/users')
        return data.results
    }

    const { data: usersData } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUser(),
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    async function fetchChat(emp) {
        const { data } = await http(token).get(
            `/chat?sender_id=${employee?.employee_id}&receiver_id=${emp}`
        )
        return data.results
    }

    return (
        <div>
            {isClient &&
                contact
                    ?.filter((item) => item?.id !== usersData?.employee?.id)
                    ?.map((item) => {
                        return (
                            <div
                                className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
                                onClick={() => {
                                    dispatch(
                                        openChat({
                                            contact: item,
                                            activechat: true,
                                        })
                                    )
                                    fetchChat(item.id)
                                }}
                            >
                                <div className="flex space-x-3 px-6 rtl:space-x-reverse">
                                    <div className="flex-none">
                                        <div className="h-10 w-10 rounded-full relative">
                                            <span
                                                className={`  status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                  ${status === 'active' ? 'bg-success-500' : 'bg-secondary-500'}
                `}
                                            ></span>
                                            <img
                                                src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${item?.profile_photo}`}
                                                alt=""
                                                className="block w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-start flex">
                                        <div className="flex-1">
                                            <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                                                {item?.name}
                                            </span>
                                            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal">
                                                Available
                                            </span>
                                        </div>
                                        <div className="flex-none ltr:text-right rtl:text-end">
                                            <span className="block text-xs text-slate-400 dark:text-slate-400 font-normal">
                                                12:20 pm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </div>
    )
}

export default Contacts
