//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    weddinglist: {},
    bannerList: {},
    url: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    const me = this;
    const url = app.globalData.url;

    me.setData({
      url : url
    });
    // 获取banner
    wx.request({
      url: url + '/bannerList',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let _res = res.data;
        if (_res.code === 0) {
          me.setData({
            bannerList: _res.Json
          })
        }
      },
      fail: function (res) {
        console.log('in banner err');
      }
    })

    // 获取婚礼列表
    wx.request({
      url: url + '/weddingList', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let _res = res.data;
        if (_res.code === 0) {
          me.setData({
            weddinglist: _res.Json
          })
        }
        console.log(res.data)
      },
      fail: function (res) {
        console.log('in err');
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
