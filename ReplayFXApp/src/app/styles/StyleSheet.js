import {StyleSheet, Dimensions} from 'react-native';
//italics and bold not available for this font so don't use them
export const stylechoice =
  {fontName: 'Voces',
//color is used for background of header, icons, color of active tab
    accentcolor: '#3B3D68',
// color is used for header text
    lightaccent: '#DBDDFF',
// color is used for background of slide
    lightalternate: '#9598C0',
// color is used for border of each container of listView
    bordercolor: '#CCCCCC',
//color is used for info
    infocolor: '#333333',
    regtextcolor: 'black',
    timeColor: '#5E5E5E',
    alttext: 'white',
    regbackground: 'white',
    inactive: 'grey'
  };
const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: stylechoice.regbackground
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10

  },
  instructions: {
    textAlign: 'center',
    color: stylechoice.infocolor,
    marginBottom: 5
  },
  title: {
    color: stylechoice.regtextcolor,
    fontSize: 18,
    fontFamily: stylechoice.fontName,
    paddingBottom: 2,
    paddingTop: 2
  },
  modaltitle: {
    color: stylechoice.regtextcolor,
    marginTop: 15,
    fontSize: 20,
    fontFamily: stylechoice.fontName,
    paddingBottom: 2,
    paddingTop: 3,
    fontWeight: 'bold'
  },

  description: {
    fontSize: 14,
    fontFamily: stylechoice.fontName,
    color: stylechoice.regtextcolor,
    paddingBottom: 1
  },

  modaldescription: {
    fontSize: 14,
    fontFamily: stylechoice.fontName,
    color: stylechoice.regtextcolor,
    paddingBottom: 2

  },

  gameTitleLocation:{
    borderColor: stylechoice.bordercolor,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,

  },

  datetime: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: stylechoice.timeColor,
    paddingBottom: 2
  },

gameModalContainer: {
    marginTop: 25,
    backgroundColor: stylechoice.regbackground,
    marginLeft: 15,
    marginRight: 15,
    borderColor: stylechoice.accentcolor,
    borderWidth: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 20

},

  gameModalItem: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: stylechoice.regtextcolor,
    paddingBottom: 1
},

 gamesHeader: {
    color: stylechoice.lightaccent,
    backgroundColor: stylechoice.accentcolor,
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
    fontSize: 26,
    fontFamily: stylechoice.fontName,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderColor: stylechoice.bordercolor,
    borderWidth: 2,

  },

  header: {
    color: stylechoice.lightaccent,
    backgroundColor: stylechoice.accentcolor,
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
    fontSize: 18,
    fontFamily: stylechoice.fontName,
    textAlign: 'center'

  },
  tabheader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
  },
  home: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylechoice.regbackground,
    marginTop: 10
  },
  slide: {
    justifyContent: 'center',
    backgroundColor: stylechoice.slidealternate
  },
  // slide3: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#92BBD9'
  text: {
    color: stylechoice.alttext,
    fontSize: 24,
    //fontWeight: 'bold',
    fontFamily: stylechoice.fontName
  },
  favorites: {
    color: stylechoice.accentcolor
  },
  unFavorites: {
    color: stylechoice.inactive
  },
  innerContainer: {
    // alignItems: 'flex-start',
    marginTop: 15,
    //marginBottom: 50,
    backgroundColor: stylechoice.regbackground,
    marginLeft: 15,
    marginRight: 15
  },

  info: {
    borderColor: stylechoice.bordercolor,
    borderBottomWidth: 2,
    //width: Dimensions.get('window').width,
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10

  },

  infoIcon: {
    zIndex: 1,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 3,
    paddingLeft: 3,
  },

  gamecontroller: {
    fontSize: 18,
    color: stylechoice.accentcolor,
    zIndex: 1,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    paddingLeft: 3,

  },

  iconrowstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },

  academy: {
    color: stylechoice.accentcolor,
    fontFamily: 'Voces',
    textAlign: 'center'

  },

  logoimage: {
    width: 200,
    height: 100,
    alignItems: 'center'
  },
  modalimage: {
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').width * .5625,
    width: 200,
    height: 150,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: stylechoice.regbackground,
    borderRadius: 10,
  },

  tab: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18
  },

  tabcontainer: {
    height: 41,
    borderTopWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: stylechoice.bordercolor
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  touchable_highlight:{
  },

  tabUnderline: {

    position: 'absolute',
    height: 40,
    backgroundColor: stylechoice.lightaccent,
    bottom: 0,
    zIndex: -1
  },

  center: {
    alignItems: 'center'
  },

  alert: {
    width: 200,
    height: 50,
    resizeMode: 'contain'
  }
});

export default styles;
