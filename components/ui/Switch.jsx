import React from 'react'
import Icon from '@/components/ui/Icon'

const Swicth = ({
    prevIcon,
    nextIcon,
    label,
    id,
    disabled,
    value,
    onChange,
    activeClass = 'bg-slate-900 dark:bg-slate-900',
    wrapperClass = ' ',
    labelClass = 'text-slate-500 dark:text-slate-400 text-sm leading-6',
    badge,
    activePlaceholder = 'ON',
    nonActivePlaceholder = 'OFF',
}) => {
    return (
        <div>
            <label
                className={
                    `flex items-center ${
                        disabled
                            ? 'cursor-not-allowed opacity-50'
                            : 'cursor-pointer'
                    } ` + wrapperClass
                }
                id={id}
            >
                <input
                    type="checkbox"
                    className="hidden"
                    checked={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div className="flex items-center">
                    {!value && (
                        <span className="mr-2 text-gray-500">
                            {nonActivePlaceholder}
                        </span>
                    )}
                    <div
                        className={`relative inline-flex h-6 w-[60px] items-center rounded-full transition-all duration-150
            ${value ? activeClass : 'bg-secondary-500'}
            `}
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150 
              ${
                  value
                      ? 'translate-x-9 rtl:-translate-x-9'
                      : 'translate-x-[2px] rtl:-translate-x-[2px]'
              }
              `}
                        />
                    </div>
                    {value && (
                        <span className="ml-2 text-gray-500">
                            {activePlaceholder}
                        </span>
                    )}
                </div>
                {label && <span className={`ml-2 ${labelClass}`}>{label}</span>}
            </label>
        </div>
    )
}

export default Swicth
