import styled from 'styled-components';

export const Container = styled.div`
  color: ${({ theme }) => theme['gray-500']};
  padding-bottom: 20px;

  & + & {
    padding-top: 20px;
    border-top: 2px solid #ffd87d;
  }

  a {
    img {
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 0 6px #FB9400;
    }
  }
`;

export const RecipeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  button {
    display: flex;
    background-color: #FB9400;
    padding: 10px;
    border-radius: 10px;
    border: none;
  }

  .recipe-info {
    display: flex;
    flex-direction: column;
  }

  .options-menu {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
