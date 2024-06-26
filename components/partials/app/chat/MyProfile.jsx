import React, { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { toggleProfile } from './store'
import SimpleBar from 'simplebar-react'
import { getCookie } from 'cookies-next'
import http from '@/app/helpers/http.helper'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

const MyProfile = () => {
    const { openProfile, user } = useSelector((state) => state.chat)
    const [isClient, setIsClient] = useState(false)
    const nodeRef = useRef(null)
    const dispatch = useDispatch()

    const token = getCookie('token')

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

    return (
        <div>
            <header>
                <div className="flex px-6 pt-6">
                    <div className="flex-1">
                        <div className="flex space-x-3 rtl:space-x-reverse">
                            <div className="flex-none">
                                <div className="h-10 w-10 rounded-full">
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/${usersData?.employee?.profile_photo}`}
                                        alt=""
                                        className="block w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-start">
                                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                                    {isClient && usersData?.name}
                                    <span className="status bg-success-500 inline-block h-[10px] w-[10px] rounded-full ml-3"></span>
                                </span>
                                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                                    {usersData?.role?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none">
                        <div
                            className="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                            onClick={() => dispatch(toggleProfile(true))}
                        >
                            <Icon icon="heroicons-outline:dots-horizontal" />
                        </div>
                    </div>
                </div>
                <CSSTransition
                    in={openProfile}
                    timeout={300}
                    nodeRef={nodeRef}
                    classNames="profileAnimation"
                    unmountOnExit
                >
                    <div
                        ref={nodeRef}
                        className="absolute bg-white dark:bg-slate-800 rounded-md h-full left-0 top-0 bottom-0  w-full z-[9]"
                    >
                        <SimpleBar className="h-full p-6">
                            <div className="text-right">
                                <div
                                    className="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 inline-flex ml-auto flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                                    onClick={() =>
                                        dispatch(toggleProfile(false))
                                    }
                                >
                                    <Icon icon="heroicons-outline:x" />
                                </div>
                            </div>
                            <header className="mx-auto max-w-[200px] mt-6 text-center">
                                <div className="h-16 w-16 rounded-full border border-slate-400 p-[2px] shadow-md mx-auto mb-3 relative">
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1704875850/${usersData?.employee?.profile_photo}`}
                                        alt=""
                                        className="block w-full h-full object-cover rounded-full"
                                    />
                                    <span
                                        className={
                                            'status inline-block h-3 w-3 rounded-full absolute -right-1 top-3 border border-white'
                                        }
                                    ></span>
                                </div>
                                <span className="block text-slate-600 dark:text-slate-300 text-sm">
                                    {isClient && usersData?.name}
                                </span>
                                <span className="block text-slate-500 dark:text-slate-300 text-xs">
                                    {user?.role}
                                </span>
                            </header>
                        </SimpleBar>
                    </div>
                </CSSTransition>
            </header>
        </div>
    )
}

export default MyProfile
