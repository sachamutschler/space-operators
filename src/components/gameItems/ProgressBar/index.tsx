import React, { useState, useEffect } from 'react';
import { ProgressBarContainer, ProgressBar } from './style';

interface Props {
    durationInSeconds: number | undefined;
}

const Progress: React.FC<Props> = ({ durationInSeconds }) => {
    
    const [progress, setProgress] = useState(0.0);

    useEffect(() => {
        setProgress(100); // reset progress to 100 when a new rounds is starting
        const interval = setInterval(() => {
            if (durationInSeconds) {
                setProgress(prevProgress => prevProgress - (1.6 / durationInSeconds));
            }
        }, 10);
            return () => clearInterval(interval);
        
    }, [durationInSeconds]);

    return (
        <ProgressBarContainer>
            <ProgressBar style={{ width: `${progress}%` }} />
        </ProgressBarContainer>
    );
};

export default Progress;