/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components';
import { ResponseMasterBankDto } from '../../model';
import { MoreHorizontal } from 'lucide-react';
import { utilityActions, useAppDispatch, formActions } from '@/reduxStore';
import { deleteMasterBankById } from '../../service';

export const columns: ColumnDef<ResponseMasterBankDto>[] = [
  {
    header: 'No',
    cell: ({ row }) => {
      return row.index + 1;
    }
  },
  {
    accessorKey: 'nomor_akun',
    header: 'Nomor Akun'
  },
  {
    accessorKey: 'kode_bank',
    header: 'Kode Bank'
  },
  {
    accessorKey: 'nama_bank',
    header: 'Nama Bank'
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  utilityActions.showModal({
                    isModalShow: true,
                    isEdit: true
                  })
                );
                dispatch(
                  formActions.setValue({
                    form: 'MasterBank',
                    values: row.original
                  })
                );
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => dispatch(deleteMasterBankById(row.original._id))}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
