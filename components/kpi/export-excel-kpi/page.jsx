import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelKPI = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => {
            const indicatorsString = item.indicators
                .map(
                    (indicator) =>
                        `Nama: ${indicator.indicator_name} Target: ${indicator.target}, Hasil: ${indicator.results}`
                )
                .join(', ')
            return {
                No: item.id,
                NIK: item.employee.employee_nik,
                Nama: item.employee.name,
                Jabatan: item.employee.position.position_name,
                Cabang: item.employee.branch.branch_name,
                Tanggal: dayjs(item.createdAt).format('DD MMMM YYYY'),
                Indikator: indicatorsString,
                Deskripsi: item.kpi_description,
            }
        })

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-kpi-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
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

export default ExportToExcelKPI
