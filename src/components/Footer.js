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
