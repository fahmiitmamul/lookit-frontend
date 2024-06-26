import React from 'react'
import Link from 'next/link'
import useDarkMode from '@/hooks/useDarkMode'
import MainLogo from '@/public/assets/images/logo/logo.png'
import LogoWhite from '@/public/assets/images/logo/logo-dark.png'

const MobileLogo = () => {
    const [isDark] = useDarkMode()
    return (
        <Link href="/dashboard">
            <img src={isDark ? LogoWhite : MainLogo} alt="" />
        </Link>
    )
}

export default MobileLogo
