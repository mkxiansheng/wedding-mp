const util = require('../../utils/util.js')

function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    video: '',
    name: '',
    author: {},
    danmuList: []
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },

  onLoad: function (e) {
    console.log(e.id);
    const me = this;
    // 获取视频,作者
    wx.request({
      url: 'http://localhost/weddingDesc' + '?id=' + e.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let _res = res.data;
        if (_res.code === 0) {
          me.setData({
            video: _res.Json.video
          });
          me.setData({
            name: _res.Json.name
          });
          me.setData({
            author: _res.Json.user
          });
        }
      },
      fail: function (res) {
        console.log('in banner err');
      }
    })
    // 获取弹幕
    wx.request({
      url: 'http://localhost/weddingDescDanMu' + '?id=' + e.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let _res = res.data;
        if (_res.code === 0) {
          me.setData({
            danmuList: _res.Json
          });
        }
      },
      fail: function (res) {
        console.log('in banner err');
      }
    })
  }
})
