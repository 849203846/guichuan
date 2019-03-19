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

UPimg:function(e){
  let url = e.target.dataset.dataContent
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
    feach('','get',data)
    .then(res=>{
      console.log(res)
    })
  }
})