
      
var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;



var User = React.createClass({
render: function(){
    return (
          <View style={styles.container}>
                <Text>账户页面</Text>
            </View>
      )
  }
});

  
    var styles = StyleSheet.create({
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

module.exports = User;