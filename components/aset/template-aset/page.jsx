import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'

const ExportToExcelAssets = ({}) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = [
            {
                'Kondisi Aset': '',
                'Nama Aset': '',
                'Merek Aset': '',
                'Jenis Aset': '',
                'Warna Aset': '',
                'Kode Aset': '',
                'Jumlah Aset': '',
            },
        ]

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        saveAs(data, 'template-aset' + fileExtension)
    }
    return (
        <Button
            icon="heroicons-outline:newspaper"
            text="Template"
            className="btn-primary bg-success-500"
            onClick={exportToExcel}
        />
    )
}

export default ExportToExcelAssets
