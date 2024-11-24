/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components';
import { ResponseMasterBankDto } from '../../model';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch, utilityActions } from '@/reduxStore';
import { deleteMasterBankById } from '../../service';

export const columns: ColumnDef<ResponseMasterBankDto>[] = [
  {
    header: 'No',
    cell: ({ row }) => {
      return row.index + 1;
    }
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
      const dispatch = useDispatch<AppDispatch>();
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
              onClick={() =>
                dispatch(
                  utilityActions.showModal({
                    isModalShow: true,
                    isEdit: true,
                    data: row.original,
                    namaForm: ''
                  })
                )
              }
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
