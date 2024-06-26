export const menuItems = [
    {
        title: 'Dashboard',
        isHide: true,
        icon: 'heroicons-outline:home',
        link: 'dashboard',
    },

    {
        title: 'Karyawan',
        isHide: true,
        icon: 'heroicons-outline:user-group',
        child: [
            {
                childtitle: 'Data Karyawan',
                childlink: 'data-karyawan',
            },
            {
                childtitle: 'Rekam Karyawan',
                childlink: 'rekam-karyawan',
            },
        ],
    },

    {
        title: 'Jadwal',
        isHide: true,
        icon: 'heroicons-outline:calendar-days',
        link: 'jadwal',
    },

    {
        title: 'Kehadiran',
        isHide: true,
        icon: 'heroicons-outline:map-pin',
        link: 'kehadiran',
    },
    {
        title: 'Lembur',
        isHide: true,
        icon: 'heroicons-outline:clock',
        link: 'lembur',
    },
    {
        title: 'Saldo Cuti',
        isHide: true,
        icon: 'heroicons-outline:shopping-bag',
        link: 'saldo-cuti',
    },

    {
        title: 'Permintaan',
        isHide: true,
        icon: 'heroicons-outline:bell',
        link: 'permintaan',
    },

    {
        title: 'Tugas',
        icon: 'heroicons-outline:rectangle-stack',
        isHide: true,
        link: 'tugas',
    },
    {
        title: 'Aktivitas',
        icon: 'heroicons-outline:presentation-chart-line',
        isHide: true,
        link: 'aktifitas',
    },
    {
        title: 'KPI',
        icon: 'heroicons-outline:bolt',
        isHide: true,
        link: 'kpi',
    },
    {
        title: 'Mutasi',
        icon: 'heroicons-outline:arrows-right-left',
        isHide: true,
        link: 'mutasi',
    },
    {
        title: 'Inventaris',
        icon: 'heroicons-outline:squares-2x2',
        isHide: true,
        link: 'inventaris',
    },
    {
        title: 'Kontrak',
        icon: 'heroicons-outline:document',
        isHide: true,
        link: 'kontrak',
    },
    {
        title: 'Garansi',
        icon: 'heroicons-outline:shield-check',
        isHide: true,
        link: 'garansi',
    },
    {
        title: 'Pengumuman',
        icon: 'heroicons-outline:megaphone',
        isHide: true,
        link: 'pengumuman',
    },
    {
        title: 'Pesan',
        icon: 'heroicons-outline:chat-bubble-bottom-center',
        isHide: true,
        link: 'pesan',
    },
    {
        title: 'Tiket',
        icon: 'heroicons-outline:ticket',
        isHide: true,
        link: 'tiket',
    },
    {
        title: 'Keuangan',
        icon: 'heroicons-outline:credit-card',
        isHide: true,
        child: [
            {
                childtitle: 'Buat Gaji',
                childlink: 'buat-gaji',
            },
            {
                childtitle: 'Data Gaji',
                childlink: 'data-gaji',
            },
            {
                childtitle: 'Laporan',
                childlink: 'laporan',
            },
            {
                childtitle: 'Pinjaman',
                childlink: 'pinjaman',
            },
            {
                childtitle: 'Biaya',
                childlink: 'biaya',
            },
        ],
    },
    {
        title: 'Dokumen',
        icon: 'heroicons-outline:document-duplicate',
        isHide: true,
        link: 'dokumen',
    },
    {
        title: 'Acara',
        icon: 'heroicons-outline:calendar',
        isHide: true,
        link: 'acara',
    },
    {
        title: 'Pengaturan',
        icon: 'heroicons-outline:cog-6-tooth',
        isHide: true,
        child: [
            {
                childtitle: 'Perusahaan',
                childlink: 'perusahaan',
            },
            {
                childtitle: 'Master Data',
                childlink: 'master-data',
            },
            {
                childtitle: 'Hak Akses',
                childlink: 'hak-akses',
            },
        ],
    },
]

