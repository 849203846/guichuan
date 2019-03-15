// pages/login/login.js
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    username: '',
    password: ''
  },
  login() {
    let data = {
      username: this.data.username,
      password: this.data.password,
    }
    if (data.username === '') {
      wx.showModal({
        title: '温馨提示',
        content: '请输入用户名',
        showCancel: false
      })
      return;
    } else if (data.password === '') {
      wx.showModal({
        title: '温馨提示',
        content: '请输入密码',
        showCancel: false
      })
      return;
    }
    feach('/admin/Login/loginOn', 'post', data)
      .then(res => {  
        console.log(res)
        if (res.data.code) {
          wx.showModal({
            title: '微信提示',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          wx.redirectTo({
            url: '../approvalList/approvalList',
          })
        }
      })
  },
  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  }
})