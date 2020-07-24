import React, {Component, Fragment} from 'react';
import {Text, View, Linking} from 'react-native';
import {fetchAllLibrary} from '../../../store/actions/library';
import {connect} from 'react-redux';
import LibraryCard from './LibraryCard';
import TopHeader from '../../Shared/Header';
import {ScrollView} from 'react-native-gesture-handler';

class Library extends Component {
  componentDidMount() {
    this.props.fetchAllLibrary();
  }
  clickLibraryItem = (e) => {
    Linking.openURL(e.fileUrl);
  };
  render() {
    return (
      <Fragment>
        <TopHeader name="Library files" />
        <View
          style={{height: '100%', backgroundColor: '#fff', paddingBottom: 70}}>
          <ScrollView scrollEventThrottle={25} indicatorStyle="black">
            {this.props.library.map((value, i) => {
              return (
                <LibraryCard
                  content={value}
                  key={i}
                  onClickLibrayItem={() => this.clickLibraryItem(value)}
                />
              );
            })}
          </ScrollView>
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    library: state.library.library,
  };
};
export default connect(mapStateToProps, {fetchAllLibrary})(Library);
