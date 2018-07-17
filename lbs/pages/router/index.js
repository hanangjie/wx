// pages/router/index.js
Page({

  /**
   * 页面的初始数据
   */
  onLoad: function(e) {
    wx.getUserInfo({
      success: function(e){
        console.log(e);
        if (e.rawData) {
          wx.switchTab({
            url: '../diary/index',
            fail: (e) => {
              console.log(e);
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.switchTab({
        url: '../diary/index',
        fail:(e) =>{
          console.log(e);
        }
      })
    }
  }
})