export const topMenu = [
    {
        title: 'Dashboard',
        icon: 'heroicons-outline:home',
        link: '/app/home',
        child: [
            {
                childtitle: 'Analytics Dashboard',
                childlink: 'dashboard',
                childicon: 'heroicons:presentation-chart-line',
            },
            {
                childtitle: 'Ecommerce Dashboard',
                childlink: 'ecommerce',
                childicon: 'heroicons:shopping-cart',
            },
            {
                childtitle: 'Project  Dashboard',
                childlink: 'project',
                childicon: 'heroicons:briefcase',
            },
            {
                childtitle: 'CRM Dashboard',
                childlink: 'crm',
                childicon: 'ri:customer-service-2-fill',
            },
            {
                childtitle: 'Banking Dashboard',
                childlink: 'banking',
                childicon: 'heroicons:wrench-screwdriver',
            },
        ],
    },
    {
        title: 'App',
        icon: 'heroicons-outline:chip',
        link: '/app/home',
        child: [
            {
                childtitle: 'Calendar',
                childlink: 'calender',
                childicon: 'heroicons-outline:calendar',
            },
            {
                childtitle: 'Kanban',
                childlink: 'kanban',
                childicon: 'heroicons-outline:view-boards',
            },
            {
                childtitle: 'Todo',
                childlink: 'todo',
                childicon: 'heroicons-outline:clipboard-check',
            },
            {
                childtitle: 'Projects',
                childlink: 'projects',
                childicon: 'heroicons-outline:document',
            },
        ],
    },
    {
        title: 'Pages',
        icon: 'heroicons-outline:view-boards',
        link: '/app/home',
        megamenu: [
            {
                megamenutitle: 'Authentication',
                megamenuicon: 'heroicons-outline:user',
                singleMegamenu: [
                    {
                        m_childtitle: 'Signin One',
                        m_childlink: '/',
                    },
                    {
                        m_childtitle: 'Signin Two',
                        m_childlink: '/login2',
                    },
                    {
                        m_childtitle: 'Signin Three',
                        m_childlink: '/login3',
                    },
                    {
                        m_childtitle: 'Signup One',
                        m_childlink: '/register',
                    },
                    {
                        m_childtitle: 'Signup Two',
                        m_childlink: '/register/register2',
                    },
                    {
                        m_childtitle: 'Signup Three',
                        m_childlink: '/register/register3',
                    },
                    {
                        m_childtitle: 'Forget Password One',
                        m_childlink: '/forgot-password',
                    },
                    {
                        m_childtitle: 'Forget Password Two',
                        m_childlink: '/forgot-password2',
                    },
                    {
                        m_childtitle: 'Forget Password Three',
                        m_childlink: '/forgot-password3',
                    },
                    {
                        m_childtitle: 'Lock Screen One',
                        m_childlink: '/lock-screen',
                    },
                    {
                        m_childtitle: 'Lock Screen Two',
                        m_childlink: '/lock-screen2',
                    },
                    {
                        m_childtitle: 'Lock Screen Three',
                        m_childlink: '/lock-screen3',
                    },
                ],
            },

            {
                megamenutitle: 'Components',
                megamenuicon: 'heroicons-outline:user',
                singleMegamenu: [
                    {
                        m_childtitle: 'typography',
                        m_childlink: 'typography',
                    },
                    {
                        m_childtitle: 'colors',
                        m_childlink: 'colors',
                    },
                    {
                        m_childtitle: 'alert',
                        m_childlink: 'alert',
                    },
                    {
                        m_childtitle: 'button',
                        m_childlink: 'button',
                    },
                    {
                        m_childtitle: 'card',
                        m_childlink: 'card',
                    },
                    {
                        m_childtitle: 'carousel',
                        m_childlink: 'carousel',
                    },
                    {
                        m_childtitle: 'dropdown',
                        m_childlink: 'dropdown',
                    },
                    {
                        m_childtitle: 'image',
                        m_childlink: 'image',
                    },
                    {
                        m_childtitle: 'modal',
                        m_childlink: 'modal',
                    },
                    {
                        m_childtitle: 'Progress bar',
                        m_childlink: 'progress-bar',
                    },
                    {
                        m_childtitle: 'Placeholder',
                        m_childlink: 'placeholder',
                    },

                    {
                        m_childtitle: 'Tab & Accordion',
                        m_childlink: 'tab-accordion',
                    },
                ],
            },
            {
                megamenutitle: 'Forms',
                megamenuicon: 'heroicons-outline:user',
                singleMegamenu: [
                    {
                        m_childtitle: 'Input',
                        m_childlink: 'input',
                    },
                    {
                        m_childtitle: 'Input group',
                        m_childlink: 'input-group',
                    },
                    {
                        m_childtitle: 'Input layout',
                        m_childlink: 'input-layout',
                    },
                    {
                        m_childtitle: 'Form validation',
                        m_childlink: 'form-validation',
                    },
                    {
                        m_childtitle: 'Wizard',
                        m_childlink: 'form-wizard',
                    },
                    {
                        m_childtitle: 'Input mask',
                        m_childlink: 'input-mask',
                    },
                    {
                        m_childtitle: 'File input',
                        m_childlink: 'file-input',
                    },
                    {
                        m_childtitle: 'Form repeater',
                        m_childlink: 'form-repeater',
                    },
                    {
                        m_childtitle: 'Textarea',
                        m_childlink: 'textarea',
                    },
                    {
                        m_childtitle: 'Checkbox',
                        m_childlink: 'checkbox',
                    },
                    {
                        m_childtitle: 'Radio button',
                        m_childlink: 'radio-button',
                    },
                    {
                        m_childtitle: 'Switch',
                        m_childlink: 'switch',
                    },
                ],
            },
            {
                megamenutitle: 'Utility',
                megamenuicon: 'heroicons-outline:user',
                singleMegamenu: [
                    {
                        m_childtitle: 'Invoice',
                        m_childlink: 'invoice',
                    },
                    {
                        m_childtitle: 'Pricing',
                        m_childlink: 'pricing',
                    },
                    {
                        m_childtitle: 'FAQ',
                        m_childlink: 'faq',
                    },
                    {
                        m_childtitle: 'Blank page',
                        m_childlink: 'blank-page',
                    },
                    {
                        m_childtitle: 'Blog',
                        m_childlink: 'blog',
                    },
                    {
                        m_childtitle: '404 page',
                        m_childlink: 'error-page',
                    },
                    {
                        m_childtitle: 'Coming Soon',
                        m_childlink: 'coming-soon',
                    },
                    {
                        m_childtitle: 'Under Maintanance page',
                        m_childlink: 'under-construction',
                    },
                ],
            },
        ],
    },

    {
        title: 'Widgets',
        icon: 'heroicons-outline:view-grid-add',
        link: 'form-elements',
        child: [
            {
                childtitle: 'Basic',
                childlink: 'basic',
                childicon: 'heroicons-outline:document-text',
            },
            {
                childtitle: 'Statistic',
                childlink: 'statistic',
                childicon: 'heroicons-outline:document-text',
            },
        ],
    },

    {
        title: 'Extra',
        icon: 'heroicons-outline:template',

        child: [
            {
                childtitle: 'Basic Table',
                childlink: 'table-basic',
                childicon: 'heroicons-outline:table',
            },
            {
                childtitle: 'Advanced table',
                childlink: 'table-advanced',
                childicon: 'heroicons-outline:table',
            },
            {
                childtitle: 'Apex chart',
                childlink: 'appex-chart',
                childicon: 'heroicons-outline:chart-bar',
            },
            {
                childtitle: 'Chart js',
                childlink: 'chartjs',
                childicon: 'heroicons-outline:chart-bar',
            },
            {
                childtitle: 'Map',
                childlink: 'map',
                childicon: 'heroicons-outline:map',
            },
        ],
    },
]

