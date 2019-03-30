
import {
  feach
} from '../../../utils/util.js'
Page({
  data: {

  },
  onLoad: function (options) {
    let data = {
      id:options.id,
    }
    feach('/api/Release/getDriverRelease','get',data)
    .then(res=>{
      if(res.data.code==0){
        this.setData({
          ...res.data.data,
        })
      }
    })
  },
  submit:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.mobile,
    })
  }
})