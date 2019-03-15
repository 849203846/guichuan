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
    this.detailsDate(id);
  },
  detailsDate(id){
    let data = {
      id,
    }
    feach('','get',data)
    .then(res=>{
      console.log(res)
    })
  },
  flooterbtn(){
    let data = {
       id:this.data.id,
      status:'1',
    }
    feach('/admin/Driver/updateDriverStatus','get',data)
    .then(res=>{
      console.log(res)
    })
  },
  flooternotBtn(){
    let data = {
      id: this.data.id,
      status: '2',
      marker:''
    }
    feach('/admin/Driver/updateDriverStatus', 'get', data)
      .then(res => {
        console.log(res)
      })
  }
})