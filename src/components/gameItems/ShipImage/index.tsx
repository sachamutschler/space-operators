import React from "react";
import { useState, useEffect } from 'react';
import { ShipImageStyled } from "./style";

export interface Props {
    integrity: number;    
    source: NodeRequire | undefined;
    brightness: number | undefined;
    rotation: number | undefined;
    xPosition: number | undefined;
    yPosition: number | undefined;
}

const ShipImage: React.FC<Props> = ({ integrity }) => {

    const [brightness, setBrightness] = useState(1);
    const [source, setSource] = useState(require('../../../images/spaceshipbg.png'));
    const [rotation, setRotation] = useState(0);
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);

    useEffect(() => {
        // We change ship png with damages when life bar >30%, 20%, and 10%:
        if (integrity <= 30 && integrity  > 20) { 
            setSource(require('../../../images/spaceshipbg-damaged1.png'));
        } else if (integrity <= 20 && integrity > 10) { 
            setSource(require('../../../images/spaceshipbg-damaged2.png'));
        } else if (integrity <= 10) {
            setSource(require('../../../images/spaceshipbg-damaged3.png'));
        }
        // Make the ship rotate and blink 5 times when damaged
        setRotation(345)
        for(let i=0; i<5; i++) {
            setTimeout(() => { setBrightness(0);}, 80);
            setTimeout(() => { setBrightness(1);}, 160);   
        }
        setTimeout(() => { setRotation(0);}, 350);
        
    }, [integrity]);

    // Make the ship move around:
    useEffect(() => { 
        const interval = setInterval(() => {
            for(let i=0; i<2; i++){
                setTimeout(() => {
                    setYPosition(i);
                },100*i);
            }
            for(let i=0; i<4; i++){
                setTimeout(() => {
                    setYPosition(-i);
                },100*i);
            }
            for(let i=0; i<2; i++){
                setTimeout(() => {
                    setYPosition(i);
                },100*i);
            }
        },1400);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); 
  
    return (
        <ShipImageStyled integrity={ integrity } 
                         source={source} 
                         brightness={brightness} 
                         rotation={rotation} 
                         xPosition={xPosition} 
                         yPosition={yPosition}/>
    );
};

export default ShipImage;