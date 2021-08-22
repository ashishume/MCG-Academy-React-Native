import React from 'react';
import {View, Text, FlatList} from 'react-native';
import ExamsTemplateCard from './Templates/ExamsTemplateCard';
import MyTestsTemplate from './Templates/MyTestsTemplate';

const MyBoughtTests = (props) => {
  const {myTests} = props.route.params;
  const continueToTest = (data) => {
    const newData = data.test;
    props.navigation.navigate('Exam description', {
      onlyView: false,
      data: newData,
    });
  };
  return (
    <View>
      <FlatList
        data={myTests}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 10}}>
            No tests available
          </Text>
        }
        renderItem={({item, index}) => {
          return (
            <MyTestsTemplate
              continueToTest={(data) => continueToTest(data)}
              data={item}
            />
          );
        }}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

export default MyBoughtTests;
