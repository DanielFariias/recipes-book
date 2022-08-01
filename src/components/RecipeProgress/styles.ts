import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
  color: ${({ theme }) => theme['gray-500']};
`;

export const Header = styled.header`
  .header-title {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #FB9400;
    padding-bottom: 10px;

    a {
      display: flex;
      padding: 0;
      margin: 0;
      background-color: #FB9400;
      padding: 10px;
      border-radius: 10px;
      z-index: 1;
    }

    h1 {
      width: 100%;
      text-align: center;
      transform: translateX(-20px);
      color: #FB9400;
      font-family: serif;
      font-size: 40px;
    }
  }

  .header-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    h1 {
      color: #FB9400;
      font-size: 30px;
    }

    > button {
      border: none;
    }

    a, > button {
      display: flex;
      background-color: #FB9400;
      padding: 10px;
      border-radius: 10px;
    }
  }

  .header-info {
    margin-top: 20px;
    margin-bottom: 10px;

    img {
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 0 6px #FB9400;
    }

  }
`;

const Card = styled.section`
  margin-top: 8px;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme['gray-100']};
  border-radius: 10px;
  padding: 20px;

  h2 {
    font-size: 20px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    text-align: justify;
  }
`;

export const IngredientsCard = styled(Card)`
  margin-top: 24px;

  p {
    margin-top: 5px;

    &:first-of-type {
      margin-top: 10px;
    }
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;

    input {
      margin-right: 10px;
      accent-color: #FB9400;
      width: 20px;
      height: 20px;
    }
  }
`;

export const InstructionsCard = styled(Card)`

`;

export const FinishButton = styled.button`
  position: fixed;
  width: 500px;
  height: 50px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  border: none;
  background-color: #FB9400;
  color: #fff;

  font-size: 24px;
  transition: background-color 0.2s ease-in-out;

  :hover:not(:disabled) {
    background-color: #b36900;
  }

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
