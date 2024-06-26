import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import TasksPDF from '../download-pdf-tugas/page'
import ExportToExcelTasks from '../export-excel-tasks/page'

const DownloadTasksModal = ({ selectedTasksData, isClient }) => {
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
                                    selectedTasksData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedTasksData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <TasksPDF
                                                        data={selectedTasksData}
                                                    />
                                                }
                                                fileName="data-tugas.pdf"
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
                            <ExportToExcelTasks data={selectedTasksData} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadTasksModal
