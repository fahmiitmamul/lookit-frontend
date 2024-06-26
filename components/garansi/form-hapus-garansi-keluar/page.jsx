import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteOutgoingGuaranteeForm = ({ showDeleteOutgoingGuaranteeModal }) => {
    const token = getCookie('token')
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const guaranteeId = useSelector(
        (state) => state.guarantee.guarantee.guarantee_id
    )

    const handleDelete = useMutation({
        mutationFn: async () => {
            return http(token).delete(`/outgoing-guarantee/${guaranteeId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outgoing-guarantee'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menghapus garansi keluar')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        showDeleteOutgoingGuaranteeModal(false)
        handleDelete.mutate()
        dispatch(setLoading(true))
    }

    const { handleSubmit } = useForm({
        mode: 'all',
    })

    return (
        <>
            <div>Apakah anda yakin ingin menghapus garansi ini ?</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-10">
                    <div className="flex gap-5 justify-end">
                        <Button
                            text="Batal"
                            className="btn-danger"
                            type="button"
                            onClick={() => {
                                showDeleteOutgoingGuaranteeModal(false)
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

export default DeleteOutgoingGuaranteeForm
