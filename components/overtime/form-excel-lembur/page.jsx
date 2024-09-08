import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelOvertime = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => {
            const date1 = dayjs(item?.start_date)
            const date2 = dayjs(item?.end_date)
            const diffInHours = date1.diff(date2, 'hour')
            return {
                No: item.id,
                'NIK Karyawan': item.employee.employee_nik,
                'Nama Karyawan': item.employee.name,
                'Tipe Lembur': item.overtime_type.name,
                Jabatan: item.employee.position.position_name,
                Cabang: item.employee.branch.branch_name,
                'Mulai Lembur': dayjs(item.start_date).format('DD MMMM YYYY'),
                'Selesai Lembur': dayjs(item.end_date).format('DD MMMM YYYY'),
                'Total Jam': diffInHours,
                Status: item.status,
                Keterangan: item.description,
            }
        })

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-lembur-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
        )
    }

    return (
        <Button
            icon="heroicons-outline:newspaper"
            text="Download Excel"
            className="btn-primary bg-success-500"
            onClick={exportToExcel}
        />
    )
}

export default ExportToExcelOvertime
