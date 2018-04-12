//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    local: {
      lng: '',
      lat: ''
    },
    markers: [],
    query: null,
    time: 0,
  },
  markertap: function (id) {
    // console.log(id);
  },
  onLoad: function (query) {
    this.getLocList(query);
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        wx.setStorageSync('local', {
          lng: res.longitude,
          lat: res.latitude
        })
        if (query.time) {
          this.setData({
            query: query.mind,
            time: query.time,
            local: {
              lng: res.longitude,
              lat: res.latitude
            },
          })
        } else {
          this.setData({
            local: {
              lng: res.longitude,
              lat: res.latitude
            },
          })
        }
        
      }
    })
  },
  write: function () {
    wx.navigateTo({
      url: '../write/write'
    })
  },
  getLocList: function (data) {
    const that = this;
    util.request({
      url: api.locList, //仅为示例，并非真实的接口地址
      data: {
        time: data.time || '',
      },
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': 'token=' + wx.getStorageSync('token') + ';'
      },
      success: function (res) {
        if (res.data.code === 200) {
          let markers = res.data.data.data;
          markers = markers.map((e, i) => {
            return {
              id: i,
              latitude: e.lat,
              longitude: e.lng,
              iconPath: './local.png',
              width: 22,
              height: 22,
              callout: {
                content: e.content + '\n' + e.time,
                fontSize: 14,
                padding: 10,
                borderRadius: 4,
              },
            };
          })
          that.setData({
            markers,
          })
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '看看我的记文地图',
      path: `/pages/index/index?mind=${wx.getStorageSync('token')}&time=${this.data.time || new Date().getTime()}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
