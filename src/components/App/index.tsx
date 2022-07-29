import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { RecipesProvider } from '../../context/RecipesContext';

import { Container } from './styles';
import { defaultTheme } from '../../assets/styles/themes/default';
import GlobalStyles from '../../assets/styles/global';
import { Routes } from '../../Routes';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>

        <RecipesProvider>
          <Container>
            <Routes />
          </Container>
        </RecipesProvider>
        <GlobalStyles />

      </BrowserRouter>
    </ThemeProvider>
  );
}
