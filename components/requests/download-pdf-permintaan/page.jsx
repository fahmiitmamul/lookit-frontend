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
        fontSize: 20,
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    headerCell: {
        width: '20%',
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    noCell: {
        width: '5%',
        margin: 5,
        fontSize: 10,
    },
    cell: {
        width: '20%',
        margin: 5,
        fontSize: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 20,
        fontWeight: 'bold',
    },
})

Font.register({
    family: 'Open Sans',
    src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
})

const RequestPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Permintaan</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.headerCell}>NIK</Text>
                    <Text style={styles.headerCell}>Nama</Text>
                    <Text style={styles.headerCell}>Pengajuan</Text>
                    <Text style={styles.headerCell}>Tanggal</Text>
                    <Text style={styles.headerCell}>Status</Text>
                    <Text style={styles.headerCell}>Keterangan</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.cell}>
                            {row?.employee?.employee_nik}
                        </Text>
                        <Text style={styles.cell}>{row?.employee?.name}</Text>
                        <Text style={styles.cell}>{row?.request_name}</Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.request_date).format('DD-MM-YYYY')}
                        </Text>
                        <Text style={styles.cell}>{row?.status}</Text>
                        <Text style={styles.cell}>
                            {row?.request_information}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default RequestPDF
