import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    index:0,
    ispay:'none'
  },
  onLoad: function (options) {
    console.log(options.id)
    this.getGasstationData(options.id)
  },
  getGasstationData: function (id) {
    let data = {
      id
    }
    feach('/admin/Carwash/getCarwashData', 'GET', data)
      .then(res => {
        console.log(res.data)
        if (res.data.code === '0') {
          let product = JSON.parse(res.data.data.product)
          let objectArray = []
          product.map(item=>{
            objectArray.push(item.carwash_type);
          })
          this.setData({
            ...res.data.data,
            product,
            objectArray
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
  pay:function(){
    let that = this
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let data = {
      cid: this.data.product[this.data.index].tid
    }
    feach('/api/Order/payCarwashOrder','post',data)
    .then(res=>{
      if(res.data.code==0){
        let order_num = res.data.data.order_num
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(resdata) {
            if (resdata.errMsg === "requestPayment:ok") {
              wx.hideLoading();
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
      }
    })
  }
  ,
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  openmap: function () {
    wx.getLocation({
      type: 'gcj02',
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    })
  },
  mkphone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }
})