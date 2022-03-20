import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { useUserContext } from '../../contexts/user';
import { ProjectAndTasks } from '../../models';
import { makeHttpRequest } from '../../services/api';
import { Card } from '../../components/Card';

import { ModalCreateOrUpdateProject } from './ModalCreateOrUpdateProject';
import { generateTasksDoneText } from './utils';
import { ModalTasksList } from './ModalTasksList';
import { useDashboardContext } from './context';

export const ProjectsAndTasksList = () => {
  const [isLoading, setLoading] = useState(false);
  const [projectDefaultValue, setProjectDefaultValue] = useState('');
  const [selectedTasksModalIsOpen, setSelectedTasksModalIsOpen] = useState(false);
  const { projectsAndTasks, setProjectsAndTasks } = useProjectsAndTasksContext();
  const { user } = useUserContext();
  const {
    setProjectModalType, projectModalType, selectedProjectId, setSelectedProjectId
  } = useDashboardContext();

  useEffect(() => {
    setLoading(true);

    makeHttpRequest<ProjectAndTasks[]>('get', `/projects/${user._id}`)
      .then(res => {
        if (res.type === 'ok') {
          setProjectsAndTasks(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, [user._id, setProjectsAndTasks]);

  const handleDeleteProject = useCallback(async (projectId: string) => {
    setProjectsAndTasks(state => state.filter(_ => _._id !== projectId));

    setLoading(true);

    const result = await makeHttpRequest('delete', `/projects/${projectId}`);

    if (result.type === 'fail') {
      toast(result.error);
    }

    setLoading(false);
  }, [setProjectsAndTasks]);

  if (isLoading) return <></>;
  return (
    <Container>
      <ModalCreateOrUpdateProject
        defaultValue={projectDefaultValue}
        idForUpdate={selectedProjectId}
        isOpen={projectModalType !== undefined}
        onClose={() => setProjectModalType(undefined)}
      />

      <ModalTasksList
        isOpen={Boolean(selectedTasksModalIsOpen && selectedProjectId)}
        onClose={() => {
          setSelectedTasksModalIsOpen(false);
          setSelectedProjectId('');
        }}
      />

      {projectsAndTasks.map(({ _id, createdAt, name, tasks }) => (
        <Card
          key={_id}
          title={name}
          footerCreatedDateText={`Created: ${new Date(createdAt).toLocaleString('en-us')}`}
          footerTasksDoneText={generateTasksDoneText(tasks)}
          onDelete={() => handleDeleteProject(_id)}
          onPressCard={() => {
            setSelectedProjectId(_id);
            setSelectedTasksModalIsOpen(true);
          }}
          onUpdate={() => {
            setProjectDefaultValue(name);
            setSelectedProjectId(_id);
            setProjectModalType('update');
          }}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;