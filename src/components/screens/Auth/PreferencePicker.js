import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
import {fetchAllCategories} from '../../../store/actions/category';
import {connect} from 'react-redux';
import {signupUser} from '../../../store/actions/auth';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const PreferencePicker = (props) => {
  useEffect(() => {
    props.fetchAllCategories();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);
  let tempArray = [];
  if (props.category.length) {
    props.category.map((value) => {
      tempArray.push({label: value.name, value: value.name});
    });
  }
  const submitSignup = async () => {
    let category = [];
    await selectedItems.map((v) => {
      category.push(v.value);
    });
    const body = {
      ...props.route.params,
      category,
    };
    console.log(body);
    await props.signupUser(body, props);
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={{margin: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Choose preference
        </Text>
        <MultipleSelectPicker
          items={tempArray}
          onSelectionsChange={(ele) => setSelectedItems(ele)}
          selectedItems={selectedItems}
          buttonStyle={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          buttonText="hello"
          checkboxStyle={{height: 20, width: 20}}
        />
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: '#fff',
          shadowColor: '#fff',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          margin: 20,
          padding: 20,
          elevation: 15,
        }}
        disabled={!selectedItems.length ? true : false}
        onPress={() => submitSignup()}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Done
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    category: state.category.category,
  };
};
export default connect(mapStateToProps, {
  fetchAllCategories,
  signupUser,
})(PreferencePicker);
