import React from "react";
import {View} from "react-native";
import { TextStyle } from "./style"
import {useSelector} from "react-redux";
const GameId = () => {
    let gameId = useSelector((state: any) => state.game.gameId);
    return (
        <View>
            <TextStyle>Game ID : {gameId} </TextStyle>
        </View>
    );
};
export default GameId;