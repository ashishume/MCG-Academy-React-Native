import React, {Component, Fragment} from 'react';
import http from '../API/HttpService';
import {loading} from '../store/actions/loader';
import {connect} from 'react-redux';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

class LoaderComponent extends Component {
  componentDidMount() {
    const self = this;
    http.interceptors.request.use(
      (request) => {
        self.props.loading(true);
        return request;
      },
      (error) => {
        self.props.loading(false);

        return Promise.reject(error);
      },
    );

    http.interceptors.response.use(
      (response) => {
        self.props.loading(false);
        return response;
      },
      (error) => {
        self.props.loading(false);
        return Promise.reject(error);
      },
    );
  }
  render() {
    return (
      <Fragment>
        {this.props.loader ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
            }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
  };
};
export default connect(mapStateToProps, {loading})(LoaderComponent);
