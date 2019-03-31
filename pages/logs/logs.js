//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (opction) {
    this.setData({
      url:opction.url,
    })
  },
  bindgetuserinfo(e){
    console.log(e)
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    wx.reLaunch({
      url: this.data.url,
    })
  }
})
