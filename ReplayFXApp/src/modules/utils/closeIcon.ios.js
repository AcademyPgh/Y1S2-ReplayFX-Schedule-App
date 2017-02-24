import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {stylechoice} from '../helloworld/StyleSheet';

const CloseIcon = () => {
  return (<Ionicons name= 'ios-close' size={36}
    color= {stylechoice.accentcolor}/>
  );
};
export default CloseIcon;
