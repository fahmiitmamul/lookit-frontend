import Step from '@/components/partials/step'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Icon } from '@iconify/react'

export default function FormInputAsuransi({
    insuranceFields,
    register,
    insuranceData,
    appendInsurance,
    removeInsurance,
    styles,
    errors,
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
                    <h6 className="font-bold">Data Asuransi</h6>
                </div>
                <div>
                    {insuranceFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={item.id}
                        >
                            <div>
                                <label
                                    htmlFor={`insurance[${index}].insurance_name`}
                                    className="form-label"
                                >
                                    Pilih Tipe Asuransi
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`insurance[${index}].insurance_name`}
                                    defaultValue={item.insurance_name}
                                    options={[
                                        ...(insuranceData?.data?.map(
                                            (item) => ({
                                                value:
                                                    item?.insurance_name || '',
                                                label:
                                                    item?.insurance_name || '',
                                            })
                                        ) || []),
                                    ]}
                                    styles={styles}
                                    id={`insurance[${index}].insurance_name`}
                                    error={
                                        errors?.insurance?.[index]
                                            ?.insurance_name
                                    }
                                />
                            </div>
                            <div className="flex justify-between items-end space-x-5">
                                <div className="w-full">
                                    <Textinput
                                        label="Nomor Asuransi"
                                        type="number"
                                        id="insurance_number"
                                        placeholder="Nomor Asuransi"
                                        register={register}
                                        name={`insurance[${index}].insurance_number`}
                                        defaultValue={item.insurance_number}
                                        error={
                                            errors?.insurance?.[index]
                                                ?.insurance_number
                                        }
                                    />
                                </div>
                                <div className="flex-none relative">
                                    <button
                                        onClick={() => {
                                            if (insuranceFields.length < 3) {
                                                appendInsurance({
                                                    insurance_name: '',
                                                    insurance_number: '',
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
                                        onClick={() => removeInsurance(index)}
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
