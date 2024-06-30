import Step from '@/components/partials/step'
import Fileinput from '@/components/ui/Fileinput'
import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import Image from 'next/image'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

export default function EmployeeBiodataForm({
    employeeData,
    selectedPicture,
    pictureURI,
    handleFileChange,
    register,
    errors,
    genderOptions,
    religionOptions,
    maritalOptions,
    bloodOptions,
    vaccineData,
    control,
    driverLicenseOptions,
    styles,
    steps,
    stepNumber,
    isDetail,
    selectedSIM
}) {
    return (
        <div>
            <div className="mb-8">
                <Step steps={steps} stepNumber={stepNumber} />
            </div>
            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                <div>
                    <h6 className="font-bold">Profil Karyawan</h6>
                </div>
                <div></div>
                <div className="flex gap-5">
                    <div className="flex flex-col justify-center items-center gap-5 max-w-48">
                        <div>
                            {employeeData?.profile_photo && !selectedPicture ? (
                                <div>
                                    <Image
                                        src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${employeeData?.profile_photo}`}
                                        width={200}
                                        height={200}
                                        alt=""
                                        className="object-cover w-full h-full"
                                    ></Image>
                                </div>
                            ) : selectedPicture ? (
                                <div>
                                    <Image
                                        src={pictureURI}
                                        width={200}
                                        height={200}
                                        alt=""
                                        className="object-cover w-full h-full"
                                    ></Image>
                                </div>
                            ) : (
                                <div className="border w-[160px] h-[160px] flex justify-center items-center">
                                    Pilih File
                                </div>
                            )}
                        </div>
                        <div className="w-[160px]">
                            <Fileinput
                                name="profile_photo"
                                selectedFile={selectedPicture}
                                onChange={handleFileChange}
                                id="profile-photo"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Textinput
                            label="NIK"
                            type="number"
                            placeholder="Masukkan NIK"
                            name="nik_ktp"
                            register={register}
                            error={errors.nik_ktp}
                            disabled={isDetail}
                        />
                        <Textinput
                            label="NPWP"
                            type="number"
                            placeholder="Masukkan NPWP"
                            name="npwp"
                            register={register}
                            error={errors.npwp}
                            disabled={isDetail}
                        />

                        <div>
                            <label htmlFor="gender" className="form-label">
                                Jenis Kelamin
                            </label>
                            <Select
                                className="react-select"
                                name="gender"
                                register={register}
                                options={genderOptions}
                                styles={styles}
                                id="gender"
                                error={errors.gender}
                                disabled={isDetail}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Textinput
                        label="Nama Lengkap"
                        type="text"
                        placeholder="Masukkan Nama Lengkap"
                        name="name"
                        register={register}
                        error={errors.name}
                        disabled={isDetail}
                    />
                    <Textinput
                        label="Tempat Tanggal Lahir"
                        type="text"
                        placeholder="Masukkan Tempat Tanggal Lahir"
                        name="birth_place"
                        register={register}
                        error={errors.birth_place}
                        disabled={isDetail}
                    />
                    <div>
                        <label htmlFor="religion" className="form-label">
                            Agama
                        </label>
                        <Select
                            className="react-select"
                            name="religion"
                            register={register}
                            options={religionOptions}
                            styles={styles}
                            id="religion"
                            error={errors.religion}
                            disabled={isDetail}
                        />
                    </div>
                </div>
                <Textinput
                    label="Email"
                    type="email"
                    placeholder="Masukkan Email"
                    name="email"
                    register={register}
                    error={errors.email}
                    disabled={isDetail}
                />
                {!isDetail && (
                    <Textinput
                        label="Password"
                        type="text"
                        placeholder="Masukkan Password"
                        name="password"
                        register={register}
                        error={errors.password}
                        disabled={isDetail}
                    />
                )}
                <Textinput
                    label="Berat Badan"
                    type="number"
                    placeholder="Masukkan Berat Badan"
                    name="employee_weight"
                    register={register}
                    error={errors.employee_weight}
                    disabled={isDetail}
                />
                <Textinput
                    label="Tinggi Badan"
                    type="number"
                    placeholder="Masukkan Tinggi Badan"
                    name="employee_height"
                    register={register}
                    error={errors.employee_height}
                    disabled={isDetail}
                />
                <Textinput
                    label="Umur"
                    type="number"
                    placeholder="Masukkan Umur"
                    name="age"
                    register={register}
                    error={errors.age}
                    disabled={isDetail}
                />
                <div>
                    <label htmlFor="marital_status" className="form-label">
                        Status Nikah
                    </label>
                    <Select
                        className="react-select"
                        name="marital_status"
                        register={register}
                        options={maritalOptions}
                        styles={styles}
                        id="marital_status"
                        error={errors.marital_status}
                        disabled={isDetail}
                    />
                </div>
                <div>
                    <label htmlFor="blood_type" className="form-label">
                        Golongan Darah
                    </label>
                    <Select
                        className="react-select"
                        name="blood_type"
                        register={register}
                        options={bloodOptions}
                        styles={styles}
                        id="blood_type"
                        error={errors.blood_type}
                        disabled={isDetail}
                    />
                </div>
                <div>
                    <label htmlFor="vaccine_status" className="form-label">
                        Status Vaksin
                    </label>
                    <Select
                        className="react-select"
                        name="vaccine_status"
                        register={register}
                        options={[
                            ...(vaccineData?.data?.map((item) => ({
                                value: item?.vaccine_code || '',
                                label: item?.vaccine_status || '',
                            })) || []),
                        ]}
                        styles={styles}
                        id="vaccine_status"
                        error={errors.vaccine_status}
                        disabled={isDetail}
                    />
                </div>
                <Textinput
                    label="Nomor Handphone"
                    type="text"
                    placeholder="Masukkan Nomor Handphone"
                    name="phone_number"
                    register={register}
                    error={errors.phone_number}
                    disabled={isDetail}
                />
                <div>
                    <div>
                        <label className="form-label" htmlFor="driver_license">
                            SIM
                        </label>
                        <Controller
                            name="driver_license"
                            disabled={isDetail}
                            control={control}
                            render={({
                                field: { onChange },
                                ...fieldProps
                            }) => (
                                <ReactSelect
                                    {...fieldProps}
                                    styles={styles}
                                    isMulti
                                    name="driver_license"
                                    placeholder="Silahkan Pilih"
                                    options={driverLicenseOptions}
                                    value={selectedSIM}
                                    isDisabled={isDetail}
                                    className={
                                        errors?.driver_license
                                            ? 'border-danger-500 border rounded-md'
                                            : 'form-control'
                                    }
                                    id="driver_license"
                                    onChange={(selectedOptions) => {
                                        onChange(selectedOptions)
                                    }}
                                />
                            )}
                        />
                        {errors?.driver_license && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.driver_license?.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
