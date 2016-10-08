'use strict';
import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SliderIOS
} from 'react-native';

var Video = require('react-native-video').default;


class User extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }
  state = {
    rate: 1,
    volume: 0.5,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,

    controls: false,

    skin: 'custom',


    sildering:false,
    //视频进度条的
    videoOk:true, //视频是否准备好
    videoLoaded:false, //视频读取好没
    playing:false , //是否正在播放
    paused:true, //是否暂停
    videoProgress:0.01, //获取之间比
    videoTotal: 0, //时间总长度
    currentTime: 0.0, //现在的时间
    value:0,
    slider:false,
    loadUp:false,
    loadDown:false
  };

  _slider(data){
    console.log(data)
  }
  onStart(){

  }
  onLoad(data) {

  }

  onProgress(data) {
    console.log(data);
    var duration = data.playableDuration; //获取视频播放长度
    var currentTime = data.currentTime; //获取现在播放的时候
    var percent = Number((currentTime/duration).toFixed(2)); //获取之间比,精确到小数点后两位
    var value  = this.state.value;
    var rate  = this.state.rate;
    var loadIn = 0;
    if (!this.state.sildering){
      var newState = {
        videoTotal:duration, //时间总长度
        currentTime:Number(data.currentTime.toFixed(2)), //现在的时间
        videoProgress:percent, //获取之间比
        value:percent
      };
      this.setState(newState); //讲数据放进启动项
    }else{
      loadIn = value * duration;

      if (loadIn > currentTime ){
        this.setState({
          rate:20,
          muted:true,
        })
      }else if(loadIn < currentTime - 20){
        this.setState({
          rate:-20,

        })
      }else{

            this.setState({
              rate:1
            },function(){

              this.setState({
                sildering:false,
                loadUp:false,
                muted:false,
              })
            })

      }




    }

    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderSkinControl(skin) {
    const isSelected = this.state.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity onPress={() => { this.setState({
        controls: selectControls,
        skin: skin
      }) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }
  renderRateControl1(rate) {
    var that = this;
    const isSelected = (this.state.rate == 20);
    setTimeout(function(){
      that.setState({
        rate : 1
      })
    },100)
    return (
      <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl1(volume) {

  }



  renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video
            source={{uri:'http://183.6.240.126/ws.acgvideo.com/8/60/6066404-1.mp4?wsTime=1475946709&wsSecret2=f3b0ed21d3205483945f89b918a1feee&oi=1931252090&rate=100&wshc_tag=0&wsts_tag=57f8b876&wsid_tag=b73afc57&wsiphost=ipdbm'}}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onStart={this.onStart}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={() => { AlertIOS.alert('Done!') }}
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



        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this.renderSkinControl('custom')}
              {this.renderSkinControl('native')}
              {this.renderSkinControl('embed')}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(-0.5)}


            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>
      </View>
    );
  }


  render() {
    return this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin();
  }
}

const styles = StyleSheet.create({
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
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});



module.exports = User;