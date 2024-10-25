import { DataTable } from "@/components";
import { columns } from "./columns";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMasterUser } from "../service";

const TableMasterUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getMasterUser());
  }, [dispatch]);

  const selectorMasterUser = useAppSelector(
    (state) => state.dataMaster.masterUser.getMasterUser
  );

  // console.log(selectorMasterUser);
  return (
    <DataTable
      columns={columns}
      data={selectorMasterUser.data}
      titleButton="Tambah Data User"
      total={selectorMasterUser.meta.total}
      page={selectorMasterUser.meta.page}
      limit={selectorMasterUser.meta.limit}
      onPageChange={(page, limit) =>
        dispatch(
          getMasterUser({
            limit: limit,
            page: page,
            total: selectorMasterUser.data.length
          })
        )
      }
    />
  );
};

export default TableMasterUser;
