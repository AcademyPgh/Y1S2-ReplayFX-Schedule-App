import React, {Component} from 'react';
import {AppState, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fifteenMinutesUntil: new Date(Date.now),
      inAppFifteen: new Date(Date.now),
      previousNotificationsID: 0
    };
    this.backgroundNotification = this.backgroundNotification.bind(this);
    // this.inAppNotification = this.inAppNotification.bind(this);
  }

  componentDidMount() {
  AppState.addEventListener('change', this.backgroundNotification);
    PushNotification.configure({
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
      }
    });
    // for notifications in the background

    // AppState.addEventListener('change', this.inAppNotification);
    // PushNotification.configure({
    //   onNotification: function(notification) {
    //      console.log('In APP NOTIFICATION:', notification);
    //   }
    // });
  }
  // for notifications in App

   componentWillUnmount() {
  AppState.removeEventListener('change', this.backgroundNotification);
  // AppState.removeEventListener('change', this.inAppNotification);
   }


  backgroundNotification(appState) {
      if (appState=='background') {
      if (this.props.item.isFavorite) {
        let favoriteDate = new Date(this.props.item.date);
        let id = (this.props.item.id).toString();
        let previous_notification = this.state.previousNotificationsID;
        let fifteen_min_until = this.state.fifteenMinutesUntil;
        //getting date of favorite events
        if(previous_notification!= id){

          if (Platform.OS == 'android') {
            fifteen_min_until = new Date( favoriteDate.getFullYear() +"-0"+ (favoriteDate.getMonth()+1)+"-"+(favoriteDate.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45");
         //converting date to a 15 minutes before the event happens
          }

          else if (Platform.OS == 'ios')
          {
            fifteen_min_until = new Date( favoriteDate.getFullYear() +"-0"+ (favoriteDate.getMonth()+1)+"-"+(favoriteDate.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45");
          }

            console.log(fifteen_min_until);
            previous_notification = id;

        if(fifteen_min_until >= Date.now()){
           PushNotification.localNotificationSchedule({
            id: id,
            message: this.props.item.title + ' will begin in 15 minutes',
            date: new Date(fifteen_min_until),
            //sending an id so notification is only sent once
           //setting the push notification to fire for each event at the right time
         });
    }
  }
  else{
    console.log("Previous Notificatons: " + previous_notification);
  }
  this.setState({fifteenMinutesUntil: fifteen_min_until, previousNotificationsID: previous_notification});
   }
 }
  }

 inAppNotification(appState) {
      if (appState=='active') {
      if (this.props.item.isFavorite) {
        let favoriteDate = new Date(this.props.item.date);
                //getting date of favorite events

        let id = (this.props.item.id).toString();

         if (Platform.OS == 'android') {
      this.setState({inAppFifteen: new Date(
          favoriteDate.getFullYear() +"-0"+ (favoriteDate.getMonth()+1)+"-"+(favoriteDate.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45"
          )});
         }
         //converting date to a 15 minutes before the event happens
          if (Platform.OS == 'ios') {
            this.setState({inAppFifteen: new Date(
          favoriteDate.getFullYear() +"-0"+ (favoriteDate.getMonth()+1)+"-"+(favoriteDate.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45"
          )});
          }

        if(this.state.inAppFifteen >= Date.now()){
           PushNotification.localNotificationSchedule({
            id: id,
           message: this.props.item.title + ' will begin in 15 minutes',
           date: new Date(this.state.inAppFifteen),

            //sending an id so notification is only sent once
           //setting the push notification to fire for each event at the right time
         });
    }
   }
 }
  }

  render() {
    return null;
  }
}
