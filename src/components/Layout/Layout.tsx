import * as React from 'react';
import './Layout.module.css';

import Routes from 'src/screens/Routes';
import { Navbar } from '../UI';

const layout = () => (
  <>
  <Navbar/>
  <div className="container">
    {/* <div className="playingCards faceImages"> */}
      <Routes />
  </div>
  </>
);

export default layout;