export const notifications = [
    {
        title: 'Your order is placed',
        desc: 'Amet minim mollit non deser unt ullamco est sit aliqua.',

        image: '/assets/images/all-img/user.png',
        link: '#',
    },
    {
        title: 'Congratulations Darlene  🎉',
        desc: 'Won the monthly best seller badge',
        unread: true,
        image: '/assets/images/all-img/user2.png',
        link: '#',
    },
    {
        title: 'Revised Order 👋',
        desc: 'Won the monthly best seller badge',

        image: '/assets/images/all-img/user3.png',
        link: '#',
    },
    {
        title: 'Brooklyn Simmons',
        desc: 'Added you to Top Secret Project group...',

        image: '/assets/images/all-img/user4.png',
        link: '#',
    },
]

export const message = [
    {
        title: 'Wade Warren',
        desc: 'Hai...',
        active: true,
        hasnotifaction: true,
        notification_count: 1,
        image: '/assets/images/all-img/user1.png',
        link: '#',
    },
    {
        title: 'Savannah Nguyen',
        desc: 'Hai...',
        active: false,
        hasnotifaction: false,
        image: '/assets/images/all-img/user2.png',
        link: '#',
    },
    {
        title: 'Ralph Edwards',
        desc: 'Hai...',
        active: false,
        hasnotifaction: true,
        notification_count: 8,
        image: '/assets/images/all-img/user3.png',
        link: '#',
    },
    {
        title: 'Cody Fisher',
        desc: 'Hai...',
        active: true,
        hasnotifaction: false,
        image: '/assets/images/all-img/user4.png',
        link: '#',
    },
    {
        title: 'Savannah Nguyen',
        desc: 'Hai...',
        active: false,
        hasnotifaction: false,
        image: '/assets/images/all-img/user2.png',
        link: '#',
    },
    {
        title: 'Ralph Edwards',
        desc: 'Hai...',
        active: false,
        hasnotifaction: true,
        notification_count: 8,
        image: '/assets/images/all-img/user3.png',
        link: '#',
    },
    {
        title: 'Cody Fisher',
        desc: 'Hai...',
        active: true,
        hasnotifaction: false,
        image: '/assets/images/all-img/user4.png',
        link: '#',
    },
]

