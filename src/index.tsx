import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from './screens/Home';
import Lobby from "./screens/Lobby";
import Join from './screens/Join';
import History from './screens/History';
import NameChoice from './screens/NameChoice';
import React from 'react';
import {AppRegistry} from "react-native";
import { Provider } from 'react-redux';
import store from './redux/CreateGames/store';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import { SquadaOne_400Regular } from '@expo-google-fonts/squada-one';
import { Kanit_300Light } from '@expo-google-fonts/kanit';
import 'react-native-get-random-values';
import Game from "./screens/Game";
import GameOver from './screens/GameOver';
import Success from "./screens/Success";
import { LogBox } from 'react-native';


export default function App() {
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    AppRegistry.registerComponent('SpaceOperators', () => App);
    const [fontsLoaded] = useFonts({
        'VT323': VT323_400Regular,
        'Squada': SquadaOne_400Regular,
        'Kanit' : Kanit_300Light,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <NativeRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/name-choice" element={<NameChoice/>} />
                    <Route path="/lobby" element={<Lobby/>}/>
                    <Route path="/join" element={<Join/>}/>
                    <Route path="/history" element={<History/>}/>
                    <Route path="/game" element={<Game/>} />
                    <Route path="/gameOver" element={<GameOver/>} />
                    <Route path="/success" element={<Success/>} />
                </Routes>
            </NativeRouter>
        </Provider>
    );
};