//index.js
//获取应用实例
const app = getApp()
import { feach} from '../../utils/util.js'
Page({
  data: {
  },
  onLoad: function () {
    feach('www.baidu.com','get',{})
    .then(res=>{
      console.log(res)
    })
  },
})
