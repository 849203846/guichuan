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
      if(res.data.code==='0'){
        this.setData({
          ...res.data.data
        })
      }
    })
  },pay:function(){
    let data  = {
      id:this.data.id,

    }
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { },
      fail(res) { }
    })
  }
})