import styled, { css } from "styled-components";

const Button = styled.button`
  border: none;
  color: white;
  font-size: 15px;
  transition: 0.3s;
  text-align: center;

  ${(props) =>
    props.$secondary &&
    css`
      background: #269fb7;
      color: white;
      border-radius: 20px;
      padding: 2px 20px;

      &:hover {
        background-color: black;
        color: white;
      }
    `}

  ${(props) =>
    props.$primary &&
    css`
      background: transparent;
      padding: 8px 50px;
      text-transform: uppercase;
      font-size: 13px;
      border: 1px solid white;
      &:hover {
        border: 1px solid black;
        background-color: black;
        color: white;
      }
    `}

    ${(props) =>
    props.$color &&
    css`
      background: #269fb7;
      padding: 8px 30px;
      text-transform: uppercase;
      font-size: 13px;

      &:hover {
        background-color: black;
        color: white;
      }
    `}

  ${(props) =>
    props.$rounded &&
    css`
      background: #269fb7;
      padding: 5px 5px;
      border-radius: 50%;
      text-transform: uppercase;
      font-size: 13px;
      border: 1px solid white;

      &:hover {
        border: 1px solid black;
        background-color: black;
        color: white;
      }
    `}

  ${(props) =>
    props.$transparent &&
    css`
      background: transparent;
      padding: 8px 30px;
      color: black;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 13px;
      border: 1px solid black;

      &:hover {
        border: 1px solid transparent;
        background-color: #269fb7;
        color: white;
      }
    `}

  ${(props) =>
    props.$small &&
    css`
      background: white;
      color: black;
      padding: 10px 10px;
      text-transform: uppercase;
      border-radius: 50%;
      font-size: 18px;
      border: 1px solid white;

      &:hover {
        background-color: black;
        color: white;
      }
    `}

  ${(props) =>
    props.$DarkSmall &&
    css`
      background: #374151;
      color: #ffffff;
      padding: 10px 10px;
      text-transform: uppercase;
      border-radius: 50%;
      font-size: 18px;

      &:hover {
        background-color: black;
        color: white;
      }
    `}

  ${(props) =>
    props.$outlined &&
    css`
      background: transparent;
      color: #ffffff;
      text-transform: uppercase;
      font-size: 13px;
      padding: 0px 14px;
      border: 0.1px solid gray;

      &:hover {
        background-color: #fdfdfd;
        color: #000000;
      }
    `}
`;

export default Button;
