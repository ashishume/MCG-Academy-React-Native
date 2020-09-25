import React, {Fragment, useEffect, Component} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import {StatusBar} from 'react-native';
import {fcmService} from './Services/FCMService';
import {localNotificationService} from './Services/LocalNotificationService';
import {AddFCMToken} from './store/actions/fcmService';
const App = () => {
  useEffect(() => {
    // fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
      AddFCMToken(token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      // alert('Open Notification: ' + notify.body);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  return (
    <Fragment>
      <StatusBar backgroundColor="black" />
      <MainRouting />
      <LoaderComponent />
    </Fragment>
  );
};
export default App;
