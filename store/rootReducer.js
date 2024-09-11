import layoutReducer from './layoutReducer'
import chatReducer from '@/components/partials/app/chat/store'
import calendarReducer from '@/components/partials/app/calender/store'
import authReducer from '@/components/partials/auth/store'
import loadingReducer from './loadingReducer'
import employeeReducer from '@/components/(employee)/store'
import companyReducer from '@/components/(settings)/company/store'
import masterdataReducer from '@/components/(settings)/master-data/store'
import tasksReducer from '@/components/tasks/store'
import leaveTypeReducer from '@/components/leave-balance/store'
import kpiReducer from '@/components/kpi/store'
import mutationReducer from '@/components/mutation/store'
import assetReducer from '@/components/assets/store'
import guaranteeReducer from '@/components/guarantee/store'
import ticketReducer from '@/components/ticket/store'
import documentReducer from '@/components/document/store'
import shiftReducer from '@/components/schedule/store'
import activityReducer from '@/components/activity/store'
import contractReducer from '@/components/contract/store'
import presenceReducer from '@/components/presence/store'
import requestsReducer from '@/components/requests/store'
import announcementReducer from '@/components/announcement/store'
import financeReducer from '@/components/(finance)/store'
import overtimeReducer from '@/components/overtime/store'
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
