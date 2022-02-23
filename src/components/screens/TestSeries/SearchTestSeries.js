import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {API_NAME} from '../../../API/ApiPaths';
import Http from '../../../API/HttpService';
import {Avatar, ListItem} from 'react-native-elements';

const SearchTestSeries = (props) => {
  const [data, setData] = useState([]);
  const previousSearchTermRef = useRef('');

  const setDebouncedSearchTerm = (value) => {
    previousSearchTermRef.current = value;
    setTimeout(async () => {
      if (previousSearchTermRef.current === value) {
        try {
          const query = {
            search: value,
          };
          Http.get(API_NAME.ALL_TEST_SERIES_SEARCH, {params: query}).then(
            (data) => {
              setData(data.data);
            },
          );
        } finally {
        }
      }
    }, 500);
  };

  const routeToDescription = (data) => {
    props.navigation.navigate('exam', {
      testSeriesId: data._id,
      testSeriesData: data,
    });
  };

  return (
    <View style={{backgroundColor: '#fff', height: '80%'}}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#000"
        onChangeText={(e) => setDebouncedSearchTerm(e)}
        placeholder="Search test series..."
      />
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

export default SearchTestSeries;

const styles = StyleSheet.create({
  input: {
    color: '#000',
    fontSize: 15,
    borderBottomColor: '#000',
    //shadow
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#fff',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
});
