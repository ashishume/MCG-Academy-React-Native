import React, {Component, Fragment} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import TopHeader from '../../Shared/Header';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchAllCategories} from '../../../store/actions/category';
import {connect} from 'react-redux';
class AddVideos extends Component {
  componentDidMount() {
    // this.props.fetchAllCategories();
  }

  state = {
    courseTitle: '',
    courseDescription: '',
    category: '',
    courseType: '',
    courseImage: '',
    introVideoUrl: '',
    content: [],
    price: '',
    otherUrl: '',
    timeLimit: '',
    author: '', //to be picked from async storage
  };
  render() {
    return (
      <Fragment>
        <TopHeader name="Add Course Videos" />
        <View style={styles.container}>
          <Text style={styles.label}>Course Title</Text>
          <TextInput
            onChangeText={(courseTitle) => this.setState({courseTitle})}
            style={styles.Input}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            numberOfLines={4}
            multiline={true}
            onChangeText={(courseDescription) =>
              this.setState({courseDescription})
            }
            style={styles.TextArea}
          />
          <Text style={styles.label}>Introduction Video</Text>
          <TextInput
            onChangeText={(introVideoUrl) => this.setState({introVideoUrl})}
            style={styles.Input}
          />
          {/* <Text style={styles.label}>Category</Text>
           <Picker
            // selectedValue={this.state.category}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            {this.props.categories.map((value, i) => {
              return <Picker.Item label={value} key={i} value={value} />;
            })}
          </Picker> */}
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.category,
  };
};

export default connect(mapStateToProps, {fetchAllCategories})(AddVideos);

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

  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  // },
  // buttonView: {
  //   flexDirection: 'row',
  // },
  // textInput: {
  //   height: 40,
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   margin: 20,
  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
});
