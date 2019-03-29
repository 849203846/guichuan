
import {
  feach
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1
  },

  Savebar: function (e) {
    this.setData({
      flag: e.target.dataset.flag
    })
  },
  onLoad: function (options) {
    this.setData({
      flag: options.flag||1,
    })
  },
  onShow:function(){
    feach('/api/Release/getUserReleaseList','get',{
      status:1,
      page:1,
    }).then(res=>{
      console.log(res.data.data.list)
      this.setData({
        list:res.data.data.list,
      })
    })
  }
})