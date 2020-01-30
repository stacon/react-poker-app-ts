import * as React from 'react';
import './Layout.css';

import Routes from 'src/components/Routes';
import Navbar from '../UI/Navigation/Navbar/Navbar';
import DialogManager from '../UI/DialogManager/DialogManager';

const layout = () => (
  <>
    <DialogManager />
    <Navbar />
    <div className="container">
      <Routes />
    </div>
  </>
);

export default layout;
