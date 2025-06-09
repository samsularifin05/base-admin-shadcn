import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/reduxStore';
import { validLoginSchema } from '../validate';
import { Button, FormNameProvider, RenderField, cn } from '@/components';
import { serviceLogin } from '../redux';
import { useForm } from 'react-hook-form';
import { FormLoginDto, intitalFormLogin } from '../dto';

const FormLogin = () => {
  const dispatch = useAppDispatch();
  const utility = useAppSelector((state) => state.utility);
  const service = serviceLogin();

  const { control, handleSubmit } = useForm<FormLoginDto>({
    resolver: yupResolver(validLoginSchema),
    defaultValues: intitalFormLogin
  });

  const onSubmit = () => {
    dispatch(service.login());
  };

  return (
    <FormNameProvider
      formName="LoginForm"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2"
    >
      <div className={cn('grid gap-6')}>
        <RenderField
          control={control}
          label="Email"
          placeholder="Masukan Email"
          name="email"
        />
        <RenderField
          control={control}
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
    </FormNameProvider>
  );
};

export default FormLogin;
