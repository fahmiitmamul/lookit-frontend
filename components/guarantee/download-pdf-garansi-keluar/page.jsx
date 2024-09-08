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

const OutgoingGuaranteeDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Garansi</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.nameHeaderCell}>Nama </Text>
                    <Text style={styles.nameHeaderCell}>Jabatan</Text>
                    <Text style={styles.nameHeaderCell}>Nama Garansi</Text>
                    <Text style={styles.headerCell}>Tipe</Text>
                    <Text style={styles.headerCell}>Tanggal Keluar</Text>
                    <Text style={styles.headerCell}>Deskripsi</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.nameCell}>
                            {row?.employee?.name}
                        </Text>
                        <Text style={styles.nameCell}>
                            {row?.employee?.position?.position_name}
                        </Text>
                        <Text style={styles.nameCell}>
                            {row?.guarantee_name}
                        </Text>
                        <Text style={styles.cell}>{row?.guarantee_type}</Text>
                        <Text style={styles.cell}>{row?.out_date}</Text>
                        <Text style={styles.cell}>
                            {row?.guarantee_description}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default OutgoingGuaranteeDocument
