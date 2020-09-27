import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import TitleText from '../components/titleText.js';
import BodyText from '../components/bodyText.js';
import Colors from '../constants/color.js'

const GameOverScreen = props => {
return (
  <View style={styles.screen}>
      <TitleText>Congratulations</TitleText>
      <View style={styles.ImgContainer}>
         <Image
            // source={require('../assets/success.png')}
            source= {{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-cvtqXmAUXp5JwQjcW2nMz-a3XDee1ClBSQ&usqp=CAU'}}
            //for web images we need to set width and height

            style={styles.Image} resizeMode="cover"
         />
      </View>

      <BodyText >
      You Needed: <Text style={styles.Highlight}>{props.roundsNumber}
      </Text> Guesses to get to <TitleText style={styles.Highlight}>{props.userNumber}</TitleText> WrongGuess
      <TitleText style={styles.Highlight}>{props.wrongGuess}</TitleText>
      </BodyText>

      <Button title="New Game" onPress={props.newGame} />
  </View>
);

};
const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row'
  },
  Image:{
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  ImgContainer:{
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 20
  },
  Highlight:{
    color: Colors.primary,
    fontSize: 17,
    padding: 10
  },
  output:{
    // margin: 10
    flexDirection: 'row'
  }
});

export default GameOverScreen;
