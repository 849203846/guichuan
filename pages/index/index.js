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
    car_register: '点击选择日期',
    sendcode:'获取验证码'
  },
  SaveCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  sendCode: function () {
    if (this.data.sendcode !== '获取验证码') return;
    let data = {
      marker: 1,
      phone: this.data.mobile,
    }
    if (data.phone == '' || data.phone.length !== 11) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确手机号',
        showCancel: false
      })
    }
    feach('/api/Base/sendCode', 'get', data).then(res => {
      console.log(res.data)
      if (res.data.code == 0) {
        let timernum = 120
        this.setData({
          sendcode: '已发送(120)'
        })
        clearInterval(timer)
        let timer = setInterval(() => {
          --timernum
          if (timernum <= 0) {
            this.setData({
              sendcode: '获取验证码'
            })
            clearInterval(timer);
            return;
          }
          this.setData({
            sendcode: '已发送(' + timernum + ')'
          })
        }, 1000)
        return;
      }
      wx.showModal({
        title: '温馨提示',
        content: res.data.msg,
        showCancel: false
      })
    })
  },
  onLoad:function(){
    feach('/api/Driver/getDriverStatus','get',{})
    .then(res=>{
      console.log(res.data.data.status)
      if (res.data.data.status==='1'){
        wx.reLaunch({
          url: '../Inaudit/Inaudit',
        })
      } else if (res.data.data.status === '2' || res.data.data.status === '6'){
        //顺风车认证页面
        wx.reLaunch({
          url: '../VehicleOwner/VehicleOwner',
        })
      } else if (res.data.data.status === '3'){
        wx.reLaunch({
          url: '../approvalSuccess/approvalSuccess',
        })
      } else if (res.data.data.status === '4'){
        wx.showModal({
          title: '温馨提示',
          content: '认证失败，请重新填写信息进行验证。',
          showCancel:false,
        })
      } else if (res.data.data.status === '5'){
        wx.showModal({
          title: '温馨提示',
          content: '认证失败，请重新填写信息进行验证。',
          showCancel: false,
          success:()=>{
                //顺风车认证页面
            wx.reLaunch({
              url: '../VehicleOwner/VehicleOwner',
            })
          }
        })
      }
    })
  },
  SaveCar_register(e) {
    this.setData({
      car_register: e.detail.value
    })
  },
  bindDateChange:function(e){
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
      code: this.data.code,
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
              wx.reLaunch({
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