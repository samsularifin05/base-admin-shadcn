import { formActions, useAppDispatch, useAppSelector } from '@/reduxStore';
import { validLoginSchema } from '../validate';
import {
  FormPanel,
  Button,
  RenderField,
  cn,
  RenderFileUpload
} from '@/components';
import { serviceLogin } from '../redux';

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const service = serviceLogin();

  const handleSubmit = () => {
    dispatch(service.login());
  };

  useEffect(() => {
    dispatch(
      formActions.setValue({
        form: 'LoginForm',
        values: {
          email: 'admin@gmail.com',
          password: 'admin1234',
          tanggalPastiKeberangkatan: '2025-01-07'
        }
      })
    );
  }, [dispatch]);

  if (theme.getIsLogin) {
    return <Navigate to={'/admin/dashboard'} />;
  }

  return (
    <div className={cn('grid gap-6')}>
      <FormPanel
        formName={'LoginForm'}
        onSubmit={handleSubmit}
        validate={validLoginSchema}
      >
        {({ form }) => (
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
              <RenderField
                control={form.control}
                label="Tanggal Pasti Keberangkatan Tubel"
                name="tanggalPastiKeberangkatan"
                type="date"
                tabIndex={17}
              />

              <RenderFileUpload
                control={form.control}
                label=""
                tabIndex={15}
                name="curriculumnVitae"
              />

              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default FormLogin;
