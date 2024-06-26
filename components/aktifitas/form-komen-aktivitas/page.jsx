import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import http from '@/app/helpers/http.helper'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setLoading } from '@/store/loadingReducer'

const CommentActivityForm = ({ setShowActivityCommentModal }) => {
    const activityId = useSelector(
        (state) => state.activity.activity.activity_id
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
    })

    const queryClient = useQueryClient()

    const dispatch = useDispatch()
    const token = getCookie('token')

    const patchActivity = useMutation({
        mutationFn: async (values) => {
            const form = new URLSearchParams(values).toString()
            return http(token).patch(`/activity/${activityId}`, form)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['activity'] })
            dispatch(setLoading(false))
            toast.success('Berhasil menambah komentar')
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message)
            dispatch(setLoading(false))
        },
    })

    const onSubmit = (values) => {
        setShowActivityCommentModal(false)
        patchActivity.mutate(values)
        dispatch(setLoading(true))
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div>
                    <div>
                        <Textarea
                            label="Komen Aktivitas"
                            type="text"
                            name="comment"
                            register={register}
                            id="df"
                            placeholder="Berikan Komentar"
                            error={errors.comment}
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowActivityCommentModal(false)
                        }}
                    />
                    <Button
                        text="Kirim"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default CommentActivityForm
