import DataTable from '@/components/dataTable/dataTable';
import { columns } from './column';
import { useAppSelector, useAppDispatch } from '@/reduxStore';
import { getMasterBank } from '../../service';

const TableMasterBank = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMasterBank());
  }, [dispatch]);

  const selectorMasterBank = useAppSelector(
    (state) => state.masterBank.getMasterBank
  );

  return (
    <DataTable
      columns={columns}
      data={selectorMasterBank.data || []}
      titleButton="Tambah Master Bank"
      total={selectorMasterBank.meta.total}
      page={selectorMasterBank.meta.page}
      limit={selectorMasterBank.meta.limit}
      onPageChange={() => dispatch(getMasterBank())}
    />
  );
};

export default TableMasterBank;
