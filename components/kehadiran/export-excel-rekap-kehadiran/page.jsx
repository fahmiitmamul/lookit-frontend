import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'

const ExportToExcelPresenceRecords = ({ data, selectedMonth }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const days = dayjs(selectedMonth).daysInMonth()

    const exportToExcel = () => {
        const formattedData = data.map((item) => ({
            No: item.id,
            NIK: item.employee.employee_nik,
            Nama: item.employee.name,
            Jadwal: item.shift.shift_name,
            Tanggal: item.start,
            H: '',
            HT: '',
            PC: '',
            TP: '',
            A: '',
            S: '',
            I: '',
            C: '',
            L: '',
        }))

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(dataBlob, 'data' + fileExtension)
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

export default ExportToExcelPresenceRecords
