import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px 20px 20px;
`;

export const HeaderMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: serif;
    font-size: 38px;
    color: ${({ theme }) => theme['gray-500']};
    text-align: center;
  }

  button {
    border: none;
    background-color: transparent;

    :disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
`;
