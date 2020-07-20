import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getUniqueId, getManufacturer} from 'react-native-device-info';

const DeviceData = () => {
  DeviceInfo.getManufacturer().then(manufacturer => {
    console.log(manufacturer);
  });
  return (
    <Fragment>
      <Text>{console.log(getUniqueId())}</Text>
    </Fragment>
  );
};

export default DeviceData;
