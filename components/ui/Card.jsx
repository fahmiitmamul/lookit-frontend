import React from 'react'
import useSkin from '@/hooks/useSkin'

const Card = ({
    search,
    period,
    salary,
    children,
    title,
    subtitle,
    headerslot,
    className = 'custom-class  bg-white ',
    bodyClass = 'p-6',
    noborder,
    titleClass = 'custom-class ',
    approved,
    declined,
    download,
    send,
}) => {
    const [skin] = useSkin()

    return (
        <div
            className={`
        card rounded-md   dark:bg-slate-800   ${
            skin === 'bordered'
                ? ' border border-slate-200 dark:border-slate-700'
                : 'shadow-base'
        }
   
    ${className}
        `}
        >
            {(title || subtitle) && (
                <header
                    className={`card-header ${noborder ? 'no-border' : ''}`}
                >
                    <div className="w-full flex justify-between">
                        <div className="flex gap-5">
                            {period && period}
                            {search && search}
                            {salary && salary}
                        </div>
                        <div className="flex gap-5">
                            {approved && approved}
                            {declined && declined}
                            {download && download}
                            {send && send}
                        </div>
                    </div>
                    <div>
                        {title && (
                            <div className={`card-title ${titleClass}`}>
                                {title}
                            </div>
                        )}
                        {subtitle && (
                            <div className="card-subtitle">{subtitle}</div>
                        )}
                    </div>

                    {headerslot && (
                        <div className="card-header-slot">{headerslot}</div>
                    )}
                </header>
            )}
            <main className={`card-body ${bodyClass}`}>{children}</main>
        </div>
    )
}

export default Card
