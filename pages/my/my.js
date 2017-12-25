const util = require('../../utils/util.js')
const app = getApp()

Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.name,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log('share success');
      },
      fail: function (res) {
        // 转发失败
        console.log('share err');
      }
    }
  },
  data: {
    userInfo: null
  },

  onLoad: function (e) {
    const me = this;
    me.setData({
      userInfo: app.globalData.userInfo
    });
  }
})
