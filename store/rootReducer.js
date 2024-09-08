import layoutReducer from './layoutReducer'
import chatReducer from '@/components/partials/app/chat/store'
import calendarReducer from '@/components/partials/app/calender/store'
import authReducer from '@/components/partials/auth/store'
import loadingReducer from './loadingReducer'
import employeeReducer from '@/components/(employee)/store'
import companyReducer from '@/components/(pengaturan)/perusahaan/store'
import masterdataReducer from '@/components/(pengaturan)/master-data/store'
import tasksReducer from '@/components/tasks/store'
import leaveTypeReducer from '@/components/saldo-cuti/store'
import kpiReducer from '@/components/kpi/store'
import mutationReducer from '@/components/mutasi/store'
import assetReducer from '@/components/aset/store'
import guaranteeReducer from '@/components/garansi/store'
import ticketReducer from '@/components/tiket/store'
import documentReducer from '@/components/dokumen/store'
import shiftReducer from '@/components/jadwal/store'
import activityReducer from '@/components/aktifitas/store'
import contractReducer from '@/components/kontrak/store'
import presenceReducer from '@/components/kehadiran/store'
import requestsReducer from '@/components/permintaan/store'
import announcementReducer from '@/components/pengumuman/store'
import financeReducer from '@/components/(finance)/store'
import overtimeReducer from '@/components/lembur/store'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const layoutConfig = {
    key: 'layout',
    storage,
}

const chatConfig = {
    key: 'chat',
    storage,
}

const calendarConfig = {
    key: 'calendar',
    storage,
}

const authConfig = {
    key: 'auth',
    storage,
}

const loadingConfig = {
    key: 'loading',
    storage,
}

const employeeConfig = {
    key: 'employee',
    storage,
}

const companyConfig = {
    key: 'company',
    storage,
}

const masterDataConfig = {
    key: 'masterData',
    storage,
}

const tasksConfig = {
    key: 'tasksData',
    storage,
}

const leaveTypeConfig = {
    key: 'leaveTypeData',
    storage,
}

const kpiConfig = {
    key: 'kpiData',
    storage,
}

const mutationConfig = {
    key: 'mutationData',
    storage,
}

const assetConfig = {
    key: 'assetData',
    storage,
}

const guaranteeConfig = {
    key: 'guaranteeData',
    storage,
}

const ticketConfig = {
    key: 'ticketData',
    storage,
}

const documentConfig = {
    key: 'documentData',
    storage,
}

const shiftConfig = {
    key: 'shiftData',
    storage,
}

const activityConfig = {
    key: 'activityData',
    storage,
}

const contractConfig = {
    key: 'contractData',
    storage,
}

const presenceConfig = {
    key: 'presenceData',
    storage,
}

const requestConfig = {
    key: 'requestData',
    storage,
}

const announcementConfig = {
    key: 'announcementData',
    storage,
}

const financeConfig = {
    key: 'financeData',
    storage,
}

const overtimeConfig = {
    key: 'overtimeData',
    storage,
}

const rootReducer = combineReducers({
    layout: persistReducer(layoutConfig, layoutReducer),
    chat: persistReducer(chatConfig, chatReducer),
    calendar: persistReducer(calendarConfig, calendarReducer),
    auth: persistReducer(authConfig, authReducer),
    loading: persistReducer(loadingConfig, loadingReducer),
    employee: persistReducer(employeeConfig, employeeReducer),
    company: persistReducer(companyConfig, companyReducer),
    masterdata: persistReducer(masterDataConfig, masterdataReducer),
    tasks: persistReducer(tasksConfig, tasksReducer),
    leave_type: persistReducer(leaveTypeConfig, leaveTypeReducer),
    kpi: persistReducer(kpiConfig, kpiReducer),
    mutation: persistReducer(mutationConfig, mutationReducer),
    assets: persistReducer(assetConfig, assetReducer),
    guarantee: persistReducer(guaranteeConfig, guaranteeReducer),
    ticket: persistReducer(ticketConfig, ticketReducer),
    document: persistReducer(documentConfig, documentReducer),
    shift: persistReducer(shiftConfig, shiftReducer),
    activity: persistReducer(activityConfig, activityReducer),
    contract: persistReducer(contractConfig, contractReducer),
    presence: persistReducer(presenceConfig, presenceReducer),
    requests: persistReducer(requestConfig, requestsReducer),
    announcement: persistReducer(announcementConfig, announcementReducer),
    finance: persistReducer(financeConfig, financeReducer),
    overtime: persistReducer(overtimeConfig, overtimeReducer),
})

export default rootReducer
