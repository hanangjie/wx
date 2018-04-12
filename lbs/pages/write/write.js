//index.js
//获取应用实例
const app = getApp()
const local = wx.getStorageSync('local');
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
  data: {
    inputContent: '',
  },
  onLoad: function () {
  },
  bindBlur: function (e) {
    this.setData({
      inputContent: e.detail.value,
    })
  },
  write: function () {
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.addLoc(res.longitude, res.latitude)
      }
    })
  },
  addLoc: function (lng, lat) {
    util.request({
      url: api.addLoc, //仅为示例，并非真实的接口地址
      data: {
        content: this.data.inputContent,
        lng,
        lat,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': 'token=' + wx.getStorageSync('token') + ';'
      },
      success: function (res) {
        if (res.data.code === 200) {
          wx.switchTab({
            url: '../diary/index'
          })
        } else {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000
          })
        }
      }
    })
  }
})
