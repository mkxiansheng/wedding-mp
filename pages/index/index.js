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
    bannerList: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    const me = this;

    // 获取banner
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log('in banner err');
        me.setData({
          bannerList: [{
            id: '00000001',
            img: '../../public/banner.jpg'
          }, {
            id: '00000002',
            img: '../../public/newlover.png'
          }, {
            id: '00000003',
            img: '../../public/banner.jpg'
          }]
        })
      }
    })

    // 获取婚礼列表
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log('in err');
        me.setData({
          weddinglist: [{
            id: '00000001',
            name: '汪峰和章子怡的婚礼',
            time: '12：30：55',
            locat: '天上人间',
            img: '../../public/newlover.png'
          },{
            id: '00000002',
            name: '55开和uu的婚礼',
            time: '12：30：55',
            locat: '山水假日',
            img: '../../public/newlover.png'
          },{
            id: '00000003',
            name: '宋仲基和宋慧乔的婚礼',
            time: '12：30：55',
            locat: '维亚纳',
            img: '../../public/newlover.png'
          },{
            id: '00000004',
            name: '赵又廷和高圆圆的婚礼',
            time: '12：30：55',
            locat: '帝豪大酒店',
            img: '../../public/newlover.png'
          },{
            id: '00000005',
            name: '张杰和谢娜的婚礼',
            time: '12：30：55',
            locat: '尊爵大酒店',
            img: '../../public/newlover.png'
          },{
            id: '00000006',
            name: '杜海涛和沈梦辰的婚礼',
            time: '12：30：55',
            locat: '香格里拉大酒店',
            img: '../../public/newlover.png'
          }]
        })
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
