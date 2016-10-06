/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var Component = React.Component;
var AppRegistry = React.AppRegistry;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TabBarIOS = React.TabBarIOS;

var Index = require('./appIos/index/index');
var Move = require('./appIos/moves/move');
var User = require('./appIos/users/user');

var lifan = React.createClass({
    getInitialState: function() {
      return {
          selectedTab: 'index',
        };
    },

  render() {
    return (
          <TabBarIOS
           tintColor="#ee735c"
          >
        <Icon.TabBarItem
             renderAsOriginal = {true}
            iconName='ios-videocam-outline'
            selectedIconName='ios-videocam'
            selected={this.state.selectedTab === 'index'}
            onPress={() => {
                this.setState({
                    selectedTab: 'index',
                  });
              }}>
            <Index />
        </Icon.TabBarItem>
          <Icon.TabBarItem
               renderAsOriginal = {true}
              iconName='ios-recording-outline'
              selectedIconName='ios-recording'
              selected={this.state.selectedTab === 'move'}
              onPress={() => {
                    this.setState({
                          selectedTab: 'move',
                      });
                }}>
              <Move />
          </Icon.TabBarItem>
          <Icon.TabBarItem
               renderAsOriginal = {true}
              iconName='ios-more-outline'
              selectedIconName='ios-more'
              selected={this.state.selectedTab === 'user'}
              onPress={() => {
                    this.setState({
                          selectedTab: 'user',
                      });
                }}>
              <User />
          </Icon.TabBarItem>


      </TabBarIOS>
    );
  },

  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('lifan', () => lifan);
