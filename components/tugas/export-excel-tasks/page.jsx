import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelTasks = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => ({
            No: item.id,
            NIK: item.employee.employee_nik,
            Nama: item.employee.name,
            Jabatan: item.employee.position.position_name,
            Judul: item.task_name,
            Mulai: dayjs(item.task_start_date).format('DD MMMM YYYY'),
            Selesai: dayjs(item.task_end_date).format('DD MMMM YYYY'),
            Prioritas: item.task_priority,
            Status:
                item?.task_status === 0
                    ? 'Proses'
                    : item?.task_status === 1
                      ? 'Selesai'
                      : item?.task_status === 2
                        ? 'Batal'
                        : null,
            Deskripsi: item.task_description,
        }))

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-tugas-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
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

export default ExportToExcelTasks
