import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import Screen from '../../components/Screen';
import CongratsScreen from '../CongratsScreen';
import TimeOutScreen from '../TimeOutScreen';
import AppButton from '../../components/AppButton';
import Digits from '../../components/Digits';
import Prediction from '../../components/Prediction';
import Timer from '../../components/Timer';
import LinearGradient from 'react-native-linear-gradient';
import { CreateInputBase, RandomNumberCreator, delay,loadSound,playSound } from '../../utils/';
import backgroundMusic from '../../assets/backgroundmusic.mp3';
import winSound from '../../assets/victory.mp3';
import timeoutSound from '../../assets/timeoutsound.wav';
import sendNumberSound from '../../assets/sendnumber.wav';

const Sound = require('react-native-sound');
Sound.setCategory('Playback');

const timeoutS = loadSound(Sound,timeoutSound);
const backgroundMusicS =loadSound(Sound,backgroundMusic);
const victoryS = loadSound(Sound,winSound);
const sendNumberS = loadSound(Sound,sendNumberSound);

const randomNumberCreator = new RandomNumberCreator(4);

const GameScreen = ({ route, navigation }) => {
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';
  const keyboardVerticalOffset = Platform.OS==='android' ? -90 :90;
  const { isTimerActivated ,soundOn} = route?.params;
  const refFlatList = useRef();
  const timeStamp = 30;
  const [remainingTime, setRemainingTime] = useState(timeStamp);
  const [userNumber, setUserNumber] = useState([]);
  const [randomNumber, setRandomNumber] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const [goHome,setGoHome]=useState(false);
  const resetAllValues = () => {
    randomNumberCreator.createdNumber = [];
    setRemainingTime(timeStamp);
    setUserNumber([]);
    setRandomNumber([]);
    setUserInputs([]);
    setIsWin(false);
    setTimeout(false);
  };
  const calculatePlusandMinus = () => {
    if (isTimerActivated) {
      setRemainingTime(timeStamp);
    }
    let pluses = 0, minuses = 0;
    const currentUserInputs = [...userInputs];
    for (const user of userNumber) {
      if (randomNumber.includes(user))
        (randomNumber.indexOf(user) === userNumber.indexOf(user)) ? pluses++ : minuses++;
    }
    const input = new CreateInputBase(pluses, minuses, userNumber);
    currentUserInputs.push(input);
    setUserInputs(currentUserInputs);
    if (pluses === 4) setIsWin(true);
    if(soundOn) playSound(sendNumberS);
  };


  const handleExitButtonPressed=()=>{
    navigation.goBack();
    backgroundMusicS.stop();
  };

  useEffect(() => {
    if(soundOn){
      sendNumberS.setVolume(1);
      timeoutS.setVolume(1);
      victoryS.setVolume(1);
      backgroundMusicS.setVolume(1);
      backgroundMusicS.setNumberOfLoops(-1);

      setTimeout(() => {
        playSound(backgroundMusicS);
      }, 100);
    }

    randomNumberCreator.createNumber();
    setRandomNumber(randomNumberCreator.createdNumber);
    console.log('CreatedNumber: ', randomNumberCreator.createdNumber);

    return () => {
      resetAllValues();
    };
  }, []);

  useEffect(() => {
    if (isTimerActivated && remainingTime === 0) setTimeout(true);
  }, [remainingTime]);

  useEffect(() => {
    delay(200).then(() =>
      userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }));
  }, [userInputs]);

  useEffect(()=>{
    console.log(goHome);

    if(goHome) backgroundMusicS.stop();
  },[goHome]);

  useEffect(() => {
    if (isWin || timeout) setShowModal(true);
    if(timeout&&soundOn) playSound(timeoutS);
    if(isWin&&soundOn) playSound(victoryS);
  }, [isWin, timeout]);

  return (
    <Screen >
      <LinearGradient colors={['#023e7d', '#002855', '#001845']} style={styles.outer}>
        <Modal visible={showModal} onRequestClose={() => setShowModal(false)} transparent animationType='fade' >
          {isWin && <CongratsScreen sound ={backgroundMusicS}  navigation = {navigation} totalTrials={userInputs.length} />}
          {timeout && !isWin && <TimeOutScreen sound ={backgroundMusicS}  setGoHome={setGoHome} navigation={navigation} />}
        </Modal>
        <View style={styles.topContainer} >
          {isTimerActivated &&
                <Timer
                  timeStamp={timeStamp}
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                />}
          <AppButton icon="x-circle" iconProps={{ size: 30, color: '#FFF' }} onPress={handleExitButtonPressed} />
        </View>
      
        <View style={styles.predictionContainer} >
          <FlatList
            ref={refFlatList}
            inverted
            data={userInputs}
            keyExtractor={item => userInputs.indexOf(item)}
            renderItem={({ item }) => <Prediction prediction={item} />}
            onScrollToIndexFailed={() => delay(200).then(() =>
              userInputs.length > 0 && refFlatList?.current?.scrollToIndex({ index: userInputs.length - 1 }))}
          />
        </View>
        <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset} behavior={keyboardBehavior} style={styles.digitsContainer} >
          <Digits onSendNumber={calculatePlusandMinus} setUserNumber={setUserNumber} />
        </KeyboardAvoidingView>
      </LinearGradient>
    </Screen >
  );
};

const styles = StyleSheet.create({
  digitsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection:'row',
    alignItems:'center',
    width: '100%',
    justifyContent:'flex-end'
  },
  hintButton: {
    width: '100%',
    alignItems: 'flex-start'
  },
  predictionContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  outer: {
    flex:1,
    alignItems: 'center',
  },
});

export default GameScreen;