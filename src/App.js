import React, {Fragment, Component} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import {StatusBar} from 'react-native';
class App extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor="black" />
        <MainRouting />
        <LoaderComponent />
      </Fragment>
    );
  }
}
export default App;
