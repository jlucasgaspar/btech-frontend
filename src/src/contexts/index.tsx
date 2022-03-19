import { ReactNode } from 'react';
import UserContextProvider from './user';
import GlobalContextProvider from './global';

type Props = {
  children: ReactNode;
}

export const ContextProvider = ({ children }: Props) => (
  <GlobalContextProvider>
    <UserContextProvider>
      {children}
    </UserContextProvider>
  </GlobalContextProvider>
);