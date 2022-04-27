## The Pomo Game

### What is that game?
- This is a mathematical guessing game that written using react-native

### Which os does it support?
- Game supports IOS and Android os

### What is your goal?
- Finding number that produced by app

### What are the types of gameplay?
- There are two type of gameplay ; normal and against-time
- In normal game there is no timer and you are free
- You have 30 seconds in the against-time mode. If you do not send a number guess within 30 seconds, you will lose the game.

### How to play?
- There is no how to play section in app yet :(. But it will be probably added later
- Firstly,app produce a random 4 digits number. This number must not start with zero and its digits must be different from each other.
- You send your guess
- App compares your number with its number
- If app number includes any digit of your number and if position of digit is right then it returns+1 otherwise it returns -1
- For example app produce this number : **7402** and your goal will be find this number
- You send this number : 1234
- Now look at your number and app number, your number and app number have 2 and 4 numbers at the same time
- But position of this two number are incorrect so it returns -1 for each digit then we will se -2 as a result.
- Assume that your next guess is : 7243
- Now, there are three digits in your number and app number at the same time that are 7,2 and 4
- Position of 7 is correct so it returns +1 and  position of 2 and 4 incorrect so it returns -1 for each digit so we have -2 then we will se +1 -2 as a result
- Assume that your next guess is 5691
- It returns 0 because there are no numbers for your guess in the application number
- Finally assume that you send 7402. app number includes all digits of your number and all positions of them are correct so it returns +4 and you win!.

### Demo on Ios and Android
-In below, there are gifs but in gifs fps is low so it looks like non-optimized game or animations looks like slow. If you clone this repo and run on your machine you will see there is no problem about animations and optimization of game

<div align="center">
<img src="https://github.com/antinucleus/pomo/blob/main/demoImages/normalMode.gif" width="300" height="600"/>
<img src="https://github.com/antinucleus/pomo/blob/main/demoImages/against-timeMode.gif" width="300" height="600"/>
</div>
