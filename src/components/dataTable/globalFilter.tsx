import { Input } from "@/components"; // Pastikan Anda menggunakan Input dari komponen Anda
import { Table } from "@tanstack/react-table"; // Pastikan Anda menggunakan Table dari react-table

interface GlobalFilterProps<TData> {
  table: Table<TData>;
}

export function GlobalFilter<TData>({ table }: GlobalFilterProps<TData>) {
  return (
    <Input
      placeholder="Filter all columns..."
      value={table.getState().globalFilter || ""}
      onChange={(event) => table.setGlobalFilter(event.target.value)}
      className="max-w-sm"
    />
  );
}
