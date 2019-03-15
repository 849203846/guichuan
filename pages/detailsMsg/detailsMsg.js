// pages/detailsMsg/detailsMsg.js
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    id:'',
  },
  onLoad:function(options){
    this.setData({
      id: options.id
    })
    this.detailsDate(options.id);
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
      status:'1'
    }
    feach('/admin/Driver/updateDriverStatus','get',data)
    .then(res=>{
      console.log(res.data.code)
    })
  },
  flooternotbtn(){
    let data = {
      id: this.data.id,
      status: '2',
      marker: this.data.marker
    }
    feach('/admin/Driver/updateDriverStatus', 'get', data)
      .then(res => {
        console.log(res)
      })
  }
})