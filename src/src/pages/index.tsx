import { useGlobalContext } from '../contexts/global';
import { SendForgotPasswordEmail } from './SendForgotPasswordEmail';
import { ChangePassword } from './ChangePassword';
import { Dashboard } from './Dashboard';
import { SignUp } from './SignUp';
import { Login } from './Login';

export const PagesProvider = () => {
  const { currentPage } = useGlobalContext();

  if (currentPage === 'dashboard') return <Dashboard />;
  if (currentPage === 'signup') return <SignUp />;
  if (currentPage === 'sendForgotPasswordEmail') return <SendForgotPasswordEmail />;
  if (currentPage === 'changePassword') return <ChangePassword />;

  return <Login />;
}