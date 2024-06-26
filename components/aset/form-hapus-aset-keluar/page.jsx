import http from '@/app/helpers/http.helper'
import Button from '@/components/ui/Button'
import { setLoading } from '@/store/loadingReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteOutgoingAssetsForm = ({ setShowDeleteOutgoingAssetsModal }) => {
    const token = getCookie('token')
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const assetId = useSelector((state) => state.assets.assets.assets_id)

    const handleDelete = useMutation({
        mutationFn: async () => {
            return http(token).delete(`/outgoing-assets/${assetId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['outgoing-assets'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menghapus inventaris')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (data) => {
        setShowDeleteOutgoingAssetsModal(false)
        handleDelete.mutate()
        dispatch(setLoading(true))
    }

    const { handleSubmit } = useForm({
        mode: 'all',
    })

    return (
        <>
            <div>Apakah anda yakin ingin menghapus inventaris ini ?</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pt-10">
                    <div className="flex gap-5 justify-end">
                        <Button
                            text="Batal"
                            className="btn-danger"
                            type="button"
                            onClick={() => {
                                setShowDeleteOutgoingAssetsModal(false)
                            }}
                        />
                        <Button
                            text="Hapus"
                            type="submit"
                            className="btn-success"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeleteOutgoingAssetsForm
