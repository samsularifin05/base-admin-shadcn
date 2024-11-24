import { DataTable } from '@/components';
import { columns } from './column';
import { AppDispatch, useAppSelector } from '@/reduxStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMasterBank } from '../../service';

const TableMasterBank = () => {
  const dispatch = useDispatch<AppDispatch>();

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
