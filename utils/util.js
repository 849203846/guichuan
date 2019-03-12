
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
module.exports = {
  feach,
}
