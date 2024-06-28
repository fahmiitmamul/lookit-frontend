import { PDFDownloadLink } from '@react-pdf/renderer'
import ExportToExcelPresence from '../export-excel-kehadiran/page'
import { Icon } from '@iconify/react'

const DownloadPresenceModal = ({ selectedPresenceData, isClient }) => {
    return (
        <>
            <form>
                <div className="flex justify-center items-center">
                    <div className="flex gap-5">
                        {isClient && (
                            <div className="flex gap-2 justify-center items-center">
                                <div>
                                    <Icon
                                        icon="heroicons-outline:document-arrow-down"
                                        fontSize={20}
                                    ></Icon>
                                </div>
                                <div>
                                    <PDFDownloadLink
                                        fileName="data-kehadiran.pdf"
                                        className="bg-warning-500 text-white w-full h-full"
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading
                                                ? 'Loading document...'
                                                : 'Download PDF'
                                        }
                                    </PDFDownloadLink>
                                </div>
                            </div>
                        )}
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
