import React, {Component, Fragment} from 'react';
import {Text, Button, View, StyleSheet, ToastAndroid} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {IconStyles} from '../Styles';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
class Profile extends Component {
  state = {
    name: '',
    email: '',
  };
  getName = async () => {
    let name = '';
    try {
      this.setState({
        name: await AsyncStorage.getItem('name'),
        email: await AsyncStorage.getItem('email'),
      });
    } catch (e) {
      console.log(e);
    }
    return name;
  };

  MenuListItems = [
    'Account',
    'Chat with us',
    'Preference',
    'Rate us',
    'Privacy Policy',
    'Terms and condition',
    'About us',
  ];

  componentDidMount() {
    this.getName();
  }

  signOutHandler = async () => {
    const arrayKeys = [
      'email',
      'name',
      'userType',
      'userId',
      'phone',
      'category',
    ];
    try {
      await AsyncStorage.multiRemove(arrayKeys);
      await this.props.navigation.navigate('Login');
    } catch (e) {
      ToastAndroid.show('Logout failed', ToastAndroid.SHORT);
    }
  };
  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.profileIcon}>
              <Icon
                round={true}
                size={60}
                type={IconStyles.iconType}
                color={'purple'}
                raised
                name="ios-person"
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.nameText}>{this.state.name}</Text>
            <Text style={styles.emailText}>{this.state.email}</Text>
            <Divider />
          </View>
          {this.MenuListItems.map((value, i) => {
            return (
              <View style={styles.list} key={i}>
                <TouchableOpacity>
                  <View style={{flex: 1}}>
                    <Text style={styles.listItem}>{value}</Text>
                  </View>
                  <View style={{alignSelf: 'flex-end'}}>
                    <Icon
                      round={true}
                      size={22}
                      type={IconStyles.iconType}
                      color={'#000'}
                      name="ios-chevron-forward"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.signoutButtonContainer}>
            <TouchableOpacity onPress={() => this.signOutHandler()}>
              <Text style={styles.signoutButton}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: '100%'},
  profileIcon: {alignSelf: 'center'},
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  list: {flexDirection: 'column', margin: 10},
  listItem: {
    padding: 3,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  signoutButtonContainer: {
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 100,
    //shadow
    shadowOpacity: 1,
    shadowOffset: {
      height: 10,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  signoutButton: {
    color: '#000',
    fontSize: 20,
  },
});

export default Profile;
