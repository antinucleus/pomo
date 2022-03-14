function CreateInputBase(pluses, minuses, number) {
  this.pluses = pluses;
  this.minuses = minuses;
  this.number = number;
}

function RandomNumberCreator(length) {
  let createdNumber = [];
  this.createNumber = function () {
    while (createdNumber.length < length) {
      let randomNumber = Math.floor(Math.random() * 10);
      if (createdNumber[0] === 0 && randomNumber !== 0) createdNumber[0] = randomNumber;
      if (!createdNumber.includes(randomNumber)) createdNumber.push(randomNumber);
    }
  };
  Object.defineProperty(this, 'createdNumber', {
    get: function () {
      return createdNumber;
    },
    set: function (value) {
      createdNumber = value || [];
    }
  });
}

function delay(milliseconds) {
  const delay = new Promise(resolve => setTimeout(resolve, milliseconds || 200));
  return delay;
}

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

function playSound(sound){
  sound.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
}

export {
  CreateInputBase,
  RandomNumberCreator,
  delay,
  loadSound,
  playSound
};