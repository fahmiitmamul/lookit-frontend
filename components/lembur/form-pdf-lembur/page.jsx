import {
    Document,
    Page,
    Image as PDFImage,
    View,
    Text,
    Font,
    StyleSheet,
} from '@react-pdf/renderer'
import dayjs from 'dayjs'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Open Sans',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    noHeaderCell: {
        width: '5%',
        margin: 5,
        fontSize: 6,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    headerCell: {
        margin: 5,
        width: '25%',
        fontSize: 6,
        fontWeight: 'black',
        textTransform: 'uppercase',
    },
    noCell: {
        width: '5%',
        margin: 5,
        fontSize: 6,
    },
    cell: {
        margin: 5,
        width: '25%',
        fontSize: 6,
    },
})

Font.register({
    family: 'Open Sans',
    src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
})

const OvertimePDF = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.headerText}>Data Lembur</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.noHeaderCell}>No</Text>
                        <Text style={styles.headerCell}>NIK</Text>
                        <Text style={styles.headerCell}>Nama</Text>
                        <Text style={styles.headerCell}>Tipe</Text>
                        <Text style={styles.headerCell}>Jabatan</Text>
                        <Text style={styles.headerCell}>Cabang</Text>
                        <Text style={styles.headerCell}>Mulai</Text>
                        <Text style={styles.headerCell}>Selesai</Text>
                        <Text style={styles.headerCell}>Total</Text>
                        <Text style={styles.headerCell}>Status</Text>
                        <Text style={styles.headerCell}>Keterangan</Text>
                    </View>
                    {data?.map((row, index) => {
                        const date1 = dayjs(row?.start_date)
                        const date2 = dayjs(row?.end_date)
                        const diffInHours = date1.diff(date2, 'hour')
                        return (
                            <View style={styles.row} key={row.id}>
                                <Text style={styles.noCell}>{index + 1}</Text>
                                <Text style={styles.cell}>
                                    {row?.employee?.employee_nik}
                                </Text>
                                <Text style={styles.cell}>
                                    {row?.employee?.name}
                                </Text>
                                <Text style={styles.cell}>
                                    {row?.overtime_type?.name}
                                </Text>
                                <Text style={styles.cell}>
                                    {row?.employee?.position?.position_name}
                                </Text>
                                <Text style={styles.cell}>
                                    {row?.employee?.branch?.branch_name}
                                </Text>
                                <Text style={styles.cell}>
                                    {dayjs(row?.start_date).format(
                                        'DD MMMM YYYY'
                                    )}
                                </Text>
                                <Text style={styles.cell}>
                                    {dayjs(row?.end_date).format(
                                        'DD MMMM YYYY'
                                    )}
                                </Text>
                                <Text style={styles.cell}>
                                    {diffInHours + ' Jam'}
                                </Text>
                                <Text style={styles.cell}>{row?.status}</Text>
                                <Text style={styles.cell}>
                                    {row?.description}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </Page>
        </Document>
    )
}

export default OvertimePDF
