import React, {Fragment, Component} from 'react';
import MainRouting from './Routes/MainRouting';
import LoaderComponent from './components/LoaderComponent';
import Payment from './payment';
class App extends Component {
  render() {
    return (
      <Fragment>
        <MainRouting />
        {/* <Payment/> */}
        <LoaderComponent />
      </Fragment>
    );
  }
}
export default App;
