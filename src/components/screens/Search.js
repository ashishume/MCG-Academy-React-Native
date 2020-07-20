import React, {Component, Fragment} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
class Search extends Component {
  render() {
    return (
      <Fragment>
        <View style={{marginBottom: 10}}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCompleteType="email"
            keyboardType={'email-address'}
            placeholderTextColor="#fff"
          />
          {/* <Text style={styles.errorText}>{this.state.errors.email}</Text> */}
        </View>
      </Fragment>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  headerContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
    color: '#fff',
  },
  label: {
    color: '#fff',
    marginBottom: -10,
  },
  input: {
    color: 'white',
    borderBottomWidth: 1,
    fontSize: 15,
    paddingLeft: 0,
    borderBottomColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#fff',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 15,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'white',
  },
});
