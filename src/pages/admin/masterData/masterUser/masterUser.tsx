import { ModalGlobal, PanelAdmin } from "@/components";

import FormMasterUser from "./form";
import TableMasterUser from "./table";

const MasterData = () => {
  return (
    <PanelAdmin>
      <TableMasterUser />
      <ModalGlobal title="Tambah Data">
        <FormMasterUser />
      </ModalGlobal>
    </PanelAdmin>
  );
};

export default MasterData;
