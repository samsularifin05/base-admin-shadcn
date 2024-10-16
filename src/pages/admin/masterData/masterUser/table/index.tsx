import { DataTable } from "@/components";
import { Payment, columns } from "./columns";

const TableMasterUser = () => {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com"
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com"
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      titleButton="Tambah Data User"
      total={0}
      page={0}
      limit={0}
      onPageChange={() => console.log()}
    />
  );
};

export default TableMasterUser;
