import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMobileChatSidebar, infoToggle, setEmployeeChatId } from './store'
import useWidth from '@/hooks/useWidth'
import Icon from '@/components/ui/Icon'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import Dropdown from '@/components/ui/Dropdown'
import Image from 'next/image'

const Chat = () => {
    const { openinfo, user } = useSelector((state) => state.chat)
    const { employee } = useSelector((state) => state.employee)
    const [chatData, setChatData] = useState([])
    const { width, breakpoints } = useWidth()
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const queryClient = useQueryClient()
    const token = getCookie('token')

    const chatheight = useRef(null)

    const chatAction = [
        {
            label: 'Remove',
            link: '#',
        },
        {
            label: 'Forward',
            link: '#',
        },
    ]
    const time = () => {
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours >= 12 ? 'pm' : 'am'
        const hours12 = hours % 12 || 12
        const minutesStr = minutes < 10 ? '0' + minutes : minutes
        return hours12 + ':' + minutesStr + ' ' + ampm
    }

    useEffect(() => {
        chatheight.current.scrollTop = chatheight.current.scrollHeight
    }, [chatData])

    async function getUser() {
        const { data } = await http(token).get('/users')
        return data.results
    }

    const { data: usersData } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUser(),
    })

    async function fetchChat() {
        const { data } = await http(token).get(
            `/chat?sender_id=${employee?.employee_id}&receiver_id=${user?.id}`
        )
        setChatData(data.results)
    }

    useEffect(() => {
        fetchChat()
    }, [user?.id])

    useEffect(() => {
        dispatch(setEmployeeChatId(usersData?.id))
    }, [])

    const postChat = useMutation({
        mutationFn: async (values) => {
            const data = new URLSearchParams({
                sender_id: employee?.employee_id,
                receiver_id: user?.id,
                message: message,
            }).toString()
            return http(token).post(`/chat`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat'] })
            fetchChat()
            setMessage('')
        },
        onError: (err) => {
            console.log(err)
        },
    })

    return (
        <div className="h-full">
            <header className="border-b border-slate-100 dark:border-slate-700">
                <div className="flex py-6 md:px-6 px-3 items-center">
                    <div className="flex-1">
                        <div className="flex space-x-3 rtl:space-x-reverse">
                            {width <= breakpoints.lg && (
                                <span
                                    onClick={() =>
                                        dispatch(toggleMobileChatSidebar(true))
                                    }
                                    className="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3"
                                >
                                    <Icon icon="heroicons-outline:menu-alt-1" />
                                </span>
                            )}
                            <div className="flex-none">
                                <div className="h-10 w-10 rounded-full relative">
                                    <span
                                        className={` status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                  ${
                      user.status === 'active'
                          ? 'bg-success-500'
                          : 'bg-secondary-500'
                  }
                  `}
                                    ></span>
                                    <img
                                        src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${user?.profile_photo}`}
                                        alt=""
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 text-start">
                                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate">
                                    {user?.name}
                                </span>
                                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                                    Active now
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse">
                        <div
                            onClick={() => dispatch(infoToggle(!openinfo))}
                            className="msg-action-btn"
                        >
                            <Icon icon="heroicons-outline:dots-horizontal" />
                        </div>
                    </div>
                </div>
            </header>
            <div className="chat-content parent-height">
                <div
                    className="msgs overflow-y-auto msg-height pt-6 space-y-6"
                    ref={chatheight}
                >
                    {chatData?.map((item) => (
                        <div>
                            <div className="block md:px-6 px-4">
                                {item?.employee?.id !==
                                    usersData?.employee?.id && (
                                    <div className="flex space-x-2 items-start group rtl:space-x-reverse">
                                        <div className="flex-none">
                                            <div className="h-8 w-8 rounded-full">
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={`https://res.cloudinary.com/dxnewldiy/image/upload/${item?.employee?.profile_photo}`}
                                                    alt=""
                                                    className="block w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex space-x-4 rtl:space-x-reverse">
                                            <div>
                                                <div className="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all">
                                                    {item.message}
                                                </div>
                                                <span className="font-normal text-xs text-slate-400 dark:text-slate-400">
                                                    {time()}
                                                </span>
                                            </div>
                                            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                                                <Dropdown
                                                    classMenuItems=" w-[100px] top-0"
                                                    items={chatAction}
                                                    label={
                                                        <div className="h-8 w-8 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-900 flex flex-col justify-center items-center text-xl rounded-full">
                                                            <Icon icon="heroicons-outline:dots-horizontal" />
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {item?.employee?.id ===
                                    usersData?.employee?.id && (
                                    <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse">
                                        <div className="no flex space-x-4 rtl:space-x-reverse">
                                            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                                                <Dropdown
                                                    classMenuItems=" w-[100px] left-0 top-0  "
                                                    items={chatAction}
                                                    label={
                                                        <div className="h-8 w-8 bg-slate-300 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full text-slate-900">
                                                            <Icon icon="heroicons-outline:dots-horizontal" />
                                                        </div>
                                                    }
                                                />
                                            </div>

                                            <div className="whitespace-pre-wrap break-all">
                                                <div className="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1">
                                                    {item?.message}
                                                </div>
                                                <span className="font-normal text-xs text-slate-400">
                                                    {time()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-none">
                                            <div className="h-8 w-8 rounded-full">
                                                <Image
                                                    src={`https://res.cloudinary.com/dxnewldiy/image/upload/${usersData?.employee?.profile_photo}`}
                                                    width={50}
                                                    height={50}
                                                    alt=""
                                                    className="block w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700">
                <form
                    className="flex-1 relative flex space-x-3 rtl:space-x-reverse"
                    onSubmit={(e) => {
                        e.preventDefault()
                        postChat.mutate()
                        fetchChat()
                    }}
                >
                    <div className="flex-1">
                        <textarea
                            type="text"
                            value={message}
                            placeholder="Type your message..."
                            className="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    postChat.mutate()
                                    fetchChat()
                                }
                            }}
                        />
                    </div>
                    <div className="flex-none md:pr-0 pr-3">
                        <button className="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full">
                            <Icon
                                icon="heroicons-outline:paper-airplane"
                                className="transform rotate-[60deg]"
                            />
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default Chat
