import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteCostForm = ({ setShowDeleteCostModal }) => {
    const token = getCookie('token')
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const costId = useSelector((state) => state.finance.finance.selectedCostId)

    const handleDelete = useMutation({
        mutationFn: async () => {
            return http(token).delete(`/cost/${costId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cost'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menghapus biaya')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = () => {
        setShowDeleteCostModal(false)
        handleDelete.mutate()
        dispatch(setLoading(true))
    }

    const { handleSubmit } = useForm({
        mode: 'all',
    })

    return (
        <>
            <div>Apakah anda yakin ingin menghapus biaya ini ?</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-10">
                    <div className="flex gap-5 justify-end">
                        <Button
                            text="Batal"
                            className="btn-danger"
                            type="button"
                            onClick={() => {
                                setShowDeleteCostModal(false)
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

export default DeleteCostForm
