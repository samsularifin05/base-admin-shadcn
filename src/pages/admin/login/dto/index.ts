// Tipe untuk setiap item hadiah
export interface Hadiah {
  nama: string;
  nilai: number;
}

// Tipe untuk setiap item produk
export interface Produk {
  nama: string;
  jumlah: number;
}

// Tipe untuk struktur tanggal
export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

// Tipe untuk FormLoginDto yang sudah diperbaharui
export interface FormLoginDto {
  email: string;
  password: string;
  hadiah: Hadiah[];
  produk: Produk[];
}

// Inisialisasi initialFormLogin dengan data sesuai tipe FormLoginDto
export const intitalFormLogin: FormLoginDto = {
  email: '',
  password: '',
  hadiah: [
    { nama: 'Hadiah 1', nilai: 1000 },
    { nama: 'Hadiah 2', nilai: 2000 }
  ],
  produk: [
    { nama: 'Produk A', jumlah: 1 },
    { nama: 'Produk B', jumlah: 2 }
  ]
};
