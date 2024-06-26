import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import IncomingGuaranteeDocument from '../download-pdf-garansi-masuk/page'
import ExportToExcelIncomingGuarantee from '../export-excel-garansi-masuk/page'

const DownloadIncomingGuaranteeModal = ({
    selectedGuaranteeData,
    isClient,
}) => {
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
                                    selectedGuaranteeData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedGuaranteeData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <IncomingGuaranteeDocument
                                                        data={
                                                            selectedGuaranteeData
                                                        }
                                                    />
                                                }
                                                fileName="data-biaya.pdf"
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
                            <ExportToExcelIncomingGuarantee
                                data={selectedGuaranteeData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadIncomingGuaranteeModal
