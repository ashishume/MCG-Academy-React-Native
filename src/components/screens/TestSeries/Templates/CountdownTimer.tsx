// import React, {Component} from 'react';
// import {View, Text} from 'react-native';

// class CountdownTimer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {time: {}, seconds: this.props.timer * 60, didMount: true};
//     this.startTimer = this.startTimer.bind(this);
//     this.countDown = this.countDown.bind(this);
//     this.timer = 0;
//   }

//   secondsToTime(secs) {
//     let hours = Math.floor(secs / (60 * 60));
//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);
//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);
//     return {
//       h: hours,
//       m: minutes,
//       s: seconds,
//     };
//   }

//   async componentDidMount() {
//     if (this.state.didMount) {
//       let timeLeftVar = this.secondsToTime(this.state.seconds);
//       await this.setState({time: timeLeftVar});
//       this.startTimer();
//     }
//   }

//   componentWillUnmount() {
//     this.setState({
//       didMount: false,
//     });
//     this.startTimer();
//     this.timer = 0;
//   }

//   startTimer() {
//     if (this.state.didMount) {
//       if (this.timer == 0 && this.state.seconds > 0) {
//         this.timer = setInterval(this.countDown, 1000);
//       }
//     }
//   }

//   countDown() {
//     if (this.state.didMount) {
//       // Remove one second, set state so a re-render happens.
//       let seconds = this.state.seconds - 1;
//       this.setState({
//         time: this.secondsToTime(seconds),
//         seconds: seconds,
//       });

//       // Check if we're at zero.
//       if (seconds == 0) {
//         this.props.onTimeupHandler();
//         clearInterval(this.timer);
//       }
//     }
//   }

//   render() {
//     return (
//       <View>
//         {console.log(this.props.timer)}
//         {this.state.didMount ? (
//           <Text style={{fontSize: 25, fontWeight: 'bold'}}>
//             {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
//           </Text>
//         ) : null}
//       </View>
//     );
//   }
// }

// export default CountdownTimer;

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CountdownTimer = ({timer}: {timer: number}) => {
  const [clockTime, setClockTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const time_in_minutes: number = 2;
  const current_time: number = Date.parse(new Date());
  const [deadline, setDeadline] = useState(
    new Date(current_time + time_in_minutes * 60 * 1000),
  );
  const [timeLeft, setTimeLeft] = useState(0);
  // const [timeInterval, setTimeInterval] = useState();
  const [paused, setPause] = useState(false);

  function time_remaining(endtime: Date) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  useEffect(() => {
    run_clock(deadline);
  }, []);

  let timeInterval;
  function run_clock(endtime: Date) {
    const update_clock = () => {
      const t = time_remaining(endtime);
      const {hours, minutes, seconds, total} = t;
      console.log();
      
      setClockTime({
        hours,
        minutes,
        seconds,
      });
      if (total <= 0) {
        clearInterval(timeInterval);
      }
    };
    // setTimeInterval(setInterval(update_clock, 1000));
    
    timeInterval = setInterval(update_clock, 1000);
    console.log(timeInterval);
  }

  function pause_clock() {
    if (!paused) {
      setPause(true);
      clearInterval(timeInterval); // stop the clock

      // timeLeft = time_remaining(deadline).total; // preserve remaining time
      setTimeLeft(time_remaining(deadline).total);
    }
  }

  function resume_clock() {
    if (paused) {
      setPause(false);
      // update the deadline to preserve the amount of time remaining
      setDeadline(new Date(Date.parse(new Date()) + timeLeft));
      // start the clock
      run_clock(deadline);
    }
  }

  return (
    <View style={{backgroundColor: 'cyan'}}>
      <Text>
        {`${clockTime.hours}:${clockTime.minutes}:${clockTime.seconds}`}
      </Text>
      {paused ? (
        <TouchableOpacity onPress={resume_clock}>
          <Text>Resume</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pause_clock}>
          <Text>Pause</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CountdownTimer;
