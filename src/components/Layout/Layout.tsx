import * as React from 'react';
import './Layout.module.css';

import ScreensRoot from 'src/screens/Routes';
import { Navbar } from '../UI';

const layout = () => (
  <>
  <Navbar/>
  <div className="container">
    {/* <div className="playingCards faceImages"> */}
      <ScreensRoot />
  </div>
  </>
);

export default layout;
