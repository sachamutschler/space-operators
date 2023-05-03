import { Audio } from 'expo-av';

let soundObject: Audio.Sound | null = null;

async function GameMusic() {
    soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('./Music-Star-Striker.mp3'));
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
        console.log(error);
    }
}

async function stopGameMusic() {
    if (soundObject) {
        await soundObject.stopAsync();
    }
}

export { GameMusic, stopGameMusic };