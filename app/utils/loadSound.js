import backgroundMusic from '../assets/backgroundmusic.mp3';
import winSound from '../assets/victory.mp3';
import timeoutSound from '../assets/timeoutsound.wav';
import sendNumberSound from '../assets/sendnumber.wav';

const Sound = require('react-native-sound');
Sound.setCategory('Playback');


function loadSound(SoundObject,sound){
    const loadedSound = new SoundObject(sound,error=>{
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        console.log('duration in seconds: ' +
    loadedSound.getDuration() +
      'number of channels: ' +
      loadedSound.getNumberOfChannels());
    });
    return loadedSound;
}


const timeoutS = loadSound(Sound,timeoutSound);
const backgroundMusicS =loadSound(Sound,backgroundMusic);
const victoryS = loadSound(Sound,winSound);
const sendNumberS = loadSound(Sound,sendNumberSound);

export {timeoutS,backgroundMusicS,victoryS,sendNumberS};