export const colors = {
    primary: '#4669FA',
    secondary: '#A0AEC0',
    danger: '#F1595C',
    black: '#111112',
    warning: '#FA916B',
    info: '#0CE7FA',
    light: '#425466',
    success: '#50C793',
    'gray-f7': '#F7F8FC',
    dark: '#1E293B',
    'dark-gray': '#0F172A',
    gray: '#68768A',
    gray2: '#EEF1F9',
    'dark-light': '#CBD5E1',
}

export const hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    }
}

export const topFilterLists = [
    {
        name: 'Inbox',
        value: 'all',
        icon: 'uil:image-v',
    },
    {
        name: 'Starred',
        value: 'fav',
        icon: 'heroicons:star',
    },
    {
        name: 'Sent',
        value: 'sent',
        icon: 'heroicons-outline:paper-airplane',
    },

    {
        name: 'Drafts',
        value: 'drafts',
        icon: 'heroicons-outline:pencil-alt',
    },
    {
        name: 'Spam',
        value: 'spam',
        icon: 'heroicons:information-circle',
    },
    {
        name: 'Trash',
        value: 'trash',
        icon: 'heroicons:trash',
    },
]

export const bottomFilterLists = [
    {
        name: 'personal',
        value: 'personal',
        icon: 'heroicons:chevron-double-right',
    },
    {
        name: 'Social',
        value: 'social',
        icon: 'heroicons:chevron-double-right',
    },
    {
        name: 'Promotions',
        value: 'promotions',
        icon: 'heroicons:chevron-double-right',
    },
    {
        name: 'Business',
        value: 'business',
        icon: 'heroicons:chevron-double-right',
    },
]

export const meets = [
    {
        img: '/assets/images/svg/sk.svg',
        title: 'Meeting with client',
        date: '01 Nov 2021',
        meet: 'Zoom meeting',
    },
    {
        img: '/assets/images/svg/path.svg',
        title: 'Design meeting (team)',
        date: '01 Nov 2021',
        meet: 'Skyp meeting',
    },
    {
        img: '/assets/images/svg/dc.svg',
        title: 'Background research',
        date: '01 Nov 2021',
        meet: 'Google meeting',
    },
    {
        img: '/assets/images/svg/sk.svg',
        title: 'Meeting with client',
        date: '01 Nov 2021',
        meet: 'Zoom meeting',
    },
]

export const files = [
    {
        img: '/assets/images/icon/file-1.svg',
        title: 'Dashboard.fig',
        date: '06 June 2021 / 155MB',
    },
    {
        img: '/assets/images/icon/pdf-1.svg',
        title: 'Ecommerce.pdf',
        date: '06 June 2021 / 155MB',
    },
    {
        img: '/assets/images/icon/zip-1.svg',
        title: 'Job portal_app.zip',
        date: '06 June 2021 / 155MB',
    },
    {
        img: '/assets/images/icon/pdf-2.svg',
        title: 'Ecommerce.pdf',
        date: '06 June 2021 / 155MB',
    },
    {
        img: '/assets/images/icon/scr-1.svg',
        title: 'Screenshot.jpg',
        date: '06 June 2021 / 155MB',
    },
]
