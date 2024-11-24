import { Button, FormPanel, RenderField } from '@/components';
import { AppDispatch, useAppSelector } from '@/reduxStore';
import { validateMasterBank } from '../validate';
import { saveMasterBank, updateMasterBankById } from '../../service';
import { useDispatch } from 'react-redux';
import { RequestMasterBankDto } from '../../model';

const MasterBank = () => {
  const utility = useAppSelector((state) => state.utility);
  const formValues = useAppSelector(
    (state) => state.utility.getModal.data
  ) as RequestMasterBankDto;
  const dispatch = useDispatch<AppDispatch>();
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
                label="Kode Bank"
                placeholder="Masukkan Kode Bank"
                name="kode_bank"
                type="text"
              />

              <RenderField
                control={form.control}
                tabIndex={2}
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
