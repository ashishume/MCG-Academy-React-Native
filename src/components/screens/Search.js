import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Http from '../../API/HttpService';
import CourseCardListItem from './MyCourses/CourseCardListItem';
const Search = (props) => {
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
          Http.get('search/', {params: query}).then((data) => {
            setData(data.data);
          });
        } finally {
        }
      }
    }, 500);
  };
  const courseEventHandler = (value) => {
    props.navigation.navigate('CourseDetails', value);
  };
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#000"
        autoFocus={true}
        onChangeText={(e) => setDebouncedSearchTerm(e)}
        placeholder="Search courses here..."
      />
      <View>
        <ScrollView>
          {data.map((value, i) => {
            return (
              <CourseCardListItem
                key={i}
                {...props}
                onClickCourseItem={() => courseEventHandler(value)}
                contentData={value}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    color: '#000',
    fontSize: 15,
    borderBottomColor: '#000',
    //shadow
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#fff',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
});
