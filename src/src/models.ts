export type User = {
  _id: string;
  name: string;
  email: string;
}

export type Project = {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

export type Task = {
  userId: string;
  projectId: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  finishedAt: Date | null;
}

export type ProjectAndTasks = Project & {
  tasks: Task[];
}