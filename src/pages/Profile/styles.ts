import styled from 'styled-components';

export const Container = styled.div`
  color: ${({ theme }) => theme['gray-500']};
`;

export const UserCard = styled.section`
  margin-top: 8px;
  margin-bottom: 20PX;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme['gray-100']};
  border-radius: 10px;
  padding: 20px;

  h2 {
    font-size: 16px;
  }

  p {
    margin-top: 10px;
    font-size: 14px;
  }
`;

export const OptionsMenu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;

  button {
    height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #FB9400;
    border: none;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
    transition: background-color 0.2s ease-in-out;

    :hover {
      background-color: #b36900;
    }
  }
`;
