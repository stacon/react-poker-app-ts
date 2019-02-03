import * as React from 'react';
import Layout from '../components/Layout/Layout';
import store from 'src/store/app.store';

class App extends React.Component {
  componentDidMount(){
    console.log(store.getState());
  }

  public render() {
    return <Layout/>;
  }
};

export default App;
