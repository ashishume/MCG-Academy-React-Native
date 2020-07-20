import React, {Component} from 'react';
import LoginView from './LoginView';
import auth from '@react-native-firebase/auth';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Dimensions,
  Card,
} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  fullwidthHeight: {
    width: width,
    height: height,
    justifyContent: 'center',
  },
  boxStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonDiv: {
    backgroundColor: 'white',
    marginTop: 76,
    marginBottom: 16,
    justifyContent: 'center',
  },
  buttonDivText: {
    color: 'red',
    textAlign: 'center',
  },
  marginLR: {
    marginHorizontal: 18,
  },
  textWhite: {fontSize: 18, color: 'white', paddingBottom: 5},
  viewCardtype: {
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  inputText: {height: 40, marginTop: 15, marginBottom: 15, color: 'white'},
});

class PhoneAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+91',
      confirmResult: null,
      loading: false,
      userName: '',
      email: '',
      phoneNo: '977112345',
      userId: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user.toJSON()});
        alert(console.log(user));
      } else {
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+91',
          confirmResult: null,
        });
        alert('no user exist');
      }
    });
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = async () => {
    const {phoneNumber} = this.state;
    this.setState({message: 'Sending code ...'});
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        alert('confirmResult' + confirmResult);
        this.setState({confirmResult, message: 'Code has been sent!'});
      })
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
        }),
      );
  };

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          alert(JSON.stringify(user.uid));
          this.setState({
            message: 'Code Confirmed!',
            loading: true,
            userId: user.uid,
            phoneNo: user.phoneNumber,
          });
          // this.createUserDatabase();
        })
        .catch(error => {
          this.setState({message: `Code Confirm Error: ${error.message}`});
        });
    }
  };

  createUserDatabase = () => {
    const {userName, phoneNo, userId} = this.state;
    the_uid = userId;
    const data = {
      name: userName,
      contact: phoneNo,
    };
    // firebase
    //   .firestore()
    //   .doc(`users/${the_uid}`)
    //   .set(data)
    //   .then(() => {
    //     console.log('New poll data sent!');
    //   })
    //   .catch(error => console.log('Error when creating new poll.', error));
  };

  renderMessage = () => {
    const {message} = this.state;
    if (!message.length) return null;
    return (
      <View style={styles.viewCardtype}>
        <Text style={{padding: 5, backgroundColor: '#000', color: '#fff'}}>
          {message}
        </Text>
      </View>
    );
  };

  renderVerificationCodeInput = () => {
    const {codeInput, userName} = this.state;
    return (
      <Card style={styles.boxStyle}>
        <View style={{marginTop: 25, padding: 25}}>
          <Text style={[styles.textWhite, styles.marginLR]}>
            Enter verification code below:
          </Text>
          <View style={[styles.viewCardtype, styles.marginLR]}>
            <TextInput
              autoFocus
              style={styles.inputText}
              onChangeText={value => this.setState({codeInput: value})}
              placeholder={'Code ... '}
              value={codeInput}
              keyboardType="number-pad"
              placeholderTextColor="white"
            />
          </View>
          <View style={[styles.viewCardtype, styles.marginLR]}>
            <TextInput
              style={styles.inputText}
              onChangeText={namevalue => this.setState({userName: namevalue})}
              placeholder={'Enter your name... '}
              value={userName}
              keyboardType="name-phone-pad"
              placeholderTextColor="white"
            />
          </View>

          <Button
            style={[styles.buttonDiv, styles.marginLR]}
            onPress={this.confirmCode}>
            <Text style={styles.buttonDivText}>Confirm Code</Text>
          </Button>
        </View>
      </Card>
    );
  };

  valueChange = textValue => {
    this.setState({phoneNumber: textValue});
  };

  // goToMainPage = () => {
  //   const {navigation} = this.props;
  //   navigation.navigate('PageNavigation');
  //   console.log('skip is working');
  // };

  // renderButton = () => {
  //   if (this.state.loading) {
  //     return <ActivityIndicator size={'large'} />;
  //   }

  //   setTimeout(() => {
  //     this.setState({loading: false});
  //     this.goToMainPage();
  //   }, 3000);
  // };

  render() {
    const {user, confirmResult, codeInput, phoneNumber} = this.state;
    return (
      <LoginView
        user={user}
        confirmResult={confirmResult}
        signOut={this.signOut}
        renderVerificationCodeInput={() => this.renderVerificationCodeInput()}
        renderMessage={() => this.renderMessage()}
        codeInput={codeInput}
        phoneNumber={phoneNumber}
        signIn={this.signIn}
        valueChange={textValue => this.valueChange(textValue)}
      />
    );
  }
}

export default PhoneAuth;
