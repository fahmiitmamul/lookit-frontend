import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'

const ExportToExcelCost = ({ data }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = data.map((item) => ({
            'Nama Biaya': item.cost_name,
            'Jenis Biaya': item.cost_type,
            'Nilai Rupiah': item.cost_value,
            Pajak: item.cost_tax_percentage + '%',
            'Nilai Pajak': item.cost_tax_result,
            'Jumlah Total': item.cost_grand_total,
            'Tanggal Pembayaran': dayjs(item.cost_date).format('DD-MMMM-YYYY'),
            Status: item.cost_status,
            'Jenis Pembayaran': item.cost_payment_type,
            Deskripsi: item.cost_description,
        }))

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const dataBlob = new Blob([excelBuffer], { type: fileType })
        saveAs(
            dataBlob,
            'data-biaya-' + dayjs().format('DD-MMMM-YYYY') + fileExtension
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

export default ExportToExcelCost
