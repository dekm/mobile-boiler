'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import {createStore, combineReducers, compose} from 'redux'
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'


/* Component ==================================================================== */
class AppContainer extends Component {
  /**
    * On first load
    */
  componentDidMount = () => {
   // TODO
   // ADD FIREBASE INIT HERE
  }
  return(
    //TODO
  )
  render(){
    return(
      //TODO
    )
  }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  //TODO
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  //TODO
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
