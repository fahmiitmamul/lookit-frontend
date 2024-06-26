'use client'

import React, { Fragment } from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import Link from 'next/link'
import useWidth from '@/hooks/useWidth'

const Logo = () => {
    const [isDark] = useDarkMode()
    const { width, breakpoints } = useWidth()

    return (
        <div>
            <Link href="/dashboard">
                <React.Fragment>
                    {width >= breakpoints.xl ? (
                        <img
                            src={
                                isDark
                                    ? '/assets/images/logo/logo-dark.png'
                                    : '/assets/images/logo/logo.png'
                            }
                            style={{ width: 150 }}
                            alt=""
                        />
                    ) : (
                        <img
                            src={
                                isDark
                                    ? '/assets/images/logo/logo-dark.png'
                                    : '/assets/images/logo/logo.png'
                            }
                            style={{ width: 150 }}
                            alt=""
                        />
                    )}
                </React.Fragment>
            </Link>
        </div>
    )
}

export default Logo
