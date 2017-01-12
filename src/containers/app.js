import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native'
import React, { Component } from 'react'
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'
// Firebase Example
import Sample from '../components/SampleAddItems'
// Actions
import * as SideMenuActions from '../actions/sidemenu'
import * as ItemsActions from '../actions/items'
// Globals
import AppConfig from '../config'
import AppStyles from '../styles'
import AppUtil from '../utils';

// Components
import Menu from '../components/menu';
import NavbarElements from '../components/navbar.elements';

// Default Screens
import Index from '../screens/soon';
//SETUP NAVIGATION

/* Component ==================================================================== */
class AppContainer extends Component {
  /**
    * On first load
    */
  componentDidMount = () => {
    // Status Bar
    StatusBar.setHidden(false, 'slide'); // Slide in on load
    StatusBar.setBackgroundColor(AppConfig.primaryColor, true); // Android Status Bar Color
  }

  /**
    * An option was pressed in the Side Menu. Go to scene...
    */
  _onSideMenuPress = (title, component, extraProps) => {
    // Close menu
    this.props.closeSideMenu();

    if(AppUtil.objIsEmpty(extraProps)) extraProps = {};

    // Change Scene
    this.refs.rootNavigator.replace({
      title: title,
      component: component,
      index: 0,
      ...extraProps
    });
  }

  /**
    * Toggle Side Menu
    */
  _onSideMenuChange = (isOpen) => {
    if (isOpen != this.props.sideMenuIsOpen) {
      this.props.toggleSideMenu();
    }
  }

  /**
    * Render each scene with a Navbar and Sidebar
    */
  _renderScene = (route, navigator) => {
    // Default Navbar Title
    let title = route.title || AppConfig.appName;

    // Google Analytics
    let screenName = route.component.componentName ? route.component.componentName + ' - ' + title : title;
  //  GoogleAnalytics.trackScreenView(screenName);

    // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
    console.log('route ' + route.index);
    let leftButton = {
      onPress: (route.index > 0)
        ? this.refs.rootNavigator.pop
        : this.props.toggleSideMenu,
      icon: (route.index > 0)
        ? 'ios-arrow-back-outline'
        : 'ios-menu-outline'
    };

    // Show a cross icon when transition pops from bottom
    if(route.transition == 'FloatFromBottom')  {
      leftButton.icon = 'ios-close-outline';

    }

    return (
      <View style={[AppStyles.appContainer, AppStyles.container]}>
        <NavigationBar
          title={<NavbarElements.Title title={title || null} />}
          statusBar={{style: 'light-content', hidden: false}}
          style={[AppStyles.navbar]}
          tintColor={AppConfig.primaryColor}
          leftButton={<NavbarElements.LeftButton onPress={leftButton.onPress} icon={leftButton.icon} />} />

        <route.component navigator={navigator} route={route} {...route.passProps} />
      </View>
    );
  }

  /**
    * RENDER
    */
  render() {
    return (
      <SideMenu
        ref="rootSidebarMenu"
        menu={<Menu navigate={this._onSideMenuPress} ref="rootSidebarMenuMenu" />}
        disableGestures={this.props.sideMenuGesturesDisabled}
        isOpen={this.props.sideMenuIsOpen}
        onChange={this._onSideMenuChange}>

        <Navigator
          ref="rootNavigator"
          style={[AppStyles.container, AppStyles.appContainer]}
          renderScene={this._renderScene}
          configureScene={function(route, routeStack) {
            if(route.transition == 'FloatFromBottom')
              return Navigator.SceneConfigs.FloatFromBottom;
            else
              return Navigator.SceneConfigs.PushFromRight;
          }}
          initialRoute={{
            component: Index,
            index: 0,
            navigator: this.refs.rootNavigator,
            passProps: {
              showSplashScreen: true,
            }
          }} />

      </SideMenu>
    );
  }
}


  function mapStateToProps(state) {
    return {
      onlineItems: state.items.onlineList,
      offlineItems: state.items.offlineList,
      connectionChecked: state.items.connectionChecked,
      connected: state.items.connected,
      sideMenuIsOpen: state.sideMenu.isOpen,
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      toggleSideMenu: SideMenuActions.toggle,
      closeSideMenu: SideMenuActions.close,
      SideMenuActions,
      ItemsActions,
    }, dispatch);
  }

/*
  toggleSideMenu: SideMenuActions.toggle,
  closeSideMenu: SideMenuActions.close,
*/

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
