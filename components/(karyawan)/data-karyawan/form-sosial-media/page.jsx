import Step from '@/components/partials/step'
import Textinput from '@/components/ui/Textinput'

export default function FormSosialMedia({
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
                    <h6 className="font-bold">Sosial Media</h6>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <Textinput
                        label="Facebook"
                        type="text"
                        placeholder="Masukkan Facebook"
                        name="facebook"
                        register={register}
                        error={errors.facebook}
                    />
                    <Textinput
                        label="Instagram"
                        type="text"
                        placeholder="Masukkan Instagram"
                        name="instagram"
                        register={register}
                        error={errors.instagram}
                    />
                    <Textinput
                        label="Telegram"
                        type="text"
                        placeholder="Masukkan Telegram"
                        name="telegram"
                        register={register}
                        error={errors.telegram}
                    />
                    <Textinput
                        label="Twitter"
                        type="text"
                        placeholder="Masukkan Twitter"
                        name="twitter"
                        register={register}
                        error={errors.twitter}
                    />
                    <Textinput
                        label="Line"
                        type="text"
                        placeholder="Masukkan Line"
                        name="line"
                        register={register}
                        error={errors.line}
                    />
                    <Textinput
                        label="LinkedIn"
                        type="text"
                        placeholder="Masukkan LinkedIn"
                        name="linkedin"
                        register={register}
                        error={errors.linkedin}
                    />
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <Textinput
                            label="Tiktok"
                            type="text"
                            placeholder="Masukkan Tiktok"
                            name="tiktok"
                            register={register}
                            error={errors.tiktok}
                        />
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
