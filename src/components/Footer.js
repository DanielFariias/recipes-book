import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const styles = {
  position: 'fixed',
  width: '100%',
  maxWidth: 428,
  backgroundColor: '#ff0',
  bottom: 0,
  left: 0,
};

export default function Footer() {
  return (
    <footer
      style={styles}
      data-testid="footer"
    >
      <Link to="/drinks">
        <img src={drinkIcon} alt="" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={mealIcon} alt="" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}
