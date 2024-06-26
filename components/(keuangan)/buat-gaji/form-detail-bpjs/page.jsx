import { useDispatch, useSelector } from 'react-redux'
import Button from '@/components/ui/Button'
import { useForm } from 'react-hook-form'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { setBpjsKesehatan, setBpjsKetenagakerjaan } from '../../store'

export const DetailBpjsModal = ({ setShowViewBpjsModal }) => {
    const token = getCookie('token')
    const { bpjs } = useSelector((state) => state.finance.finance.employee)
    const JumlahAnak = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.jumlah_anak
    )

    const tunjanganBpjsKesehatanPerusahaan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.tunjangan_perusahaan
    )

    const potonganBpjsKesehatanPerusahaan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.potongan_karyawan
    )

    const afterPotonganKaryawan = useSelector(
        (state) => state.finance.finance.bpjs.kesehatan.after_potongan_karyawan
    )

    const tunjanganBpjsKetenagakerjaanHariTua = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jht
    )

    const potonganBpjsKetenagakerjaanHariTua = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.potongan_jht
    )

    const tunjanganBpjsKetenagakerjaanKecelakaanKerja = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jkk
    )

    const tunjanganBpjsKetenagakerjaanKematian = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jkm
    )

    const tunjanganBpjsKetenagakerjaanPensiun = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.tunjangan_jp
    )

    const potonganBpjsKetenagakerjaanPensiun = useSelector(
        (state) => state.finance.finance.bpjs.ketenagakerjaan.potongan_jp
    )

    const selectedBpjsId = useSelector(
        (state) => state.finance.finance.selectedBpjsId
    )

    const dispatch = useDispatch()

    const {} = useForm({
        defaultValues: async () => {
            const { data } = await http(token).get(
                `/main-salary-bpjs/${selectedBpjsId}`
            )
            dispatch(
                setBpjsKesehatan(
                    data.results.main_salary_bpjs_value[0].kesehatan
                )
            )
            dispatch(
                setBpjsKetenagakerjaan(
                    data.results.main_salary_bpjs_value[0].ketenagakerjaan
                )
            )
            return data.results
        },
        mode: 'all',
    })

    return (
        <div>
            <div className="flex flex-col gap-4">
                <h6>Detail BPJS</h6>

                <div className="lg:grid-cols-2 gap-5 grid grid-cols-1">
                    {bpjs?.bpjs?.find(
                        (bpjs) => bpjs.bpjs_type === 'BPJS Kesehatan'
                    ) ? (
                        <div className="flex flex-col gap-3">
                            <div>BPJS Kesehatan</div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Nomor BPJS Kesehatan
                                </div>
                                <div className="text-sm">
                                    {
                                        bpjs.bpjs.find(
                                            (bpjs) =>
                                                bpjs.bpjs_type ===
                                                'BPJS Kesehatan'
                                        )?.bpjs_number
                                    }
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Jumlah Anak</div>
                                <div className="text-sm">{JumlahAnak}</div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKesehatanPerusahaan)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKesehatanPerusahaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Potongan Karyawan</div>
                                <div className="text-sm">
                                    {afterPotonganKaryawan !== 0
                                        ? `Rp${afterPotonganKaryawan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                                        : isNaN(potonganBpjsKesehatanPerusahaan)
                                          ? `Rp${0},00`
                                          : `Rp${potonganBpjsKesehatanPerusahaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {bpjs?.bpjs?.find(
                        (bpjs) => bpjs.bpjs_type === 'BPJS Ketenagakerjaan'
                    ) ? (
                        <div className="flex flex-col gap-3">
                            <div>BPJS Ketenagakerjaan</div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm"> Nomor BPJS TK</div>
                                <div className="text-sm">
                                    {
                                        bpjs.bpjs.find(
                                            (bpjs) =>
                                                bpjs.bpjs_type ===
                                                'BPJS Ketenagakerjaan'
                                        )?.bpjs_number
                                    }
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan JHT Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanHariTua)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanHariTua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Pot. JHT Karyawan</div>
                                <div className="text-sm">
                                    {isNaN(potonganBpjsKetenagakerjaanHariTua)
                                        ? `Rp${0},00`
                                        : `Rp${potonganBpjsKetenagakerjaanHariTua.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Tunjangan JKK</div>
                                <div className="text-sm">
                                    {isNaN(
                                        tunjanganBpjsKetenagakerjaanKecelakaanKerja
                                    )
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanKecelakaanKerja.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Tunjangan JKM</div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanKematian)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanKematian.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">
                                    Tunjangan JP Perusahaan
                                </div>
                                <div className="text-sm">
                                    {isNaN(tunjanganBpjsKetenagakerjaanPensiun)
                                        ? `Rp${0},00`
                                        : `Rp${tunjanganBpjsKetenagakerjaanPensiun.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                            <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                                <div className="text-sm">Pot. JP Karyawan</div>
                                <div className="text-sm">
                                    {isNaN(potonganBpjsKetenagakerjaanPensiun)
                                        ? `Rp${0},00`
                                        : `Rp${potonganBpjsKetenagakerjaanPensiun.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                <h6>Total Perhitungan</h6>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>Total Potongan Karyawan</div>
                    <div className="text-sm">
                        {isNaN(
                            potonganBpjsKesehatanPerusahaan +
                                potonganBpjsKetenagakerjaanHariTua +
                                potonganBpjsKetenagakerjaanPensiun
                        )
                            ? `Rp${0},00`
                            : `Rp${(
                                  potonganBpjsKesehatanPerusahaan +
                                  potonganBpjsKetenagakerjaanHariTua +
                                  potonganBpjsKetenagakerjaanPensiun +
                                  (afterPotonganKaryawan -
                                      potonganBpjsKesehatanPerusahaan)
                              )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                    </div>
                </div>
                <div className="lg:grid-cols-2 grid gap-5 grid-cols-1">
                    <div>Total Tunjangan Dibiayai Perusahaan</div>
                    <div className="text-sm">
                        {isNaN(
                            tunjanganBpjsKesehatanPerusahaan +
                                tunjanganBpjsKetenagakerjaanHariTua +
                                tunjanganBpjsKetenagakerjaanKecelakaanKerja +
                                tunjanganBpjsKetenagakerjaanKematian +
                                tunjanganBpjsKetenagakerjaanPensiun
                        )
                            ? `Rp${0},00`
                            : `Rp${(
                                  tunjanganBpjsKesehatanPerusahaan +
                                  tunjanganBpjsKetenagakerjaanHariTua +
                                  tunjanganBpjsKetenagakerjaanKecelakaanKerja +
                                  tunjanganBpjsKetenagakerjaanKematian +
                                  tunjanganBpjsKetenagakerjaanPensiun
                              )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                    </div>
                </div>
            </div>
            <div className="pt-10">
                <div className="flex gap-5 justify-end">
                    <Button
                        text="Batal"
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                            setShowViewBpjsModal(false)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
