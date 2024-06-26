import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import PresencePDF from '../download-pdf-kehadiran/page'
import ExportToExcelPresence from '../export-excel-kehadiran/page'

const DownloadPresenceModal = ({ selectedPresenceData, isClient }) => {
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
                                    selectedPresenceData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedPresenceData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <PresencePDF
                                                        data={
                                                            selectedPresenceData
                                                        }
                                                    />
                                                }
                                                fileName="data-kehadiran.pdf"
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
                            <ExportToExcelPresence
                                data={selectedPresenceData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadPresenceModal
