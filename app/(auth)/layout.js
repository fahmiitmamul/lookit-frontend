'use client'
import useRtl from '@/hooks/useRtl'
import useDarkMode from '@/hooks/useDarkMode'
import useSkin from '@/hooks/useSkin'
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

export default function AuthLayout({ children }) {
    const [isRtl] = useRtl()
    const [isDark] = useDarkMode()
    const [skin] = useSkin()
    return (
        <>
            <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className={`app-warp ${isDark ? 'dark' : 'light'} ${
                    skin === 'bordered' ? 'skin--bordered' : 'skin--default'
                }`}
            >
                <div className={nunito.className}>{children}</div>
            </div>
        </>
    )
}
