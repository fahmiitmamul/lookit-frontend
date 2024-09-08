import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '@/store/loadingReducer'
import { MainSalary } from '../main-salary-form/page'
import { AdditionalSalary } from '../form-tambahan/page'
import { SalaryCuts } from '../form-potongan/page'
import { InsuranceForm } from '../insurance-form/page'
import { TaxForm } from '../form-pajak/page'
import { BPJSForm } from '../bpjs-form/page'
import { setSelectedItem } from '../../store'

const MainSalaryForm = ({
    setShowAddSalaryModals,
    handleSubmitMainSalary,
    handleSubmitAdditionalSalary,
    handleSubmitSalaryCuts,
    handleSubmitBpjs,
    handleSubmitInsurance,
    handleSubmitTax,
    currentStep,
    watchMainSalary,
    controlMainSalary,
    registerMainSalary,
    triggerMainSalary,
    triggerAdditionalSalary,
    triggerSalaryCuts,
    triggerInsurance,
    triggerTax,
    errorsMainSalary,
    setCurrentStep,
    setValueAdditionalSalary,
    clearErrorsAdditionalSalary,
    clearErrorsInsurance,
    clearErrorsTax,
    clearErrorsSalaryCuts,
    controlAdditionalSalary,
    registerAdditionalSalary,
    errorsAdditionalSalary,
    controlSalaryCuts,
    registerSalaryCuts,
    errorsSalaryCuts,
    setValueSalaryCuts,
    bpjsControl,
    bpjsRegister,
    bpjsErrors,
    setValueBpjs,
    insuranceControl,
    insuranceRegister,
    insuranceErrors,
    insuranceSetValue,
    taxControl,
    taxRegister,
    taxErrors,
    taxSetValue,
    resetMainSalary,
    resetAdditionalSalary,
    resetSalaryCuts,
    resetBpjs,
    resetInsurance,
    resetTax,
}) => {
    const token = getCookie('token')
    const bpjsData = useSelector((state) => state.finance.finance.bpjs)
    const totalSteps = 6

    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const filteredBpjsData = [bpjsData].filter(
        (item) => item.kesehatan.isActive || item.ketenagakerjaan.isActive
    )

    const emp_id = useSelector((state) => state.finance.finance.employee_id)

    const { main_salary } = useSelector((state) => state.finance.finance)

    const postMainSalary = useMutation({
        mutationFn: async (values) => {
            const mainSalaryForm = new URLSearchParams({
                employee_id: values.employee_id,
                main_salary: values.main_salary,
                main_salary_count: values.main_salary_count,
            })

            return http(token).post(`/main-salary`, mainSalaryForm)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah gaji karyawan', { toastId: 1 })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const postAdditionalSalary = useMutation({
        mutationFn: async (values) => {
            const mainSalaryAdditionForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_addition_value: JSON.stringify(
                    values.main_salary_addition_value
                ),
            })

            return http(token).post(
                `/main-salary-addition`,
                mainSalaryAdditionForm
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const postSalaryCuts = useMutation({
        mutationFn: async (values) => {
            const mainSalaryDeductionForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_deduction_value: JSON.stringify(
                    values.main_salary_deduction_value
                ),
            })

            await http(token).post(
                `/main-salary-deduction`,
                mainSalaryDeductionForm
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const postBpjs = useMutation({
        mutationFn: async (values) => {
            const mainSalaryBpjsForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_bpjs_value: JSON.stringify(filteredBpjsData),
                main_salary: main_salary.replace('Rp', '').replace(/,/g, ''),
            })

            return http(token).post(`/main-salary-bpjs`, mainSalaryBpjsForm)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
        },
    })

    const postInsurance = useMutation({
        mutationFn: async (values) => {
            const mainSalaryInsuranceForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_insurance_value: JSON.stringify(
                    values.main_salary_insurance_value
                ),
            })

            values.main_salary_insurance_value.forEach(async (item) => {
                try {
                    await http(token).post('/master-salary-insurance', {
                        insurance_name: item.insurance_name,
                    })
                } catch (err) {
                    console.error(err)
                }
            })

            return http(token).post(
                `/main-salary-insurance`,
                mainSalaryInsuranceForm
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
            dispatch(setLoading(false))
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const postTax = useMutation({
        mutationFn: async (values) => {
            const mainSalaryTaxForm = new URLSearchParams({
                employee_id: emp_id,
                main_salary_tax_value: JSON.stringify(
                    values.main_salary_tax_value
                ),
            })

            values.main_salary_tax_value.forEach(async (item) => {
                try {
                    await http(token).post('/master-salary-tax', {
                        tax_name: item.tax_name,
                    })
                } catch (err) {
                    console.error(err)
                }
            })

            return http(token).post(`/main-salary-tax`, mainSalaryTaxForm)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['main-salary'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-addition'],
            })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-deduction'],
            })
            queryClient.invalidateQueries({ queryKey: ['main-salary-bpjs'] })
            queryClient.invalidateQueries({ queryKey: ['main-salary-tax'] })
            queryClient.invalidateQueries({
                queryKey: ['main-salary-insurance'],
            })
            dispatch(setLoading(false))
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmitMainSalary = (data) => {
        setShowAddSalaryModals(!setShowAddSalaryModals)
        postMainSalary.mutate(data)
        dispatch(setLoading(true))
    }

    const onSubmitAdditionalSalary = (data) => {
        postAdditionalSalary.mutate(data)
    }

    const onSubmitSalaryCuts = (data) => {
        postSalaryCuts.mutate(data)
    }

    const onSubmitBpjs = (data) => {
        postBpjs.mutate(data)
    }

    const onSubmitInsurance = (data) => {
        postInsurance.mutate(data)
    }

    const onSubmitTax = (data) => {
        postTax.mutate(data)
    }

    const nextStep = async () => {
        if (currentStep === 1) {
            const triggerMainSalaries = await triggerMainSalary()
            if (triggerMainSalaries) {
                setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
            }
        }
        if (currentStep === 2) {
            const triggerAdditionalSalaries = await triggerAdditionalSalary()
            if (triggerAdditionalSalaries) {
                setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
            }
        }
        if (currentStep === 3) {
            const triggerSalariesCuts = await triggerSalaryCuts()
            if (triggerSalariesCuts) {
                setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
            }
        }
        if (currentStep === 4) {
            setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
        }
        if (currentStep === 5) {
            const triggerInsurances = await triggerInsurance()
            if (triggerInsurances) {
                setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
            }
        }
        if (currentStep === 6) {
            const triggerTaxes = await triggerTax()
            if (triggerTaxes) {
                if (currentStep === totalSteps) {
                    handleSubmitMainSalary(onSubmitMainSalary)()
                    handleSubmitAdditionalSalary(onSubmitAdditionalSalary)()
                    handleSubmitSalaryCuts(onSubmitSalaryCuts)()
                    handleSubmitBpjs(onSubmitBpjs)()
                    handleSubmitInsurance(onSubmitInsurance)()
                    handleSubmitTax(onSubmitTax)()
                    resetMainSalary()
                    resetAdditionalSalary()
                    resetSalaryCuts()
                    resetBpjs()
                    resetInsurance()
                    resetTax()
                } else {
                    setCurrentStep((prevStep) =>
                        Math.min(prevStep + 1, totalSteps)
                    )
                }
            }
        }
    }

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
    }

    useEffect(() => {
        if (currentStep === 1) {
            dispatch(setSelectedItem('Gaji Pokok'))
        } else if (currentStep === 2) {
            dispatch(setSelectedItem('Tambahan'))
        } else if (currentStep === 3) {
            dispatch(setSelectedItem('Potongan'))
        } else if (currentStep === 4) {
            dispatch(setSelectedItem('BPJS'))
        } else if (currentStep === 5) {
            dispatch(setSelectedItem('Asuransi'))
        } else if (currentStep === 6) {
            dispatch(setSelectedItem('Pajak'))
        }
    }, [currentStep])

    return (
        <div>
            <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                <div className="modal">
                    <div className="content">
                        {currentStep === 1 && (
                            <MainSalary
                                watch={watchMainSalary}
                                control={controlMainSalary}
                                register={registerMainSalary}
                                errors={errorsMainSalary}
                                resetMainSalary={resetMainSalary}
                                resetAdditionalSalary={resetAdditionalSalary}
                                resetSalaryCuts={resetSalaryCuts}
                                resetBpjs={resetBpjs}
                                resetInsurance={resetInsurance}
                                resetTax={resetTax}
                            />
                        )}
                        {currentStep === 2 && (
                            <AdditionalSalary
                                control={controlAdditionalSalary}
                                register={registerAdditionalSalary}
                                errors={errorsAdditionalSalary}
                                setValue={setValueAdditionalSalary}
                                clearErrors={clearErrorsAdditionalSalary}
                            />
                        )}
                        {currentStep === 3 && (
                            <SalaryCuts
                                control={controlSalaryCuts}
                                register={registerSalaryCuts}
                                errors={errorsSalaryCuts}
                                setValue={setValueSalaryCuts}
                                clearErrors={clearErrorsSalaryCuts}
                            />
                        )}
                        {currentStep === 4 && (
                            <BPJSForm
                                control={bpjsControl}
                                register={bpjsRegister}
                                errors={bpjsErrors}
                                setValue={setValueBpjs}
                            />
                        )}
                        {currentStep === 5 && (
                            <InsuranceForm
                                control={insuranceControl}
                                register={insuranceRegister}
                                errors={insuranceErrors}
                                setValue={insuranceSetValue}
                                clearErrors={clearErrorsInsurance}
                            />
                        )}
                        {currentStep === 6 && (
                            <TaxForm
                                control={taxControl}
                                register={taxRegister}
                                errors={taxErrors}
                                setValue={taxSetValue}
                                clearErrors={clearErrorsTax}
                            />
                        )}
                    </div>
                    <div className="w-full flex gap-5 mt-5 justify-end">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={prevStep}
                        >
                            Kembali
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={nextStep}
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSalaryForm
