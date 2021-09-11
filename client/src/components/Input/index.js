import React from 'react';
import { StyledInput } from './styles';

export default function Input({
  // eslint-disable-next-line react/prop-types
  name, placeholder, type, register,
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledInput name={name} placeholder={placeholder} type={type} {...register(`${name}`)} />
  );
}
