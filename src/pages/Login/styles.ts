import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 120px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    font-family: serif;
    margin-bottom: 32px;
  }

  p {
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #FB9400;
    padding:0 5px 24px;

    span {
      color: ${({ theme }) => theme['gray-500']}
    }
  }

  > div {
    position: relative;
    top: -2px;
    z-index: -1;

    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme['gray-100']};
  }
`;

export const Form = styled.form`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    height: 50px;
    padding-left: 20px;
    border: none;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme['gray-400']};
    border-radius: 4px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);

    ::placeholder {
      color: ${({ theme }) => theme['gray-400']};
    }

    :focus {
      outline: 2px solid #FB9400;
    }
  }

  button {
    height: 50px;
    background-color: #FB9400;
    border: none;
    font-size: 22px;
    color: #ffffff;
    border-radius: 4px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);

    :disabled {
      background-color: #FB9400;
      opacity: 0.4;
      color: #ffffff;
      box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);

    }
  }
`;
