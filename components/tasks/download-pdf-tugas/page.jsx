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
        textTransform: 'uppercase',
    },
    headerCell: {
        margin: 5,
        width: '25%',
        fontSize: 8,
        fontWeight: 'black',
        textTransform: 'uppercase',
    },
    noCell: {
        width: '5%',
        margin: 5,
        fontSize: 8,
    },
    cell: {
        margin: 5,
        width: '25%',
        fontSize: 8,
    },
})

Font.register({
    family: 'Open Sans',
    src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
})

const TasksPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Tugas</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.headerCell}>NIK</Text>
                    <Text style={styles.headerCell}>Nama</Text>
                    <Text style={styles.headerCell}>Jabatan</Text>
                    <Text style={styles.headerCell}>Judul</Text>
                    <Text style={styles.headerCell}>Mulai</Text>
                    <Text style={styles.headerCell}>Selesai</Text>
                    <Text style={styles.headerCell}>Prioritas</Text>
                    <Text style={styles.headerCell}>Status</Text>
                    <Text style={styles.headerCell}>Deskripsi</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.cell}>{row?.employee?.name}</Text>
                        <Text style={styles.cell}>
                            {row?.employee?.employee_nik}
                        </Text>
                        <Text style={styles.cell}>{row?.task_name}</Text>
                        <Text style={styles.cell}>
                            {row?.employee?.position?.position_name}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.task_start_date).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.task_end_date).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={styles.cell}>{row?.task_priority}</Text>
                        <Text style={styles.cell}>
                            {row?.task_status === 0
                                ? 'Proses'
                                : row?.task_status === 1
                                  ? 'Selesai'
                                  : row?.task_status === 2
                                    ? 'Batal'
                                    : null}
                        </Text>
                        <Text style={styles.cell}>{row?.task_description}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default TasksPDF
