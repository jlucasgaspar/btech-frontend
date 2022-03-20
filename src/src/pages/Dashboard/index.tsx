import { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { useGlobalContext } from '../../contexts/global';
import { useUserContext } from '../../contexts/user';
import { makeHttpRequest } from '../../services/api';
import { User } from '../../models';
import { ProjectsAndTasksList } from './ProjectsAndTasksList';
import DashboardContextProvider from './context';

export const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const { setCurrentPage } = useGlobalContext();
  const { setUser } = useUserContext();

  useEffect(() => {
    setLoading(true);

    const jwtExists = localStorage.getItem('bolttech::jwt');
    if (!jwtExists) {
      setCurrentPage('login');
      setLoading(false);
      return;
    }

    makeHttpRequest<User>('get', '/users/me')
      .then(res => {
        if (res.type === 'fail') setCurrentPage('login');
        else setUser(res.data);
      })
      .finally(() => setLoading(false));
  }, [setCurrentPage, setUser]);

  if (isLoading) return <></>;
  return (
    <DashboardContextProvider>
      <Navbar />
      <ProjectsAndTasksList />
    </DashboardContextProvider>
  );
}