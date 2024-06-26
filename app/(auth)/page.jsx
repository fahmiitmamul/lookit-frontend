'use client'
import React from 'react'
import LoginForm from '@/components/partials/auth/login-form'
import useDarkMode from '@/hooks/useDarkMode'
import Image from 'next/image'

const Login2 = () => {
    const [isDark] = useDarkMode()
    return (
        <>
            <div className="loginwrapper">
                <div className="lg-inner-column">
                    <div className="right-column relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div className="auth-box h-full flex flex-col justify-center">
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <div className="flex justify-center items-center mb-2 gap-2">
                                        <Image
                                            src={
                                                isDark
                                                    ? '/assets/images/logo/logo-dark.png'
                                                    : '/assets/images/logo/logo.png'
                                            }
                                            width={250}
                                            height={250}
                                        ></Image>
                                    </div>
                                    <div className="text-slate-500 dark:text-slate-400 text-base">
                                        HRIS System
                                    </div>
                                </div>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                    <div
                        className="left-column bg-cover bg-no-repeat bg-center "
                        style={{
                            backgroundImage: `url(/assets/images/all-img/login-bg.png)`,
                        }}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default Login2
