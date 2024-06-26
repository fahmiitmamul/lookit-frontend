import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { Icon } from '@iconify/react'
import Step from '@/components/partials/step'

export default function FormPendidikan({
    educationFields,
    register,
    errors,
    styles,
    schoolLevelOptions,
    control,
    graduationStatus,
    appendEducation,
    removeEducation,
    steps,
    stepNumber,
}) {
    return (
        <div>
            <div className="mb-8">
                <Step steps={steps} stepNumber={stepNumber} />
            </div>
            <div className="grid gap-5">
                <div>
                    <h6 className="font-bold">Pendidikan</h6>
                </div>
                <div>
                    {educationFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-6 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={item.id}
                        >
                            <Textinput
                                label="Nama Sekolah"
                                type="text"
                                placeholder="Nama Sekolah"
                                register={register}
                                name={`educations[${index}].school_name`}
                                defaultValue={item.school_name}
                                error={errors?.educations?.[index]?.school_name}
                            />
                            <div>
                                <label
                                    htmlFor="school_level"
                                    className="form-label"
                                >
                                    Pendidikan
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`educations[${index}].school_level`}
                                    defaultValue={item.school_level}
                                    options={schoolLevelOptions}
                                    styles={styles}
                                    id="school_level"
                                    error={
                                        errors?.educations?.[index]
                                            ?.school_level
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Mulai
                                </label>
                                <Controller
                                    name={`educations[${index}].education_start_date`}
                                    defaultValue={item.education_start_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.educations?.[index]
                                                    ?.education_start_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.educations?.[index]
                                    ?.education_start_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.educations?.[index]
                                                ?.education_start_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="default-picker"
                                    className=" form-label"
                                >
                                    Waktu Akhir
                                </label>
                                <Controller
                                    name={`educations[${index}].education_end_date`}
                                    defaultValue={item.education_end_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.educations?.[index]
                                                    ?.education_end_date
                                                    ? 'border-danger-500 border date-picker-control py-2'
                                                    : 'date-picker-control date-picker-control py-2'
                                            }
                                            onChange={(selectedDate, dateStr) =>
                                                onChange(dateStr)
                                            }
                                            options={{
                                                dateFormat: 'd-m-Y',
                                            }}
                                        />
                                    )}
                                />
                                {errors?.educations?.[index]
                                    ?.education_end_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.educations?.[index]
                                                ?.education_end_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="graduation_status"
                                    className="form-label"
                                >
                                    Status
                                </label>
                                <Select
                                    className="react-select"
                                    name={`educations[${index}].graduation_status`}
                                    defaultValue={item.graduation_status}
                                    register={register}
                                    options={graduationStatus}
                                    styles={styles}
                                    id="graduation_status"
                                    error={
                                        errors?.educations?.[index]
                                            ?.graduation_status
                                    }
                                />
                            </div>
                            <div className="flex justify-end items-end space-x-5">
                                <div className="flex-none relative">
                                    <button
                                        onClick={() => {
                                            if (educationFields.length < 3) {
                                                appendEducation({
                                                    school_name: '',
                                                    school_level: '',
                                                    education_start_date: '',
                                                    education_end_date: '',
                                                })
                                            }
                                        }}
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 bg-success-500 text-lg border rounded border-success-500 text-white"
                                    >
                                        <Icon icon="heroicons-outline:plus" />
                                    </button>
                                </div>

                                <div className="flex-none relative">
                                    <button
                                        onClick={() => removeEducation(index)}
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                                    >
                                        <Icon icon="heroicons-outline:trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
