import BackgroundFetch from 'react-native-background-fetch';
import { onDisplayNotification } from '../notifications/NotificationService';
import { store } from '../../redux/store';

export default function startBackgroundNotifications () {
  console.log('function started');
  BackgroundFetch.configure(
    {
      minimumFetchInterval:  15 , // Fetch interval in minutes "5hours"
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    },
    async (taskId) => {
      console.log('[BackgroundFetch] taskId:', taskId);
  
      // Send notification
      const state = store.getState();
      const tasks = state.taskReducer.tasks.filter(task => task.completed === false);
      await onDisplayNotification(tasks.length);
  
      // Finish the task
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.log('[BackgroundFetch] configure error:', error);
    }
  );
  
  BackgroundFetch.start();

}