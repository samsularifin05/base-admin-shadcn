import { DataTable, ModalGlobal, PanelAdmin } from "@/components";
import { Payment, columns } from "./columns";

const MasterData = () => {
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
    <PanelAdmin>
      <DataTable columns={columns} data={data} titleButton="Tambah Data User" />
      <ModalGlobal title="Hai">Hai</ModalGlobal>
    </PanelAdmin>
  );
};

export default MasterData;
