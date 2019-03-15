//index.js
//获取应用实例
const app = getApp()
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    motto: '123',
    car_color: '',
    car_register: '',
  },
  SaveCar_register(e) {
    this.setData({
      car_register: e.detail.value
    })
  },
  SaveCar_color(e) {
    this.setData({
      car_color: e.detail.value
    })
  },
  SaveCar_own(e) {
    this.setData({
      car_own: e.detail.value
    })
  },
  SaveCar_num(e) {
    this.setData({
      car_num: e.detail.value
    })
  },
  SaveCar_brand(e) {
    this.setData({
      car_brand: e.detail.value
    })
  },
  SaveId_num(e) {
    this.setData({
      id_num: e.detail.value
    })
  },
  SaveMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  SaveRealname(e) {
    this.setData({
      realname: e.detail.value
    })
  },
  btnSubmit() {
    let data = {
      realname: this.data.realname,
      mobile: this.data.mobile,
      id_num: this.data.id_num,
      car_brand: this.data.car_brand,
      car_num: this.data.car_num,
      car_own: this.data.car_own,
      car_color: this.data.car_color,
      car_register: this.data.car_register,
    }
    if (!data.realname) {
      this.alert('车主姓名')
      return;
    }
    if (!data.mobile || data.mobile.length !== 11 || data.mobile[0] != '1') {
      this.alert('车主电话')
      return;
    }
    if (!data.id_num) {
      this.alert('车主身份证号')
      return;
    }
    if (!data.car_brand) {
      this.alert('车型')
      return;
    }
    if (!data.car_num) {
      this.alert('车牌号')
      return;
    }
    if (!data.car_color) {
      this.alert('车辆颜色')
      return;
    }
    if (!data.car_own) {
      this.alert('车辆所有者')
      return;
    }
    if (!data.car_register) {
      this.alert('车辆注册日期')
      return;
    }
    console.log(data)
    feach('/api/Driver/registerCar', 'post', data)
      .then(res => {
        if (res.data.code) {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '恭喜您',
            content: '注册成功，等待审核中',
            showCancel: false,
            success: function() {
              wx.navigateTo({
                url: '../Inaudit/Inaudit',
              })
            }
          })
        }
        console.log(res)

      })

  },
  alert(text) {
    wx.showModal({
      title: '温馨提示',
      content: '请输入' + text,
      showCancel: false
    })
  }

})