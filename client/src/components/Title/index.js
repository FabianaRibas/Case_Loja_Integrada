import React from 'react';
import { ContentTitle } from './styles';

// eslint-disable-next-line react/prop-types
export default function Title({ text }) {
  return (
    <ContentTitle
      style={{
        justifyContent: 'center',
      }}
      alt="Painel de Contole"
    >
      {text}
    </ContentTitle>
  );
}
