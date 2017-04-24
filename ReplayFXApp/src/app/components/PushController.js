import React, {Component} from 'react';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fifteenMinutesUntil: new Date(Date.now),
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
       popInitialNotification: true,
    });
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
 }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      if (this.props.item.isFavorite) {
        let _date = new Date(this.props.item.date);

        this.setState({fifteenMinutesUntil: new Date(
          _date.getFullYear() +"-0"+ (_date.getMonth()+1)+"-"+(_date.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45"
          )});
           console.log("Notification will happen at :" + this.state.fifteenMinutesUntil);
           let adate = new Date(this.state.fifteenMinutesUntil)
            console.log("Time might be "  + adate.getTime() );
        
        PushNotification.localNotificationSchedule({
          message: this.props.item.title + ' will begin in 15 minutes',
          date: new Date(this.state.fifteenMinutesUntil), 
         
        });
        // PushNotification.cancelAllLocalNotifications();
      }
  }
  }
  render() {
    return null;
  }
}