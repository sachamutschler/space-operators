import React from "react";
import {OperationTextContainerStyle} from "./style";

interface Props {
    children: React.ReactNode;
}

const OperationTextContainer: React.FC<Props> = ({ children }) => {
    return (
            <OperationTextContainerStyle>{children}</OperationTextContainerStyle>
    );
};

export default OperationTextContainer;