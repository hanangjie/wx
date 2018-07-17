//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

let Query = '';
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
    //this.getLocList(query);
    if (query.time) {
      Query = query
      this.setData({
        query: query.mind,
        time: query.time,
      })
    }
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          local: {
            lng: res.longitude,
            lat: res.latitude
          },
        })
      }
    })
  },
  onShow: function () {
    this.getLocList(Query || {});
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
        'cookie': 'token=' + (data.mind ||wx.getStorageSync('token')) + ';'
      },
      success: function (res) {
        Query = null;
        const data = res.data.data;
        if (res.data.code === 200) {
          let markers = data.locList;
          markers = markers.map((e, i) => {
            console.log(data.userInfo.avatarUrl)
            return {
              id: i,
              latitude: e.lat,
              longitude: e.lng,
              iconPath: data.userInfo.avatarUrl,
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
      path: `/pages/diary/index?mind=${wx.getStorageSync('token')}&time=${this.data.time || new Date().getTime()}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
