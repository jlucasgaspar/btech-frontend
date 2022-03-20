import { Task } from '../../models';

export const generateTasksDoneText = (tasks: Task[]) => {
  let taskDoneNumber = 0;

  for (const task of tasks) {
    if (task.isDone) taskDoneNumber++;
  }

  return `${taskDoneNumber}/${tasks.length} tasks done`;
}