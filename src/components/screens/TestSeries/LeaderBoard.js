import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, ToastAndroid, TouchableOpacity, Text} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchLeaderboardData} from '../../../store/actions/testSeries';

const LeaderBoard = (props) => {
  const {examId, examName} = props.route.params;
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: null,
    });
    props.fetchLeaderboardData(examId);
    fetchUserId();

    return () => {
      fetchUserId();
      props.fetchLeaderboardData(examId);
    };
  }, []);

  const [user, setUser] = useState('');
  const fetchUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userId');
      setUser(userData);
    } catch (e) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{height: '100%', width: '100%', margin: 5}}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Dashboard');
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 10,
            backgroundColor: 'rgba(47, 175, 75,0.3)',
            borderRadius: 10,
          }}>
          <Text
            style={{fontSize: 18, paddingLeft: 5, marginVertical: 10}}
            numberOfLines={1}>
            Go Home
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text
          style={{fontSize: 18, paddingLeft: 5, marginVertical: 10}}
          numberOfLines={1}>
          {examName}
        </Text>
      </View>
      {props.leaderboard.map((value, i) => {
        return (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={{
              backgroundColor:
                user === value?.user?._id ? 'rgba(34, 108, 127,0.3)' : '',
            }}>
            {value?.user?.profileImage ? (
              <Avatar
                rounded
                source={{
                  uri: value?.user?.profileImage,
                }}
              />
            ) : (
              <Avatar source={require('../../../assets/user.png')} />
            )}

            <ListItem.Content>
              <ListItem.Title>{value?.user?.name}</ListItem.Title>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                {value.score} marks
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {leaderboard} = testSeries;
  return {leaderboard};
};
export default connect(mapStateToProps, {fetchLeaderboardData})(LeaderBoard);
