import { ModalGlobal, PanelAdmin } from '@/components';
import FormMasterBank from './form';
import { useAppSelector } from '@/reduxStore';
import TableMasterBank from './table';

const MasterBank = () => {
  const modal = useAppSelector((state) => state.utility.getModal);

  return (
    <PanelAdmin>
      <TableMasterBank />
      <ModalGlobal
        formName="MasterBank"
        title={`${modal.isEdit ? 'Edit' : 'Tambah'} Data`}
      >
        <FormMasterBank />
      </ModalGlobal>
    </PanelAdmin>
  );
};

export default MasterBank;
