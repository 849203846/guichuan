// pages/CRMgasstation/CRMgasstation.js
const app = getApp();
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    page:1
  },
  onLoad: function (options) {
    this.setData({
      cid: app.globalData.cid
    })
  },
  onShow: function () {
    let data = {
      gid: app.globalData.cid,
      page:1,
      status:2,
    }
    this.getList(data);
  },
getList:function(data){
  feach('/admin/Gasstation/getGasOrderList','get',data)
  .then(res=>{
    wx.hideLoading();
    if(res.data.data.list){
      this.setData({
        page: data.page,
        list:res.data.data.list,
        price: res.data.data.price
      })
    }else{
      this.setData({
        list:[]
      })
    }
    
  })
},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    wx.showLoading({
      title: '获取中',
      mask: true,
    })
    let data = {
      sid: app.globalData.cid,
      page: 1,
      status: 2,
    }
    this.getList(data);
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '获取中',
      mask: true,
    })
    let page = this.data.page + 1
    let data = {
      sid: app.globalData.cid,
      page,
      status: 2,
    }
    this.getList(data);
  }
})