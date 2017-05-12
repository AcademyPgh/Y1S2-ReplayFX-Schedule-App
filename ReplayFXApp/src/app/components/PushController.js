import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
    ComponentDidMount() {
      PushNotification.configure({
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
      }
    });
  }
    render() {
      return null;
  }
}
