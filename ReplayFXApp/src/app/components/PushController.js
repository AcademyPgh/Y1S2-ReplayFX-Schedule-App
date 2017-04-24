import {Component} from 'react';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 3,
      fifteenMinTil: new Date(Date.now()),
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    //if app state is in background then trigger scheduled notification
    if (appState === 'background') {

      //if prop is favorited then proceed to notification
      if (this.props.item.isFavorite) {

        //Since the dates dont have a correct time we have to extract the dates and apply the times
        let _date = new Date(this.props.item.date);

        //set our date for fifteen minutes from the time of the event
        this.setState({fifteenMinTil: new Date(
          _date.getFullYear()+"-0"+ (_date.getMonth()+1)+"-"+
          _date.getDate()+"T"+this.props.item.startTime + "-"+"03:45")});

          //Logging the numeric value of our fifteenMinTil state
       console.log(this.state.fifteenMinTil.getTime());

       //Logging the numeric value of the current Date
       console.log(Date.now());
       
       // If our fifteenMinTil state is greater than or equal to our current date then trigger our notification
       // other wise our notifications will trigger after fifteen mintues until
       if(this.state.fifteenMinTil.getTime() >= Date.now()){
        PushNotification.localNotificationSchedule({
          message: this.props.item.title + ' is about to begin in 15 minutes',
          date: this.state.fifteenMinTil
        });
        }
      }
    }

  }
  render() {
    return null;
  }
}
