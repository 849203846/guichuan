import {
  feach
} from '../../../utils/util.js'
Page({
  data: {
    go_Date:'',
    go_time:'',
    sendcode:'获取验证码'
  },
  onLoad(opc){
    let time = new Date();
    this.setData({
      go_Date: time.getFullYear() + '-' + (time.getMonth()+1)+'-'+time.getDate(),
      go_time: time.getHours()+':'+time.getMinutes()
    })
  },
  SaveCount:function(e){
    this.setData({
      count:e.detail.value,
    })
  },
  SaveMarker: function (e) {
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
      end: res.address,
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
    if (this.data.sendcode!=='获取验证码')return;
    let data = {
        marker:2,
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
      console.log(res.data)
      if(res.data.code==0){
        let timernum = 120
        this.setData({
          sendcode:'已发送(120)'
        })
        clearInterval(timer)
        let timer = setInterval(()=>{
          --timernum
          if (timernum<=0){
            this.setData({
              sendcode: '获取验证码'
            })
            clearInterval(timer);
            return;
          }
          this.setData({
            sendcode:'已发送('+timernum+')'
          })
        },1000)
        return;
      }
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
    go_time: this.data.go_Date+' '+this.data.go_time,
      count:this.data.count,
      marker:this.data.marker,
      price:this.data.price,
      mobile:this.data.phone,
      code:this.data.code,
    start_longitude: this.data.startLongitude,
    start_latitude: this.data.startLatitude,
    end_longitude: this.data.EndLongitude,
    end_latitude: this.data.EndLatitude,
  }
  feach('/api/Release/UserRelease','post',data)
  .then(res=>{
    if(res.data.code==0){
      wx.showModal({
        title: '温馨提示',
        content: res.data.msg,
        showCancel:false,
        success:()=>{
          wx.navigateBack({})
        }
      })
      return;
    }
    wx.showModal({
      title: '温馨提示',
      content: res.data.msg,
      showCancel:false
    })
  })
},
SaveTime:function(e){
  this.setData({
    go_time:e.detail.value
  })
},
  SaveDate:function(e){
    this.setData({
      go_Date: e.detail.value
    })
  }
})