import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import OvertimePDF from '../form-pdf-lembur/page'
import ExportToExcelOvertime from '../form-excel-lembur/page'

const DownloadOvertimeForm = ({ selectedOvertimeData, isClient }) => {
    return (
        <>
            <form>
                <div className="flex justify-center items-center">
                    <div className="flex gap-5">
                        {isClient ? (
                            <Button
                                text="Download PDF"
                                icon="heroicons-outline:newspaper"
                                className="bg-warning-500 text-white"
                                onClick={() => {
                                    selectedOvertimeData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedOvertimeData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <OvertimePDF
                                                        data={
                                                            selectedOvertimeData
                                                        }
                                                    />
                                                }
                                                fileName="data-lembur.pdf"
                                            >
                                                {({
                                                    blob,
                                                    url,
                                                    loading,
                                                    error,
                                                }) =>
                                                    loading
                                                        ? 'Loading document...'
                                                        : 'Download PDF'
                                                }
                                            </PDFDownloadLink>
                                        </div>
                                    ) : null
                                }
                            />
                        ) : null}
                        <div>
                            <ExportToExcelOvertime
                                data={selectedOvertimeData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadOvertimeForm
