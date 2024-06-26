import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import ExportToExcelLeaveType from '../export-to-excel/page'
import LeaveTypeDocument from '../download-pdf-saldo-cuti/page'

const DownloadLeaveTypeModal = ({ selectedLeaveTypeData, isClient }) => {
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
                                    selectedLeaveTypeData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedLeaveTypeData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <LeaveTypeDocument
                                                        data={
                                                            selectedLeaveTypeData
                                                        }
                                                    />
                                                }
                                                fileName="data-saldo-cuti.pdf"
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
                            <ExportToExcelLeaveType
                                data={selectedLeaveTypeData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadLeaveTypeModal
