/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
} 
from 'react-native';
import ReplayMainView from './src/modules/app/ReplayMainView';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

const ReplayFXApp = React.createClass({

// componentWillMount() {
//     BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
//   },

//   navigateBack() {
//    // const navigationState = store.getState().get('navigationState');
//     const tabs = navigationState.get('tabs');
//     const tabKey = tabs.getIn(['routes', tabs.get('index')]).get('key');
//     const currentTab = navigationState.get(tabKey);

//     // if we are in the beginning of our tab stack
//     if (currentTab.get('index') === 0) {

//       // if we are not in the first tab, switch tab to the leftmost one
//       if (navigationState.get('index') !== 0) {
//         store.dispatch(NavigationStateActions.switchTab(0));
//         return true;
//       }

//       // otherwise let OS handle the back button action
//       return false;
//     }

    // store.dispatch(NavigationStateActions.popRoute());
    // return true;
 // },

  render() {
    return (
    <ReplayMainView />
    );
  }
});


AppRegistry.registerComponent('ReplayFXApp', () => ReplayFXApp);

