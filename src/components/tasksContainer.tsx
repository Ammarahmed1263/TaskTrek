import {View, StyleSheet} from 'react-native';
import HeadingText from './tasksHeader';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import TaskItem from './TaskItem';
import {setTasks, Task} from '../redux/taskSlice';
import {Dispatch, FC, SetStateAction, useState} from 'react';
import CustomBottomSheets from './CustomBottomSheets';
import LottieView from 'lottie-react-native';
import TasksFilter from './TasksFilter';

interface TaskContainerProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const TaskContainer: FC<TaskContainerProps> = ({isEditing, setIsEditing}) => {
  const tasks = useSelector((state: RootState) => state.taskReducer.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const dispatch = useDispatch();

  const handleDragEnd = ({data}: {data: Task[]}) => {
    dispatch(setTasks(data));
  };

  const handleEditPress = (task: Task) => {
    console.log('selected task here: ', task);
    setSelectedTask(task);
    setIsEditing(true);
  };

  const renderTask = ({item, drag, isActive}: RenderItemParams<Task>) => {
    return (
      <TaskItem
        task={item}
        onLongPress={drag}
        isActive={isActive}
        onEditPress={() => handleEditPress(item)}
      />
    );
  };

  const filterTasks = (tasks: Task[], filter: string): Task[] => {
    if (filter == 'completed') {
      return tasks.filter(task => task.completed === true);
    } else if (filter == 'in-progress') {
      return tasks.filter(task => task.completed !== true);
    }
    return tasks; // No filter, return all tasks
  };

  const filteredTasks = filterTasks(tasks, filter);
  console.log('tasks after filteration:', filterTasks);

  return (
    <View style={styles.tasks}>
      <HeadingText />
      <TasksFilter setFilter={setFilter} filter={filter} />
      {filteredTasks.length ? (
        <DraggableFlatList
          data={filteredTasks}
          onDragEnd={handleDragEnd}
          keyExtractor={item => String(item.key)}
          renderItem={renderTask}
          showsVerticalScrollIndicator={false}
          style={{height: '100%'}}
          contentContainerStyle={{paddingBottom: 100, paddingTop: 25}} // button height + bottom style
        />
      ) : (
        <View style={styles.tempCont}>
          <LottieView
            source={require('../assets/lottie/noteWriter.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      )}
      {isEditing && (
        <CustomBottomSheets
          taskToEdit={selectedTask}
          setIsActive={setIsEditing}
          isEditing
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: '#ececec',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -1,
  },
  tempCont: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  animation: {
    width: 350,
    height: 350,
  },
});

export default TaskContainer;
