import React, {Component} from 'react';
import SignupValidaton from '../../Utils/SignupValidation';
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {signupUser} from '../../../store/actions/auth';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
const types = [
  {label: 'Teacher', value: 2},
  {label: 'Student', value: 3},
];
class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: '',
    errors: '',
  };

  SignupHandler = () => {
    const body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      userType: this.state.userType,
    };
    const validate = SignupValidaton(body);
    if (
      validate.email ||
      validate.password ||
      validate.name ||
      validate.phone ||
      validate.userType
    ) {
      this.setState({errors: validate});
      return false;
    } else {
      this.setState({errors: ''});
      this.props.navigation.navigate('Preference', body);

      //   this.props.signupUser(body, this.props);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/Login-Page-Screen.png')}
        style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 100, height: 100}}
                />
              </View>
              <Text style={styles.headerText}>Welcome to MCG Academy</Text>
              <Text style={styles.subHeaderText}>
                Enter your details to signup to your account
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={(email) => this.setState({email})}
                style={styles.input}
                autoCompleteType="email"
                keyboardType={'email-address'}
                placeholderTextColor="#000"
              />
              <Text style={styles.errorText}>{this.state.errors.email}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                onChangeText={(name) => this.setState({name})}
                style={styles.input}
                placeholderTextColor="#000"
              />
              <Text style={styles.errorText}>{this.state.errors.name}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={(password) => this.setState({password})}
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor="#000"
              />
              <Text style={styles.errorText}>{this.state.errors.password}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.label}>Phone No.</Text>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={(phone) => this.setState({phone})}
                style={styles.input}
                placeholderTextColor="#000"
              />
              <Text style={styles.errorText}>{this.state.errors.phone}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {types.map((value, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 50,
                    }}>
                    <Icon
                      name={value.value == 3 ? 'book' : 'pencil'}
                      raised
                      size={30}
                      reverse
                      onPress={() => this.setState({userType: value.value})}
                      type={IconStyles.iconType}
                      color={
                        this.state.userType == value.value ? 'red' : 'teal'
                      }
                    />
                    <Text style={{color: '#000'}}>{value.label}</Text>
                    <Text style={styles.errorText}>
                      {this.state.errors.userType}
                    </Text>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.SignupHandler()}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View style={{color: '#000', marginTop: 10}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{color: '#000', textAlign: 'center'}}>
                  Already have an account? login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default connect('', {signupUser})(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  headerContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  headerText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#c20202',
    padding: 15,
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  label: {
    color: '#000',
    marginBottom: -10,
  },
  input: {
    color: '#000',
    borderBottomWidth: 1,
    fontSize: 15,
    paddingLeft: 0,
    borderBottomColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: '#000',
  },
});
