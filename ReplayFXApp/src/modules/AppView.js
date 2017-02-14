import React, {PropTypes} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';
import ReplayMainView from './app/ReplayMainView';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  render() {
    if (!this.props.isReady) {
      return (
        <View>
          <ActivityIndicator style={styles.centered}/>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <ReplayMainView />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'auto'
  }
});

export default AppView;
