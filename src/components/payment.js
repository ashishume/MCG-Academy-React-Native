import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {TouchableHighlight} from 'react-native-gesture-handler';

class Payment extends Component {
  makePayment = () => {
    console.log('clicked');
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_TnXntgFU1WVoTg', // Your api key
      amount: '100',
      name: 'foo',
      prefill: {
        email: 'ashishume@gmail.com',
        contact: '8557098095',
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        console.log(`Error: ${error.code} | ${error.description}`);
        // handle failure
      });
  };
  render() {
    return (
      <View>
        <Button onPress={() => this.makePayment()} title="Press" />
        {/* <TouchableHighlight>
          <Text style={{fontSize: 25}}>Pay me</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

export default Payment;
