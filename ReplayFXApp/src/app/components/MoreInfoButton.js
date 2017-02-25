import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import Info_Icon from '../utils/Info_Icon';
		
function MoreInfoButton(props) {
if (props.extendedDescription || props.image)
    {return (
  <TouchableHighlight onPress={() => props.onSetModalVisible(props.visible, props.title, props.startTime, props.endTime, props.location, props.extendedDescription, props.image)}>
    <View>
      <Info_Icon/>
    </View>
  </TouchableHighlight>
    );}
    else
    {return (<View/>);
    }
  } 

  export default MoreInfoButton;

  //props.visible, props.title, props.startTime, props.endTime, props.location, props.extendedDescription, props.image
