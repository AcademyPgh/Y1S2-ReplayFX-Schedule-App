/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import ReplayMainView from './src/app/components/ReplayMainView';


export default class ReplayFXApp extends Component {
  render() {
    return (
     <ReplayMainView />
    );
  }
}

AppRegistry.registerComponent('ReplayFXApp', () => ReplayFXApp);
