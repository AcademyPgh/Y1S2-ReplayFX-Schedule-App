import React, {Component} from 'react';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fifteenMinutesUntil: new Date(Date.now),
    };
    this.handleNotification = this.handleNotification.bind(this);
  }

  componentDidMount() {
  AppState.addEventListener('change', this.handleNotification);
    PushNotification.configure({
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);      
      },
    });
    this.handleNotification();
  }
  
   componentWillUnmount() {
  AppState.removeEventListener('change', this.handleNotification);
   }

  handleNotification(appState) {
      if (appState=='background') {
      if (this.props.item.isFavorite) {
        let favoriteDate = new Date(this.props.item.date);
        
        //getting date of favorite events

      this.setState({fifteenMinutesUntil: new Date(
          favoriteDate.getFullYear() +"-0"+ (favoriteDate.getMonth()+1)+"-"+(favoriteDate.getDate()+1)+"T"+this.props.item.startTime+ "-"+"03:45"
          )});
         //converting date to a 15 minutes before the event happens
         console.log("Notification will happen at :" + this.state.fifteenMinutesUntil);
         let adate = new Date(this.state.fifteenMinutesUntil)
          console.log("Time might be "  + adate.getTime() );
         //seeing if the time is as it should be (15 minutes before the event)

        if(this.state.fifteenMinutesUntil >= Date.now()){
           PushNotification.localNotificationSchedule({		      
           message: this.props.item.title + ' will begin in 15 minutes',
           date: new Date(this.state.fifteenMinutesUntil), 

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