import React, {useState, useRef, useEffect, Fragment} from 'react';
import {Text, View} from 'react-native';

const CountdownTimer = ({onTimeupHandle, timerSetByUser}) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const getTimeRemaining = (deadlineTime) => {
    const difference = Date.parse(deadlineTime) - Date.parse(new Date());
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    return {
      difference,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (deadlineTime) => {
    let {difference, hours, minutes, seconds} = getTimeRemaining(deadlineTime);
    if (difference >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    } else {
      //time's up now navigate
      resetTimeAndNavigate();
    }
  };

  const clearTimer = (deadlineTime) => {
    setTimer('00:00:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadlineTime);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timerSetByUser * 60);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
    () => {
      return clearTimer(getDeadTime());
    };
  }, []);

  const resetTimeAndNavigate = async () => {
    await clearTimer(getDeadTime());
    await onTimeupHandle();
  };

  return (
    <View>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>{timer}</Text>
    </View>
  );
};

export default CountdownTimer;
