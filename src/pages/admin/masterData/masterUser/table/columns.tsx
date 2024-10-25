import { Button, Checkbox, DataTableColumnHeader } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@components";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { IMasterUserResponseDto } from "../dto";
import { useDispatch } from "react-redux";
import { AppDispatch, utilityActions } from "@/reduxStore";

const ActionsCell: React.FC<{ user: IMasterUserResponseDto }> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigator.clipboard.writeText(user._id)}
        >
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          View customer
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            dispatch(
              utilityActions.showModal({
                data: user,
                isEdit: true,
                isModalShow: true,
                namaForm: "FormMasterUser"
              })
            )
          }
        >
          View user details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<IMasterUserResponseDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          disabled={!row.getCanSelect()}
        />
      );
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "nama_lengkap",
    header: "Nama Lengkap"
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    }
  },
  {
    accessorKey: "no_hp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Hp" />
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell user={row.original} />
  }
];
