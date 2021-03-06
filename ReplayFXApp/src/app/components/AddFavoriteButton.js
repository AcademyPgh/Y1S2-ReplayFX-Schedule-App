import React, {Component} from 'react';
import {TouchableHighlight} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  {View, Text} from 'react-native-animatable';

const AddFavoriteButton = (props) => {
        return (
 <TouchableHighlight underlayColor="#ffffff" onPress={() => props.onFavoriteButtonPress(props.item)}>
          <View style={styles.infoIcon} animation={props.item.isFavorite ? 'bounce' : 'shake'} delay={400}>
             <Ionicons name= 'ios-game-controller-b' size={36} color={props.item.isFavorite ? stylechoice.accentcolor : stylechoice.inactive}/>
             </View>
           </TouchableHighlight>
    );
}

//proptypes?

export default AddFavoriteButton;
