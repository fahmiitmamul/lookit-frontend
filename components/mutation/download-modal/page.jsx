import Button from '@/components/ui/Button'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
import MutationDocument from '../download-pdf-mutation/page'
import ExportToExcelMutation from '../export-excel-mutation/page'

const DownloadMutation = ({ selectedMutationData, isClient }) => {
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
                                    selectedMutationData?.length == 0 &&
                                        toast.error(
                                            'Silahkan ceklis data terlebih dahulu'
                                        )
                                }}
                                children={
                                    selectedMutationData?.length >= 1 ? (
                                        <div>
                                            <PDFDownloadLink
                                                document={
                                                    <MutationDocument
                                                        data={
                                                            selectedMutationData
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
                            <ExportToExcelMutation
                                data={selectedMutationData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DownloadMutation
