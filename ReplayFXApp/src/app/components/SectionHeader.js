import React from 'react';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
import styles, {stylechoice} from '../styles/StyleSheet';

/*Day of week for each of event used as Section Header */
const SectionHeader = ({sectionData, category}) => {
  let d = new Date(category);
  let formattedD = ((d.getMonth() + 1) + '/' + (d.getDate() + 1) + '/' +  d.getFullYear());


  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let n = weekday[d.getUTCDay()];
  
  
  return (<View animation= 'bounceIn' delay= {400}>
    <Text style={styles.header}>{n} {formattedD}</Text>
  </View>);
}

export default SectionHeader;
