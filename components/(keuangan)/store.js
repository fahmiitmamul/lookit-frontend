import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployee } from './action'

const initialState = {
    finance: {
        employee: [],
        employee_id: '',
        main_salary: '',
        selected_item: '',
        selected_master_gaji: 'Tambahan',
        bpjs: {
            kesehatan: {
                isActive: false,
                tunjangan_perusahaan: 0,
                potongan_karyawan: 0,
                after_potongan_karyawan: 0,
                potongan_tambahan_karyawan: 0,
                jumlah_anak: 0,
            },
            ketenagakerjaan: {
                isActive: false,
                isJhtActive: false,
                isJkkActive: false,
                isJkmActive: false,
                isJpActive: false,
                tunjangan_jht: 0,
                potongan_jht: 0,
                tunjangan_jkk: 0,
                potongan_jkk: 0,
                tunjangan_jkm: 0,
                potongan_jkm: 0,
                tunjangan_jp: 0,
                potongan_jp: 0,
            },
            total_potongan_karyawan: 0,
            total_tunjangan_dibiayai_perusahaan: 0,
        },
        insurance_name: '',
        tax_name: '',
        selectedMainSalaryId: '',
        selectedAdditionalSalaryId: '',
        selectedSalaryCutsId: '',
        selectedBpjsId: '',
        selectedInsuranceId: '',
        selectedTaxId: '',
        selectedPotonganId: '',
        selectedTambahanId: '',
        selectedMainSalaryData: [],
        selectedAdditionalSalaryData: [],
        selectedSalaryCutsData: [],
        selectedBpjsData: [],
        selectedInsuranceData: [],
        selectedTaxData: [],
        selectedMasterGaji: [],
        selectedCostId: '',
        selectedCostData: [],
    },
}

const financeSlice = createSlice({
    name: 'finance',
    initialState,
    reducers: {
        setMainSalary: (state, action) => {
            state.finance.main_salary = action.payload
        },
        setEmployeeId: (state, action) => {
            state.finance.employee_id = action.payload
        },
        setBpjsKesehatanActive: (state, action) => {
            state.finance.bpjs.kesehatan.isActive =
                !state.finance.bpjs.kesehatan.isActive
        },
        setBpjsKetenagakerjaanActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isActive =
                !state.finance.bpjs.ketenagakerjaan.isActive
        },
        setBpjsKesehatanTunjanganPerusahaanValue: (state, action) => {
            state.finance.bpjs.kesehatan.tunjangan_perusahaan = action.payload
        },
        setBpjsKesehatanPotonganKaryawanValue: (state, action) => {
            state.finance.bpjs.kesehatan.potongan_karyawan = action.payload
        },
        setBpjsKesehatanPotonganTambahanKaryawanValue: (state, action) => {
            state.finance.bpjs.kesehatan.potongan_tambahan_karyawan =
                action.payload
        },
        setBpjsKesehatan: (state, action) => {
            state.finance.bpjs.kesehatan = action.payload
        },
        setBpjsKetenagakerjaan: (state, action) => {
            state.finance.bpjs.ketenagakerjaan = action.payload
        },
        setBpjsKetenagakerjaanActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isActive =
                !state.finance.bpjs.ketenagakerjaan.isActive
        },
        setBpjsKetenagakerjaanTunjanganJHTValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.tunjangan_jht = action.payload
        },
        setBpjsKetenagakerjaanPotonganJHTValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.potongan_jht = action.payload
        },
        setBpjsKetenagakerjaanTunjanganJKKValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.tunjangan_jkk = action.payload
        },
        setBpjsKetenagakerjaanPotonganJKKValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.potongan_jkk = action.payload
        },
        setBpjsKetenagakerjaanTunjanganJKMValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.tunjangan_jkm = action.payload
        },
        setBpjsKetenagakerjaanPotonganJKMValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.potongan_jkm = action.payload
        },
        setBpjsKetenagakerjaanTunjanganJPValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.tunjangan_jp = action.payload
        },
        setBpjsKetenagakerjaanPotonganJPValue: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.potongan_jp = action.payload
        },
        setTotalPotonganKaryawan: (state, action) => {
            state.finance.bpjs.total_potongan_karyawan = action.payload
        },
        setTotalTunjanganDibiayaiPerusahaan: (state, action) => {
            state.finance.bpjs.total_tunjangan_dibiayai_perusahaan =
                action.payload
        },
        setJHTActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isJhtActive =
                !state.finance.bpjs.ketenagakerjaan.isJhtActive
        },
        setJKKActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isJkkActive =
                !state.finance.bpjs.ketenagakerjaan.isJkkActive
        },
        setJKMActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isJkmActive =
                !state.finance.bpjs.ketenagakerjaan.isJkmActive
        },
        setJPActive: (state, action) => {
            state.finance.bpjs.ketenagakerjaan.isJpActive =
                !state.finance.bpjs.ketenagakerjaan.isJpActive
        },
        setAfterPotonganKaryawan: (state, action) => {
            state.finance.bpjs.kesehatan.after_potongan_karyawan =
                action.payload
        },
        setInitialState: (state, action) => {
            state.finance = initialState.finance
        },
        setSelectedItem: (state, action) => {
            state.finance.selected_item = action.payload
        },
        setJumlahAnak: (state, action) => {
            state.finance.bpjs.kesehatan.jumlah_anak = action.payload
        },
        setSelectedMainSalaryId: (state, action) => {
            state.finance.selectedMainSalaryId = action.payload
        },
        setSelectedAdditionalSalaryId: (state, action) => {
            state.finance.selectedAdditionalSalaryId = action.payload
        },
        setSelectedSalaryCutsId: (state, action) => {
            state.finance.selectedSalaryCutsId = action.payload
        },
        setSelectedBpjsId: (state, action) => {
            state.finance.selectedBpjsId = action.payload
        },
        setSelectedInsuranceId: (state, action) => {
            state.finance.selectedInsuranceId = action.payload
        },
        setSelectedTaxId: (state, action) => {
            state.finance.selectedTaxId = action.payload
        },
        setSelectedPotonganId: (state, action) => {
            state.finance.selectedPotonganId = action.payload
        },
        setSelectedTambahanId: (state, action) => {
            state.finance.selectedTambahanId = action.payload
        },
        setSelectedMainSalaryData: (state, action) => {
            state.finance.selectedMainSalaryData = action.payload
        },
        setSelectedAdditionalSalaryData: (state, action) => {
            state.finance.selectedAdditionalSalaryData = action.payload
        },
        setSelectedSalaryCutsData: (state, action) => {
            state.finance.selectedSalaryCutsData = action.payload
        },
        setSelectedBpjsData: (state, action) => {
            state.finance.selectedBpjsData = action.payload
        },
        setSelectedInsuranceData: (state, action) => {
            state.finance.selectedInsuranceData = action.payload
        },
        setSelectedTaxData: (state, action) => {
            state.finance.selectedTaxData = action.payload
        },
        setSelectedMasterGaji: (state, action) => {
            state.finance.selected_master_gaji = action.payload
        },
        setInsuranceName: (state, action) => {
            state.finance.insurance_name = action.payload
        },
        setTaxName: (state, action) => {
            state.finance.tax_name = action.payload
        },
        setCostId: (state, action) => {
            state.finance.selectedCostId = action.payload
        },
        setSelectedCostData: (state, action) => {
            state.finance.selectedCostData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployee.fulfilled, (state, action) => {
            state.finance.employee = action.payload
        })
        builder.addCase(fetchEmployee.rejected, (state, action) => {
            state.finance.employee = []
        })
        builder.addCase(fetchEmployee.pending, (state, action) => {
            state.finance.employee = []
        })
    },
})

