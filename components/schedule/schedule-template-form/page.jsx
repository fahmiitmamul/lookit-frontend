import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'

const ExcelSchedule = ({}) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = [
            {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                Nama: '',
                'NIK Karyawan': '',
                Bulan: '',
                6: '',
                7: '',
                8: '',
                9: '',
                10: '',
                11: '',
                12: '',
                13: '',
                14: '',
                15: '',
                16: '',
                17: '',
                18: '',
                19: '',
                20: '',
                21: '',
                22: '',
                23: '',
                24: '',
                25: '',
                26: '',
                27: '',
                28: '',
                29: '',
                30: '',
                31: '',
            },
        ]

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        saveAs(data, 'template-jadwal' + fileExtension)
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

export default ExcelSchedule
