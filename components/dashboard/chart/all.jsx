import React from 'react'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import Select from '../../ui/Select'
import http from '@/app/helpers/http.helper'
import { useQuery } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'

const DashboardCart = () => {
    const token = getCookie('token')

    async function fetchArea() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: areaData } = useQuery({
        queryKey: ['area'],
        queryFn: () => fetchArea(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchBranch() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: branchData } = useQuery({
        queryKey: ['branch'],
        queryFn: () => fetchBranch(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchMutation() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: mutationData } = useQuery({
        queryKey: ['mutation-position'],
        queryFn: () => fetchMutation(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchTasks() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: tasksData } = useQuery({
        queryKey: ['processed-tasks'],
        queryFn: () => fetchTasks(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchAssets() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: assetsData } = useQuery({
        queryKey: ['make-assets'],
        queryFn: () => fetchAssets(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchContract() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: contractData } = useQuery({
        queryKey: ['processed-contract'],
        queryFn: () => fetchContract(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchGuarantee() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: guaranteeData } = useQuery({
        queryKey: ['make-guarantee'],
        queryFn: () => fetchGuarantee(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchTicket() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: ticketData } = useQuery({
        queryKey: ['pending-ticket'],
        queryFn: () => fetchTicket(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchKPI() {
        const { data } = await http(token).get('/area')
        return data.results
    }

    const { data: kpiData } = useQuery({
        queryKey: ['kpi'],
        queryFn: () => fetchKPI(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    const statistics = [
        {
            title: 'Jumlah Area',
            count: areaData?.data?.length,
            bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
            text: 'text-info-500',
            icon: 'heroicons:map-pin',
            options: ['Pending', 'Tolak', 'Setuju'],
        },
        {
            title: 'Jumlah Cabang',
            count: branchData?.data?.length,
            bg: 'bg-[#FFEDE6] dark:bg-slate-900	',
            text: 'text-warning-500',
            icon: 'heroicons:cube',
        },
        {
            title: 'Jumlah Permintaan',
            count: '+5.0%',
            bg: 'bg-[#EAE6FF] dark:bg-slate-900	',
            text: 'text-[#5743BE]',
            icon: 'heroicons:bell',
            select: true,
        },
        {
            title: 'Jumlah Mutasi',
            count: '+5.0%',
            bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
            text: 'text-info-500',
            icon: 'heroicons:arrows-right-left',
            select: true,
        },
        {
            title: 'Jumlah Tugas',
            count: '+5.0%',
            bg: 'bg-[#FFEDE6] dark:bg-slate-900	',
            text: 'text-warning-500',
            icon: 'heroicons:rectangle-stack',
            select: true,
        },
        {
            title: 'Jumlah Aset',
            count: '+5.0%',
            bg: 'bg-[#EAE6FF] dark:bg-slate-900	',
            text: 'text-[#5743BE]',
            icon: 'heroicons:cube',
            select: true,
        },
        {
            title: 'Jumlah Kontrak',
            count: '+5.0%',
            bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
            text: 'text-info-500',
            icon: 'heroicons:document',
            select: true,
        },
        {
            title: 'Jumlah Garansi',
            count: '+5.0%',
            bg: 'bg-[#FFEDE6] dark:bg-slate-900	',
            text: 'text-warning-500',
            icon: 'heroicons:shield-check',
            select: true,
        },
        {
            title: 'Jumlah Tiket',
            count: '+5.0%',
            bg: 'bg-[#EAE6FF] dark:bg-slate-900	',
            text: 'text-[#5743BE]',
            icon: 'heroicons:ticket',
            select: true,
        },
        {
            title: 'Jumlah Pinjaman',
            count: '+5.0%',
            bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
            text: 'text-info-500',
            icon: 'heroicons:banknotes',
            select: true,
        },
        {
            title: 'Jumlah Dokumen',
            count: '+5.0%',
            bg: 'bg-[#FFEDE6] dark:bg-slate-900	',
            text: 'text-warning-500',
            icon: 'heroicons:document',
            select: true,
        },
        {
            title: 'Jumlah Jadwal',
            count: '+5.0%',
            bg: 'bg-[#EAE6FF] dark:bg-slate-900	',
            text: 'text-[#5743BE]',
            icon: 'heroicons:calendar-days',
            select: true,
        },
        {
            title: 'Jumlah Aktivitas',
            count: '+5.0%',
            bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
            text: 'text-info-500',
            icon: 'heroicons:presentation-chart-line',
            select: true,
        },
        {
            title: 'Jumlah Keuangan',
            count: '+5.0%',
            bg: 'bg-[#FFEDE6] dark:bg-slate-900	',
            text: 'text-warning-500',
            icon: 'heroicons:currency-dollar',
            select: true,
        },
        {
            title: 'KPI',
            count: '+5.0%',
            bg: 'bg-[#EAE6FF] dark:bg-slate-900	',
            text: 'text-[#5743BE]',
            icon: 'heroicons:bolt',
            select: true,
        },
    ]

    const permintaanOptions = [
        {
            value: 'Setuju',
            label: 'Setuju',
        },
        {
            value: 'Tolak',
            label: 'Tolak',
        },
        {
            value: 'Pending',
            label: 'Pending',
        },
    ]

    const mutationOptions = [
        {
            value: 'Jabatan',
            label: 'Jabatan',
        },
        {
            value: 'Posisi',
            label: 'Posisi',
        },
    ]

    const taskOptions = [
        {
            value: 'Proses',
            label: 'Proses',
        },
        {
            value: 'Selesai',
            label: 'Selesai',
        },
        {
            value: 'Dibatalkan',
            label: 'Dibatalkan',
        },
    ]

    const assetsOptions = [
        {
            value: 'Aset',
            label: 'Aset',
        },
        {
            value: 'Masuk',
            label: 'Masuk',
        },
        {
            value: 'Keluar',
            label: 'Keluar',
        },
    ]

    const contractOptions = [
        {
            value: 'Status',
            label: 'Status',
        },
    ]

    const guaranteeOptions = [
        {
            value: 'Garansi',
            label: 'Garansi',
        },
        {
            value: 'Masuk',
            label: 'Masuk',
        },
        {
            value: 'Keluar',
            label: 'Keluar',
        },
    ]

    const ticketOptions = [
        {
            value: 'Open',
            label: 'Open',
        },
        {
            value: 'Closed',
            label: 'Closed',
        },
        {
            value: 'Pending',
            label: 'Pending',
        },
    ]

    const pinjamanOptions = [
        {
            value: 'Lunas',
            label: 'Lunas',
        },
        {
            value: 'Belum Lunas',
            label: 'Belum Lunas',
        },
    ]

    const documentOptions = [
        {
            value: 'Tipe',
            label: 'Tipe',
        },
    ]

    const jadwalOptions = [
        {
            value: 'Shift 1',
            label: 'Shift 1',
        },
    ]

    const activityOptions = [
        {
            value: 'Selesai',
            label: 'Selesai',
        },
        {
            value: 'Tidak Selesai',
            label: 'Tidak Selesai',
        },
    ]

    const paymentOptions = [
        {
            value: 'Dibayar',
            label: 'Dibayar',
        },
        {
            value: 'Belum Dibayar',
            label: 'Belum Dibayar',
        },
    ]

    const kpiOptions = [
        {
            value: 'Karyawan',
            label: 'Karyawan',
        },
    ]

    return (
        <>
            {statistics.map((item, i) => (
                <div key={i}>
                    <Card bodyClass="pt-4 pb-3 px-4">
                        <div className="flex space-x-3 rtl:space-x-reverse">
                            <div className="flex-none">
                                <div
                                    className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl`}
                                >
                                    <Icon icon={item.icon} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                                    {item.title}
                                </div>
                                <div className="text-slate-900 dark:text-white text-lg font-medium">
                                    {item.count}
                                </div>
                            </div>
                            <div>
                                {item.select && (
                                    <Select
                                        placeholder="Pilih"
                                        className="w-32"
                                        options={
                                            item.title === 'Jumlah Permintaan'
                                                ? permintaanOptions
                                                : item.title === 'Jumlah Mutasi'
                                                  ? mutationOptions
                                                  : item.title ===
                                                      'Jumlah Tugas'
                                                    ? taskOptions
                                                    : item.title ===
                                                        'Jumlah Aset'
                                                      ? assetsOptions
                                                      : item.title ===
                                                          'Jumlah Kontrak'
                                                        ? contractOptions
                                                        : item.title ===
                                                            'Jumlah Garansi'
                                                          ? guaranteeOptions
                                                          : item.title ===
                                                              'Jumlah Tiket'
                                                            ? ticketOptions
                                                            : item.title ===
                                                                'Jumlah Pinjaman'
                                                              ? pinjamanOptions
                                                              : item.title ===
                                                                  'Jumlah Dokumen'
                                                                ? documentOptions
                                                                : item.title ===
                                                                    'Jumlah Jadwal'
                                                                  ? jadwalOptions
                                                                  : item.title ===
                                                                      'Jumlah Aktivitas'
                                                                    ? activityOptions
                                                                    : item.title ===
                                                                        'Jumlah Keuangan'
                                                                      ? paymentOptions
                                                                      : item.title ===
                                                                          'KPI'
                                                                        ? kpiOptions
                                                                        : ''
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default DashboardCart
