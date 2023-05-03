import styled from "styled-components/native";
import { Props } from "./index";

export const ShipImageStyled = styled.Image<Props>`
    aspect-ratio: 1;
    margin: auto;
    position: relative;
    top: ${(props) => props.yPosition}px;
    left: ${(props) => props.xPosition}px;
    opacity: ${(props) => props.brightness};
    transform: rotate(${(props) => props.rotation}deg);
    flex: 1;
`;

export const ShipContainer = styled.View`
  height: 30%;
  width: 100%;
`;
