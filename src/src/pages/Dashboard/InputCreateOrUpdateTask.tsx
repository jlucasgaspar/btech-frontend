import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Button } from '../../components/Button';
import { useCallback, useEffect, useState } from 'react';
import { makeHttpRequest } from '../../services/api';
import { useDashboardContext } from './context';
import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { Task } from '../../models';

type Props = {
  defaultValue?: string;
  updateTaskId?: string;
}

export const InputCreateOrUpdateTask = ({ defaultValue, updateTaskId }: Props) => {
  const [taskError, setTaskError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [taskNameValue, setTaskNameValue] = useState(defaultValue || '');
  const { setProjectsAndTasks } = useProjectsAndTasksContext();
  const { selectedProjectId } = useDashboardContext();

  useEffect(() => {
    if (defaultValue) setTaskNameValue(defaultValue);
  }, [defaultValue]);

  const handleCreate = useCallback(async () => {
    setLoading(true);

    const result = await makeHttpRequest<Task>('post', '/tasks', {
      projectId: selectedProjectId,
      title: taskNameValue
    });

    if (result.type === 'fail') {
      setLoading(false);
      setTaskError(result.error);
      return;
    }

    setProjectsAndTasks(state => state.map(projAndTasks => {
      if (projAndTasks._id === selectedProjectId) {
        projAndTasks.tasks.push(result.data);
      }

      return projAndTasks;
    }));

    setTaskNameValue('');
    setLoading(false);
  }, [selectedProjectId, taskNameValue, setProjectsAndTasks]);

  const handleUpdate = useCallback(async () => {
    setLoading(true);

    const result = await makeHttpRequest<Task>('put', `/tasks`, {
      _id: updateTaskId,
      title: taskNameValue
    });

    if (result.type === 'fail') {
      setLoading(false);
      setTaskError(result.error);
      return;
    }

    setProjectsAndTasks(state => state.map(projAndTasks => {
      if (projAndTasks._id === selectedProjectId) {
        projAndTasks.tasks = projAndTasks.tasks.map(task => {
          if (task._id === updateTaskId) return { ...task, title: taskNameValue }
          return task;
        });
      }

      return projAndTasks;
    }));

    setTaskNameValue('');
    setLoading(false);
  }, [selectedProjectId, taskNameValue, setProjectsAndTasks, updateTaskId]);

  return (
    <InputContainer
      onSubmit={event => {
        event.preventDefault();
        defaultValue ? handleUpdate() : handleCreate();
      }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="name"
        label="Task name"
        autoFocus
        error={Boolean(taskError)}
        helperText={taskError || undefined}
        disabled={isLoading}
        value={taskNameValue}
        onChange={event => {
          setTaskError('');
          setTaskNameValue(event.target.value)
        }}
      />

      <Button
        text={defaultValue ? 'Update' : 'Add'}
        isLoading={isLoading}
        color="primary"
        type="submit"
      />
    </InputContainer>
  );
}

const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
`;