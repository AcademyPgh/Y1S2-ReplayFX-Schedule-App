import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import styles from '../styles/StyleSheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddFavoriteButton (props){
        return (
 <TouchableHighlight onPress={() => props.onFavoriteButtonPress()}>
          <View style={styles.infoIcon} animation={() => props.animateFavorite()}>
             <Ionicons name= 'ios-game-controller-b' size={36} color={props.favoriteColor}/>
             </View>
           </TouchableHighlight>
    );
}

//proptypes?

export default AddFavoriteButton;

