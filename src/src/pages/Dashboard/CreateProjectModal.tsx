
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCallback, useState } from 'react';
import { Modal } from '../../components/Modal';
import { makeHttpRequest } from '../../services/api';
import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { Project } from '../../models';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const { setProjectsAndTasks, projectsAndTasks } = useProjectsAndTasksContext();

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

    const result = await makeHttpRequest<Project>('post', '/projects', { name: projectName });

    if (result.type === 'fail') {
      setError(result.error);
      setLoading(false);
      return;
    }

    setProjectsAndTasks(state => [
      { ...result.data, tasks: [] },
      ...state
    ]);

    setLoading(false);
  }, [projectName, setProjectsAndTasks, projectsAndTasks]);

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