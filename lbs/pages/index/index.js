//index.js
//获取应用实例
Page({
  data: {
      width: 30,
      height: 30,
      debug: true,
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
    setInterval(function () {
      _this.mapCtx.moveToLocation();
    }, 3000)
  },
  startDraw: function () {
    var _this = this;
    _this.getCenter();
    setInterval(function () {
      _this.getCenter();
    }, 1000)
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
              width: 2,
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
