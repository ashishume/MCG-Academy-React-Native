import React, {useEffect, Fragment, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchAllExams} from '../../../store/actions/testSeries';
import {activateVideo} from '../../../store/actions/video';
import {IconStyles} from '../../Styles';
import ExamsListTemplate from './Templates/ExamsListTemplate';
const ExamsListView = (props) => {
  const {
    testSeriesId,
    continueToInstruction = false,
    testSeriesData = {},
  } = props.route.params;
  const [isTestSeriesBought, setIsTestSeriesBought] = useState(false);
  const [boughtTestSeries, setBoughtTestSeries] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllExams(testSeriesId);
      const setTestSeriesData = props.myTestSeries.filter(
        (value) => value.test._id === testSeriesId,
      );
      await setBoughtTestSeries(setTestSeriesData[0]);
      await setIsTestSeriesBought(setTestSeriesData.length ? true : false);
      await props.navigation.setOptions({
        headerRight: () => (
          <Icon
            name="videocam"
            size={20}
            onPress={() => moveToVideoSolution()}
            raised
            containerStyle={{marginRight: 5}}
            type={IconStyles.iconType}
          />
        ),
      });
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
    <View
      style={{
        margin: 10,
      }}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        {props?.testExams?.length} tests
      </Text>
      {isTestSeriesBought ? (
        <Fragment>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Valid till {new Date(boughtTestSeries?.expiryDate).toDateString()}
          </Text>
        </Fragment>
      ) : null}

      <FlatList
        data={props.testExams}
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
