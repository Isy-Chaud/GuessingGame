import React, { useState } from 'react';
import { Text, Button , View, Image, StyleSheet } from 'react-native';

const GameFailed = props =>{

   return(
     <View style={styles.screen}>
        <Text>Game Over</Text>
        <View style={styles.ImgContainer}>
        {
          // <Image source={{uri: 'https://cdn3.vectorstock.com/i/1000x1000/88/92/game-over-words-fist-tattoo-vector-22708892.jpg'}}/>
        }<Image source={require('../assets/game-over.jpg')} style={styles.Image} />

        </View>
        <Button title="New Game" onPress={props.reset}/>
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
  }

});

export default GameFailed;
