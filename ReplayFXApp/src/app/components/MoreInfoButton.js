import React, {Component} from 'react';
import {TouchableHighlight, View} from 'react-native';
import styles, {stylechoice} from '../styles/StyleSheet';
import Info_Icon from '../utils/Info_Icon';

const MoreInfoButton= (props) => {
if (props.extendedDescription || props.imageUrl)
    {return (
  <TouchableHighlight underlayColor="#ffffff" onPress={() => props.onSetModalVisible(props)}>
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
