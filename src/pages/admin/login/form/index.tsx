import { useAppDispatch, useAppSelector } from '@/reduxStore';
import { validLoginSchema } from '../validate';
import { FormPanel, RenderField, cn } from '@/components';
import { serviceLogin } from '../redux';
import { Button } from '@/components/custom/button';

const FormLogin = () => {
  const utility = useAppSelector((state) => state.utility);
  const dispatch = useAppDispatch();
  const service = serviceLogin();

  const handleSubmit = () => {
    dispatch(service.login());
  };

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
