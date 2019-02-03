import React from 'react';
import './Navbar.module.css';
import { connect } from 'react-redux';
import { AppState } from 'src/store/app.store';

interface Props {
  name: string,
  balance: number,
}

const mapStateToProps = (state: AppState) => (
  {
    name: state.user.name,
    balance: state.user.balance
  }
)

const navBar = ({name, balance}: Props) => (
  <header className="Navbar">
      <p>
        Hello, <span className="name">{name}</span> |
        Balance: <span className="balance">{balance.toFixed(2)}</span>
        &nbsp;&euro;
      </p>
      <nav>
          ...
      </nav>
  </header>
);

export default connect(mapStateToProps)(navBar);