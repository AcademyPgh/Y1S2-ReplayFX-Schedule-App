import {Component} from 'react';
import {AppState} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      fifteenMinTil: new Date(Date.now)
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
       popInitialNotification: false,
    });

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      if (this.props.item.isFavorite) {
        let _date = new Date(this.props.item.date);

        this.setState({fiftenMinTil: new Date(
          _date.getFullYear()+"-0"+ _date.getMonth()+"-"+
          _date.getDate()+"T"+this.props.item.startTime + "-"+"03:45")});

        console.log(this.state.fiftenMinTil);

        PushNotification.localNotificationSchedule({
          message: this.props.item.title + ' is about to begin in 15 minutes',
          date: new Date(Date.now() + (this.state.seconds * 1000))
        });
      }
    }
  }
  render() {
    return null;
  }
}
