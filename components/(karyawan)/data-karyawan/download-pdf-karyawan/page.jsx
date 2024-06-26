import {
    Document,
    Page,
    Image as PDFImage,
    View,
    Text,
    Font,
} from '@react-pdf/renderer'

Font.register({
    family: 'Roboto',
    src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
})

const MyDocument = ({ selectedData }) => (
    <Document style={{ fontSize: 9 }}>
        {selectedData?.map((item, index) => {
            return (
                <Page
                    wrap
                    style={{ fontFamily: 'Roboto' }}
                    size={[595.28, 1390.55]}
                    key={item.id}
                >
                    <View key={index}>
                        <View
                            style={{
                                display: 'flex',
                                gap: 10,
                                marginTop: 10,
                                marginHorizontal: 20,
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '10px',
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View>
                                        <PDFImage
                                            src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/ij3wsthnhsyjvmtsmpm2.png`}
                                            style={{
                                                width: 90,
                                                height: 90,
                                            }}
                                        ></PDFImage>
                                        <View
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                RUNLAPAN
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                marginRight: 20,
                                            }}
                                        >
                                            Profil Karyawan
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ border: '1px solid #7D7C7C' }}>
                                <View
                                    style={{
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingLeft: '10px',
                                            fontWeight: 10,
                                        }}
                                    >
                                        Profil Pribadi
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '10px',
                                            }}
                                        >
                                            <View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        gap: '10',
                                                    }}
                                                >
                                                    <PDFImage
                                                        src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${item?.profile_photo}`}
                                                        style={{
                                                            width: 70,
                                                            height: 100,
                                                        }}
                                                    ></PDFImage>
                                                </View>
                                            </View>
                                            <View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Nama{' '}
                                                        {'                 '}:
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.name}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        NIK KTP {'            '}
                                                        :
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.employee_nik}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        NPWP {'               '}
                                                        :
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.npwp}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Tempat Lahir {'   '}:
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.birth_place}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Tanggal Lahir {'   '}:
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.birth_date}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Umur{' '}
                                                        {'                 '}:
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.age}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Agama {'              '}
                                                        :
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.religion}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        Jenis Kelamin {'  '}:
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 9 }}
                                                    >
                                                        {item?.gender}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Status Nikah {'        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.marital_status}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Email {'                     '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.email}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nomor Telepon {'    '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.phone_number}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Tinggi Badan {'        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.employee_height}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Berat Badan {'          '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.employee_weight}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Golongan Darah {'   '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.blood_type}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Status Vaksin {'       '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.vaccine_status}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                SIM {'                        '}
                                                :
                                            </Text>
                                            {item?.driver_license?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {item?.value}
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Data Pendidikan</Text>
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal: '10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Nama Sekolah</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {item?.school_name}
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Jenjang</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {item?.school_name}
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Waktu Mulai</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.education_start_date
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Waktu Akhir</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.education_end_date
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Status Kelulusan</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.graduation_status
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingVertical: 5,
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <Text>Pengalaman Kerja</Text>
                                </View>
                                <View
                                    style={{
                                        paddingHorizontal: '10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Nama Perusahaan</Text>
                                        </View>
                                        <View>
                                            {item?.work_history?.work_history?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {item?.company_name}
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Pilih Jabatan</Text>
                                        </View>
                                        <View>
                                            {item?.work_history?.work_history?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.position_name
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Waktu Mulai</Text>
                                        </View>
                                        <View>
                                            {item?.work_history?.work_history?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.work_history_start_date
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Waktu Akhir</Text>
                                        </View>
                                        <View>
                                            {item?.work_history?.work_history?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.work_history_end_date
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 5,
                                        }}
                                    >
                                        <View>
                                            <Text>Status Kerja</Text>
                                        </View>
                                        <View>
                                            {item?.educations?.educations?.map(
                                                (item, index) => {
                                                    return (
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                            key={index}
                                                        >
                                                            {
                                                                item?.graduation_status
                                                            }
                                                        </Text>
                                                    )
                                                }
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginTop: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Data Karyawan</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                NIK Karyawan {'           '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.employee_nik}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Status Karyawan {'      '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.employee_status}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Tanggal Masuk {'         '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.join_date}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Tanggal Keluar {'         '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.end_date}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Area{' '}
                                                {'                            '}
                                                :
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.area?.area_name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Cabang{' '}
                                                {'                      '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.branch?.branch_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Batch{' '}
                                                {'                         '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.batch}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Divisi{' '}
                                                {'                          '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.division?.division_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Jabatan{' '}
                                                {'                     '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.position?.position_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Level{' '}
                                                {'                          '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.level?.level_name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Akun Bank</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nama Bank {'               '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.bank_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nomor Rekening {'      '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.account_number}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nama Cabang Bank{'        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.bank_branch_name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nama Pemilik Bank {'        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.bank_owner_name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Data BPJS</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nama BPJS {'               '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                BPJS Kesehatan
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nomor BPJS {'              '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                34534534535345
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Data Asuransi</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nama Asuransi {'         '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                Manulife
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Nomor Asuransi {'        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                2342342342334
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text>Alamat Lengkap Sesuai E-KTP</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Provinsi{' '}
                                                {'                       '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.e_ktp_province?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kabupaten {'                  '}
                                                :
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.e_ktp_regency?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kode POS{' '}
                                                {'                    '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.e_ktp_postal_code}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kecamatan {'                 '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.e_ktp_district?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kelurahan{' '}
                                                {'                   '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.e_ktp_village?.name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        paddingLeft: 10,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                        borderBottom: '1px solid #7D7C7C',
                                        backgroundColor: '#F3F3F3',
                                        borderTop: '1px solid #7D7C7C',
                                    }}
                                >
                                    <Text>Alamat Lengkap Sesuai Domisili</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Provinsi{' '}
                                                {'                        '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.domicile_province?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kabupaten{' '}
                                                {'                   '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.domicile_regency?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kode POS{' '}
                                                {'                    '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.domicile_postal_code}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kecamatan {'                  '}
                                                :
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.domicile_district?.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 8,
                                                marginBottom: 8,
                                            }}
                                        >
                                            <Text style={{ fontSize: 9 }}>
                                                Kelurahan{' '}
                                                {'                     '}:
                                            </Text>
                                            <Text style={{ fontSize: 9 }}>
                                                {item?.domicile_village?.name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>
            )
        })}
    </Document>
)

export default MyDocument
