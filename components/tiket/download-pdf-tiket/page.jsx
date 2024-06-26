import {
    Document,
    Page,
    Image as PDFImage,
    View,
    Text,
    Font,
    StyleSheet,
} from '@react-pdf/renderer'

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
        width: '25%',
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
        width: '25%',
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

const TicketDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Tiket</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.nameHeaderCell}>Nama</Text>
                    <Text style={styles.nameHeaderCell}>Kode</Text>
                    <Text style={styles.nameHeaderCell}>Judul</Text>
                    <Text style={styles.nameHeaderCell}>Status</Text>
                    <Text style={styles.nameHeaderCell}>Prioritas</Text>
                    <Text style={styles.headerCell}>Deskripsi</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.nameCell}>
                            {row?.employee?.name}
                        </Text>
                        <Text style={styles.cell}>{row?.ticket_code}</Text>
                        <Text style={styles.cell}>{row?.ticket_title}</Text>
                        <Text style={styles.cell}>
                            {row?.ticket_status == 1
                                ? 'Open'
                                : row?.ticket_status == 2
                                  ? 'Closed'
                                  : 'Pending'}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.ticket_priority == 1
                                ? 'Rendah'
                                : row?.ticket_priority == 2
                                  ? 'Sedang'
                                  : 'Tinggi'}
                        </Text>
                        <Text style={styles.cell}>
                            {row?.ticket_description}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default TicketDocument
