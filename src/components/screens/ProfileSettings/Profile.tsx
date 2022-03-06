import React, {Component, Fragment, useEffect, useState} from 'react';
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

const Profile = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

  const getName = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      setName(name);
      setEmail(email);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const MenuListItems = [
    'Account',
    'Chat with us',
    'Preference',
    'Rate us',
    'Privacy Policy',
    'Terms and condition',
    'About us',
  ];

  useEffect(() => {
    getName();
    props.fetchAllCategories();
  }, []);

  const signOutHandler = async () => {
    const arrayKeys = [
      'email',
      'name',
      'userType',
      'userId',
      'phone',
      'category',
      'testCategorySelected',
    ];
    try {
      await AsyncStorage.multiRemove(arrayKeys);
      await props.navigation.navigate('Login');
    } catch (e) {
      ToastAndroid.show('Logout failed', ToastAndroid.SHORT);
    }
  };

  const renderPreferenceItems = async value => {
    let category: {label: string; value: string}[] = [];
    if (value.length) {
      value.map((v: any) => {
        category.push(v.value);
      });
    }
    const body = {
      name: await AsyncStorage.getItem('name'),
      phone: await AsyncStorage.getItem('phone'),
      userId: await AsyncStorage.getItem('userId'),
      category: category,
    };
    await props.updateUserData(body);
    await props.fetchUserData(props);
  };

  const profileMenuHandler = (value) => {
    switch (value) {
      case 'Account':
        props.navigation.navigate('Accounts');
        break;
      case 'Chat with us':
        Linking.openURL('https://wa.me/918463038257');
        break;
      case 'Rate us':
        Linking.openURL(
          'https://play.google.com/store/apps/details?id=com.mcgeducation',
        );
        break;
      case 'Privacy Policy':
        props.navigation.navigate('Privacy Policy');
        break;
      case 'Terms and condition':
        props.navigation.navigate('Terms and condition');
        break;
      case 'About us':
        props.navigation.navigate('About us');
        break;
      case 'Preference':
        setVisible(true);
        break;
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <ProfileImage {...props} />
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.emailText}>{email}</Text>
          <Divider />
        </View>
        {MenuListItems.map((value, i) => {
          return (
            <View style={styles.list} key={i}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => profileMenuHandler(value)}>
                <View style={{flex: 1}}>
                  <Text style={{color: '#000', fontSize: 20}}>{value}</Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                  <Icon
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
          <TouchableOpacity onPress={() => signOutHandler()}>
            <Text style={styles.signoutButton}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign: 'center', marginTop: 20}}>Version v1.0</Text>
      </View>

      <Preference
        passItems={e => renderPreferenceItems(e)}
        visible={visible}
        category={props.category}
        closeModal={() => setVisible(false)}
      />
    </Fragment>
  );
};
const mapStateToProps = state => {
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
