import React, {Fragment, Component} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';

class App extends Component {
  render() {
    return (
      <Fragment>
        <MainRouting />
        <LoaderComponent />
      </Fragment>
    );
  }
}
export default App;
