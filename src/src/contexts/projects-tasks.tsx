import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { ProjectAndTasks } from '../models';

type CtxState = {
  projectsAndTasks: ProjectAndTasks[];
  setProjectsAndTasks: Dispatch<SetStateAction<ProjectAndTasks[]>>;
}

type Props = {
  children: ReactNode;
}

const Ctx = createContext<CtxState>({} as CtxState);

const ProjectsAndTasksContextProvider = ({ children }: Props) => {
  const [projectsAndTasks, setProjectsAndTasks] = useState<ProjectAndTasks[]>([]);

  return (
    <Ctx.Provider value={{ projectsAndTasks, setProjectsAndTasks }}>
      {children}
    </Ctx.Provider>
  );
}

export default ProjectsAndTasksContextProvider;

export const useProjectsAndTasksContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error('"useProjectsAndTasksContext()" must be called inside <ProjectsAndTasksContextProvider /> component.');
  }
  return context;
}