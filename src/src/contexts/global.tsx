import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type Pages = 'login' | 'signup' | 'dashboard';

type CtxState = {
  currentPage: Pages;
  setCurrentPage: Dispatch<SetStateAction<Pages>>
}

type Props = {
  children: ReactNode;
}

const Ctx = createContext<CtxState>({} as CtxState);

const GlobalContextProvider = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState<Pages>('login');

  return (
    <Ctx.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </Ctx.Provider>
  );
}

export default GlobalContextProvider;

export const useGlobalContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error('"useGlobalContext()" must be called inside <GlobalContextProvider /> component.');
  }
  return context;
}