import React from "react";
import {UsernameStyle, ReadyStyle, NotReadyStyle} from "./style";

interface Props {
    username: string;
    status?: boolean;
}
const Username: React.FC<Props> = ({ username, status }) => {
    if(status !== undefined) {
        if(status) {
            return (
                <UsernameStyle><ReadyStyle>{username}</ReadyStyle></UsernameStyle>
            );
        }
        return (
            <UsernameStyle><NotReadyStyle>{username}</NotReadyStyle></UsernameStyle>
        );
    }
    return (
        <UsernameStyle>{username}</UsernameStyle>
    );
}
export default Username;