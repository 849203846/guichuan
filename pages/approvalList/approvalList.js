// pages/approvalList/approvalList.js
import {
  feach
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabFlag:'1',
    page:1,
    mobile:'',
    list:[],
    car_mum:''
  },
  tab:function(e){
    console.log(e.target.dataset.tab)
    this.setData({
      tabFlag: e.target.dataset.tab
    })
    this.onShow()
  },
  onShow: function (options) {
    let data = {
      page: this.data.page,
      status: this.data.tabFlag,
      mobile: this.data.mobile,
      car_mum: this.data.car_mum,
    }
    feach('/admin/Driver/getDriverByStatus','get',data)
    .then(res=>{
      console.log(res.statusCode);
      if(res.statusCode===200){
        this.setData({
          list:res.data.data.list
        })
      }
    })
  },

})