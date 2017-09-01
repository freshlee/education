// index.js
var openid = getApp().globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  hidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //提交注册内容
  submit:function(e){
     wx.showModal({
         title: '提示',
         content: '确定上传麽?',
         success:function(){
             wx.request({
                 url: getApp().globalData.server+'&a=shopreg&op=reg&openid=' + getApp().globalData.openid,
                 data: e.detail.value,
                 success:function(res){
                     wx.showToast({
                         title: res.data.dat.toString(),
                         image:"../../../images/message.png",
                         duration:1000,
                     })
                 }
             })
         }
     })
  },
  vertify:function(){
    
  },
  address:function(){
    var THIS=this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        var address=res.provinceName+" "+res.cityName+" "+res.detailInfo;
        THIS.setData({
          address:address,
        })
        console.log(THIS.data.address);
      }
    })
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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