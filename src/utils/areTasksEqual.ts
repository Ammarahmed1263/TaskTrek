import { Task } from "../redux/taskSlice";

const areTasksEqual = (task1: Omit<Task, 'key' | 'completed'>, task2: Omit<Task, 'key' | 'completed'>) => {
  return task1.title == task2.title && task1.description == task2.description;
};

export default areTasksEqual;