import React, { useEffect } from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  useEffect(() => {
    console.log('Button rendered');
  }, []);

  return (
      <button className={css.loadmore} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
