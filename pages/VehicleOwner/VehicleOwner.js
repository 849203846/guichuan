// pages/VehicleOwner/VehicleOwner.js
import {
  feach
} from '../../utils/util.js'
Page({

  data: {
    id_front_img:'',
    id_back_img:'',
    car_travel_img:'',
    car_drive_img:'',
    car_img:''
  },
onLoad:function(){
  feach('/api/Driver/getDriverStatus', 'get', {})
  .then(res=>{
    if (res.data.data.status === '1') {
      wx.reLaunch({
        url: '../Inaudit/Inaudit',
      })
    }  else if (res.data.data.status === '3') {
      wx.reLaunch({
        url: '../Inaudit/Inaudit',
      })
    } else if (res.data.data.status === '4') {
      wx.showModal({
        title: '温馨提示',
        content: '认证失败，请重新填写信息进行验证。',
        showCancel: false,
      })
    } else if (res.data.data.status === '5') {
      wx.showModal({
        title: '温馨提示',
        content: '认证失败，请重新填写信息进行验证。',
        showCancel: false,
      })
    }
  })
},
UPimg:function(e){
  let url = e.target.dataset.datacontent
  let that = this
  wx.chooseImage({
    success(res) {
      const tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: 'https://cx.bjlingdi.com/api/Upload/doUpload', // 仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'myfile',
        formData: {
          user: 'myfile'
        },
        success(res) {
          let data = JSON.parse(res.data);
          let newdata = {}
          newdata[url] = data.data
          that.setData(newdata)
        }
      })
    }
  })
},
  submit:function(){
    let data = {
      id_front_img: this.data.id_front_img,
      id_back_img: this.data.id_back_img,
      car_travel_img: this.data.car_travel_img,
      car_drive_img: this.data.car_drive_img,
      car_img: this.data.car_img,
    }
    feach('/api/Driver/registerDriver','post',data)
    .then(res=>{
      if(res.data.code =='0'){
        wx.reLaunch({
          url: '../Inaudit/Inaudit',
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: res.data.msg,
        })
      }
    })
  }
})