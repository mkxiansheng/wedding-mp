const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/details?id=**',
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
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    id: null,
    video: null,
    name: null,
    author: {},
    danmuList: [],
    url: null,
    time: null
  },
  videoTime: function (e) {
    console.log(e.timeStamp);
    console.log(11);
    this.setData({
      time: e.timeStamp
    });
  },
  danmuInput: function (e) {
    this.inputValue = e.detail.value
  },
  danmuSend: function () {
    const text = this.inputValue;
    const color = getRandomColor();
    const me = this;

    if (me.data.time) {
      this.videoContext.sendDanmu({
        text: text,
        color: color
      });

      // 提交到服务器
      wx.request({
        url: this.data.url + '/addDanmu',
        method: 'POST',
        data: {
          id: this.data.id,
          text: text,
          color: color,
          time: this.data.time/1000
        },
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
  },

  onLoad: function (e) {
    const me = this;
    const url = app.globalData.url;
    const id = e.id;

    me.setData({
      url: url,
      id: id
    });

    // 获取视频,作者
    wx.request({
      url: url + '/weddingDesc' + '?id=' + id,
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
      url: url + '/weddingDescDanMu' + '?id=' + id,
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
