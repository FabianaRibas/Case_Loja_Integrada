import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  width: 70%;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 30px;
  letter-spacing: .05rem;
  color: #FFF;
  background-color: #96C423;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  margin: 1rem 3rem 0rem 3rem;

  &:hover {
    background-color: #96b423;
  };

   @media(max-width: 800px) {
    font-size: 1.4rem;
    text-align: center;
    line-height: 20px;
  };
`;
