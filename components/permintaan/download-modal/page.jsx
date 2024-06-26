import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import RequestPDF from '../download-pdf-permintaan/page'
import ExportToExcelRequests from '../export-excel-permintaan/page'

const DownloadRequestsModal = ({ selectedRequestsData, isClient }) => {
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
                                    selectedRequestsData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedRequestsData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <RequestPDF
                                                        data={
                                                            selectedRequestsData
                                                        }
                                                    />
                                                }
                                                fileName="data-permintaan.pdf"
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
                            <ExportToExcelRequests
                                data={selectedRequestsData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadRequestsModal
