import { Brandy, ForkKnife } from 'phosphor-react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <Link to="/foods">
        <ForkKnife size={40} color="#fff" />
      </Link>
      <Link to="/drinks">
        <Brandy size={40} color="#fff" />
      </Link>
    </Container>
  );
}
