import styled from 'styled-components';

export const StyledInput = styled.input`
  display: flex;
  width: 70%;
  padding: 1rem 1.5rem;
  margin: 1rem 3rem 0rem 3rem;
  background-color: #fff;
  color: #1D437A;
  font-size: 1.5rem;
  letter-spacing: .05rem;
  border: 1px solid #CDD8E3;
  border-radius: 2px;
  box-shadow: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #33c3f0;
  };

  @media(max-width: 800px) {
    font-size: 1.4rem;
    height: 3rem;
  };
`;
