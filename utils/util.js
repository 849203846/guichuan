const feach = (url, method,data) => {
  return new Promise(function(res,rej){
    data.openid = wx.getStorageSync('openid').openid
    var app = getApp()
    let reqDate = {
      url: app.globalData.url  + url,
      data,
      method,
      success: res,
      fail: rej
    }
    if (method === 'post' || method === 'POST'){
      reqDate.header = {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    wx.request(reqDate)
  })
 
}
/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}
module.exports = {
  feach,
  getCurrentPageUrl,
}
