import notifee, { AndroidImportance } from '@notifee/react-native';

export async function onDisplayNotification(tasksLeft: number): Promise<void> {
  if (tasksLeft <= 0) {
    return;
  }
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.DEFAULT
  });

  // Display a notification
  await notifee.displayNotification({
    title: `You're On Fire!`,
    body: `Just ${tasksLeft} tasks left to conquer today!`,
    android: {
      channelId,
      smallIcon: 'ic_launcher_round', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}