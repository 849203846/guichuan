import {
  feach
} from '../../../utils/util.js'
Page({
  data: {
    go_time:'2019:03'
  },
  onLoad(opc){
    let flag = opc.flag
    this.setData({
      flag,
    })
    feach('/admin/Driver/getDriverByStatus','get',{})
    .then(res=>{
      console.log(res)
    })
  },
  SaveCount:function(e){
    console.log(e.detail.value)
    this.setData({
      count:e.detail.value,
    })
  },
  SaveMarker: function (e) {
    console.log(e.detail.value)
    this.setData({
      marker: e.detail.value,
    })
  },
  SavePrice:function(e){
    this.setData({
      price:e.detail.value
    })
  },
  Savephone:function(e){
    this.setData({
      phone: e.detail.value
    }) 
  },
  SaveCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  openMap:function(){
    wx.chooseLocation({
      success(res) {
        return res;
      }
    })
  },
  SaveStart:function(){
    let that = this
    wx.chooseLocation({
      success(res) {
        that.setData({
          start: res.address,
          startLatitude: res.latitude,
          startLongitude: res.longitude,
        })
        if (that.data.EndLatitude) {
          let data = {
            origin: that.data.startLatitude + ',' + that.data.startLongitude,
            destination: that.data.EndLatitude + ',' + that.data.EndLongitude
          }
          feach('/api/Online/getOnline', 'get', data)
            .then(res => {
              console.log(res.data.data)
              this.setData({
                Onlineprice: res.data.data.price,
                duration: res.data.data.duration,
                distance: res.data.data.distance,
              })
            })
        }
      }
    })
   
  },
  SaveEnd: function(){
    let that = this
    wx.chooseLocation({
      success(res) {
        that.setData({
      start: res.address,
      EndLatitude: res.latitude,
      EndLongitude: res.longitude,
    })
        if (that.data.startLatitude){
      let data = {
        origin: that.data.startLatitude + ',' + that.data.startLongitude,
        destination: that.data.EndLatitude + ',' + that.data.EndLongitude
      }
      feach('/api/Online/getOnline','get',data)
      .then(res=>{
        console.log(res.data.data)
        this.setData({
          Onlineprice: res.data.data.price,
          duration: res.data.data.duration,
          distance: res.data.data.distance,
        })
      })
    }
      }
    })
    
  },
  sendCode:function(){
    let data = {
        marker:1,
        phone:this.data.phone,
    }
    if (data.phone == '' || data.phone.length!==11){
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确手机号',
        showCancel:false
      })
    }
    feach('/api/Base/sendCode','get',data).then(res=>{
      wx.showModal({
        title: '温馨提示',
        content: res.data.msg,
        showCancel: false
      })
    })
  },
submit:function(){
  let data = {
      start:this.data.start,
      end:this.data.end,
      go_time:this.data.go_time,
      count:this.data.count,
      marker:this.data.marker,
      price:this.data.price,
      mobile:this.data.mobile,
      code:this.data.code,
    start_longitude: this.data.start_longitude,
    start_latitude: this.data.start_latitude,
    end_longitude: this.data.end_longitude,
    end_latitude: this.data.end_latitude,
  }
  feach('/api/Release/UserRelease','post',data)
  .then(res=>{
    wx.showModal({
      title: '温馨提示',
      content: res.data.msg,
      showCancel:false
    })
  })
},
SaveTime:function(e){
  console.log(e.detail.value)
  this.setData({
    go_time:e.detail.value
  })
}
})