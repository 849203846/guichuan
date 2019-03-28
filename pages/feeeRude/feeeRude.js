// pages/feeeRude/feeeRude.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1
  },

  Savebar: function (e) {
    console.log(e.target.dataset.flag)
    this.setData({
      flag: e.target.dataset.flag
    })
  },
  onLoad: function (options) {
    this.setData({
      flag: options.flag,
    })
  },

})