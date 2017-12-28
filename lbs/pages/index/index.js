//index.js
//获取应用实例
Page({
  data: {
      width: 30,
      height: 30,
      debug: false,
      interval:null,
      debugMsg:"开始",
      mileage:'0',
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
    if(this.data.debug){
      setTimeout(function(){
        _this.testFn() 
      },3000)
      
    }
  },
  startDraw: function () {
    var _this = this;
    this.interval=setInterval(function () {
      _this.getLoc();
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
        var mileage = _this.data.mileage -0;
        var lbsList = _this.data.polyline[0].points, latitude = res.latitude - 0.002325, longitude = res.longitude+0.004669;
        lbsList.push({ latitude: latitude, longitude: longitude })
        if (_this.data.polyline[0].points.length > 1) {
          mileage = _this.getMile(lbsList[lbsList.length - 1], lbsList[lbsList.length - 2])-0 +mileage -0;
        }
        _this.setData({
          latitude: latitude,
          longitude: longitude,
          mileage: mileage.toFixed(2),
          debugMsg: "获取成功，里程:" + mileage+"精度：" + accuracy + "经纬度：" + latitude + "," + longitude ,
          polyline:[{
            points: lbsList,
            color: "#FF0000DD",
            width: 5,
            dottedLine: false
          }]
        })
      }
    })
    /*结束*/
  },
  getMile(a,b){
    let mile = 0;
    mile = Math.pow((a.latitude - b.latitude), 2) + Math.pow((a.longitude - b.longitude), 2)
    mile = Math.pow(mile, 1 / 2);
    return mile * 120285.51801796898;
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
  },
  testFn: function () {
    var _this=this;
    var mapCtx = wx.createMapContext('map')
    mapCtx.moveToLocation()
    mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        var speed = res.speed
        var accuracy = res.accuracy
        var lbsList = _this.data.polyline[0].points
        //if (accuracy > 60) {
        _this.setData({
          debugMsg: _this.data.debugMsg
        })
      }
    })
  }
})
