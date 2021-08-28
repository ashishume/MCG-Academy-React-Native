import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

const AllTestSeriesListTemplate = (props) => {
  const routeToDescription = (data) => {
    props.navigation.navigate('Exams List', {
      testSeriesId: data._id,
      testSeriesData: data,
    });
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, []);

  return (
    <View style={{marginHorizontal: 10}}>
      <FlatList
        keyExtractor={(item) => item._id.toString()}
        data={data}
        ListEmptyComponent={() => {
          return <Text>No test series found</Text>;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => routeToDescription(item)}>
              <ListItem bottomDivider>
                <Avatar
                  rounded
                  source={{
                    uri: item.examImageUrl,
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                  <ListItem.Title style={{fontWeight: 'bold'}}>
                    {item.timeLimit} days
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AllTestSeriesListTemplate;
