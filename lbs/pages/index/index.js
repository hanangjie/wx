//index.js
//获取应用实例
Page({
  data: {
      width: 30,
      height: 30,
      debug: false,
      interval:null,
      debugMsg:"0",
      polyline: [{
        points: [],
        color: "#FF0000DD",
        width: 2,
        dottedLine: true
      }],
      length:0
  },
  onShow:function(){
    var _this=this;
    this.getLoc();
    this.mapCtx = wx.createMapContext('map')
    //_this.mapCtx.moveToLocation()
  },
  startDraw: function () {
    var _this = this;
    /*_this.getCenter();
    setInterval(function () {
      _this.mapCtx.moveToLocation();
      _this.getCenter();
    }, 3000)*/
    this.interval=setInterval(function () {

      _this.getLoc();
      //_this.mapCtx.moveToLocation()
    }, 3000)
   
  },
  stopDraw:function(){
    var _this = this;

    clearInterval(this.interval)
    wx.showToast({
      title: '跑步结束记得截屏分享',
      icon: 'success',
      duration: 2000
    })
    this.mapCtx.includePoints({
      padding: [10],
      points: _this.data.polyline[0].points
    })
  },
  //获取接口的经纬度
  getLoc:function(){
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var lbsList = _this.data.polyline[0].points
        //if (accuracy > 60) {
          lbsList.push({ latitude: res.latitude, longitude: res.longitude })
          _this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            debugMsg: "获取成功，精度：" + accuracy + "经纬度：" + res.latitude + "," + res.longitude + "高度：" + res.altitude ,
            polyline:[{
              points: lbsList,
              color: "#FF0000DD",
              width: 5,
              dottedLine: false
            }]
          })
       // }
      }
    })
    /*结束*/
  },
  //获取地图中心位置
  getCenter: function () {
    var _this = this;
    this.mapCtx.moveToLocation()
    this.mapCtx.getCenterLocation({
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      },
      complete: function (res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var lbsList = _this.data.polyline[0].points
        //if (accuracy > 60) {
        lbsList.push({ latitude: res.latitude, longitude: res.longitude })
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          debugMsg: "获取成功，精度：" + accuracy + "经纬度：" + res.latitude + "," + res.longitude + "高度：" + res.altitude,
          polyline: [{
            points: lbsList,
            color: "#FF0000DD",
            width: 2,
            dottedLine: false
          }]
        })
      }
    })
  },
  onShareAppMessage: function () {
  //转发
    return {
      title: '跑步机',
      path: '/pages/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