export const {
    setMainSalary,
    setEmployeeId,
    setBpjsKesehatanActive,
    setBpjsKetenagakerjaanActive,
    setBpjsKesehatanTunjanganPerusahaanValue,
    setBpjsKesehatanPotonganKaryawanValue,
    setBpjsKesehatanPotonganTambahanKaryawanValue,
    setBpjsKetenagakerjaanTunjanganJHTValue,
    setBpjsKetenagakerjaanPotonganJHTValue,
    setBpjsKetenagakerjaanTunjanganJKKValue,
    setBpjsKetenagakerjaanPotonganJKKValue,
    setBpjsKetenagakerjaanTunjanganJKMValue,
    setBpjsKetenagakerjaanPotonganJKMValue,
    setBpjsKetenagakerjaanTunjanganJPValue,
    setBpjsKetenagakerjaanPotonganJPValue,
    setJHTActive,
    setJKKActive,
    setJKMActive,
    setJPActive,
    setAfterPotonganKaryawan,
    setInitialState,
    setSelectedItem,
    setJumlahAnak,
    setSelectedMainSalaryId,
    setSelectedAdditionalSalaryId,
    setSelectedSalaryCutsId,
    setSelectedBpjsId,
    setSelectedInsuranceId,
    setSelectedTaxId,
    setSelectedMainSalaryData,
    setSelectedAdditionalSalaryData,
    setSelectedSalaryCutsData,
    setSelectedBpjsData,
    setSelectedInsuranceData,
    setSelectedTaxData,
    setTotalPotonganKaryawan,
    setTotalTunjanganDibiayaiPerusahaan,
    setSelectedMasterGaji,
    setSelectedPotonganId,
    setSelectedTambahanId,
    setBpjsKesehatan,
    setBpjsKetenagakerjaan,
    setInsuranceName,
    setTaxName,
    setCostId,
    setSelectedCostData,
} = financeSlice.actions

export default financeSlice.reducer
