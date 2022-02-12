import React, {Component} from 'react';
import {View, Text} from 'react-native';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {time: {}, seconds: this.props.timer * 60};
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timer = 0;
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
  };
  }

  async componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    await this.setState({time: timeLeftVar});
    this.startTimer();
  }

  componentWillUnmount() {
    this.startTimer();
    this.timer = 0;
    }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.props.onTimeupHandler();
      clearInterval(this.timer);
    }
  }

  render() {
  return (
    <View>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>
          {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
        </Text>
    </View>
  );
  }
}

export default CountdownTimer;