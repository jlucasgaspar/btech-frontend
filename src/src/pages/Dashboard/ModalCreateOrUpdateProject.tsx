
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { makeHttpRequest } from '../../services/api';
import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { Project } from '../../models';
import { useDashboardContext } from './context';

type Props = {
  defaultValue?: string;
  idForUpdate?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCreateOrUpdateProject = ({ defaultValue, idForUpdate, isOpen, onClose }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState(defaultValue || '');
  const [error, setError] = useState('');
  const { setProjectsAndTasks, projectsAndTasks } = useProjectsAndTasksContext();
  const { projectModalType } = useDashboardContext();

  useEffect(() => {
    if (defaultValue) setProjectName(defaultValue);
  }, [defaultValue]);

  const handleCreateProject = useCallback(async () => {
    if (!projectName) {
      setError('Invalid project name.');
      return;
    }

    const nameAlreadyExists = projectsAndTasks.find(_ => _.name === projectName);
    if (nameAlreadyExists) {
      setError('This project name is already taken by you.');
      return;
    }

    setLoading(true);

    const method = projectModalType === 'update' ? 'put' : 'post';
    const data = projectModalType === 'update'
      ? { name: projectName, _id: idForUpdate }
      : { name: projectName }

    const result = await makeHttpRequest<Project>(method, '/projects', data);

    if (result.type === 'fail') {
      setError(result.error);
      setLoading(false);
      return;
    }

    setProjectsAndTasks(state => {
      if (projectModalType === 'update') {
        return state.map(_ => _._id === idForUpdate ? { ..._, ...result.data } : _);
      }

      return [
        { ...result.data, tasks: [] },
        ...state
      ];
    });

    setLoading(false);
    onClose();
  }, [
    onClose,
    projectName,
    projectsAndTasks,
    setProjectsAndTasks,
    idForUpdate,
    projectModalType
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Project name"
        autoComplete="name"
        autoFocus
        error={Boolean(error)}
        helperText={error || undefined}
        disabled={isLoading}
        onChange={event => {
          setError('');
          setProjectName(event.target.value)
        }}
        value={projectName}
      />

      <Button onClick={handleCreateProject} disabled={isLoading} color="primary">
        {projectModalType === 'update' ? 'Update' : 'Create'} project
      </Button>
    </Modal>
  );
}