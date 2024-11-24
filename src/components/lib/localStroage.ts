export interface LocalStorageItem<T> {
  nama: string;
  data: T;
}

export const getItem = <T>(nama: string): T => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(nama);

    if (item !== null) {
      const decryptedData = JSON.parse(item);
      return decryptedData as T;
    } else {
      return [] as T;
    }
  }
  return [] as T;
};

export const setItem = <T>(nama: string, data: T) => {
  if (typeof window !== "undefined") {
    const item: LocalStorageItem<T> = {
      nama: nama,
      data: data,
    };
    localStorage.setItem(item.nama, JSON.stringify(item.data));
  }
};

export const removeItem = (nama: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(nama);
  }
};
