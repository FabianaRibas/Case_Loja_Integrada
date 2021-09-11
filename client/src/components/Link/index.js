import React from 'react';
import { ContentLink } from './styles';

// eslint-disable-next-line react/prop-types
export default function Link({ href, text }) {
  return (
    <ContentLink>
      <a
        style={{
          letterSpacing: '.05rem',
          fontWeight: '300',
          fontFamily: ' Roboto, sans-serif',
          fontSize: '1.4rem',
          color: '#8091AA',
        }}
        href={href}
      >
        {text}
      </a>
    </ContentLink>
  );
}
