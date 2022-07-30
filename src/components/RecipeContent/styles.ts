import styled from 'styled-components';

export const HeaderButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  margin-bottom: 20px;

  button {
    text-transform: uppercase;
    height: 30px;
    font-size: 14px;
    border: 0;
    border-radius: 4px;
    color: #ffffff;
    background-color: #FB9400;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.4s ease-in-out;

    :hover {
      background-color: #b36900;
    }
  }
`;
