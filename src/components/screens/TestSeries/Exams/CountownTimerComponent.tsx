import {View} from 'react-native';
import React, {Fragment} from 'react';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../../Styles';
import CountdownTimer from '../Templates/CountdownTimer';
import useDidMount from '../../../Utils/didMount';
const CountownTimerComponent = ({timeupHandler, examTime}) => {
  const didMount = useDidMount(true);
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
          {didMount ? (
            <CountdownTimer
              onTimeupHandler={timeupHandler}
              timer={parseInt(examTime)}
            />
          ) : null}
        </View>
      </View>
    </Fragment>
  );
};

export default CountownTimerComponent;
