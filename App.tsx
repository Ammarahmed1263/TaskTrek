import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import TaskContainer from './src/components/tasksContainer';
import AppHeader from './src/components/AppHeader';
import AddButton from './src/components/AddButton';

function App(): React.JSX.Element {
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
          <TaskContainer isEditing={isEditing} setIsEditing={setIsEditing}/>
          {!isEditing && <AddButton />}
      </SafeAreaView>
    </>
  );
}

export default App;
