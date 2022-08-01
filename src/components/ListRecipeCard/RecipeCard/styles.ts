import styled from 'styled-components';

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme['gray-100']};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme['gray-400']};
    /* color: #FB9400; */

    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;

    img {
      width: 100%;
      padding: 10px;
      border-radius: 15px;
    }
  }


`;
