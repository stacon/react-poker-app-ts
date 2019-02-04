import * as React from 'react';
import './Layout.module.css';

import Routes from 'src/screens/Routes';
import Navbar from '../../containers/UI/Navigation/Navbar/Navbar.container';

const layout = () => (
  <>
  <Navbar/>
  <div className="container">
      <Routes />
  </div>
  </>
);

export default layout;
