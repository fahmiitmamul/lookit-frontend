import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import { Icon } from '@iconify/react'
import Step from '@/components/partials/step'

export default function FormPengalamanKerja({
    workHistoryFields,
    register,
    errors,
    styles,
    control,
    workStatusData,
    positionData,
    appendWorkHistory,
    removeWorkHistory,
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
                    <h6 className="font-bold">Pengalaman Kerja</h6>
                </div>
                <div>
                    {workHistoryFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-6 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={item.id}
                        >
                            <Textinput
                                label="Nama Perusahaan"
                                type="text"
                                id="company_name"
                                placeholder="Nama Perusahaan"
                                register={register}
                                name={`work_history[${index}].company_name`}
                                defaultValue={item.company_name}
                                error={
                                    errors?.work_history?.[index]?.company_name
                                }
                            />
                            <div>
                                <label
                                    htmlFor="position_name"
                                    className="form-label"
                                >
                                    Jabatan
                                </label>
                                <Select
                                    className="react-select"
                                    styles={styles}
                                    name={`work_history[${index}].position_name`}
                                    defaultValue={item.position_name}
                                    register={register}
                                    options={[
                                        ...(positionData?.data?.map((item) => ({
                                            value: item?.position_name || '',
                                            label: item?.position_name || '',
                                        })) || []),
                                    ]}
                                    id="position_name"
                                    error={
                                        errors?.work_history?.[index]
                                            ?.position_name
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
                                    name={`work_history[${index}].work_history_start_date`}
                                    defaultValue={item.work_history_start_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.work_history?.[index]
                                                    ?.work_history_start_date
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
                                {errors?.work_history?.[index]
                                    ?.work_history_start_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.work_history?.[index]
                                                ?.work_history_start_date
                                                ?.message
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
                                    name={`work_history[${index}].work_history_end_date`}
                                    defaultValue={item.work_history_end_date}
                                    control={control}
                                    render={({
                                        field: { onChange, ...fieldProps },
                                    }) => (
                                        <Flatpickr
                                            {...fieldProps}
                                            className={
                                                errors?.work_history?.[index]
                                                    ?.work_history_end_date
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
                                {errors?.work_history?.[index]
                                    ?.work_history_end_date && (
                                    <div
                                        className={
                                            'mt-2 text-danger-500 block text-sm'
                                        }
                                    >
                                        {
                                            errors?.work_history?.[index]
                                                ?.work_history_end_date?.message
                                        }
                                    </div>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="work_status"
                                    className="form-label"
                                >
                                    Status Kerja
                                </label>
                                <Select
                                    className="react-select"
                                    options={workStatusData}
                                    register={register}
                                    name={`work_history[${index}].work_status`}
                                    defaultValue={item.work_status}
                                    styles={styles}
                                    id="work_status"
                                    error={
                                        errors?.work_history?.[index]
                                            ?.work_status
                                    }
                                />
                            </div>
                            <div className="flex justify-end items-end space-x-5">
                                <div className="flex-none relative">
                                    <button
                                        onClick={() => {
                                            if (workHistoryFields.length < 5) {
                                                appendWorkHistory({
                                                    company_name: '',
                                                    position_name: '',
                                                    work_history_start_date: '',
                                                    work_history_end_date: '',
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
                                        onClick={() => removeWorkHistory(index)}
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
