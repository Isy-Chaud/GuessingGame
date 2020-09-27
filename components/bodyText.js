import React from 'react';
import { Text, StyleSheet,View } from 'react-native';


const BodyText = props =>{
  return(
    <View style={styles.space}>
    <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
  },
  space:{
    flexDirection: 'row'
  }
});
export default BodyText;
