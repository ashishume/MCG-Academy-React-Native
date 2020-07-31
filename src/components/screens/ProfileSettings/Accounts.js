import React, {Component, Fragment} from 'react';
import {View, TextInput, StyleSheet, Text, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-elements';
import {
  updateUserData,
  fetchUserData,
  updatePassword,
} from '../../../store/actions/auth';
class Accounts extends Component {
  state = {
    name: '',
    phone: '',
    nameError: '',
    phoneError: '',
    userId: '',
    category: [],
    newPassword1: '',
    newPassword2: '',
    oldPassword: '',
    passwordError: '',
  };
  async componentDidMount() {
    try {
      const category = await AsyncStorage.getItem('category');
      this.setState({
        name: await AsyncStorage.getItem('name'),
        phone: await AsyncStorage.getItem('phone'),
        userId: await AsyncStorage.getItem('userId'),
        category: JSON.parse(category),
      });
    } catch (e) {
      ToastAndroid.show('Details fetching failed', ToastAndroid.SHORT);
    }
  }
  profileEditHandler = async () => {
    if (!this.state.name) {
      this.setState({
        nameError: 'Name is required',
      });
    }

    if (!this.state.phone) {
      this.setState({
        phoneError: 'Phone is required',
      });
    }
    if (this.state.name && this.state.phone) {
      const body = {
        name: this.state.name,
        phone: this.state.phone,
        userId: this.state.userId,
        category: this.state.category,
      };
      await this.props.updateUserData(body);
      await this.props.fetchUserData(this.props);
    }
  };

  changePassword = async () => {
    try {
      if (this.state.newPassword1 !== this.state.newPassword2) {
        this.setState({
          passwordError: "Password doesn't match",
        });
      } else {
        const body = {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword1,
          email: await AsyncStorage.getItem('email'),
        };
        this.setState({
          passwordError: '',
        });
        this.props.updatePassword(body, this.props);
      }
    } catch (e) {
      ToastAndroid.show('Password change failed', ToastAndroid.SHORT);
    }
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Profile Details
          </Text>
          <Divider style={{margin: 10}} />

          <Text style={styles.label}>Name</Text>
          <TextInput
            onChangeText={(name) => this.setState({name})}
            style={styles.Input}
            value={this.state.name}
          />
          <Text style={styles.label}>{this.state.nameError}</Text>

          <Text style={styles.label}>Phone No.</Text>
          <TextInput
            onChangeText={(phone) => this.setState({phone})}
            style={styles.Input}
            value={this.state.phone}
          />
          <View>
            <TouchableOpacity
              onPress={() => this.profileEditHandler()}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 50}}>
            Reset Password
          </Text>
          <Divider style={{margin: 10}} />
          <View>
            <Text style={styles.label}>Old password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(oldPassword) => this.setState({oldPassword})}
              style={styles.Input}
            />
            <Text style={styles.label}>New password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(newPassword1) => this.setState({newPassword1})}
              style={styles.Input}
            />
            <Text style={styles.label}>Retype new password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(newPassword2) => this.setState({newPassword2})}
              style={styles.Input}
            />
            <Text style={styles.label}>{this.state.passwordError}</Text>
            <View>
              <TouchableOpacity
                onPress={() => this.changePassword()}
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect('', {updateUserData, fetchUserData, updatePassword})(
  Accounts,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    color: '#000',
    paddingTop: 4,
  },
  Input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    color: 'black',
  },
  picker: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    color: 'black',
  },
  TextArea: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    color: 'black',
    height: 80,
  },
  saveButton: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 10,
    borderRadius: 100,
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
  },
});
