import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { User } from '../models';

type CtxState = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>
}

type Props = {
  children: ReactNode;
}

const Ctx = createContext<CtxState>({} as CtxState);

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({} as User);

  return (
    <Ctx.Provider value={{ user, setUser }}>
      {children}
    </Ctx.Provider>
  );
}

export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error('"useUserContext()" must be called inside <UserContextProvider /> component.');
  }
  return context;
}