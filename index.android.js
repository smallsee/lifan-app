/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

var Index = require('./appAndroid/index/index');
var Move = require('./appAndroid/moves/move');
var User = require('./appAndroid/users/user');

class lifan extends Component {

  constructor(props){
    super(props);
    this.state={
      selectedTab: 'home',

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Home"
            renderIcon={() => <Icon name="ios-videocam-outline"/>}
            renderSelectedIcon={() => <Icon name="ios-videocam"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Index/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="Profile"
            renderIcon={() => <Icon name="ios-videocam-outline"/>}
            renderSelectedIcon={() => <Icon name="ios-videocam"/>}
            onPress={() => this.setState({ selectedTab: 'profile' })}>
            <Move/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    color: "#000000",
    fontSize: 13
  },
  selectedTabText: {
    color: "#999999",
    fontSize: 13
  },
  icon: {
    width: 20,
    height: 20
  }
});

AppRegistry.registerComponent('lifan', () => lifan);
