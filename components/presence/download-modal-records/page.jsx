import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import PresenceRecordPDF from '../download-pdf-presence/page'
import ExportToExcelPresenceRecords from '../export-excel-rekap-kehadiran/page'
import { useSelector } from 'react-redux'

const DownloadPresenceRecordsModal = ({
    selectedPresenceRecordsData,
    isClient,
}) => {
    const selectedMonth = useSelector(
        (state) => state.presence.presence_records.selectedMonth
    )

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
                                    selectedPresenceRecordsData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedPresenceRecordsData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <PresenceRecordPDF
                                                        data={
                                                            selectedPresenceRecordsData
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
                            <ExportToExcelPresenceRecords
                                data={selectedPresenceRecordsData}
                                selectedMonth={selectedMonth}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadPresenceRecordsModal
