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
    let res = this.openMap();
    this.setData({
      start: res.address,
      startLatitude: res.latitude,
      startLongitude: res.longitude,
    })
  },
  SaveEnd:function(){
    let res = this.openMap()
    this.setData({
      start: res.address,
      EndLatitude: res.latitude,
      EndLongitude: res.longitude,
    })
    if(this.data.startLatitude){
      let Startlatitude = this.data.startLatitude,
      Startlongitude = this.data.startLongitude,
      Endlatitude = res.latitude,
      Endlongitude = res.longitude
      let x = Startlatitude-Endlatitude
      let y = StartLongitude-Endlongitude
      let dis = Math.sqrt(x*x+y*y)
    console.log(dis)
    }

    
  },
submit:function(){
  let data = {
      start:'',
      end:'',
      go_time:'',
      count:'',
      marker:'',
      price:'',
      mobile:'',
      code:''
  }
  feach('/api/Release/DriverRelease','post',data)
  .then(res=>{
    console.log(res)
  })
},
SaveTime:function(e){
  console.log(e.detail.value)
  this.setData({
    go_time:e.detail.value
  })
}
})