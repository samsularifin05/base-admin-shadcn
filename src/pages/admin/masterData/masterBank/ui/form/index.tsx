import { FormPanel, RenderField } from '@/components';
import { Button } from '@/components/custom/button';
import { useAppSelector, useAppDispatch } from '@/reduxStore';
import { validateMasterBank } from '../validate';
import { saveMasterBank, updateMasterBankById } from '../../service';
import { RequestMasterBankDto } from '../../model';

const MasterBank = () => {
  const utility = useAppSelector((state) => state.utility);
  const formValues = utility.getModal.data as RequestMasterBankDto;
  const dispatch = useAppDispatch();
  function onSubmit() {
    if (utility.getModal.isEdit) {
      dispatch(updateMasterBankById());
    } else {
      dispatch(saveMasterBank());
    }
  }

  return (
    <div className={'grid gap-6'}>
      <FormPanel
        formName={'MasterBank'}
        onSubmit={onSubmit}
        validate={validateMasterBank}
        initialValues={formValues}
      >
        {({ form }) => (
          <>
            <div className="grid gap-2">
              <RenderField
                control={form.control}
                tabIndex={0}
                label=" Id"
                placeholder="Masukkan  Id"
                name="_id"
                type="hidden"
              />

              <RenderField
                control={form.control}
                tabIndex={1}
                label="Nomor Akun"
                readOnly={utility.getModal.isEdit ? true : false}
                placeholder="Masukkan Nomor Akun"
                name="nomor_akun"
                type="text"
              />

              <RenderField
                control={form.control}
                tabIndex={2}
                label="Kode Bank"
                readOnly={utility.getModal.isEdit ? true : false}
                placeholder="Masukkan Kode Bank"
                name="kode_bank"
                type="text"
              />

              <RenderField
                control={form.control}
                tabIndex={3}
                label="Nama Bank"
                placeholder="Masukkan Nama Bank"
                name="nama_bank"
                type="text"
              />

              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default MasterBank;
