import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelPresenceRecords = ({ data, selectedMonth }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const days = dayjs(selectedMonth).daysInMonth()

    const exportToExcel = () => {
        const formattedData = data.flatMap((item) => {
            return Array.from({ length: days }, (_, i) => {
                const date = dayjs(selectedMonth)
                    .date(i + 1)
                    .format('YYYY-MM-DD')
                return {
                    ...item,
                    Tanggal: date,
                }
            })
        })

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
