//app.js 11

const api = require('./utils/api.js')
const util = require('./utils/util.js')
App({
  onLaunch: function (wxObj) {
    // 登录
    const that = this;
    if (wxObj.scene === 1007 && wxObj.query.mind) {
      // 分享后的流程
      wx.setStorageSync('token', wxObj.query.mind);
      that.uInfo();
      return;
    }
    wx.login({
      success: res => {
        util.request({
          url: api.getOpenId,
          data: {
            js_code: res.code,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.code === 200) {
              const openId = res.data.data.openid;
              wx.setStorageSync('token', openId);
              that.uInfo();
            }
          }
        })
      }
    })
  },
  uInfo() {
    const that = this;
    wx.getUserInfo({
      success: function (res) {
        res.userInfo.gender = ['未知', '男', '女'][res.userInfo.gender];
        wx.setStorageSync('userInfo', res.userInfo);
        that.login({
          userInfo: res.userInfo,
          name: wx.getStorageSync('token'),
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  login: (data) => {
    util.request({
      url: api.login,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
      }
    })
  },
})