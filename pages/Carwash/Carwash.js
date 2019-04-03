
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
    phone: '',//手机号
    OilList: [{
      carwash_type: '',
      real_price: '',
      original_price: ''
    },]
  },
  onLoad: function (options) {
    if (options.id){
      feach('/admin/Carwash/getCarwashData', 'get', { id: options.id})
      .then(res=>{
        console.log(res.data.data)
        let OilList = JSON.parse(res.data.data.product)
        this.setData({
          id: options.id,
          ...res.data.data,
          OilList
        })
      })
    }
  },

  SaveGasoline_type: function (e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].carwash_type = e.detail.value
    this.setData({
      OilList,
    })
  },
  SaveReal_price: function (e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].real_price = e.detail.value
    this.setData({
      OilList,
    })
  },
  SaveOriginal_price: function (e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].original_price = e.detail.value
    this.setData({
      OilList,
    })
  },
  delOilList: function (e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    if (OilList.length <= 1) return;
    OilList.splice(index, 1);
    this.setData({
      OilList,
    })
  },
  addOilList: function () {
    let OilList = this.data.OilList
    let item = {
      carwash_type: '',
      real_price: '',
      original_price: ''
    }
    OilList.push(item);
    this.setData({
      OilList,
    })
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
    if (this.data.OilList.length === 1 && this.data.OilList[0].carwash_type === '') {
      return;
    }
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    let data = {
      name: this.data.name,
      address: this.data.address,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      thumb: this.data.thumb,
      description: this.data.description,
      phone: this.data.phone, 
      product:JSON.stringify(this.data.OilList),
    }
    if (!data.name) {
      this.alert('请输入名称')
      wx.hideLoading();
      return
    } else if (!data.address) {
      this.alert('请输入地址')
      wx.hideLoading();
      return
    } else if (!data.longitude) {
      this.alert('请定位店铺位置')
      wx.hideLoading();
      return
    } else if (!data.description) {
      this.alert('请输入店铺描述')
      wx.hideLoading();
      return
    } else if (!data.thumb){
      this.alert('请上传图片')
      wx.hideLoading();
      return;
    } else if (!data.phone||data.phone.length!==11){
      this.alert('请输入手机号');
      wx.hideLoading();
      return;
      }
      if(this.data.id){
        data.id=this.data.id
      }
    feach('/admin/Carwash/saveCarwash', 'post', data)
      .then(res => {
        console.log(res)
        wx.hideLoading();
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