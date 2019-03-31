import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    ispay:'none',
    price:''
  },
  onLoad: function (options) {
    this.getGasstationData(options.id)
  },
  getGasstationData:function(id){
    let data = {
      id
    }
    feach('/admin/Gasstation/getGasstationData','GET',data)
    .then(res=>{
      console.log(res.data)
      let product = JSON.parse(res.data.data.product)
      if(res.data.code==='0'){
        this.setData({
          ...res.data.data,
          product,
        })
      }
    })
  },
  openpay:function(){
    this.setData({
      ispay:'block'
    })
  },
  closepay:function(){
    this.setData({
      ispay:'none'
    })
  },
  openmap:function(){
    wx.getLocation({
      type: 'gcj02', 
      latitude: this.data.latitude,
      longitude: this.data.longitude,
    })
  },
  Saveprice:function(e){
    console.log(e.detail.value)
    this.setData({
      price: e.detail.value,
    })
  },
  pay:function(){
    console.log(this.data.product)
    let data  = {
      id:this.data.id,
      price:this.data.price,
      gid: this.data.product[0].gid
    }
    feach('/api/Order/payGasstationOrder','post',data)
    .then(res=>{
      console.log(res.data)
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success(res) { 
            if(res.errMsg === "requestPayment:ok"){
              wx.navigateTo({
                url: '../paySuccess/paySuccess',
              })
            }
          },
          fail(res) { }
    })
    })
  
  }
})