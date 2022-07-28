import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        width: '100%',
        maxWidth: 428,
        backgroundColor: '#ff0',
        bottom: 0,
        left: 0,
      }}
    >
      <Link to="/drinks">
        <img src={drinkIcon} alt="" />
      </Link>
      <Link to="/foods">
        <img src={mealIcon} alt="" />
      </Link>
    </footer>
  );
}
