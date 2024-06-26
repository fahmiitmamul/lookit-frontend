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
    nameHeaderCell: {
        width: '35%',
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold',
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
    nameCell: {
        width: '35%',
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

const PresencePDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Kehadiran</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.nameHeaderCell}>Nama</Text>
                    <Text style={styles.headerCell}>Jadwal</Text>
                    <Text style={styles.headerCell}>Tanggal</Text>
                    <Text style={styles.headerCell}>Jam Masuk</Text>
                    <Text style={styles.headerCell}>Jam Pulang</Text>
                    <Text style={styles.headerCell}>Total Jam</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.nameCell}>
                            {row?.employee?.name}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.shift?.shift_name}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.start).format('DD-MM-YYYY')}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.start_time === '' ? '-' : row?.start_time}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.end_time === '' ? '-' : row?.end_time}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.total_time === '' ? '-' : row?.total_time}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default PresencePDF
