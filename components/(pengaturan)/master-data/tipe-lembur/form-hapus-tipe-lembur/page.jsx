import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteOvertimeTypeForm = ({ setShowDeleteOvertimeTypeModal }) => {
    const token = getCookie('token')
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const overtimeTypeId = useSelector(
        (state) => state.masterdata.overtime_type.overtime_type_id
    )

    const handleDelete = useMutation({
        mutationFn: async () => {
            return http(token).delete(`/overtime-type/${overtimeTypeId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['overtime-type'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menghapus tipe lembur')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = () => {
        setShowDeleteOvertimeTypeModal(false)
        handleDelete.mutate()
        dispatch(setLoading(true))
    }

    const { handleSubmit } = useForm({
        mode: 'all',
    })

    return (
        <>
            <div>Apakah anda yakin ingin menghapus tipe lembur ini ?</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-10">
                    <div className="flex gap-5 justify-end">
                        <Button
                            text="Batal"
                            className="btn-danger"
                            type="button"
                            onClick={() => {
                                setShowDeleteOvertimeTypeModal(false)
                            }}
                        />
                        <Button
                            text="Simpan"
                            type="submit"
                            className="btn-success"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeleteOvertimeTypeForm
