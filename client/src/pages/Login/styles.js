import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #F6FBFF;
  @media(max-width: 800px) {
    min-width: 50vw;
    min-height: 50vh;
    display: fixed;
  };
`;

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width:50vw;
  min-height: 100vh;
  @media(max-width: 800px) {
    width:100vw;

  };
`;

export const ContainerLeft = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, #a9e6e6 , #fbeee7);
  width:50vw;
  @media(max-width: 800px) {
    display: none
  };
`;

export const ContentHeaderRight = styled.div`
  display: none;
  @media(max-width: 800px) {
    display: flex;
    margin: 40px 0px;
  };

`;

export const ContentRight = styled.div`
  display: grid;
  width:50vw;
  margin: auto;
  place-items: center;
  @media(max-width: 800px) {
    width:100vw;
  };

`;

export const ContentLinkPosition = styled.div`
  margin-top: 10rem;
  @media(max-width: 800px) {
    margin-top: 7rem;
  };
`;
