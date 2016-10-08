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
var Navigator = React.Navigator;
var Index = require('./appIos/index/index');
var Move = require('./appIos/moves/move');
var User = require('./appIos/users/user');
var Book = require('./appIos/books/book');

var lifan = React.createClass({
    getInitialState: function() {
      return {
          selectedTab: 'user',
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
          <Navigator
            initialRoute={{
              name:'index', //主要路由名称
              component:Index //模板 也就是列表页所导出的模板,name是用来后面调用的时候用的
            }}
            configureScene={(route)=>{
              //切换页面的时候的样式
              return Navigator.SceneConfigs.FloatFromRight
            }}
            renderScene={(route,navigator)=>{
              var Component = route.component
              //切换页面的时候想传递的参数
              return <Component {...route.params} navigator={navigator}/>
            }}
            />
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
            <Navigator
              initialRoute={{
                name:'move', //主要路由名称
                component:Move //模板 也就是列表页所导出的模板,name是用来后面调用的时候用的
              }}
              configureScene={(route)=>{
                //切换页面的时候的样式
                return Navigator.SceneConfigs.FloatFromRight
              }}
              renderScene={(route,navigator)=>{
                var Component = route.component
                //切换页面的时候想传递的参数
                return <Component {...route.params} navigator={navigator}/>
              }}
            />
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
          <Icon.TabBarItem
            renderAsOriginal = {true}
            iconName='ios-more-outline'
            selectedIconName='ios-more'
            selected={this.state.selectedTab === 'book'}
            onPress={() => {
              this.setState({
                selectedTab: 'book',
              });
            }}>
            <Book />
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
