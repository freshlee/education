// index.js
var pic=[];
var myid;
var orderid;
var openid = getApp().globalData.openid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
  },
  submit:function(e){
    var THIS=this;
    this.setData({
      hidden:false,
    })
    var level=this.data.indexnow+1;
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=comment&op=submit&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&orderid='+orderid+'&goodsid='+myid+"&images="+pic+"&level="+level,
      data:e.detail.value,
      success:function(res){
        console.log(res)
        wx.showToast({
          title: '提交成功',
        })
        THIS.setData({
          hidden: true,
        })
        wx.navigateTo({
          url: '../list/index?id='+myid,
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
        }) 
        wx.showToast({
          title: '提交失败',
        })
      }
    })
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=comment&op=upload&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + "&orderid=" + orderid,
        data:{
            file:pic
        }            
    })
  },

  
chosepic:function(){
  var THIS=this;
  wx.chooseImage({
    success: function(res) {
      pic.push(res.tempFilePaths[0]);
      THIS.setData({
        pic:pic,
      })
      for (var key in pic) {
          console.log(pic[key])
          wx.uploadFile({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=comment&op=upload&uniacid=' + getApp().globalData.acid,
              filePath: pic[key],
              name: 'images',
              success: function (res) {
                  console.log(res)
              },
              fail: function (res) {
                  console.log("0")
              }
          })
      }
    },
  })
},
chosestar:function(e){
  var indexnow=e.currentTarget.dataset.index;
  this.setData({
    indexnow:indexnow,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      this.setData({
          versioninfo: getApp().globalData.version,
          thumb:options.thumb,
          name:options.name,
      })
    myid=options.id;
    orderid=options.orderid;
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