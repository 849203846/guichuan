import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    ispay: 'none',
    price: ''
  },
  onLoad: function (options) {
    this.getGasstationData(options.id)
  },
  getGasstationData: function (id) {
    let data = {
      id
    }
    feach('/admin/Gasstation/getGasstationData', 'GET', data)
      .then(res => {
        console.log(res.data)
        let product = JSON.parse(res.data.data.product)
        if (res.data.code === '0') {
          this.setData({
            ...res.data.data,
            product,
          })
        }
      })
  },
  openpay: function () {
    this.setData({
      ispay: 'block'
    })
  },
  closepay: function () {
    this.setData({
      ispay: 'none'
    })
  },
  openmap: function () {
    wx.getLocation({
      type: 'gcj02',
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    })
  },
  Saveprice: function (e) {
    console.log(e.detail.value)
    this.setData({
      price: e.detail.value,
    })
  },
  pay: function () {
    let that = this
    let data = {
      id: this.data.id,
      price: this.data.price,
      gid: this.data.product[0].gid
    }
    feach('/api/Order/payGasstationOrder', 'post', data)
      .then(res => {
        if(res.data.code!=0){
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel:false
          })
        }
        let order_num = res.data.data.order_num
       
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res_2) {
            if (res_2.errMsg === "requestPayment:ok") {
              wx.showModal({
                title: '请于商家核对订单号',
                content: order_num,
                showCancel: false,
                success: () => {
                  that.setData({
                    ispay: 'none',
                  })
                }
              })
            }
          },
          fail(res) { }
        })
      })

  },
  mkphone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }
})