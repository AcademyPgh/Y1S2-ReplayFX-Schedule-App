import React, {Component} from 'react';
import {AppState, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fifteenMinutesUntil: new Date(Date.now),
      inAppFifteen: new Date(Date.now),
      previousNotificationsID: -1
    };
    this.backgroundNotification = this.backgroundNotification.bind(this);
  }

  componentDidMount() {
  AppState.addEventListener('change', this.backgroundNotification);
    PushNotification.configure({
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
      }
    });
  }
   componentWillUnmount() {
  AppState.removeEventListener('change', this.backgroundNotification);
   }


  backgroundNotification(appState) {
      if (appState=='background') {
        let favoriteDate = new Date(this.props.item.date);
        let favoriteMonth = '';
        let favoriteDay = '';
        let id = (this.props.item.id).toString();
        let previous_notification = this.state.previousNotificationsID;
        let fifteen_min_until = this.state.fifteenMinutesUntil;

        if (this.props.item.isFavorite) {
        //getting date of favorite events
          if(previous_notification!= id){
            favoriteMonth  = (favoriteDate.getMonth()+1) >=10 ? "-"+(favoriteDate.getMonth()+1) : "-0"+(favoriteDate.getMonth()+1);
            favoriteDay  = (favoriteDate.getDate()) >=10 ? "-"+(favoriteDate.getDate()+1) : "-0"+(favoriteDate.getDate()+1);
         //converting date to a 15 minutes before the event happens

            fifteen_min_until = new Date( favoriteDate.getFullYear()+favoriteMonth+favoriteDay+"T"+this.props.item.startTime+ "-"+"03:45");

            console.log(fifteen_min_until);
            previous_notification = id;

          if(fifteen_min_until >= Date.now()){
             PushNotification.localNotificationSchedule({
             id:id,
             message: this.props.item.title + ' will begin in 15 minutes',
             date: new Date(fifteen_min_until),
             userInfo: {id:id}
            //sending an id so notification is only sent once
           //setting the push notification to fire for each event at the right time
         });
    }
  }
   }
      else if(!this.props.item.isFavorite && id == previous_notification){
              PushNotification.cancelLocalNotifications({id: id});
              previous_notification = -1;
   }
   this.setState({fifteenMinutesUntil: fifteen_min_until, previousNotificationsID: previous_notification});

 }
  }
  render() {
    return null;
  }
}
