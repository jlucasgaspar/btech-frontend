import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type CtxState = {
  projectModalType?: 'create' | 'update';
  setProjectModalType: Dispatch<SetStateAction<'create' | 'update' | undefined>>;
  selectedProjectId: string;
  setSelectedProjectId: Dispatch<SetStateAction<string>>;
}

type Props = {
  children: ReactNode;
}

const Ctx = createContext<CtxState>({} as CtxState);

const DashboardContextProvider = ({ children }: Props) => {
  const [projectModalType, setProjectModalType] = useState<'create' | 'update'>();
  const [selectedProjectId, setSelectedProjectId] = useState('');

  return (
    <Ctx.Provider value={{
      projectModalType, setProjectModalType,
      selectedProjectId, setSelectedProjectId
    }}>
      {children}
    </Ctx.Provider>
  );
}

export default DashboardContextProvider;

export const useDashboardContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error('"useDashboardContext()" must be called inside <DashboardContextProvider /> component.');
  }
  return context;
}