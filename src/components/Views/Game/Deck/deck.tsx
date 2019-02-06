// lodash
import _ from 'lodash';

// core
import React from 'react';

// css
import './deck.module.css';

const Deck = (props: { size: number }): JSX.Element => (
  <ul className="deck">
    {_.times(52,
      () =>
        <li>
          <div className="card back">*</div>
        </li>
    )}
  </ul>
)

export default Deck;