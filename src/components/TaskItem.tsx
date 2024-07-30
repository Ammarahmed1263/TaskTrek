import React, {FC, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {
  updateTask,
  deleteTask,
  Task,
  toggleCompletion,
} from '../redux/taskSlice';

interface taskItemProps {
  task: Task,
  onLongPress: () => void,
  isActive: boolean,
  onEditPress: () => void
}

const TaskItem: FC<taskItemProps> = ({task, onLongPress, isActive, onEditPress}) => {
  const dispatch = useDispatch();
  const SwipeableRef = useRef<Swipeable>(null);

  const handleEdit = () => {
    console.log(':::::::::::::::::::set editing to true here:::::::::::::::::::::');
    onEditPress();
    dispatch(updateTask(task));
    SwipeableRef.current?.close();
  };

  const handleDelete = (key: number) => {
    dispatch(deleteTask(key));
    SwipeableRef.current?.close();
  };

  const handleToggleCompletion = (key: number) => {
    dispatch(toggleCompletion(key));
  };


  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{color: '#B1B1B1', foreground: true}}
        onLongPress={onLongPress}
        onPress={() => handleToggleCompletion(task.key)}
        delayLongPress={250}
        style={[styles.container, isActive && styles.activeItem]}>
        <View style={styles.taskContainer}>
          <View
            style={styles.checkContainer}>
            <Icon
              name={
                task.completed
                  ? 'check-circle'
                  : 'circle'
              }
              color='#fff'
              size={24}
            />
          </View>
          <View style={styles.whiteSide}>
            <View style={styles.textContainer}>
              <Text style={[styles.taskTitle, task.completed && styles.completedText]}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={handleEdit}>
                  <Icon name='edit' color='#898989' size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(task.key)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    minHeight: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 14,
    shadowColor: '#3e3e3e',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1
  },
  activeItem: {
    backgroundColor: '#d1d1d1',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  checkContainer: {
    flex: 1,
    maxWidth: 35,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#145df0'
  },
  whiteSide: {
    flex: 10,
    flexDirection: 'row',
    paddingVertical: 8
  },
  textContainer: {
    flex: 12,
    maxWidth: '80%',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Jakarta-Bold',
    color: 'black',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#5e5e5e'
  },
  taskDescription: {
    fontSize: 12,
    fontFamily: 'Jakarta-Regular',
    width: '80%',
    color: '#888',
  },
  actionsContainer: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingEnd: 10
  },
  iconContainer: {
    zIndex: 3,
    backgroundColor: '#FAFAFA',
    padding: 4,
    borderRadius: 10
  },
  deleteText: {
    zIndex: 3,
    color: '#de3d3d',
    fontSize: 16,
    fontFamily: 'Jakarta-Medium'
  },
});

export default TaskItem;
