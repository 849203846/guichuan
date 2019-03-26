import {
  feach
} from '../../utils/util.js'
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options.id)
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
          product
        })
      }
    })
  },pay:function(){
    console.log(this.data.product)
    let data  = {
      id:this.data.id,
      price:0.01,
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