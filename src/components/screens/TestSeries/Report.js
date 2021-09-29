import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import {reportQuestion} from '../../../store/actions/testSeries';

const Report = (props) => {
  const {questionId, reportData} = props;

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('name');
        setName(data);
      } catch (e) {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }
    };
    fetchData();
  }, []);

  const onReportHandler = async () => {
    const body = {
      question: questionId,
      description,
      reportedBy: name,
      category: reportData.category,
      examId: reportData._id,
    };
    await reportQuestion(body);
    await props.closeModal();
    await setDescription('');
  };
  return (
    <Modal animationType="slide" visible={props.visible}>
      <View
        style={{
          width: '100%',
          height: '100%',
          marginRight: 10,
          paddingHorizontal: 10,
        }}>
        <View>
          <TextInput
            onChangeText={(e) => setDescription(e)}
            value={description}
            multiline={true}
            numberOfLines={5}
            style={{
              color: '#000',
              paddingHorizontal: 8,
              margin: 10,
              borderWidth: 1,
              fontSize: 15,
              borderRadius: 10,
              borderColor: 'rgba(0,0,0,0.6)',
            }}
            placeholderTextColor="#000"
            placeholder="Report your problem here..."
          />
        </View>

        <View style={{marginHorizontal: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#c20202',
              height: 50,
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => onReportHandler()}>
            <Text
              style={{
                fontSize: 17,
                color: '#fff',
                textAlign: 'center',
              }}>
              Submit report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#fff',
              height: 50,
              borderColor: '#c20202',
              borderWidth: 1,
              marginLeft: 20,
              flex: 1,
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() => props.closeModal()}>
            <Text
              style={{
                fontSize: 17,
                color: '#000',
                textAlign: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Report;
