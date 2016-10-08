

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TouchableOpacity = React.TouchableOpacity;
var SliderIOS = React.SliderIOS;
var Video = require('react-native-video').default;


var Book = React.createClass({
  getInitialState(){


    return {


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
  _onProgress(data){
    console.log(data);
  },
  render: function(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
            source={{uri:'http://oecn70of3.bkt.clouddn.com/%E3%82%B9%E3%83%88%E3%83%AA%E3%83%B3%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88%E3%82%99%20%EF%BD%9E%E3%82%A8%E3%83%B3%E3%82%B7%E3%82%99%E3%82%A7%E3%83%AB%E3%81%9F%E3%81%A1%E3%81%AE%E3%83%95%E3%82%9A%E3%83%A9%E3%82%A4%E3%83%98%E3%82%99%E3%83%BC%E3%83%88%E3%83%AC%E3%83%83%E3%82%B9%E3%83%B3%EF%BD%9E%20MY%20BLOW%20JOBER%20ACT.9%5BFOXSUB%5D..mp4'}}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}

            onLoadStart={this._onLoadStart} //开始
            onLoad={this._onLoad} //读取数据
            onProgress={this._onProgress}   //读取数据完成 播放
            onEnd={this._onEnd} //播放结束
            onError={this._onError} //播放过程中错误

            repeat={true}
          />
          <View style={styles.videoSlider}>
            <SliderIOS
              value={this.state.value}
              onSlidingComplete={()=>console.log(this.state.value,this.state.sildering)}
              onValueChange={(value)=>this.setState({value:value,sildering:true}) }
            />
          </View>
          </TouchableOpacity>
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

module.exports = Book;