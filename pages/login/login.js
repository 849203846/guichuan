// pages/login/login.js
const app =getApp();
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
        console.log(res.data.data.type)
        if (res.data.data&&res.data.data.type==='4'){
          //登录洗车店
          app.globalData.cid = res.data.data.cid
          console.log(app.globalData)
          wx.navigateTo({
            url: '../CRMcarwash/CRMcarwash',
          })
          return;

        }else if(res.data.data&&res.data.data.type==='3'){
          //登录加油站
          app.globalData.cid = res.data.data.cid
          console.log(app.globalData )
          wx.navigateTo({
            url: '../CRMgasstation/CRMgasstation',
          })
          return;
        }else if(res.data.data&&res.data.data.type==='1'){
          //超级用户
          wx.redirectTo({
            url: '../approvalList/approvalList',
          })
          return;
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '账号或密码不存在',
          })
        }
        // if (res.data.code) {
        //   wx.showModal({
        //     title: '微信提示',
        //     content: res.data.msg,
        //     showCancel: false
        //   })
        // }else{
        //   wx.redirectTo({
        //     url: '../approvalList/approvalList',
        //   })
        // }
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