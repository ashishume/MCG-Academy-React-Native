import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
} from 'react-native';
import {MultipleSelectPicker} from 'react-native-multi-select-picker';
const width = Dimensions.get('screen').width;
const Preference = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  let tempArray = [];
  if (props.category.length) {
    props.category.map((value) => {
      tempArray.push({label: value.name, value: value.name});
    });
  }
  const selectCategoryHandler = () => {
    props.passItems(selectedItems);
    props.closeModal();
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MultipleSelectPicker
              items={tempArray}
              onSelectionsChange={(ele) => setSelectedItems(ele)}
              selectedItems={selectedItems}
              style={{
                width: width - 30,
                marginBottom: 10,
              }}
              buttonStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonText="hello"
              checkboxStyle={{height: 20, width: 20}}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                disabled={!selectedItems.length ? true : false}
                onPress={() => selectCategoryHandler()}
                style={{...styles.openButton, backgroundColor: '#2196F3'}}>
                <Text style={styles.textStyleDone}>Done</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => props.closeModal()}
                style={{...styles.openButton, backgroundColor: '#fff'}}>
                <Text style={styles.textStyleClose}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Preference;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width - 20,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyleDone: {
    color: '#fff',
  },
  textStyleClose: {
    color: '#000',
  },
});
