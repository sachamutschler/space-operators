import styled from "styled-components/native";
import { Props } from "./index";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const LoadingTextStyle = styled.Text<Props>`
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'VT323';
  opacity: ${(props) => props.opacity};
  text-shadow-offset: 3px 3px;
  text-shadow-color: #7c005f;
  text-shadow-radius: 0.1px;
`;