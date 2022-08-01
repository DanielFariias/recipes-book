import styled from 'styled-components';

export const Container = styled.div``;

export const OptionsMenu = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;

  button {
    width: 100%;
    height: 30px;
    text-transform: uppercase;
    font-size: 12px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #FB9400;

    :hover:not(:disabled) {
      background-color: #b36900;
    }

    :disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;
