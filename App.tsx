import React, { useState } from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import TaskContainer from './src/components/tasksContainer';
import AppHeader from './src/components/AppHeader';
import AddButton from './src/components/AddButton';
import { onDisplayNotification } from './src/services/notifications/NotificationService';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store';

function App(): React.JSX.Element {
  const tasks = useSelector((state: RootState) => state.taskReducer.tasks);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle='light-content' />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>
          <AppHeader />
          {/* <Button title='notify me' onPress={() => onDisplayNotification(tasks.length)}/> */}
          <TaskContainer isEditing={isEditing} setIsEditing={setIsEditing}/>
          {!isEditing && <AddButton />}
      </SafeAreaView>
    </>
  );
}

export default App;
