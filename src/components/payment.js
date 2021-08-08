import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {buyNewCourse} from '../store/actions/courses';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import {IconStyles} from './Styles';
import {RAZOR_PAY_KEY} from '../API/ApiPaths';
import {buyNewTestSeries} from '../store/actions/testSeries';
const Payment = (props) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isPaidData, setPaid] = useState(false);
  const [userInfoId, setUserId] = useState(false);

  const {_id, price, timeLimit, courseTitle, isTestSeries, isPaid} =
    props.route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailData = await AsyncStorage.getItem('email');
        setEmail(emailData);
        const nameData = await AsyncStorage.getItem('name');
        setName(nameData);
        const phoneData = await AsyncStorage.getItem('phone');
        setPhone(phoneData);
        const userIdData = await AsyncStorage.getItem('userId');
        setUserId(userIdData);
      } catch (e) {
        ToastAndroid.show('Something went Wrong', ToastAndroid.LONG);
      }
    };

    fetchData();
  }, []);

  const paymentSuccess = async () => {
    const id = _id;
    if (isTestSeries) {
      const dbObj = {
        test: id,
        user: userInfoId,
        amount: price,
        timeLimit: timeLimit,
      };
      await buyNewTestSeries(dbObj);
    } else {
      await props.buyNewCourse(id);
    }
    await setPaid(false);
    await props.navigation.navigate('Dashboard');
  };

  const makePayment = async () => {
    const id = _id;
    const testObject = {
      test: id,
      user: userInfoId,
      amount: price,
      timeLimit: timeLimit,
    };

    if (!isTestSeries && typeof isPaid === 'undefined' && price !== 0)
      await paymentHandler(); //course with price

    if (!isTestSeries && price === 0 && typeof isPaid === 'undefined') {
      await props.buyNewCourse(id); //free course
      await props.navigation.navigate('Dashboard');
    }
    if (isTestSeries && isPaid) await paymentHandler(); //paid test series

    if (isTestSeries && !isPaid) {
      await buyNewTestSeries(testObject); //free test series
      await props.navigation.navigate('My tests');
    }
  };

  const paymentHandler = () => {
    var options = {
      description: `Payment to MCG Academy`,
      image: 'https://mcg-academy-40050.web.app/static/media/logo.d07396b6.jpg',
      currency: 'INR',
      key: RAZOR_PAY_KEY.key, // Your api key
      amount: price * 100,
      name: courseTitle,
      prefill: {
        email: email,
        name: name,
        contact: phone,
      },
      theme: {color: '#c20202'},
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        if (data) {
          setPaid(true);
          setTimeout(() => {
            paymentSuccess();
          }, 1500);
        }
      })
      .catch((error) => {
        ToastAndroid.show('Payment failed', ToastAndroid.LONG);
      });
  };

  return (
    <Fragment>
      {isPaidData ? (
        <View style={styles.topContainer}>
          <Icon
            name="checkmark"
            raised
            size={30}
            reverse
            color="green"
            type={IconStyles.iconType}
          />
          <Text style={styles.successPaymentText}>
            You have successfully made the payment, Please wait you will be
            redirected
          </Text>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.OrderDetailsText}>Order details</Text>
          </View>
          <View style={styles.summaryContainer}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {isTestSeries ? 'Exam' : 'Course'}: {courseTitle}
            </Text>
            <Text numberOfLines={1} style={styles.summaryText}>
              Price: ₹{price}
            </Text>
            <Text numberOfLines={1} style={styles.summaryText}>
              {isTestSeries ? 'Exam' : 'Course'} validity: {timeLimit} days
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => makePayment()}
            style={styles.paymentButtonContainer}>
            <Text style={styles.paymentText}>Pay</Text>
          </TouchableOpacity>
          <Text style={styles.note}>
            You will be securely connected to the razorpay servers
          </Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  OrderDetailsText: {
    fontSize: 25,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: 'lightgray',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  successPaymentText: {
    fontSize: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 17,
    paddingHorizontal: 10,
  },
  paymentButtonContainer: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#c20202',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
    width: '90%',
  },
  paymentText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  note: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 12,
  },
});
export default connect('', {buyNewCourse})(Payment);
