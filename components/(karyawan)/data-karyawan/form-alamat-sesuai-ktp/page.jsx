import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import Textarea from '@/components/ui/Textarea'
import Step from '@/components/partials/step'

export default function FormAlamat({
    styles,
    register,
    errors,
    provinceData,
    regencyValue,
    districtValue,
    villageValue,
    provinceDomicileData,
    domicileRegencyValue,
    domicileDistrictValue,
    domicileVillageValue,
    steps,
    stepNumber,
}) {
    return (
        <div className="grid gap-5">
            <div>
                <div className="mb-8">
                    <Step steps={steps} stepNumber={stepNumber} />
                </div>
                <div className="grid gap-5">
                    <div>
                        <h6 className="font-bold">
                            Alamat Lengkap Sesuai E-KTP
                        </h6>
                    </div>
                    <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                        <div>
                            <label
                                htmlFor="e_ktp_province_id"
                                className="form-label"
                            >
                                Provinsi
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="e_ktp_province_id"
                                options={provinceData?.data?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="e_ktp_province_id"
                                error={errors.e_ktp_province_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="e_ktp_regency_id"
                                className="form-label"
                            >
                                Kota / Kabupaten
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="e_ktp_regency_id"
                                options={regencyValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="e_ktp_regency_id"
                                error={errors.e_ktp_regency_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="e_ktp_district_id"
                                className="form-label"
                            >
                                Kecamatan
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="e_ktp_district_id"
                                options={districtValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="e_ktp_district_id"
                                error={errors.e_ktp_district_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="e_ktp_village"
                                className="form-label"
                            >
                                Kelurahan
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="e_ktp_village_id"
                                options={villageValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="e_ktp_village"
                                error={errors.e_ktp_village_id}
                            />
                        </div>
                        <div>
                            <Textinput
                                label="Kode POS"
                                type="number"
                                placeholder="Masukkan Kode POS"
                                name="e_ktp_postal_code"
                                register={register}
                                error={errors.e_ktp_postal_code}
                            />
                        </div>
                    </div>
                    <div>
                        <Textarea
                            label="Alamat Lengkap sesuai E-KTP"
                            type="text"
                            name="e_ktp_full_address"
                            register={register}
                            id="df"
                            placeholder="Alamat Lengkap sesuai E-KTP"
                            error={errors.e_ktp_full_address}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="grid gap-5">
                    <div>
                        <h6 className="font-bold">
                            Alamat Lengkap Sesuai Domisili
                        </h6>
                    </div>
                    <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                        <div>
                            <label
                                htmlFor="domicile_province_id"
                                className="form-label"
                            >
                                Provinsi
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="domicile_province_id"
                                options={provinceDomicileData?.data?.map(
                                    (item) => ({
                                        value: item?.id || '',
                                        label: item?.name || '',
                                    })
                                )}
                                styles={styles}
                                id="domicile_province_id"
                                error={errors.domicile_province_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="domicile_regency_id"
                                className="form-label"
                            >
                                Kota / Kabupaten
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="domicile_regency_id"
                                options={domicileRegencyValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="domicile_regency_id"
                                error={errors.domicile_regency_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="domicile_district_id"
                                className="form-label"
                            >
                                Kecamatan
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="domicile_district_id"
                                options={domicileDistrictValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="domicile_district_id"
                                error={errors.domicile_district_id}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="domicile_village_id"
                                className="form-label"
                            >
                                Kelurahan
                            </label>
                            <Select
                                className="react-select"
                                register={register}
                                name="domicile_village_id"
                                options={domicileVillageValue?.map((item) => ({
                                    value: item?.id || '',
                                    label: item?.name || '',
                                }))}
                                styles={styles}
                                id="domicile_village_id"
                                error={errors.domicile_village_id}
                            />
                        </div>
                        <div>
                            <Textinput
                                label="Kode POS"
                                type="number"
                                placeholder="Masukkan Kode POS"
                                name="domicile_postal_code"
                                register={register}
                                error={errors.domicile_postal_code}
                            />
                        </div>
                    </div>
                    <div>
                        <Textarea
                            label="Alamat Lengkap sesuai Domisili"
                            type="text"
                            name="domicile_full_address"
                            register={register}
                            id="df"
                            placeholder="Alamat Lengkap sesuai Domisili"
                            error={errors.domicile_full_address}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
