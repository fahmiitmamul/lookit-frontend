import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/store/loadingReducer'
import { toast } from 'react-toastify'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Fileinput from '@/components/ui/Fileinput'
import Button from '@/components/ui/Button'

const ImportAssetsForm = ({ setShowImportModal }) => {
    const [selectedAssets, setSelectedAssets] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const token = getCookie('token')
    const dispatch = useDispatch()

    const queryClient = useQueryClient()

    function checkData(data) {
        var invalidProperties = []

        for (const key in data) {
            if (!data[key]) {
                invalidProperties.push(key + ' tidak boleh kosong')
            }

            if (
                key === 'Kondisi Inventaris' &&
                data[key] !== 'Baru' &&
                data[key] !== 'Bekas'
            ) {
                invalidProperties.push(key + ' tidak valid')
            }
        }

        if (invalidProperties.length > 0) {
            console.error('Properti tidak valid:', invalidProperties.join('; '))
            return { valid: false, errorMessage: invalidProperties.join('; ') }
        }

        return { valid: true }
    }

    const processAssetsData = useMutation({
        mutationFn: () => {
            for (const data of selectedAssets) {
                const validationResult = checkData(data)
                if (!validationResult.valid) {
                    toast.error(validationResult.errorMessage)
                    return Promise.reject(validationResult.errorMessage)
                }
            }
            return http(token).post('/assets/bulk', selectedAssets)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['make-assets'] })
            toast.success('Berhasil mengimport data Inventaris', { toastId: 1 })
            dispatch(setLoading(false))
            setShowImportModal(false)
        },
        onError: (err) => {
            dispatch(setLoading(false))
            toast.error(err?.response?.data?.message)
            setShowImportModal(false)
        },
    })

    const { handleSubmit } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(setLoading(true))
        processAssetsData.mutate()
    }

    const importFromExcel = async (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
        if (!file) return

        const reader = new FileReader()

        const readAsArrayBuffer = (file) => {
            return new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(e.target.result)
                }
                reader.readAsArrayBuffer(file)
            })
        }

        const data = await readAsArrayBuffer(file)
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' })

        const sheetName = workbook.SheetNames
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        setSelectedAssets(jsonData)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:grid-cols-1 grid gap-5 grid-cols-1"
            >
                <div className="lg:grid-cols-1 grid gap-5 grid-cols-1">
                    <div>
                        <label htmlFor="religion" className="form-label ">
                            Silakan Pilih File
                        </label>
                        <Fileinput
                            name="basic"
                            selectedFile={selectedFile}
                            onChange={importFromExcel}
                        />
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowImportModal(false)
                        }}
                    />
                    <Button
                        text="Proses"
                        type="submit"
                        className="btn-success"
                    />
                </div>
            </form>
        </div>
    )
}

export default ImportAssetsForm
