
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { makeHttpRequest } from '../../services/api';
import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { Project } from '../../models';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: string;
  isUpdate?: boolean;
  idForUpdate?: string;
}

export const CreateProjectModal = ({ isOpen, onClose, defaultValue, isUpdate, idForUpdate }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState(defaultValue || '');
  const [error, setError] = useState('');
  const { setProjectsAndTasks, projectsAndTasks } = useProjectsAndTasksContext();

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

    const method = isUpdate ? 'put' : 'post';
    const data = isUpdate ? { name: projectName, _id: idForUpdate } : { name: projectName }

    const result = await makeHttpRequest<Project>(method, '/projects', data);

    if (result.type === 'fail') {
      setError(result.error);
      setLoading(false);
      return;
    }

    setProjectsAndTasks(state => {
      if (isUpdate) {
        return state.map(_ => _._id === idForUpdate ? { ..._, ...result.data } : _);
      }

      return [
        { ...result.data, tasks: [] },
        ...state
      ];
    });

    setLoading(false);
    onClose();
  }, [onClose, projectName, projectsAndTasks, setProjectsAndTasks, idForUpdate, isUpdate]);

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
        Create Project
      </Button>
    </Modal>
  );
}