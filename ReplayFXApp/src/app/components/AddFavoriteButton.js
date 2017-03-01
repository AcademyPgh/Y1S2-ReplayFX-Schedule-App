import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import styles from '../styles/StyleSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddFavoriteButton = (props) => {
        return (
 <TouchableHighlight onPress={() => props.onFavoriteButtonPress(props)}>
          <View style={styles.infoIcon} animation={props.animation} delay={400}>
             <Ionicons name= 'ios-game-controller-b' size={36} color={props.favoriteColor}/>
             </View>
           </TouchableHighlight>
    );
}

//proptypes?

export default AddFavoriteButton;

