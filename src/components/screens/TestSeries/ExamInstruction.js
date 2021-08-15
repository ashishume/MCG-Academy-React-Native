import React, {Fragment, useEffect} from 'react';
import {
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchAllQuestions} from '../../../store/actions/testSeries';
import {IconStyles} from '../../Styles';
const ExamInstruction = (props) => {
  const {name = '', desc = '', onlyView} = props.route.params;
  const routeToExamScreen = () => {
    if (props?.testQuestions?.length) {
      props.navigation.navigate('ExamScreen', {
        examData: props.route.params?.data,
        questions: props.testQuestions,
      });
    } else {
      ToastAndroid.show('No questions available', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (!onlyView) {
      props.navigation.setOptions({
        title: 'Instructions',
      });
      const fetchData = async () => {
        await props.fetchAllQuestions(props.route.params?.data._id);
      };
      fetchData();
    }
  }, []);

  return (
    <View>
      {!onlyView ? (
        <ScrollView style={{margin: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>
            {props.route.params?.data.name}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              marginHorizontal: 10,
              fontSize: 15,
              marginVertical: 10,
            }}>
            {props.route.params?.data.instructions}
          </Text>
          <View style={{marginTop: 5}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                borderTopWidth: 2,
                marginVertical: 5,
                paddingTop: 3,
                borderTopColor: 'rgba(0,0,0,0.1)',
              }}>
              Important information
            </Text>
            <Text>The symbols represents</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="checkmark"
                size={15}
                reverse
                color="rgba(32, 178, 30,0.8)"
                type={IconStyles.iconType}
              />
              <Text>Correct</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="close"
                size={15}
                reverse
                color="rgba(204, 46, 46,0.8)"
                type={IconStyles.iconType}
              />
              <Text>Wrong</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="warning"
                size={15}
                reverse
                color="rgba(206, 161, 26,0.6)"
                type={IconStyles.iconType}
              />
              <Text>Not attempted</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => routeToExamScreen()}
            style={{
              backgroundColor: 'green',
              height: 40,
              justifyContent: 'center',
              borderRadius: 20,
              width: '100%',
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Start test</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Fragment>
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>
            {name}
          </Text>
          <Text
            style={{
              textAlign: 'justify',
              marginHorizontal: 10,
              fontSize: 15,
              marginTop: 10,
            }}>
            {desc}
          </Text>
        </Fragment>
      )}
    </View>
  );
};
const mapStateToProps = ({testSeries}) => {
  const {testQuestions} = testSeries;
  return {
    testQuestions,
  };
};

export default connect(mapStateToProps, {fetchAllQuestions})(ExamInstruction);
