import React, {useEffect, Fragment, useState} from 'react';
import {View, Text, FlatList, ToastAndroid} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchAllExams} from '../../../store/actions/testSeries';
import {activateVideo} from '../../../store/actions/video';
import {IconStyles} from '../../Styles';
import ExamsListTemplate from './Templates/ExamsListTemplate';
import {API_NAME} from '../../../API/ApiPaths';
import HttpService from '../../../API/HttpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestSeriesHeader from '../../Shared/TestSeriesHeader';
import {onShareHandler} from '../../Utils/ShareInfo';
const ExamsListView = (props) => {
  const {testSeriesId, continueToInstruction = false} = props.route.params;
  const [isTestSeriesBought, setIsTestSeriesBought] = useState(false);
  const [boughtTestSeries, setBoughtTestSeries] = useState({});
  const [testSeriesData, setTestSeriesData] = useState({});
  const [testExams, setTestExams] = useState([]);
  const [myTestSeries, setMyTestSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const examListResponse = await HttpService.get(
        `${API_NAME.TEST_SERIES_EXAMS}/${testSeriesId}`,
      );
      const testSeriesResponse = await HttpService.get(
        `${API_NAME.TEST_SERIES_BY_ID}/${testSeriesId}`,
      );

      // let userIdData;
      try {
        const userIdData = await AsyncStorage.getItem('userId');
        const myTestSeriesResponse = await HttpService.get(
          API_NAME.GET_BOUGHT_TEST_SERIES + '/' + userIdData,
        );

        await setTestSeriesData(testSeriesResponse.data);
        await setTestExams(examListResponse.data);
        await setMyTestSeries(myTestSeriesResponse.data);

        const setTestData = myTestSeriesResponse.data.filter(
          (value) => value.test._id === testSeriesId,
        );
        await setBoughtTestSeries(setTestData[0]);
        await setIsTestSeriesBought(setTestData?.length ? true : false);
      } catch (e) {
        // ToastAndroid.show('Something went Wrong', ToastAndroid.SHORT);
      }
    };
    fetchData();
  }, [testSeriesId]);

  const moveToVideoSolution = () => {
    const body = {
      introVideoUrl: testSeriesData.videoSolutionLink,
      courseTitle: testSeriesData.name + '(video solution)',
    };
    props.activateVideo(body);
    props.navigation.navigate('VideoSolutionTestSeries', testSeriesData); //NAVIGATE TO VIDEO AND COMMENTS PAGE
  };

  return (
    <>
      {/* Header */}
      <TestSeriesHeader
        headerName="Exam"
        iconName="share-social"
        navigation={props.navigation}
        onPressHandler={() =>
          onShareHandler(
            testSeriesData?.name,
            testSeriesData?.examImageUrl,
            'exam',
            testSeriesId,
          )
        }
      />

      <View
        style={{
          margin: 10,
        }}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {testExams?.length} tests
        </Text>
        {isTestSeriesBought ? (
          <View>
            <Text style={{fontSize: 15, textAlign: 'center'}}>
              Valid till {new Date(boughtTestSeries?.expiryDate).toDateString()}
            </Text>
            <Icon
              name="videocam"
              size={20}
              onPress={() => moveToVideoSolution()}
              raised
              containerStyle={{alignSelf: 'center'}}
              type={IconStyles.iconType}
            />
            <Text style={{textAlign: 'center'}}>
              Test series video solution
            </Text>
          </View>
        ) : null}
        <FlatList
          data={testExams}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({item}) => {
            return (
              <ExamsListTemplate
                testSeriesData={testSeriesData}
                isTestSeriesBought={isTestSeriesBought}
                continueToInstruction={continueToInstruction}
                {...props}
                item={item}
              />
            );
          }}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({testSeries}) => {
  const {testExams, myTestSeries} = testSeries;
  return {testExams, myTestSeries};
};

export default connect(mapStateToProps, {
  fetchAllExams,
  activateVideo,
})(ExamsListView);
