//index.js
//获取应用实例
const app = getApp()
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
  report: function (lng, lat) {
    util.request({
      url: api.report, //仅为示例，并非真实的接口地址
      data: {
        cont: this.data.inputContent, 
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': 'token=' + wx.getStorageSync('token') + ';'
      },
      success: function (res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            complete:function(){
              setTimeout(() => {
                wx.switchTab({
                  url: '../diary/index'
                })
              },2000)
            }
          });
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
