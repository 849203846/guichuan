
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    Mapname:'点击定位位置',
    name: '',//名称
    address: '',//地址
    longitude: '',
    latitude: '',
    thumb: '',//图片
    description: "",//描述
    original_price: '',//原价
    phone: '',//手机号
    real_price: '',//当前价格
  },
  onLoad: function (options) {
    if (options.id){
      feach('/admin/Carwash/getCarwashData', 'get', { id: options.id})
      .then(res=>{
        console.log(res.data.data)
        this.setData({
          id: options.id,
          ...res.data.data
        })
      })
    }
  },

  SaveMap: function () {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.name,
        })
      }
    })
  },
  alert: function (txt) {
    wx.showModal({
      title: '温馨提示',
      content: txt,
      showCancel: false
    })
  },
  SaveName: function (e) {
    let value = e.detail.value,
      name = e.target.dataset.name
    let data = {}
    data[name] = value
    this.setData(data)
  },
  saveGasStation: function () {
    let data = {
      name: this.data.name,
      address: this.data.address,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      thumb: this.data.thumb,
      description: this.data.description,
      original_price: this.data.original_price,
      phone: this.data.phone,
      real_price: this.data.real_price,
    }
    console.log(data);
    if (!data.name) {
      this.alert('请输入名称')
      return
    } else if (!data.address) {
      this.alert('请输入地址')
      return
    } else if (!data.longitude) {
      this.alert('请定位店铺位置')
      return
    } else if (!data.description) {
      this.alert('请输入店铺描述')
      return
    } else if (!data.original_price) {
      this.alert('请输入原价')
      return
    } else if (!data.real_price) {
      this.alert('请输入优惠价格')
      return
    } else if (!data.thumb){
      this.alert('请上传图片')
      return;
    } else if (!data.phone||data.phone.length!==11){
      this.alert('请输入手机号');
      return;
      }
      if(this.data.id){
        data.id=this.data.id
      }
    feach('/admin/Carwash/saveCarwash', 'post', data)
      .then(res => {
        console.log(res)
        if (res.data.code === 0) {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            success: () => {
              if(data.id){
                wx.navigateBack({})
                return
              }
              this.setData({
                name: '',
                address: '',
                longitude: '',
                latitude: '',
                Mapname:'',
                thumb: '',
                description: "",
                original_price: '',
                phone: '',
                real_price: '',
              })
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      })
  },
  upimg: function () {
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
            that.setData({
              thumb: data.data
            })
          }
        })
      }
    })
  }
})