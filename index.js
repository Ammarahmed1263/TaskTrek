/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {Persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useEffect} from 'react';
import startBackgroundNotifications from './src/services/background/BackgroundService';

const WrappedApp = () => {
  useEffect(() => {
    startBackgroundNotifications();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={Persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <App />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
