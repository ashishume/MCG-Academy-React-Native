import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Container,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  Card,
} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const LoginView = props => {
  const {
    user,
    confirmResult,
    signIn,
    renderVerificationCodeInput,
    renderMessage,
    phoneNumber,
    valueChange,
  } = props;
  // const successImageUri = require('../../assets/1.jpg');

  //       signOut={this.signOut}
  //       goToMainPage={this.goToMainPage}
  //       renderButton={this.renderButton}
  //       loading={loading}

  return (
    <Container>
      <View>
        {!user && !confirmResult && (
          <Card style={styles.boxStyle}>
            <View>
              <Text
                style={{
                  fontSize: 34,
                  textAlign: 'center',
                  color: 'white',
                  marginVertical: 82,
                }}>
                Login
              </Text>
            </View>
            <Text style={[styles.textWhite, styles.marginLR]}>
              Enter phone number :
            </Text>
            <View style={[styles.viewCardtype, styles.marginLR]}>
              <TextInput
                autoFocus
                style={styles.inputText}
                onChangeText={value => valueChange(value)}
                placeholder={'Enter Phone number ... '}
                value={phoneNumber}
                keyboardType="number-pad"
                maxLength={13}
                placeholderTextColor="white"
              />
            </View>

            <Button
              onPress={signIn}
              style={[styles.buttonDiv, styles.marginLR]}>
              <Text style={styles.buttonDivText}>Sign In</Text>
            </Button>
          </Card>
        )}

        {renderMessage()}

        {!user && confirmResult && renderVerificationCodeInput()}

        {user && <View style={styles.buttonDiv}>{props.renderButton()}</View>}
      </View>
    </Container>
  );
};
export default LoginView;

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
