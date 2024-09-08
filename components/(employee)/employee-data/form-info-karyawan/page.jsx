import Select from '@/components/ui/Select'
import Textinput from '@/components/ui/Textinput'
import { Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import Step from '@/components/partials/step'

export default function FormInfoKaryawan({
    register,
    errors,
    styles,
    employeeStatus,
    control,
    areaData,
    branchData,
    divisionData,
    positionData,
    levelData,
    steps,
    stepNumber,
}) {
    return (
        <div>
            <div className="mb-8">
                <Step steps={steps} stepNumber={stepNumber} />
            </div>
            <div className="grid gap-5">
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>
                        <h6 className="font-bold">Data Karyawan</h6>
                    </div>
                    <div></div>
                    <Textinput
                        label="NIK Karyawan"
                        type="text"
                        placeholder="Masukkan NIK Karyawan"
                        name="employee_nik"
                        register={register}
                        error={errors.employee_nik}
                    />
                    <div>
                        <label htmlFor="employee_status" className="form-label">
                            Status Karyawan
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="employee_status"
                            options={employeeStatus}
                            styles={styles}
                            id="employee_status"
                            error={errors.employee_status}
                        />
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Masuk Kerja
                        </label>
                        <Controller
                            name="join_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.join_date
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
                        {errors?.join_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.join_date?.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="default-picker" className=" form-label">
                            Tanggal Berakhir Kerja
                        </label>
                        <Controller
                            name="end_date"
                            control={control}
                            render={({
                                field: { onChange, ...fieldProps },
                            }) => (
                                <Flatpickr
                                    {...fieldProps}
                                    className={
                                        errors?.end_date
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
                        {errors?.end_date && (
                            <div
                                className={'mt-2 text-danger-500 block text-sm'}
                            >
                                {errors?.end_date?.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:grid-cols-3 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="area_id" className="form-label">
                            Area
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="area_id"
                            styles={styles}
                            options={[
                                ...(areaData?.data?.map((item) => ({
                                    value: item?.area_code || '',
                                    label: item?.area_name || '',
                                })) || []),
                            ]}
                            id="area_id"
                            error={errors.area_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="branch_id" className="form-label">
                            Cabang
                        </label>
                        <Select
                            className="react-select"
                            register={register}
                            name="branch_id"
                            styles={styles}
                            options={[
                                ...(branchData?.data?.map((item) => ({
                                    value: item?.branch_code || '',
                                    label: item?.branch_name || '',
                                })) || []),
                            ]}
                            id="branch_id"
                            error={errors.branch_id}
                        />
                    </div>
                    <div>
                        <Textinput
                            label="Batch"
                            type="number"
                            placeholder="Masukkan Batch"
                            name="batch"
                            register={register}
                            error={errors.batch}
                        />
                    </div>
                    <div>
                        <label htmlFor="division" className="form-label">
                            Divisi
                        </label>
                        <Select
                            className="react-select"
                            name="departement_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(divisionData?.data?.map((item) => ({
                                    value: item?.division_code || '',
                                    label: item?.division_name || '',
                                })) || []),
                            ]}
                            id="division"
                            error={errors.departement_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="position_id" className="form-label">
                            Jabatan
                        </label>
                        <Select
                            className="react-select"
                            name="position_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(positionData?.data?.map((item) => ({
                                    value: item?.position_code || '',
                                    label: item?.position_name || '',
                                })) || []),
                            ]}
                            id="position_id"
                            error={errors.position_id}
                        />
                    </div>
                    <div>
                        <label htmlFor="level_id" className="form-label">
                            Level
                        </label>
                        <Select
                            className="react-select"
                            name="level_id"
                            register={register}
                            styles={styles}
                            options={[
                                ...(levelData?.data?.map((item) => ({
                                    value: item?.level_code || '',
                                    label: item?.level_name || '',
                                })) || []),
                            ]}
                            id="level_id"
                            error={errors.level_id}
                        />
                    </div>
                </div>

                {/* <div className="lg:grid-cols-2 grid-cols-1 grid gap-5">
                <div className="w-full flex justify-center items-center">
                    <Switch
                        label="Lock Device"
                        labelClass="pl-2 text-slate-500 dark:text-slate-400 text-sm leading-6"
                        activeClass="bg-red-500 dark:bg-red-500"
                        value={checked}
                        onChange={() => setChecked(!checked)}
                    />
                </div>
                <div className="w-full flex justify-center items-center">
                    <Switch
                        label="Lock Location"
                        labelClass="pl-2 text-slate-500 dark:text-slate-400 text-sm leading-6"
                        activeClass="bg-green-500 dark:bg-green-500"
                        value={checked}
                        onChange={() => setChecked(!checked)}
                    />
                </div>
            </div> */}
            </div>
        </div>
    )
}
