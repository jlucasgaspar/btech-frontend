import { ReactNode } from 'react';
import UserContextProvider from './user';
import ProjectsAndTasksContextProvider from './projects-tasks';
import GlobalContextProvider from './global';

type Props = {
  children: ReactNode;
}

export const ContextProvider = ({ children }: Props) => (
  <GlobalContextProvider>
    <UserContextProvider>
      <ProjectsAndTasksContextProvider>
        {children}
      </ProjectsAndTasksContextProvider>
    </UserContextProvider>
  </GlobalContextProvider>
);