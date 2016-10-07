

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var request = require('../common/request');
var config = require('../common/config');


var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;
var TouchableHighlight = React.TouchableHighlight;
var Image = React.Image;
var ListView = React.ListView;
var Dimensions = React.Dimensions;
var RefreshControl = React.RefreshControl;

var width = Dimensions.get('window').width;

var cacheResults = {
  items:[],
};

//子组件
var Item = React.createClass({

  getInitialState(){
    var row = this.props.row;
    return {
      up:row.voted,
      row:row
    }
  },
  render (){
    var row = this.state.row;
    return (
      <TouchableHighlight>
        <View style={styles.item}>
          <Image source={{uri: row.thumb}}
                 style={styles.thumb}>
            <Icon name="ios-play" size={20} style={styles.play} />
          </Image>
          <Text style={styles.title}>{row.title}</Text>
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon name={this.state.up ? "ios-heart" :"ios-heart-outline"} size={15}
                    style={[styles.up,this.state.up ? null : styles.down]}
                    onPress={this._up}/>
              <Text style={styles.handleText} onPress={this._up}>喜欢</Text>
            </View>

            <View style={styles.handleBox}>
              <Icon name="ios-chatboxes-outline" size={15} style={styles.commentIcon} />
              <Text style={styles.handleText}>播放</Text>
            </View>

            <View style={styles.handleBox}>
              <Icon name="ios-chatboxes-outline" size={15} style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
});

var Move = React.createClass({

  //根据生命周期会第一个调用这个方法
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      isRefreshing:true,
    };
  },
  _renderRow(row) {
    return <Item
      key={row._id}
      row={row} />
  },

  componentDidMount() {
    this._fetchData(1)
  },


  _fetchData(page) {
    var that = this;

    request.get(config.api.base + config.api.creations,{
      accessToken: 'xiaohai',
      page:page
    })
      .then((data) => {

        if (data.success){

          var items = cacheResults.items.slice();

          items = data.data.concat(items);

          cacheResults.items = items;
          console.log(cacheResults);

          setTimeout(function(){
            that.setState({
              dataSource: that.state.dataSource.cloneWithRows(cacheResults.items)
            });
          },20);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}  //获取数据
          renderRow={this._renderRow} //讲获取的数据填充到视图中

          showsVerticalScrollIndicator = {true} //是否显示进度条

          onEndReached={this._fetchMoreData}


          contentContainerStyle={styles.list}
          enableEmptySections = {true} //不需要空白的位置
          automaticallyAdjustContentInsets={false} //自动调整内容



        />


      </View>
    )
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    padding:25,
    paddingBottom:12,
    backgroundColor:'#ee735c'
  },
  headerTitle:{
    color:'#fff',
    fontSize:16,
    fontWeight: '600',
    textAlign:'center'

  },
  list: {
    marginTop:5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item:{
    width:(width-30) * 0.5,
    height:width * 0.45,
    backgroundColor:'#eee',
    marginBottom:10,
    flexWrap:'nowrap',

  },
  thumb:{
    width:(width-30) * 0.5,
    height:width * 0.56 *0.5,
    resizeMode: 'cover',
    marginBottom:10
  },
  title:{
    fontSize:11,
    color:'#333',
    height:30
  },
  play:{
    position:'absolute',
    bottom:5,
    right:5,
    height:30,
    width:30,
    paddingTop:5,
    paddingLeft:12,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius: 15,
    color:'#ed7b66'
  },
  itemFooter:{
    flexDirection:'row',
    justifyContent:'space-between',

    position:'absolute',
    bottom:0,
  },
  handleBox:{
    paddingTop:5  ,
    flexDirection:'row',
    width: ((width-30) * 0.5)/3 - 0.5,
    justifyContent:'center',
    backgroundColor:'#eaeaea'
  },
  handleText:{
    paddingLeft:5,
    fontSize:12,
    color:'#333'
  },

});

module.exports = Move;