
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
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

  },
  alert: function (txt) {
    wx.showModal({
      title: '温馨提示',
      content: txt,
      showCancel: false
    })
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
      this.alert('请输入加油站名称')
      return
    } else if (!data.address) {
      this.alert('请输入加油站地址')
      return
    } else if (!data.longitude) {
      this.alert('请定位加油站位置')
      return
    } else if (!data.description) {
      this.alert('请输入加油站描述')
      return
    } else if (!data.original_price) {
      this.alert('请输入汽油原价')
      return
    } else if (!data.real_price) {
      this.alert('请输入当前汽油价格')
      return
    }
    feach('/admin/Carwash/saveCarwash', 'post', data)
      .then(res => {
        console.log(res)
        if (res.data.code === '0') {
          wx.showModal({
            title: '温馨提示',
            content: '添加成功，已为您自动清空',
            showCancel: false,
            success: () => {
              this.setData({
                name: '',
                address: '',
                longitude: '',
                latitude: '',
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
  }
})