
const feach = (url, method,data) => {
  return new Promise(function(res,rej){
    wx.request({
      url,
      data,
      method,
      success:res,
      fail:rej
    })
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
