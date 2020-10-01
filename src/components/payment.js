import React, {Component} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {buyNewCourse} from '../store/actions/courses';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');

const Payment = (props) => {
  const makePayment = async () => {
    const id = props.route.params._id;
    await props.buyNewCourse(id);
    await props.navigation.navigate('Dashboard');
    // var options = {
    //   description: 'Credits towards consultation',
    //   image: 'https://i.imgur.com/3g7nmJC.png',
    //   currency: 'INR',
    //   key: 'rzp_test_TnXntgFU1WVoTg', // Your api key
    //   amount: '100',
    //   name: 'foo',
    //   prefill: {
    //     email: 'ashishume@gmail.com',
    //     contact: '8557098095',
    //     name: 'Razorpay Software',
    //   },
    //   theme: {color: '#F37254'},
    // };
    // RazorpayCheckout.open(options)
    //   .then((data) => {
    //     // handle success
    //     console.log(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch((error) => {
    //     console.log(`Error: ${error.code} | ${error.description}`);
    //     // handle failure
    //   });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        width: width,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Text style={{fontSize: 20}}>Razor payment page</Text>
      <Button onPress={() => makePayment()} title="Make payment" />
    </View>
  );
};

export default connect('', {buyNewCourse})(Payment);
