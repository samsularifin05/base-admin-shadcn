import { ColumnGenarator, ExportData } from 'exportdatafile';

const Normal = () => {
  interface FakturHutang {
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
  const data: FakturHutang[] = [
    {
      kode_barcode: '0210293011',
      diskon: 'RP',
      tgl_system: '2022-01-01',
      harga: 50000,
      berat: 1,
      berat_2: 1.2,
      berat_3: 2.5,
      qty: 2,
      total: 10000,
      input_by: 'Ujang'
    },
    {
      kode_barcode: '0210293012',
      diskon: '%',
      tgl_system: '2022-01-01',
      harga: 10000,
      berat: 2.2,
      berat_2: 2.2,
      berat_3: 2.2,
      qty: 5,
      total: 20000,
      input_by: 'Samsul'
    }
  ];

  const columns: ColumnGenarator<FakturHutang>[] = [
    {
      label: 'Tanggal',
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
            halign: 'center',
            valign: 'middle'
          }
        },
        {
          label: 'Berat 2',
          key: 'berat',
          options: {
            format: 'GR',
            halign: 'center',
            valign: 'middle'
          }
        },
        {
          label: 'Berat V2',
          key: 'berat_2',
          options: {
            format: 'GR',
            halign: 'center',
            valign: 'middle'
          }
        }
      ]
    },
    {
      label: 'Diskon',
      key: 'diskon',
      options: {
        halign: 'center',
        valign: 'middle',
        format: ''
      }
    },
    {
      label: 'Harga',
      key: 'harga',
      options: {
        format: 'RP',
        halign: 'center',
        valign: 'middle'
      }
    },
    {
      label: 'Berat 3',
      key: 'berat_3',
      options: {
        format: 'GR',
        halign: 'center',
        valign: 'middle'
      }
    },
    {
      label: 'Total',
      key: 'total',
      options: {
        format: 'RP',
        halign: 'center',
        valign: 'middle'
      }
    }
  ];

  return (
    <div>
      <button
        onClick={() =>
          ExportData({
            type: ['EXCEL'],
            date: {
              start_date: '11-01-2024',
              end_date: '11-01-2024'
            },
            data: data,
            columns: columns,
            grouping: [],
            title: 'LAPORAN PDF EXCEL',

            excelSetting: {
              bgColor: 'E8E5E5',
              txtColor: '000',
              additionalTextHeader: 'Nama Toko \nAlamat Toko',
              grandTotalSetting: {
                colSpan: 0
              },
              customize: (worksheet) => {
                // Menambahkan penyesuaian pada worksheet
                const rows = worksheet.addRow([]);

                rows.getCell(1).value = 'Text';
                rows.getCell(1).alignment = { horizontal: 'center' };

                // Menggabungkan sel dari kolom A hingga kolom terakhir yang tidak terpakai pada baris tanggal
                worksheet.mergeCells(
                  `A${rows.number}:${String.fromCharCode(64)}${rows.number}`
                );
                rows.eachCell((cell) => {
                  cell.font = {
                    color: { argb: '00000' },
                    bold: true,
                    size: 12
                  };
                }); // Menyesuaikan lebar kolom C
              }
            },
            txtSetting: {
              dataTxt: data[0],
              titleTxt: 'NORMAL',
              copy: true,
              templateTxt: `--------------- SLIP ---------------\nFaktur         = {no_faktur_hutang}\nDiskon         = {diskon}\nTanggal System = {tgl_system}\nHarga          = {harga}\nBerat          = {berat}\nTotal          = {total}\nInput_by       = {input_by}`
            },
            pdfSetting: {
              titlePdf: 'Example Pdf',
              textHeaderLeft: 'Nama Toko \nAlamat Toko',
              orientation: 'l',
              unit: 'mm',
              bgColor: 'E8E5E5',
              txtColor: '000',
              theme: 'grid',
              openNewTab: false,
              addRow(tableRows) {
                if (tableRows) {
                  tableRows.push([
                    {
                      content: `Example Add Row Last `,
                      colSpan: 8,
                      styles: {
                        textColor: '#000',
                        fillColor: '#E8E5E5',
                        fontStyle: 'bold',
                        halign: 'center'
                      }
                    }
                  ]);
                }
              },

              customize: (doc, finalY, autoTable) => {
                doc.text('Custom Jspdf', 15, finalY + 20);
                if (autoTable) {
                  autoTable(doc, {
                    startY: finalY + 25,
                    head: [['Column 1', 'Column 2']],
                    body: [
                      ['Data 1', 'Data 2'],
                      ['Data 3', 'Data 4']
                    ]
                  });
                }
              }
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
        Export Data No Grouping
      </button>
    </div>
  );
};

export default Normal;
