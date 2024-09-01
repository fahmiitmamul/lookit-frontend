import Icon from '@/components/ui/Icon'
import Tooltip from '@/components/ui/Tooltip'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import { setSelectedPotonganId } from '../../store'

export default function MasterSalaryPotonganTable({
    setShowViewMasterGajiPotongan,
    setShowEditMasterGajiPotongan,
    setShowDeleteMasterGajiPotongan,
    masterSalaryPotonganData,
}) {
    const dispatch = useDispatch()
    const columns = [
        {
            label: 'No',
            field: 'no',
        },
        {
            label: 'Kode Potongan',
            field: 'name',
        },
        {
            label: 'Nama Potongan',
            field: 'name',
        },
        {
            label: 'Aksi',
            field: 'name',
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
                                    {masterSalaryPotonganData?.data?.map(
                                        (item, index) => {
                                            return (
                                                <tr
                                                    className="hover:bg-slate-200 dark:hover:bg-slate-700"
                                                    key={index}
                                                >
                                                    <td className="table-td">
                                                        {index + 1}
                                                    </td>
                                                    <td className="table-td">
                                                        {
                                                            item?.master_salary_code
                                                        }
                                                    </td>
                                                    <td className="table-td">
                                                        {
                                                            item?.master_salary_name
                                                        }
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
                                                                            setSelectedPotonganId(
                                                                                parseInt(
                                                                                    item?.master_salary_code
                                                                                )
                                                                            )
                                                                        )
                                                                        setShowViewMasterGajiPotongan(
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
                                                                            setSelectedPotonganId(
                                                                                parseInt(
                                                                                    item?.master_salary_code
                                                                                )
                                                                            )
                                                                        )
                                                                        setShowEditMasterGajiPotongan(
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
                                                                            setSelectedPotonganId(
                                                                                parseInt(
                                                                                    item?.master_salary_code
                                                                                )
                                                                            )
                                                                        )
                                                                        setShowDeleteMasterGajiPotongan(
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
                                            )
                                        }
                                    )}
                                </tbody>
                            </table>
                            {masterSalaryPotonganData?.data?.length === 0 && (
                                <div className="w-full pt-5 text-xl flex justify-center items-center">
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
