import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    list: [],
    page: 1
  },
  onShow: function (options) {
    let data = {
      page: this.data.page,
    }
    feach('/admin/Carwash/getCarwashList', 'get', data)
      .then(res => {
        console.log(res.data.data.list)
        this.setData({
          list: res.data.data.list
        })
      })
  },
  add: function () {
    wx.navigateTo({
      url: '../Carwash/Carwash',
    })
  }
})