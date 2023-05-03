import React from "react";
import {GreenBar, LifeBarContainer, RedBar} from "./style";
import { useState, useEffect } from 'react';

export interface Props {
    width: number;
    opacity: number | undefined |null;
    color: string | undefined |null;
}

const LifeBar: React.FC<Props> = ({ width }) => {

  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState("green");

  // Checks the value of life bar width and update differents blinkings when 30%, 20% and 10%
  useEffect(() => {
      let intervalId : any;
    
      if (width <= 30 && width > 20) {
        intervalId = setInterval(() => {
          setOpacity((opacity) => (opacity === 1 ? 0.9 : 1));
          setColor((color) => (color === "green" ? "#00ff09" : "green"));
        }, 120);

      } else if (width <= 20 && width > 10) {
        intervalId = setInterval(() => {
          setOpacity((opacity) => (opacity === 1 ? 0.9 : 1));
          setColor((color) => (color === "green" ? "rgb(82, 255, 102)" : "green"));
        }, 80);
        
      } else if (width <= 10) {
        intervalId = setInterval(() => {
          setOpacity((opacity) => (opacity === 1 ? 0.9 : 1));
          setColor((color) => (color === "green" ? "white" : "green"));
        }, 40);
      }
      // Clean up the interval when the component unmounts or when the width changes
      return () => clearInterval(intervalId);
    }, [width]);
       
    return (
        <LifeBarContainer>
            <GreenBar width={width} opacity={opacity} color={color}/>
            <RedBar width={100-width} opacity = {undefined} color = {undefined}/>
        </LifeBarContainer>
    );
};

export default LifeBar;