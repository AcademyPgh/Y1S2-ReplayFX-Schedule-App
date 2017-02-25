import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, {stylechoice} from '../styles/StyleSheet';

const Info_Icon = () => {
  return (<Ionicons style={styles.infoIcon} name= 'ios-information-circle' size={36}
    color= {stylechoice.accentcolor} paddingTop= {3} paddingBottom= {3} paddingLeft= {3} paddingRight= {3}/>
  );
};
export default Info_Icon;
