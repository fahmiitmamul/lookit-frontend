import React from 'react'
import Link from 'next/link'
import useSidebar from '@/hooks/useSidebar'
import useSkin from '@/hooks/useSkin'
import useDarkmode from '@/hooks/useDarkMode'
import useSemiDark from '@/hooks/useSemiDark'

const SidebarLogo = ({ menuHover }) => {
    const [collapsed, setMenuCollapsed] = useSidebar()
    const [isDark] = useDarkmode()
    const [isSemiDark] = useSemiDark()
    const [skin] = useSkin()
    return (
        <div
            className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? 'logo-hovered' : ''}
      ${
          skin === 'bordered'
              ? ' border-b border-r-0 border-slate-200 dark:border-slate-700'
              : ' border-none'
      }
      
      `}
        >
            <Link href="/dashboard">
                <div className="flex items-center space-x-4">
                    <div className="logo-icon">
                        <img
                            src={
                                isDark
                                    ? '/assets/images/logo/logo-dark.png'
                                    : isSemiDark
                                      ? '/assets/images/logo/logo-dark.png'
                                      : '/assets/images/logo/logo.png'
                            }
                            alt=""
                            width={130}
                            height={130}
                        />
                    </div>
                </div>
            </Link>

            {(!collapsed || menuHover) && (
                <div
                    onClick={() => setMenuCollapsed(!collapsed)}
                    className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${
              collapsed
                  ? ''
                  : 'ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700'
          }
          `}
                ></div>
            )}
        </div>
    )
}

export default SidebarLogo
