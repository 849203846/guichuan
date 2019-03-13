//app.js
import { feach, getCurrentPageUrl} from './utils/util.js'
App({
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        feach('http://cx.bjlingdi.com/api/Base/getWeixinOpenid', 'get', { js_code:res.code})
        .then(res=>{
          this.globalData.user_id = res.data.data
          this.GetuserInfo()
        })
      }
    })
  },
   GetuserInfo(){
    let userInfo =  wx.getStorageSync('userInfo')
    console.log(userInfo)
     if (userInfo){
        wx.hideLoading();
     }else{
       wx.getUserInfo({
         withCredentials:true,
         lang:'zh_CN',
         success:(res)=>{
           wx.setStorage({
             key: 'userInfo',
             data: res.userInfo,
           })
           wx.hideLoading();
         },
         fail:(res)=>{
           if (getCurrentPageUrl()!=='pages/logs/logs'){
             wx.navigateTo({
               url: '../logs/logs',
               success:(e)=>{
                 wx.hideLoading();
               }
             })
           }
         }
       })
     }
  },
  globalData: {
    user_id: null
  }
})