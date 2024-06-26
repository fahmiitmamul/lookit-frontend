import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import OutgoingGuaranteeDocument from '../download-pdf-garansi-keluar/page'
import ExportToExcelOutgoingGuarantee from '../export-excel-garansi-keluar/page'

const DownloadOutgoingGuaranteeModal = ({
    selectedOutgoingGuaranteeData,
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
                                    selectedOutgoingGuaranteeData?.length ==
                                        0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedOutgoingGuaranteeData?.length >=
                                    1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <OutgoingGuaranteeDocument
                                                        data={
                                                            selectedOutgoingGuaranteeData
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
                            <ExportToExcelOutgoingGuarantee
                                data={selectedOutgoingGuaranteeData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadOutgoingGuaranteeModal
