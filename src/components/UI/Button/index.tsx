// core
import React from 'react';

// css
import './stylesheet.css';

const Button = (props: any): JSX.Element => {

  return (
            <button
              className={ props.btnClasses }
              onClick={ () => props.btnHandler }
            >
                { props.btnText }
            </button>
  );

}

export default Button;