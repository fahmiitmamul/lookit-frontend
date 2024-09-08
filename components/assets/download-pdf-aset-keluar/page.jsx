import {
    Document,
    Page,
    Image as PDFImage,
    View,
    Text,
    Font,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

Font.register({
    family: 'Roboto',
    src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
})

const OutgoingAssetDocument = ({ data }) => {
    return (
        <Document style={{ fontSize: 9 }}>
            {data?.map((item, index) => {
                return (
                    <Page wrap style={{ fontFamily: 'Roboto' }} key={index}>
                        <View>
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
                                                Informasi Aset Keluar
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
                                                            flexDirection:
                                                                'column',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                            gap: '10',
                                                        }}
                                                    >
                                                        <PDFImage
                                                            src={`https://res.cloudinary.com/dxnewldiy/image/upload/v1701582842/${item?.employee?.profile_photo}`}
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
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Nama{' '}
                                                            {
                                                                '                 '
                                                            }
                                                            :
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.name
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            NIK KTP{' '}
                                                            {'            '}:
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.employee_nik
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            NPWP{' '}
                                                            {'               '}:
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.npwp
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Tempat Lahir {'   '}
                                                            :
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.birth_place
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Tanggal Lahir{' '}
                                                            {'   '}:
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.birth_place
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Umur{' '}
                                                            {
                                                                '                 '
                                                            }
                                                            :
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.age
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Agama{' '}
                                                            {'              '}:
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.religion
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            gap: 8,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            Jenis Kelamin {'  '}
                                                            :
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 9,
                                                            }}
                                                        >
                                                            {
                                                                item?.employee
                                                                    ?.gender
                                                            }
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
                                                    {
                                                        item?.employee
                                                            ?.marital_status
                                                    }
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
                                                    Email{' '}
                                                    {'                     '}:
                                                </Text>
                                                <Text style={{ fontSize: 9 }}>
                                                    {item?.employee?.email}
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
                                                    {
                                                        item?.employee
                                                            ?.phone_number
                                                    }
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
                                                    {
                                                        item?.employee
                                                            ?.employee_height
                                                    }
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
                                                    {
                                                        item?.employee
                                                            ?.employee_weight
                                                    }
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
                                                    {item?.employee?.blood_type}
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
                                                    {
                                                        item?.employee
                                                            ?.vaccine_status
                                                    }
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
                                                    SIM{' '}
                                                    {'                        '}
                                                    :
                                                </Text>
                                                {item?.employee?.driver_license?.map(
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
                                </View>
                                <View style={{ border: '1px solid #7D7C7C' }}>
                                    <View
                                        style={{
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            borderBottom: '1px solid #7D7C7C',
                                            backgroundColor: '#F3F3F3',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingLeft: '10px',
                                                fontWeight: 10,
                                            }}
                                        >
                                            Informasi Aset Keluar
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            paddingHorizontal: '10px',
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 4,
                                                paddingVertical: 10,
                                            }}
                                        >
                                            <Text>
                                                Nama Aset {'          '}:{'   '}
                                                {item?.asset_name}
                                            </Text>
                                            <Text>
                                                Tipe Aset {'             '}:
                                                {'   '}
                                                {item?.asset_type}
                                            </Text>
                                            <Text>
                                                Kondisi Aset {'        '}:
                                                {'   '}
                                                {item?.asset_condition}
                                            </Text>
                                            <Text>
                                                Jumlah Aset {'        '}:{'   '}
                                                {item?.asset_quantity}
                                            </Text>
                                            <Text>
                                                Tanggal Keluar {'    '}:{'   '}
                                                {dayjs(item?.end_date).format(
                                                    'DD-MMMM-YYYY'
                                                )}
                                            </Text>
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
}

export default OutgoingAssetDocument
