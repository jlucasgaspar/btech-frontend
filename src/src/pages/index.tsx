import { useGlobalContext } from '../contexts/global';
import { Dashboard } from './Dashboard';
import { SignUp } from './SignUp';
import { Login } from './Login';

export const PagesProvider = () => {
  const { currentPage } = useGlobalContext();

  if (currentPage === 'dashboard') return <Dashboard />;
  if (currentPage === 'signup') return <SignUp />

  return <Login />;
}