// pages/detailsMsg/detailsMsg.js
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    id:'',
    marker:'',
    alert:'none'
  },
  onLoad:function(options){
    this.setData({
      id: options.id
    })
    this.detailsDate(options.id);
  },
  jvjve:function(){
    this.setData({
      alert:'block',
    })
  },
  SaveMarker:function(e){
    this.setData({
        marker:e.detail.value
    })
  },
  detailsDate:function(id){
    let data = {
      id: id,
    }
    feach('/admin/Driver/getDriverData','get',data)
    .then(res=>{
      console.log(res.data.data)
      this.setData({
        ...res.data.data
      })
    })
  },
  flooterbtn(){
    let data = {
       id:this.data.id,
      status: this.data.status==='6'?'3':'1'
    }
    feach('/admin/Driver/updateDriverStatus','get',data)
    .then(res=>{
      if(res.data.code==='0'){
        wx.showModal({
          title: '温馨提示',
          content: '审核成功',
          showCancel: false,
          success:function(){
            wx.navigateBack({
              delta:-1
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
  },
  flooternotbtn(){
    let data = {
      id: this.data.id,
      status: this.data.status === '6' ? '4' : '2',
      marker: this.data.marker
    }
    if (data.marker===''){
      wx.showModal({
        title: '温馨提示',
        content: '请输入拒绝理由',
        showCancel:false,
      })
      return;
    }
    feach('/admin/Driver/updateDriverStatus', 'get', data)
      .then(res => {
        console.log(res.data.code)
        if(res.data.code==='0'){
          wx.navigateBack({
            delta:-1
          })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel:false
          })
        }
      })
  }
})