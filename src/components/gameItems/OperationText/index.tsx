import React from "react";
import {OperationTextStyle} from "./style";

export interface Props {
    operation: string | undefined;
}

const OperationText: React.FC<Props> = ({ operation }) => {
    return <OperationTextStyle>{operation}</OperationTextStyle>;
};

export default OperationText;