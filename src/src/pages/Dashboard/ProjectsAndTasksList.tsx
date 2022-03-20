import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { useUserContext } from '../../contexts/user';
import { ProjectAndTasks } from '../../models';
import { makeHttpRequest } from '../../services/api';
import { Card } from '../../components/Card';
import { CreateProjectModal } from './CreateProjectModal';

export const ProjectsAndTasksList = () => {
  const [isLoading, setLoading] = useState(false);
  const [updateModalDefaultValue, setUpdateModalDefaultValue] = useState('');
  const [selectedProjectIdForUpdate, setSelectedProjectIdForUpdate] = useState('');
  const { projectsAndTasks, setProjectsAndTasks } = useProjectsAndTasksContext();
  const { user } = useUserContext();

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

  if (isLoading) return <></>;
  return (
    <Container>
      <CreateProjectModal
        isOpen={Boolean(updateModalDefaultValue)}
        onClose={() => setUpdateModalDefaultValue('')}
        defaultValue={updateModalDefaultValue}
        idForUpdate={selectedProjectIdForUpdate}
        isUpdate
      />

      {projectsAndTasks.map(({ _id, createdAt, name, tasks }) => (
        <Card
          title={name}
          subtitle={`Created at ${new Date(createdAt).toLocaleString('en-us')}`}
          key={_id}
          onDelete={() => {}}
          onUpdate={() => {
            setUpdateModalDefaultValue(name);
            setSelectedProjectIdForUpdate(_id);
          }}
        >
          {name}
        </Card>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;