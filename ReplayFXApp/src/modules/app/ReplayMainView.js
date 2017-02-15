//This was "hello"
import React, {Component} from 'react';
import styles from './StyleSheet';
import {
    Text,
    View,
    Image,
    BackAndroid
} from 'react-native';

export default class MainView extends Component {
constructor(props) {
    super(props);
    this.backButton=this.backButton.bind(this);
    this.backButton();
}
backButton() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      BackAndroid.exitApp(0);
    });
}

render() {
    return (
        // Container that just centers our logo
      <View style= {{flex: 1}}>
        <View style= {styles.home}>
         {/* Loads our main logo image */}
        <Image source={require('../images/replay-fx-logo.png')} style={styles.logoimage}/>
      </View>
      {/* Line of text under the logo saying we built this */}
      <Text style= {styles.academy}>App Built by Academy Pittsburgh</Text>
      </View>
    );
  }
}