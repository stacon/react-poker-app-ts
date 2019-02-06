import * as React from 'react';
import './Layout.module.css';

import Routes from 'src/components/Routes';
import Navbar from '../UI/Navigation/Navbar/Navbar';

const layout = () => (
  <>
  <Navbar/>
  <div className="container">
      <Routes />
  </div>
  </>
);

export default layout;
