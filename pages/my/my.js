const util = require('../../utils/util.js')
const app = getApp()

Page({
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
