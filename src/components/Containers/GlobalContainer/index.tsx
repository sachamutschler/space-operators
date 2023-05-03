import React from "react";
import { GlobalContainerStyle } from "./style";

interface Props {
    children: React.ReactNode;
}

const GlobalContainer: React.FC<Props> = ({ children}) => {
    return (
        <GlobalContainerStyle>
            {children}
        </GlobalContainerStyle>
    );
};

export default GlobalContainer;