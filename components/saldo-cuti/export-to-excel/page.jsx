import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelLeaveType = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => ({
            No: item.id,
            NIK: item.employee.employee_nik,
            Nama: item.employee.name,
            Jabatan: item.employee.position.position_name,
            'Status Karyawan': item.employee.employee_status,
            'Tipe Cuti': item.leave_type_master.leave_type_name,
            'Saldo Cuti': item.leave_type + 'Hari',
            Digunakan: item.used_leave_type + 'Hari',
            Sisa: item.remaining_leave_type + 'Hari',
            'Periode Awal': dayjs(item.initial_estimate).format('DD MMMM YYYY'),
            'Periode Akhir': dayjs(item.final_estimate).format('DD MMMM YYYY'),
            Deskripsi: item.leave_type_description,
        }))

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-saldo-cuti-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
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

export default ExportToExcelLeaveType
