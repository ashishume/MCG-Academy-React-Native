import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {IconStyles} from '../../Styles';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Icon} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import Http from '../../../API/HttpService';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const ProfileImage = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    getImageData();
  }, []);
  const getImageData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      Http.get(`auth/profileImage/${userId}`).then((data) => {
        if (data.status == 200) {
          setProfile(data.data.imageUri);
        }
      });
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };
  const imageUploadHandler = async () => {
    await ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      } else {
        const source = {uri: response.uri};

        setImageName(response.fileName);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      setLoading(true);
      const {uri} = image;
      const task = storage().ref(`profileImages/${imageName}`).putFile(uri);

      task.on('state_changed', (snapshot) => {});
      try {
        await task;
        storage()
          .ref(`profileImages/${imageName}`)
          .getDownloadURL()
          .then((url) => {
            const body = {
              imageUri: url,
            };
            Http.put(`auth/profileImage/${userId}`, body).then((data) => {
              if (data.status) {
                setLoading(false);
                setImage(null);
                getImageData();
              }
            });
          });
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };

  return (
    <View>
      {isLoading == true ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#c20202" />
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => imageUploadHandler()}>
        <View style={styles.profileIcon}>
          {!profile ? (
            <Icon
              round={true}
              size={60}
              type={IconStyles.iconType}
              color={'purple'}
              raised
              name="ios-person"
            />
          ) : (
            <Fragment>
              <Image
                onPress={() => imageUploadHandler()}
                style={{
                  borderRadius: 100,
                  marginTop: 10,
                  width: 120,
                  height: 120,
                }}
                source={{uri: profile}}
              />
            </Fragment>
          )}
        </View>
      </TouchableOpacity>
      {image ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            width: 200,
            borderRadius: 100,
            alignSelf: 'center',
          }}
          onPress={() => uploadImage()}>
          <Text
            style={{textAlign: 'center', color: '#fff', paddingVertical: 10}}>
            Upload
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  profileIcon: {alignSelf: 'center'},
});

export default ProfileImage;
