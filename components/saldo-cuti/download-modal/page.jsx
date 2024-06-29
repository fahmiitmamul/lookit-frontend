import { PDFDownloadLink } from '@react-pdf/renderer'
import ExportToExcelLeaveType from '../export-to-excel/page'
import { Icon } from '@iconify/react'
import MyDocument from '@/components/(karyawan)/data-karyawan/download-pdf-karyawan/page'

const DownloadLeaveTypeModal = ({ selectedLeaveTypeData, isClient }) => {
    return (
        <>
            <form>
                <div className="flex justify-center items-center">
                    <div className="flex gap-5">
                        <div className="btn bg-warning-500 text-white">
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
                                            document={
                                                <MyDocument
                                                    selectedData={
                                                        selectedLeaveTypeData
                                                    }
                                                />
                                            }
                                            fileName="data-karyawan.pdf"
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
                        </div>
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
