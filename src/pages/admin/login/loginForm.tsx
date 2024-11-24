import ViteLogo from '@/assets/react.svg';
import FormLogin from './form';

const LoginForm = () => {
  document.title = 'Login';

  console.log('MASUK');
  return (
    <div className="container relative grid flex-col items-center justify-center h-svh lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 mr-2"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Shadcn Admin
        </div>

        <img
          src={ViteLogo}
          className="relative m-auto"
          width={301}
          height={60}
          alt="Vite"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          </div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
