
import {
  feach
} from '../../utils/util.js'
Page({
  data: {
    list:[],
    page:1,
    name:''
  },
  onLoad: function (options) {
    this.getList()
  },
  getList:function(){
    let data = {
      page: this.data.page,
      name:this.data.name
    }
    feach('/admin/Carwash/getCarwashList', 'get', data)
      .then(res => {
        if (res.data.code === '0') {
          this.setData({
            list: [...this.data.list, ...res.data.data.list],
            total_page: res.data.data.total_page,
          })
        }

      })
  },
  onReachBottom: function () {
    if (this.data.page >= this.data.total_page)return;
    this.setData({
      page: ++this.data.page

    })
    // 上拉获取更多数据
    this.getList()
  },
})