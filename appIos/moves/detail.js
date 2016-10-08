/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//ES5

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var Video = require('react-native-video').default;
var Button = require('react-native-button');

var request = require('../common/request');
var config = require('../common/config');


var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TouchableOpacity= React.TouchableOpacity; //暂停组件
var Image = React.Image;
var ListView = React.ListView;

var SliderIOS = React.SliderIOS;
var Dimensions = React.Dimensions; //获取显示器的宽度

var width = Dimensions.get('window').width;



//账户页面
var Detail = React.createClass({


  getInitialState(){
    var data = this.props.data;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2
    });

    return {

      //数据的
      data:data,      //父级上传递过来的资源
      dataSource: ds.cloneWithRows([]), //获取到数据

      //视频进度条的
      videoOk:true, //视频是否准备好
      videoLoaded:false, //视频读取好没
      playing:false , //是否正在播放
      paused:false, //是否暂停
      videoProgress:0.01, //获取之间比
      videoTotal: 0, //时间总长度
      currentTime: 0, //现在的时间
      value:0.01,
      slider:false,

      //输入框的
      animationType: 'none', //浮层出现的形式
      modalVisible:false, //是否可见
      isSending:false, //是否发送出去
      content:'',

      //视频播放的
      rate:1, //速度为正常
      muted:true, //不消除声音
      resizeMode:'contain', //居中显示
      repeat:false //不重复播放
    }
  },
  _onLoadStart(data){

    console.log('load start');
  },
  _onLoad(data){


  },

  //读取结束后开始运行
  _onProgress(data){

  },
  _onEnd(){

    console.log('load _onEnd')
  },
  _onError(e){
    this.setState({
      videoOk:false
    });

    console.log(e)
    console.log('load _onError')
  },

  //回到父级容器的方法
  _pop(){
    this.props.navigator.pop();
  },





  render: function(){
    var data = this.state.data; //获取到父级传递来的数据
    return (
      <View style={styles.container}>

          <Video
            ref="videoPlayer" //播放名称
            source={{uri:data.video }} //播放的数据
            style={styles.fullScreen}   //播放器的样式
            volume={1} //播放的声音大小
            paused={this.state.paused} //暂停
            rate={this.state.rate} //速度
            muted={this.state.muted} //消除声音
            resizeMode={this.state.resizeMode} //模型样式
            repeat={this.state.repeat}  //重复播放

            onLoadStart={this._onLoadStart} //开始
            onLoad={this._onLoad} //读取数据
            onProgress={this._onProgress}   //读取数据完成 播放
            onEnd={this._onEnd} //播放结束
            onError={this._onError} //播放过程中错误
          />


      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },



});

module.exports = Detail;