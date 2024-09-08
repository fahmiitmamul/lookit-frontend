import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '@/components/ui/Button'

const ExportToExcel = ({}) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = () => {
        const formattedData = [
            {
                'Nomor Induk Karyawan': '',
                'Nomor Induk Kependudukan': '',
                'Nama Karyawan': '',
                'Kode Area': '',
                'Kode Cabang': '',
                'Kode Divisi': '',
                'Kode Jabatan': '',
                'Kode Level': '',
                'Status Karyawan (Kontrak/Tetap)': '',
                'Join Date (DD/MM/YYYY)': '',
                'End Date (DD/MM/YYYY)': '',
                Email: '',
                Password: '',
                'Jenis Kelamin (Laki-Laki/Perempuan)': '',
                'Tempat Tanggal Lahir': '',
                'Alamat Lengkap Sesuai Domisili': '',
                'Alamat Lengkap Sesuai E-KTP': '',
                Agama: '',
                'Nomor Handphone': '',
            },
        ]

        const ws = XLSX.utils.json_to_sheet(formattedData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        saveAs(data, 'data' + fileExtension)
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

export default ExportToExcel
