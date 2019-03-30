
import {
  feach
} from '../../utils/util.js'
Page({
  data:{},
  onLoad: function (options) {
    
    feach('/api/Driver/getDriverStatus','get',{})
    .then(res=>{
      console.log(res.data.data.status)
      let status = res.data.data.status
      switch(status){
        case '0':
        wx.showModal({
          title: '温馨提示',
          content: res.data.data.msg,
          showCancel:false,
          success:function(){
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
        break;
        case '1'||'6':
          wx.showModal({
            title: '温馨提示',
            content: res.data.data.msg,
            showCancel: false,
          })
          break;
          case '2':
          wx.showModal({
            title: '温馨提示',
            content: '请进行顺风车主认证',
            showCancel: false,
            success:function(){
              wx.reLaunch({
                url: '../VehicleOwner/VehicleOwner',
              })
            }
          })
          break;
          case '4':
          wx.showModal({
            title: '温馨提示',
            content: '车主未认证',
            showCancel: false,
            success: function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }
          })
          break;
          case '5':
          wx.showModal({
            title: '温馨提示',
            content: '顺丰车未认证',
            showCancel: false,
            success: function () {
              wx.reLaunch({
                url: '../VehicleOwner/VehicleOwner',
              })
            }
          })
          break;
          default:
          break;
      }
    })
  },
  onShow:function(){
    feach('/api/Release/getUserReleaseList','get',{
      status:1,
      page:1,
    }).then(res=>{
      console.log(res.data.data.list)
      this.setData({
        list:res.data.data.list,
      })
    })
  }
})