import React from 'react';
import { StyledButton } from './styles';

// eslint-disable-next-line react/prop-types
export default function Button({ text }) {
  return (
    <StyledButton>
      {text}
    </StyledButton>
  );
}
