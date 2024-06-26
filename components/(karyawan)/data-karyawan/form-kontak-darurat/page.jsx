import Textinput from '@/components/ui/Textinput'
import Textarea from '@/components/ui/Textarea'
import Step from '@/components/partials/step'

export default function FormKontakDarurat({
    register,
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
                    <h6 className="font-bold">Kontak Darurat</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Nama Orang Tua"
                        type="text"
                        placeholder="Masukkan Nama Orang Tua"
                        name="urgent_full_name"
                        register={register}
                        error={errors.urgent_full_name}
                    />
                    <Textinput
                        label="Nama Saudara"
                        type="text"
                        placeholder="Masukkan Nama Saudara"
                        name="urgent_brother"
                        register={register}
                        error={errors.urgent_brother}
                    />
                    <Textinput
                        label="Nomor Handphone Orang Tua"
                        type="number"
                        placeholder="Masukkan Nomor Handphone Orang Tua"
                        name="urgent_phone_number"
                        register={register}
                        error={errors.urgent_phone_number}
                    />
                    <Textinput
                        label="Nomor Handphone Saudara"
                        type="number"
                        placeholder="Masukkan Nomor Handphone Saudara"
                        name="urgent_brother_number"
                        register={register}
                        error={errors.urgent_brother_number}
                    />
                </div>
                <div>
                    <Textarea
                        label="Alamat Lengkap"
                        type="text"
                        name="urgent_full_address"
                        register={register}
                        id="df"
                        placeholder="Alamat Lengkap"
                        error={errors.urgent_full_address}
                    />
                </div>
            </div>
        </div>
    )
}
