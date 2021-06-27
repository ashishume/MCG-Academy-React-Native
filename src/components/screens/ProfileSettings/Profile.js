import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet, ToastAndroid, Linking} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {IconStyles} from '../../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Preference from './Preference';
import {fetchAllCategories} from '../../../store/actions/category';
import {updateUserData, fetchUserData} from '../../../store/actions/auth';
import {connect} from 'react-redux';
import ProfileImage from './ProfileImage';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    visible: false,
    prefilledCategories: '',
    image: '',
    userType: '',
  };

  getName = async () => {
    let name = '';
    try {
      this.setState({
        name: await AsyncStorage.getItem('name'),
        email: await AsyncStorage.getItem('email'),
      });
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
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
    this.props.fetchAllCategories();

    // try {
    //   const type = await AsyncStorage.getItem('userType');
    //   console.log(type);

    //   if (type) {
    //     this.setState({
    //       userType: type,
    //     });
    //   }
    // } catch (e) {
    //   ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    // }
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

  renderPreferenceItems = async (value) => {
    let category = [];
    if (value.length) {
      value.map((v) => {
        category.push(v.value);
      });
    }
    const body = {
      name: await AsyncStorage.getItem('name'),
      phone: await AsyncStorage.getItem('phone'),
      userId: await AsyncStorage.getItem('userId'),
      category: category,
    };
    await this.props.updateUserData(body);
    await this.props.fetchUserData(this.props);
  };
  profileMenuHandler = (value) => {
    if (value == 'Account') {
      this.props.navigation.navigate('Accounts');
    } else if (value == 'Chat with us') {
      Linking.openURL('https://wa.me/918463038257');
    } else if (value == 'Rate us') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.mcgeducation',
      );
    } else if (value == 'Privacy Policy') {
      this.props.navigation.navigate('Privacy Policy');
    } else if (value == 'Terms and condition') {
      this.props.navigation.navigate('Terms and condition');
    } else if (value == 'About us') {
      this.props.navigation.navigate('About us');
    } else if (value == 'Preference') {
      this.setState({
        visible: true,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <ProfileImage {...this.props} />
          <View>
            <Text style={styles.nameText}>{this.state.name}</Text>
            <Text style={styles.emailText}>{this.state.email}</Text>
            <Divider />
          </View>
          {this.MenuListItems.map((value, i) => {
            return (
              <View style={styles.list} key={i}>
                <TouchableOpacity
                  onPress={() => this.profileMenuHandler(value)}>
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
          <Text style={{textAlign: 'center', marginTop: 20}}>Version v1.0</Text>
        </View>

        <Preference
          passItems={(e) => this.renderPreferenceItems(e)}
          visible={this.state.visible}
          category={this.props.category}
          closeModal={() =>
            this.setState({
              visible: false,
            })
          }
        />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.category.category,
  };
};
export default connect(mapStateToProps, {
  fetchAllCategories,
  updateUserData,
  fetchUserData,
})(Profile);

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: '100%'},
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
