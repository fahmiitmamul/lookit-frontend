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

const TicketDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Saldo Cuti</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.headerCell}>NIK</Text>
                    <Text style={styles.headerCell}>Nama</Text>
                    <Text style={styles.headerCell}>Jabatan</Text>
                    <Text style={styles.headerCell}>Status</Text>
                    <Text style={styles.headerCell}>Tipe Cuti</Text>
                    <Text style={styles.headerCell}>Saldo</Text>
                    <Text style={styles.headerCell}>Digunakan</Text>
                    <Text style={styles.headerCell}>Sisa</Text>
                    <Text style={styles.headerCell}>Periode Awal</Text>
                    <Text style={styles.headerCell}>Periode Akhir</Text>
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
                            {row?.employee?.employee_status}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.leave_type_master?.leave_type_name}
                        </Text>
                        <Text style={styles.cell}>{row?.leave_type} Hari</Text>
                        <Text style={styles.cell}>
                            {row?.used_leave_type} Hari
                        </Text>
                        <Text style={styles.cell}>
                            {row?.remaining_leave_type} Hari
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.initial_estimate).format(
                                'DD MMMM YYYY'
                            )}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.final_estimate).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.leave_type_description}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default TicketDocument
