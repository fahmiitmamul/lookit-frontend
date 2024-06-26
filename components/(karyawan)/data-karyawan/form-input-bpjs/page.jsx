import Step from '@/components/partials/step'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Icon } from '@iconify/react'

export default function FormInputBpjs({
    bpjsData,
    bpjsFields,
    register,
    errors,
    appendBpjs,
    removeBpjs,
    styles,
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
                    <h6 className="font-bold">Data BPJS</h6>
                </div>
                <div>
                    {bpjsFields.map((item, index) => (
                        <div
                            className="lg:grid-cols-2 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                            key={item.id}
                        >
                            <div>
                                <label
                                    htmlFor={`bpjs[${index}].bpjs_type`}
                                    className="form-label"
                                >
                                    Pilih Tipe Bpjs
                                </label>
                                <Select
                                    className="react-select"
                                    register={register}
                                    name={`bpjs[${index}].bpjs_type`}
                                    defaultValue={item.bpjs_type}
                                    options={[
                                        ...(bpjsData?.data?.map((item) => ({
                                            value: item?.bpjs_type || '',
                                            label: item?.bpjs_type || '',
                                        })) || []),
                                    ]}
                                    styles={styles}
                                    id={`bpjs[${index}].bpjs_type`}
                                    error={errors?.bpjs?.[index]?.bpjs_type}
                                />
                            </div>
                            <div className="flex justify-between items-end space-x-5">
                                <div className="w-full">
                                    <Textinput
                                        label="Nomor BPJS"
                                        type="number"
                                        id="bpjs_number"
                                        placeholder="Nomor BPJS"
                                        register={register}
                                        name={`bpjs[${index}].bpjs_number`}
                                        defaultValue={item.bpjs_number}
                                        error={
                                            errors?.bpjs?.[index]?.bpjs_number
                                        }
                                    />
                                </div>
                                <div className="flex-none relative">
                                    <button
                                        onClick={() => {
                                            if (bpjsFields.length < 2) {
                                                appendBpjs({
                                                    bpjs_name: '',
                                                    bpjs_number: '',
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
                                        onClick={() => removeBpjs(index)}
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
