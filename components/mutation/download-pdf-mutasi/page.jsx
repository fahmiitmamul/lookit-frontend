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
        fontSize: 8,
        fontWeight: 'bold',
    },
    headerCell: {
        width: '20%',
        margin: 5,
        fontSize: 8,
        fontWeight: 'bold',
    },
    noCell: {
        width: '5%',
        margin: 5,
        fontSize: 8,
    },
    cell: {
        width: '20%',
        margin: 5,
        fontSize: 8,
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

const MutationDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Mutasi</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.headerCell}>NIK</Text>
                    <Text style={styles.headerCell}>Nama</Text>
                    <Text style={styles.headerCell}>Jabatan</Text>
                    <Text style={styles.headerCell}>Tanggal</Text>
                    <Text style={styles.headerCell}>Posisi Sebelum</Text>
                    <Text style={styles.headerCell}>Posisi Sesudah</Text>
                    <Text style={styles.headerCell}>Deskripsi</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.cell}>
                            {row?.employee?.employee_nik}
                        </Text>
                        <Text style={styles.cell}>{row?.employee?.name}</Text>
                        <Text style={styles.cell}>
                            {row?.employee?.position?.position_name}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row.date_applied).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.last_position?.position_name}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.employee?.position?.position_name}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.mutation_description} Hari
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default MutationDocument
