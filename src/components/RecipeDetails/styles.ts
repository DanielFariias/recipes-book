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

    h2 {
      color: #FB9400;
      font-size: 30px;
      text-align: center;
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

export const IngredientsCard = styled.section`
  margin-top: 24px;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme['gray-100']};
  border-radius: 10px;
  padding: 20px;

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    margin-top: 5px;

    &:first-of-type {
      margin-top: 10px;
    }
  }
`;

export const InstructionsCard = styled.section`
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

export const VideoCard = styled.section`
  margin-top: 8px;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme['gray-100']};
  border-radius: 10px;
  padding: 20px;

  h2 {
    font-size: 20px;
  }

  iframe {
    margin-top: 10px;
    width: 100%;
    border-radius: 10px;
  }
`;

export const RecommendationsCard = styled.section`
  margin-top: 8px;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme['gray-100']};
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;

  h2 {
    font-size: 20px;
  }

  div {
    margin-top: 10px;
    width: 100%;
    display: flex;
    gap: 20px;
    overflow: hidden;
    overflow-x: scroll;

    img {
        border-radius: 10px;
    }
  }
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

  :hover {
    background-color: #b36900;
  }
`;
