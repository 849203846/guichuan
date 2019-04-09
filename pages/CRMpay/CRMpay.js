import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    tabFlag: '1',
    page:1,
    flag:'none',
    pay:'',
    gid:0
  },
  tab: function (e) {
    this.setData({
      tabFlag: e.target.dataset.tab
    })
    this.onShow()
  }, 
  savepay:function(e){
    this.setData({
      pay:e.detail.value
    })
  },
  radioChange(e) {
    this.setData({
      gid:e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onShow:function(){
    let data = {
      page: this.data.page,
    }, url = this.data.tabFlag == 1 ? '/admin/Gasstation/getGasStationList' : '/admin/Carwash/getCarwashList';
    feach(url, 'get', data)
      .then(res => {
        res.data.data.list[0].checked = true
        this.setData({
          list: res.data.data.list,
          gid:res.data.data.list[0].id
        })
      })
  },
  showpay:function(){
    this.setData({
      flag:'block'
    })
  },
  closepay:function(){
    this.setData({
      flag:'none'
    })
  },
  submit:function(){
    wx.showLoading({
      title: '提交中',
      mask:true,
    })
    let data = {
      price: this.data.pay,
      flag: this.data.tabFlag,
      type:1,
      gid: this.data.gid,
    }
    feach('/admin/Admin/addPrice','post',data)
    .then(res=>{
      wx.hideLoading();
      if(res.data.code==0){
        wx.showModal({
          title: '温馨提示',
          content: '充值成功',
          showCancel:false,
          success:()=>{
            this.closepay();
            this.setData({
              pay:''
            })
          }
        })
      }else{
        wx.showModal({
          title: '温馨提示',
          content: res.data.msg,
          showCancel:false,
        })
      }
    })
  }
})