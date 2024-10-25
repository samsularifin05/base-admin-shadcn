import { Button, FormPanel, RenderField } from "@/components";
import React from "react";
import { validateMasterUser } from "../validate";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/reduxStore";
import { serviceMasterUser } from "../service";
import { IMasterUserResponseDto } from "../dto";

const FormMasterUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const service = serviceMasterUser();

  const formValues = useAppSelector((state) => state.utility.getModal);

  return (
    <FormPanel
      formName="FormMasterUser"
      validate={validateMasterUser}
      initialValues={formValues.data as IMasterUserResponseDto}
      onSubmit={() => dispatch(service.save())}
    >
      {({ form }) => (
        <React.Fragment>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <RenderField
              control={form.control}
              label="Nama Lengkap"
              placeholder="Masukkan Nama Lengkap"
              name="nama_lengkap"
            />
            <RenderField
              control={form.control}
              label="Username"
              placeholder="Masukkan Username"
              name="username"
            />
            <RenderField
              control={form.control}
              label="No Hp"
              placeholder="Masukkan No Hp"
              name="no_hp"
            />

            <div className="mt-7">
              <Button size={"lg"} className="w-full">
                Simpan
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </FormPanel>
  );
};

export default FormMasterUser;
