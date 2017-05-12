//index.js
//获取应用实例
Page({
  data: {
    markers: [{
      iconPath: "local.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 30
    }],
  },
  onLoad:function(){
    var _this=this;
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var speed = res.speed
            var accuracy = res.accuracy
            _this.setData({
              latitude: res.latitude,
              longitude: res.longitude
            })
        }
    })
  }
})
