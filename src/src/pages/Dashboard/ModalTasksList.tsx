import styled, { css } from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useProjectsAndTasksContext } from '../../contexts/projects-tasks';
import { makeHttpRequest } from '../../services/api';
import { Modal } from '../../components/Modal';
import { Task } from '../../models';

import { useDashboardContext } from './context';
import { InputCreateOrUpdateTask } from './InputCreateOrUpdateTask';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalTasksList = ({ isOpen, onClose }: Props) => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [undoneTasks, setUndoneTasks] = useState<Task[]>([]);
  const [mouseOverId, setMouseOverId] = useState('');
  const [updateTaskDefaultValue, setUpdateTaskDefaultValue] = useState('');
  const [updateTaskId, setUpdateTaskId] = useState('');
  const { projectsAndTasks, setProjectsAndTasks } = useProjectsAndTasksContext();
  const { selectedProjectId } = useDashboardContext();

  useEffect(() => {
    const projAndTasks = projectsAndTasks.find(_ => _._id === selectedProjectId);

    if (!projAndTasks) {
      setUndoneTasks([]);
      setCompletedTasks([]);
      return;
    }

    const { tasks } = projAndTasks;

    const completedTasksArray: Task[] = [];
    const undoneTasksArray: Task[] = [];

    for (const task of tasks) {
      if (task.isDone) completedTasksArray.push(task);
      else undoneTasksArray.push(task);
    }

    setCompletedTasks(completedTasksArray);
    setUndoneTasks(undoneTasksArray);
  }, [projectsAndTasks, selectedProjectId]);

  const handleCheck = useCallback(async (taskId: string, isChecked: boolean) => {
    setProjectsAndTasks(state => state.map(projAndTasks => {
      if (projAndTasks._id === selectedProjectId) {
        projAndTasks.tasks = projAndTasks.tasks.map(task => {
          if (task._id === taskId) {
            return {
              ...task,
              isDone: isChecked,
              finishedAt: isChecked ? new Date() : null
            }
          }

          return task;
        });
      }

      return projAndTasks;
    }));

    const result = await makeHttpRequest<Task>('put', `/tasks`, {
      _id: taskId,
      isDone: isChecked
    });

    if (result.type === 'fail') {
      toast.error(result.error);
    }
  }, [selectedProjectId, setProjectsAndTasks]);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    setProjectsAndTasks(state => state.map(projAndTasks => {
      if (projAndTasks._id === selectedProjectId) {
        projAndTasks.tasks = projAndTasks.tasks.filter(task => task._id !== taskId);
      }
      
      return projAndTasks;
    }));

    const result = await makeHttpRequest('delete', `/tasks/${taskId}`);

    if (result.type === 'fail') {
      toast.error(result.error);
    }
  }, [selectedProjectId, setProjectsAndTasks]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setUpdateTaskDefaultValue('');
        setUpdateTaskId('');
        onClose();
      }}
    >
      <Container>
        <strong>{`ToDo (${undoneTasks.length})`}</strong>

        {undoneTasks.map(task => (
          <Tooltip
            key={task._id}
            title={`${task.title} | Created: ${new Date(task.createdAt).toLocaleString('en-us')}`}
            placement="top-start"
          >
            <ItemList onMouseOver={() => setMouseOverId(task._id)}>
              <Checkbox
                checked={task.isDone}
                onChange={(_, checked) => handleCheck(task._id, checked)}
              />

              {task.title}

              {mouseOverId === task._id && (
                <>
                  <IconButton
                    onClick={() => {
                      setUpdateTaskDefaultValue(task.title);
                      setUpdateTaskId(task._id);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ItemList>
          </Tooltip>
        ))}

        <strong>{`Completed (${completedTasks.length})`}</strong>
        {completedTasks.map(task => (
          <Tooltip
            key={task._id}
            title={`${task.title} | Finished: ${new Date(task.finishedAt!).toLocaleString('en-us')}`}
            placement="top-start"
          >
            <ItemList isDone>
              <Checkbox
                checked={task.isDone}
                onChange={(_, checked) => handleCheck(task._id, checked)}
              />
              {task.title}
            </ItemList>
          </Tooltip>
        ))}

        <InputCreateOrUpdateTask
          defaultValue={updateTaskDefaultValue}
          updateTaskId={updateTaskId}
        />
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    margin-top: 15px;
    margin-left: 20px;
  }
`;

const ItemList = styled.div<{ isDone?: boolean; }>`
  display: flex;
  align-items: center;

  ${_ => _.isDone && css`
    text-decoration: line-through;
    color: #777;
  `}
`;