import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setDocumentId } from '../store'
import SimpleBar from 'simplebar-react'

export default function DocumentTable({
    showEditDocumentModal,
    showViewDocumentModal,
    showDeleteDocumentModal,
    documentData,
}) {
    const dispatch = useDispatch()

    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Nama Dokumen',
            field: 'document_name',
        },

        {
            label: 'Tipe Dokumen',
            field: 'document_tipe',
        },

        {
            label: 'Deskripsi',
            field: 'document_description',
        },

        {
            label: 'File',
            field: 'file',
        },

        {
            label: 'Aksi',
            field: 'action',
        },
    ]

    return (
        <>
            <div className="overflow-x-auto -mx-6">
                <SimpleBar className="overflow-auto w-full bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-400 rounded-md">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        {columns.map((column, i) => (
                                            <th
                                                key={i}
                                                scope="col"
                                                className=" table-th "
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                    {documentData?.data?.map((row, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                        >
                                            <td className="table-td">
                                                {i + 1}
                                            </td>
                                            <td className="table-td">
                                                {row?.document_name}
                                            </td>
                                            <td className="table-td">
                                                {row?.document_type}
                                            </td>
                                            <td className="table-td">
                                                {row?.document_description}
                                            </td>
                                            <td className="table-td">
                                                <Link
                                                    href={`https://res.cloudinary.com/dxnewldiy/raw/upload/fl_attachment/v1/file/${row?.file?.replace(
                                                        /\s/g,
                                                        '%20'
                                                    )}`}
                                                >
                                                    <Icon icon="heroicons-outline:document" />
                                                </Link>
                                            </td>
                                            <td className="table-td">
                                                <div className="flex space-x-3 rtl:space-x-reverse">
                                                    <Tooltip
                                                        content="View"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setDocumentId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showViewDocumentModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:eye" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Edit"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setDocumentId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showEditDocumentModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:pencil-square" />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip
                                                        content="Delete"
                                                        placement="top"
                                                        arrow
                                                        animation="shift-away"
                                                        theme="danger"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                dispatch(
                                                                    setDocumentId(
                                                                        row.id
                                                                    )
                                                                )
                                                                showDeleteDocumentModal(
                                                                    true
                                                                )
                                                            }}
                                                            className="action-btn"
                                                            type="button"
                                                        >
                                                            <Icon icon="heroicons:trash" />
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {documentData?.data?.length === 0 && (
                                <div className="w-full pt-5 text-xl flex justify-center rows-center">
                                    <div>No data found</div>
                                </div>
                            )}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </>
    )
}
