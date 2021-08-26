import styled from 'styled-components';
import colors from './globals';

export const Form = styled.form`
  display: grid;
  place-content: center;
  grid-gap: 0.5rem;
  background-color: #e9f2fd;
  padding: 1rem;
`;

export const Label = styled.label`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1;
`;

const focus = `
:focus {
    border-color: hsl(${colors.focus.h}, ${colors.focus.s}, ${colors.focus.l});
    box-shadow: 0 0 0 3px
      hsla(
        ${colors.focus.h},
        ${colors.focus.s},
        calc(${colors.focus.l} + 40%),
        0.8
      );
    outline: 3px solid transparent;
  }`;

export const Input = styled.input`
  font-size: 16px;
  font-size: Max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 0.5em;
  background-color: #fff;
  border: 2px solid ${colors.primary};
  border-radius: 4px;
  transition: 180ms box-shadow ease-in-out;
  ${focus}
`;

export const Button = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  display: inline-block;
  ${focus}
`;

export const Error = styled.p`
  background-color: red;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
`;
