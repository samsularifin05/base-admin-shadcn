import {
  Button,
  DataTable,
  FormPanel,
  ModalGlobal,
  PanelAdmin,
  RenderField
} from "@/components";
import { Payment, columns } from "./columns";

import { FormAddUser, intitalFormUserData } from "./dto";
import { validateMasterUser } from "./validate";

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

  const onSubmit = () => {};

  return (
    <PanelAdmin>
      <DataTable columns={columns} data={data} titleButton="Tambah Data User" />
      <ModalGlobal title="Tambah Data">
        <FormPanel
          formName={"LoginForm"}
          onSubmit={onSubmit}
          validate={validateMasterUser}
          intitalFormLogin={intitalFormUserData}
        >
          {({ form }) => (
            <>
              <div className="grid gap-2">
                <RenderField<FormAddUser>
                  control={form.control}
                  label="Nama Lengkap"
                  placeholder="Masukan Nama Lengkap"
                  name="nama_lengakp"
                />
                <RenderField<FormAddUser>
                  control={form.control}
                  label="Username"
                  placeholder="Masukan Username"
                  name="username"
                />
                <RenderField<FormAddUser>
                  control={form.control}
                  label="No Hp"
                  placeholder="Masukan No Hp"
                  name="no_hp"
                />

                <Button type="submit" className="mt-2">
                  Login
                </Button>
              </div>
            </>
          )}
        </FormPanel>
      </ModalGlobal>
    </PanelAdmin>
  );
};

export default MasterData;
