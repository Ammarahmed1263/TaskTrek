import {Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import LabelInput from './LabelInput';
import {Task, addTask, updateTask} from '../redux/taskSlice';
import areTasksEqual from '../utils/areTasksEqual';

interface bottomSheetprops {
  setIsActive: Dispatch<SetStateAction<boolean>>;
  isEditing?: boolean;
  taskToEdit?: Task | null;
}

const CustomBottomSheets: FC<bottomSheetprops> = ({
  setIsActive,
  isEditing = false,
  taskToEdit = null,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [task, setTask] = useState<Omit<Task, 'key' | 'completed'>>({
    title: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
      });
    }
  }, [taskToEdit, isEditing]);


  const validTitle = useCallback((text: string) => {
    let valid = true;
      if (text === '') {
        setError('Title is required');
        valid = false;
      }
      return valid;
  }, [])
  
  const handleSubmit = () => {
    if (validTitle(task.title)) {
      if (isEditing && taskToEdit) {
        if (!areTasksEqual(taskToEdit, task)) {
          dispatch(updateTask({...taskToEdit, ...task}));
        }
      } else {
        dispatch(addTask(task));
      }
      bottomSheetRef.current?.close();
    } 
  };

  const handleTextChange = (text: string, property: string) => {
    if (property === 'title') {
      if (validTitle(text)) {
        setError(null);
      } else {
        setError('Title is required')
      }
    }
    setTask(prev => ({...prev, [property]: text}))
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      keyboardBehavior='extend'
      onClose={() => setIsActive(false)}
      enablePanDownToClose={true}
      handleIndicatorStyle={{
        backgroundColor: '#9e9e9e',
        height: 7,
        width: 40,
      }}
      snapPoints={isEditing ? ['60%', '70%', '100%'] : ['50%', '65%', '95%']}>
      <BottomSheetView
        style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center',
        }}>
        <LabelInput
          label="Title"
          placeholder="e.g. Bake Cake"
          value={task.title}
          onChangeText={text => handleTextChange(text, 'title')}
          style={error ? styles.errorLabel: {}}
        />
        {error !== null && <Text style={styles.errortext}>{error}</Text>}
        <LabelInput
          label={isEditing ? "Description" :"Description(Optional)"}
          placeholder={`Ingredients\n1 Cup of Flour\n2 Eggs\nPacket of Baking Powder`}
          numberOfLines={6}
          multiline
          scrollEnabled
          textAlignVertical="top"
          value={task.description}
          onChangeText={text => handleTextChange(text, 'description')}
        />
        <BottomSheetView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Pressable
            onPress={() => bottomSheetRef.current?.close()}
            style={styles.cancelButton}>
            <Text style={[styles.buttonText, {color: '#de3d3d'}]}>Cancel</Text>
          </Pressable>
          <Pressable
            android_ripple={{color: '#B1B1B1'}}
            onPress={handleSubmit}
            style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheets;

const styles = StyleSheet.create({
  cancelButton: {},
  saveButton: {
    borderRadius: 8,
    backgroundColor: '#145df0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 16,
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  errorLabel: {
    borderWidth: 2,
    borderColor: '#de3d3d' 
  },
  errortext: {
    color: '#de3d3d',
    fontFamily: 'Jakarta-Medium',
    fontSize: 16,
    marginBottom: 5,
    marginStart: 5,
  },
});
