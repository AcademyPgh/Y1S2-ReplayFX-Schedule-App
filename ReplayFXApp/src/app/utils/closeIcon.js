import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {stylechoice} from '../styles/StyleSheet';

const CloseIcon = () => {
  return (<Ionicons name= 'ios-close-circle' size={36}
    color= {stylechoice.accentcolor}/>
  );
};
export default CloseIcon;
