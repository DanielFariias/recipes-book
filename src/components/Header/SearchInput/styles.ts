import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  margin-top: 24px;

  small {
    display: block;
    color: ${({ theme }) => theme['gray-400']};
    margin-bottom: 10px;
  }

  section {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 20px;
    color: ${({ theme }) => theme['gray-400']};
    border: 2px solid ${({ theme }) => theme['gray-100']};
    border-radius: 8px;


    input {
      height: 40px;
      outline: none;
      border: 0;
      padding-left: 10px;
      font-size: 16px;
      background-color: transparent;

      ::placeholder {
        color: ${({ theme }) => theme['gray-300']};

      }
    }

    button {
      padding-right: 10px;
      height: 40px;
      border: 0;
      background-color: transparent;
    }
  }

  div {
  display: flex;
  justify-content: space-between;
  align-items: center;

    label {
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
        color: ${({ theme }) => theme['gray-400']};
        text-transform: uppercase;
        font-size: 12px;
      }

      input {
        accent-color: #FB9400;
      }
    }
  }
`;
