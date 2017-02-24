const React = require('react');
const ReactNative = require('react-native');
const {
//  View,
  Animated,
  StyleSheet,
  ScrollView,
//  Text,
  Platform,
  Dimensions
} = ReactNative;
const Button = require('../utils/Button');
import {View, Text} from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, {stylechoice} from './StyleSheet';

const WINDOW_WIDTH = Dimensions.get('window').width;

const NewTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    scrollOffset: React.PropTypes.number,
    style: View.propTypes.style,
    tabStyle: View.propTypes.style,
    tabsContainerStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style
  },

  getDefaultProps() {
    return {
      scrollOffset: 52,
      activeTextColor: stylechoice.accentcolor,
      inactiveTextColor: stylechoice.infocolor,
      backgroundColor: 'transparent',
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      underlineStyle: {}
    };
  },

  getInitialState() {
    this._tabsMeasurements = [];
    return {
      _leftTabUnderline: new Animated.Value(0),
      _widthTabUnderline: new Animated.Value(0),
      _containerWidth: null
    };
  },

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  },

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
      this.updateTabUnderline(position, pageOffset, tabCount);
    }
  },

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
  },

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false});
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false});
    }

  },

  updateTabUnderline(position, pageOffset, tabCount) {
    const lineLeft = this._tabsMeasurements[position].left;
    const lineRight = this._tabsMeasurements[position].right;

    if (position < tabCount - 1) {
      const nextTabLeft = this._tabsMeasurements[position + 1].left;
      const nextTabRight = this._tabsMeasurements[position + 1].right;

      const newLineLeft = (pageOffset * nextTabLeft + (1 - pageOffset) * lineLeft);
      const newLineRight = (pageOffset * nextTabRight + (1 - pageOffset) * lineRight);

      this.state._leftTabUnderline.setValue(newLineLeft);
      this.state._widthTabUnderline.setValue(newLineRight - newLineLeft);
    } else {
      this.state._leftTabUnderline.setValue(lineLeft);
      this.state._widthTabUnderline.setValue(lineRight - lineLeft);
    }
  },
  starCount(name) {
    if (this.props.favoritesCount >= 0) {
      return (
name === 'My Schedule' ? <Ionicons name= 'ios-game-controller-b' style = {styles.gamecontroller}>
      <Text> {this.props.favoritesCount} </Text>
    </Ionicons> : ''
      );
    }
  },

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const {activeTextColor, inactiveTextColor, textStyle} = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;

    //const fontWeight = isTabActive ? 'bold' : 'normal';

    return (<Button
      key={`${name}_${page}`}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
    >
      <View style={[styles.tab, this.props.tabStyle]}>

        <Text style={[{color: textColor}, {fontFamily: stylechoice.fontName}]}>
          {name} <Text animation= 'flash' delay={400} iterationCount= {3}>
              {this.starCount(name)}
               </Text>
        </Text>
      </View>
    </Button>
    );
  },
//Moved textStyle out of <Text/> in replace of fontFamily: ...
  measureTab(page, event) {
    const {x, width, height} = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height};
    this.updateView({value: this.props.scrollValue._value});
  },

  render() {
    const tabUnderlineStyle = styles.tabUnderline;

    // {
    //   position: 'absolute',
    //   height: 49,
    //   backgroundColor: '#DBDDFF',
    //   bottom: 0,
    //   zIndex: -1};

    const dynamicTabUnderline = {
      left: this.state._leftTabUnderline,
      width: this.state._widthTabUnderline
    };

    return <View
      style={[styles.tabcontainer, {backgroundColor: this.props.backgroundColor}, this.props.style]}
      onLayout={this.onContainerLayout}
    >
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        scrollsToTop={false}
      >
        <View
          style={[styles.tabs, {width: this.state._containerWidth}, this.props.tabsContainerStyle]}
          ref={'tabContainer'}
          onLayout={this.onTabContainerLayout}
        >
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
          })}
          <Animated.View style={[tabUnderlineStyle, dynamicTabUnderline, this.props.underlineStyle]} />
        </View>
      </ScrollView>
    </View>;
  },

  componentWillReceiveProps(nextProps) {
    // If the tabs change, force the width of the tabs container to be recalculated
    if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
      this.setState({_containerWidth: null});
    }
  },

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({_containerWidth: width});
    this.updateView({value: this.props.scrollValue._value});
  },

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue._value});
  }
});

module.exports = NewTabBar;
