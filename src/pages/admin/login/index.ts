import { lazy } from 'react';
import { FormLoginDto, intitalFormLogin } from './dto';

const LoginForm = lazy(() => import('./loginForm'));
export { LoginForm, intitalFormLogin };
export type { FormLoginDto };
