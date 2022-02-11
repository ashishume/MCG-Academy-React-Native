import {View} from 'react-native';
import React, {Fragment} from 'react';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../../Styles';
import CountdownTimer from '../Templates/CountdownTimer';
const CountownTimerComponent = ({timeupHandler, examTime}) => {
  return (
    <Fragment>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="time-outline"
            type={IconStyles.iconType}
            size={20}
            containerStyle={{marginHorizontal: 10}}
          />

          <CountdownTimer
            onTimeupHandler={timeupHandler}
            timer={parseInt(examTime)}
          />
        </View>
      </View>
    </Fragment>
  );
};

export default CountownTimerComponent;
