import Step from '@/components/partials/step'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'

export default function FormInputBank({
    register,
    errors,
    bankData,
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
                    <h6 className="font-bold">Akun Bank</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="bank_name" className="form-label">
                            Pilih Bank
                        </label>
                        <Select
                            className="react-select"
                            name="bank_name"
                            register={register}
                            options={[
                                ...(bankData?.data?.map((item) => ({
                                    value: item?.name || '',
                                    label: item?.name || '',
                                })) || []),
                            ]}
                            styles={styles}
                            id="bank_name"
                            error={errors.bank_name}
                        />
                    </div>
                    <Textinput
                        label="No Rekening"
                        type="number"
                        placeholder="Masukkan No Rekening"
                        name="account_number"
                        register={register}
                        error={errors.account_number}
                    />
                    <Textinput
                        label="Nama Cabang Bank"
                        type="text"
                        placeholder="Masukkan Nama Cabang Bank"
                        name="bank_branch_name"
                        register={register}
                        error={errors.bank_branch_name}
                    />
                    <Textinput
                        label="Nama Pemilik Rekening"
                        type="text"
                        placeholder="Masukkan Nama Pemilik Rekening"
                        name="bank_owner_name"
                        register={register}
                        error={errors.bank_owner_name}
                    />
                </div>
            </div>
        </div>
    )
}
