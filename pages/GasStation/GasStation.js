
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    Mapname: '点击选择',
    name: '', //加油站名称
    address: '', //加油站地址
    longitude: '',
    latitude: '',
    thumb: '', //加油站图片
    description: "", //描述
    original_price: '', //汽油原价
    phone: '', //手机号
    real_price: '', //当前价格
    OilList: [{
      gasoline_type: '',
      real_price: '',
      original_price: ''
    }, ]
  },
  onLoad:function(opc){
    feach('/admin/Gasstation/getGasstationData','get',{id:opc.id})
    .then(res=>{
      console.log(res)
      let OilList = JSON.parse(res.data.data.product)
      this.setData({
        id:opc.id,
        ...res.data.data,
        OilList
      })
    })
  },
  alert: function(txt) {
    wx.showModal({
      title: '温馨提示',
      content: txt,
      showCancel: false
    })
  },
  SaveName: function(e) {
    let value = e.detail.value,
      name = e.target.dataset.name
    let data = {}
    data[name] = value
    this.setData(data)
  },
  SaveMap: function() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.name,
        })
      }
    })
  },
  SaveGasoline_type: function(e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].gasoline_type = e.detail.value
    this.setData({
      OilList,
    })
  },
  SaveReal_price: function(e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].real_price = e.detail.value
    this.setData({
      OilList,
    })
  },
  SaveOriginal_price: function(e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    OilList[index].original_price = e.detail.value
    this.setData({
      OilList,
    })
  },
  delOilList: function(e) {
    let index = e.target.dataset.index
    let OilList = this.data.OilList
    if (OilList.length <= 1) return;
    OilList.splice(index, 1);
    this.setData({
      OilList,
    })
  },
  addOilList: function() {
    let OilList = this.data.OilList
    let item = {
      gasoline_type: '',
      real_price: '',
      original_price: ''
    }
    OilList.push(item);
    this.setData({
      OilList,
    })
  },
  alert:function(txt){
    wx.showModal({
      title: '温馨提示',
      content: txt,
      showCancel:false
    })
  },
  saveGasStation:function(){
    if (this.data.OilList.length === 1 && this.data.OilList[0].gasoline_type===''){
      return;
    }
    let data = {
      name: this.data.name,
      address: this.data.address,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      thumb: this.data.thumb,
      description: this.data.description,
      prduct: JSON.stringify(this.data.OilList),
      phone: this.data.phone,
    }
    console.log(data);
    if (!data.name) {
      this.alert('请输入加油站名称')
      return
    } else if (!data.address) {
      this.alert('请输入加油站地址')
      return
    } else if (!data.longitude) {
      this.alert('请定位加油站位置')
      return
    } else if (!data.description) {
      this.alert('请输入加油站描述')
      return
    } else if (!data.phone||data.phone.length!=11){
      this.alert('请输入手机号')
      return;
    }
    if(this.data.id){
      data.id=this.data.id
    }
    feach('/admin/Gasstation/saveGasStation', 'post', data)
      .then(res => {
        console.log(res)
        if (res.data.code === 0) {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false,
            success: () => {
              if(data.id){
                wx.navigateBack({})
              }
              this.setData({
                name: '',
                address: '',
                longitude: '',
                latitude: '',
                thumb: '',
                description: "",
                OilList: [{
                  gasoline_type: '',
                  real_price: '',
                  original_price: ''
                }],
                original_price: '',
                phone: '',
                Mapname:'',
                real_price: '',
              })
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      })
  },
  upimg: function() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://cx.bjlingdi.com/api/Upload/doUpload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'myfile',
          formData: {
            user: 'myfile'
          },
          success(res) {
            let data = JSON.parse(res.data);
            that.setData({
              thumb: data.data
            })
          }
        })
    }
    })
  }
})