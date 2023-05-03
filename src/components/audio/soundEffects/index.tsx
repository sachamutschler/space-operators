import { AVPlaybackSource, Audio } from 'expo-av';

async function SoundEffect(path: AVPlaybackSource) {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(path);
        await soundObject.playAsync();
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
        console.log(error);
    }
}

export default SoundEffect;