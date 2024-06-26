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

const CostPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.headerText}>Data Biaya</Text>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.noHeaderCell}>No</Text>
                    <Text style={styles.headerCell}>Nama</Text>
                    <Text style={styles.headerCell}>Jenis</Text>
                    <Text style={styles.headerCell}>Nilai</Text>
                    <Text style={styles.headerCell}>Pajak</Text>
                    <Text style={styles.headerCell}>Nilai Pajak</Text>
                    <Text style={styles.headerCell}>Jml Total</Text>
                    <Text style={styles.headerCell}>Tgl Bayar</Text>
                    <Text style={styles.headerCell}>Status</Text>
                    <Text style={styles.headerCell}>Jenis Bayar</Text>
                </View>
                {data?.map((row, index) => (
                    <View style={styles.row} key={row.id}>
                        <Text style={styles.noCell}>{index + 1}</Text>
                        <Text style={styles.cell}>{row?.cost_name}</Text>
                        <Text style={styles.cell}>{row?.cost_type}</Text>
                        <Text style={styles.cell}>{row?.cost_value}</Text>
                        <Text style={styles.cell}>
                            {row?.cost_tax_percentage + '%'}
                        </Text>
                        <Text style={styles.cell}>
                            {' '}
                            {`Rp${row.cost_tax_result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                        </Text>
                        <Text style={styles.cell}>
                            {`Rp${row.cost_grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                        </Text>
                        <Text style={styles.cell}>
                            {dayjs(row?.cost_date).format('DD-MMMM-YYYY')}
                        </Text>
                        <Text style={styles.cell}>{row?.cost_status}</Text>
                        <Text style={styles.cell}>
                            {row?.cost_payment_type}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default CostPDF
