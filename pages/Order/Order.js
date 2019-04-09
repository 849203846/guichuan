// pages/Order/Order.js
import {
  feach
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    tabFlag:'1'
  },
  onLoad: function (options) {

  },
  onShow:function(){
    wx.showLoading({
      title: '获取数据中',
    })
    let tabFlag = this.data.tabFlag,data = {
      status:2,
      page:1,
    },url;
    if (tabFlag === '1'){
      url = '/admin/Gasstation/getGasOrderList'
    }else{
      url = '/admin/Carwash/getCarwashOrderList'
    }
    feach(url,'get',data)
    .then(res=>{
      wx.hideLoading();
      this.setData({
        list: res.data.data.list||[]
      })
    })
  },
  tab: function (e) {
    this.setData({
      tabFlag: e.target.dataset.tab
    })
    this.onShow()
  },
  onPullDownRefresh: function () {
    this.onShow();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {

  },
})