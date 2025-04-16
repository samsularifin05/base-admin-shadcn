import { useAppDispatch, useAppSelector } from '@/reduxStore';
import { validLoginSchema } from '../validate';
import { FormPanel, RenderField, cn } from '@/components';
import { serviceLogin } from '../redux';
import { Button } from '@/components/custom/button';

const ExampleForm = () => {
  const utility = useAppSelector((state) => state.utility);
  const intitalFormLogin = useAppSelector((state) => state.form.LoginForm);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const service = serviceLogin();

  const handleSubmit = () => {
    dispatch(service.login());
  };

  if (theme.getIsLogin) {
    return <Navigate to={'/admin/dashboard'} />;
  }

  return (
    <div className={cn('grid gap-6')}>
      <FormPanel
        formName={'LoginForm'}
        onSubmit={handleSubmit}
        validate={validLoginSchema}
        initialValues={intitalFormLogin}
      >
        {({ form, fieldArrays }) => {
          const { hadiah, produk } = fieldArrays;

          return (
            <>
              <div className="grid gap-2">
                <RenderField
                  control={form.control}
                  label="Email"
                  placeholder="Masukan Email"
                  name="email"
                />
                <RenderField
                  control={form.control}
                  label="Password"
                  placeholder="Masukan Password"
                  name="password"
                  hiddenText
                />

                {/* Loop Hadiah */}
                {hadiah?.fields.map((_field, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <div className="flex-1">
                      <RenderField
                        control={form.control}
                        label={`Hadiah ${index + 1}`}
                        placeholder="Masukkan Hadiah"
                        name={`hadiah.${index}.nama`}
                      />
                    </div>
                    <div className="flex-1">
                      <RenderField
                        control={form.control}
                        label={`Nilai Hadiah ${index + 1}`}
                        placeholder="Masukkan Nilai"
                        name={`hadiah.${index}.nilai`}
                        type="number"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => hadiah.remove(index)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => hadiah.append({ nama: '', jumlah: 0 })}
                >
                  Tambah Hadiah
                </Button>

                {/* Loop Produk */}
                {produk?.fields.map((_field, index) => (
                  <div key={index} className="flex items-end gap-2 mt-2">
                    <div className="flex-1">
                      <RenderField
                        control={form.control}
                        label={`Produk ${index + 1}`}
                        placeholder="Masukkan Produk"
                        name={`produk.${index}.nama`}
                      />
                    </div>
                    <div className="flex-1">
                      <RenderField
                        control={form.control}
                        label={`Jumlah Produk ${index + 1}`}
                        placeholder="Masukkan Jumlah"
                        name={`produk.${index}.jumlah`}
                        type="number"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => produk.remove(index)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => produk.append({ nama: '', jumlah: 0 })}
                >
                  Tambah Produk
                </Button>

                <Button
                  type="submit"
                  className="mt-4"
                  loading={utility.getLoading.button}
                >
                  Login
                </Button>
              </div>
            </>
          );
        }}
      </FormPanel>
    </div>
  );
};

export default ExampleForm;
