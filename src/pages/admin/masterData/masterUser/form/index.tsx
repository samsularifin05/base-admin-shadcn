import { Button, FormPanel, RenderField } from "@/components";
import { validateMasterUser } from "../validate";
import { FormAddUser, intitalFormUserData } from "../dto";

const FormMasterUser = () => {
  const onSubmit = () => {};

  return (
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
              Simpan
            </Button>
          </div>
        </>
      )}
    </FormPanel>
  );
};

export default FormMasterUser;
