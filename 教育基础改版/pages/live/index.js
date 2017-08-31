// index.js
var openid = getApp().globalData.openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrls: [{ url: "./tips/index" }, { url: "./tips/index" }, { url: "./tips/index" }],
    status: 0,
  },
 scroll:function(event){
   var top=event.detail.scrollTop;
   console.log(top);
   if(top>=150){
       this.setData({
         status:1,
       })
   }
   else{
     this.setData({
       status:0,
     })  
   }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS=this;
    wx.getSystemInfo({
      success: function(res) {
         THIS.setData({
           eqheight:res.screenHeight,
         })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})