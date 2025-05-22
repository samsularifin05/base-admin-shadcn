import { ColumnGenarator, ExportData } from 'exportdatafile';

const Grouping = () => {
  interface detailBarang {
    kode_barcode: string;
    tgl_system: string;
    harga: number;
    berat: number;
    berat_2: number;
    berat_3: number;
    total: number;
    qty: number;
    diskon: string;
    input_by: string;
  }
  interface FakturHutang {
    no_faktur_hutang: string;
    nama_sales: string;
    detail: detailBarang[];
  }
  const data: FakturHutang[] = [
    {
      no_faktur_hutang: '001',
      nama_sales: 'UJANG',
      detail: [
        {
          kode_barcode: '0210293011',
          diskon: 'rp',
          tgl_system: '2022-01-01',
          harga: 10000,
          berat: 2,
          berat_2: 2,
          berat_3: 2,
          qty: 1,
          total: 20000,
          input_by: 'Samsul'
        }
      ]
    },
    {
      no_faktur_hutang: '001',
      nama_sales: 'David',
      detail: [
        {
          kode_barcode: '0001293011',
          diskon: 'rp',
          tgl_system: '2022-01-01',
          harga: 10000,
          qty: 2,
          berat: 2,
          berat_2: 2,
          berat_3: 2,
          total: 20000,
          input_by: 'Samsul'
        },
        {
          kode_barcode: '0001293012',
          diskon: '%',
          tgl_system: '2022-01-01',
          harga: 14000,
          qty: 1,
          berat: 2.2,
          berat_2: 2.4,
          berat_3: 2.2,
          total: 10000,
          input_by: 'Samsul'
        }
      ]
    }
  ];

  const columns: ColumnGenarator<detailBarang>[] = [
    {
      label: 'Tanngal',
      key: 'tgl_system',
      options: {
        halign: 'center',
        valign: 'middle'
      }
    },

    {
      label: 'Stock',
      key: 'qty',
      options: {
        halign: 'center'
      },
      child: [
        {
          label: 'Qty',
          key: 'qty',
          options: {
            format: 'NUMBER',
            halign: 'center'
          }
        },
        {
          label: 'Berat',
          key: 'berat',
          options: {
            format: 'GR',
            halign: 'center'
          }
        },
        {
          label: 'Berat V2',
          key: 'berat_2',
          options: {
            format: 'GR',
            halign: 'center'
          }
        }
      ]
    },
    {
      label: 'Diskon',
      key: 'diskon',
      options: {
        halign: 'center',
        format: ''
      }
    },
    {
      label: 'Harga',
      key: 'harga',
      options: {
        format: 'RP'
      }
    },
    {
      label: 'Berat',
      key: 'berat_3',
      options: {
        format: 'GR'
      }
    },

    {
      label: 'Total',
      key: 'total',
      options: {
        format: 'RP'
      }
    }
  ];
  return (
    <div>
      <button
        onClick={() =>
          ExportData({
            type: ['PDF', 'EXCEL'],
            date: {
              start_date: '11-01-2024',
              end_date: '11-01-2024'
            },
            data: data,
            columns: columns,
            grouping: ['no_faktur_hutang', 'nama_sales'],
            title: 'LAPORAN PDF EXCEL GROUPING',
            excelSetting: {
              bgColor: 'E8E5E5',
              txtColor: '000',
              additionalTextHeader: 'Nama Toko \nAlamat Toko',
              grandTotalSetting: {
                colSpan: 0
              }
            },
            txtSetting: {
              dataTxt: data[0],
              titleTxt: 'GROUPING',
              templateTxt: `---------------- SLIP -----------------\nFaktur = {no_faktur_hutang}\n---------------------------------------\n
!!LOOP(detail){
Kode Barcode   =  {kode_barcode}
Diskon         = {diskon}
Tanggal System = {tgl_system}
Harga          = {harga}
Berat          = {berat}
Total          = {total}
Input_by       = {input_by}
}
              
              `
            },
            pdfSetting: {
              textHeaderLeft: 'Nama Toko \nAlamat Toko',
              orientation: 'l',
              unit: 'mm',
              bgColor: 'E8E5E5',
              txtColor: '000',
              theme: 'grid',
              grandTotalSetting: {
                colSpan: 0
              },
              openNewTab: false
            },
            footerSetting: {
              subTotal: {
                caption: 'SUB TOTAL',
                enableCount: true,
                captionItem: 'QTY'
              },
              grandTotal: {
                caption: 'GRAND TOTAL',
                enableCount: true,
                captionItem: 'QTY'
              }
            }
          })
        }
      >
        Export Data Grouping
      </button>
    </div>
  );
};

export default Grouping;
