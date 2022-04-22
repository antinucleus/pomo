function playSound(sound){
    sound.play(success => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
    });
}
export {playSound};