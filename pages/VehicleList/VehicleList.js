
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    page:1
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    feach('/api/Release/getDriverReleaseList', 'get', {
      status: 1,
      page:1,
    }).then(res => {
      console.log(res.data.data.list)
      this.setData({
        list: res.data.data.list,
      })
    })
  },

  onReachBottom: function () {
    let page = this.data.page,data={}
    ++page
    this.setData({
      page
    })
    data.page = page
    data.status=1
    feach('/api/Release/getDriverReleaseList','get',data)
    .then(res=>{
      this.setData({
        list:[...this.data.list,...res.data.data.list]
      })
    })
  },
  onPullDownRefresh:function(){
    this.onShow();
  }
})