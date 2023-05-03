import React, {useEffect} from "react";
import { ImageBackground, BackHandler } from "react-native";
import { HomeMenu } from './style';
import { useNavigate } from 'react-router-native';
import OrangeButton from "../../components/buttons/OrangeButton";
import ActionButton from "../../components/buttons/ActionButton";
import PrimaryTitle from "../../components/titles/PrimaryTitle"
import NameBlock from "../../components/Containers/NameBlock";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setGameId, setUserId, setIsCreator } from '../../redux/CreateGames/gameSlice';
import CreateGame from "../../api/CreateGame";
import store from "../../redux/CreateGames/store";
import { Entypo } from '@expo/vector-icons';
import Username from "../../components/texts/Username";
import uuid from 'react-native-uuid';
import SoundEffect from "../../components/audio/soundEffects";

const Home = () => {
    const userName = useSelector((state: any) => state.game.userName);
    const userId = useSelector((state: any) => state.game.userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>  {  // setting a userId only once when launching the app
        if (userId === '') {
            const idUser = uuid.v4() as string;
            dispatch(setUserId(idUser));
            console.log ('Accueil - UserID : ' + userId);
        }
    }, [userId]);

    const HandleCreateGame = async () => {
        const gameId: string = await CreateGame();
        SoundEffect(require('../../components/audio/soundEffects/soundBank/button.mp3'));
        dispatch(setGameId(gameId));
        const isCreator = true;
        dispatch(setIsCreator(isCreator))
        navigate('Lobby');
    }
    return (
        <ImageBackground source={require('../../images/home.png')} resizeMode={'cover'} style={{width: '100%', height: '100%'}}>
            <Provider store={store}>
                <PrimaryTitle title={'Space Operators'} />
                <HomeMenu>
                    <ActionButton onPress={HandleCreateGame} text={'Creation'}/>
                    <OrangeButton text={'Rejoindre'} path={'Join'}/>
                    <OrangeButton text={'Historique'} path={'History'}/>
                    <ActionButton onPress={()=> BackHandler.exitApp()} text={'Quitter'} />
                </HomeMenu>
                <NameBlock onPress={() => navigate('name-choice') } >
                    <Entypo name="cog" size={30} color="#FF7A07"/>
                    <Username username={userName}/>
                </NameBlock>
            </Provider>
        </ImageBackground>
    );
};
export default Home;