import {log} from 'react-native-reanimated';
import axios from '../../API/HttpService';
import {getUniqueId} from 'react-native-device-info';

export const AddFCMToken = (token) => {
  const body = {
    token,
    deviceId: getUniqueId(),
  };
  axios.post('/fcm', body).then((response) => {
    // console.log(response);
  });
};
