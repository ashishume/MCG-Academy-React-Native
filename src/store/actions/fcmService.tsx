// import axios from '../../API/HttpService';
// import {getUniqueId} from 'react-native-device-info';
// import messaging from '@react-native-firebase/messaging';
// import {Alert} from 'react-native';
// export const AddFCMToken = (token) => {
//   const body = {
//     token,
//     deviceId: getUniqueId(),
//   };
//   axios
//     .post('/fcm', body)
//     .then((response) => {
//       // console.log(response);
//     })
//     .catch((e) => {
//       // console.log(e);
//     });
// };

// export const GenerateTokenForNotifications = () => {
//   messaging()
//     .getToken()
//     .then((res) => {
//       AddFCMToken(res);
//     })
//     .catch((e) => {});
// };
// export const LoadInAppNotifications = () => {
//   return messaging().onMessage(async (remoteMessage) => {
//     Alert.alert(
//       remoteMessage.notification.title,
//       remoteMessage.notification.body,
//     );
//   });
// };
// export const LoadBackgroundAppNotifications = () => {
//   return messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//     // console.log('Message handled in the background!', remoteMessage);
//   });
// };
