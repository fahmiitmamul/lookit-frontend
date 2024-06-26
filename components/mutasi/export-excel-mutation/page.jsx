import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelMutation = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => ({
            No: item.id,
            NIK: item.employee.employee_nik,
            Nama: item.employee.name,
            Jabatan: item.employee.position.position_name,
            Cabang: item.employee.branch.branch_name,
            Tanggal: dayjs(item.createdAt).format('DD MMMM YYYY'),
            Deskripsi: item.mutation_description,
        }))

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-mutasi-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
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

export default ExportToExcelMutation
