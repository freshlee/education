// index.js
var orgY;
var orgtop;
var who=[];
var openid = getApp().globalData.openid;
var final=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  myindex:0,
  thetop:-110,
  status:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jump:function(e){
    var id=e.currentTarget.dataset.index;
    //获取商品具体信息
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=create&uniacid=' + getApp().globalData.acid+'&goodsid=' + id + "&openid=" + getApp().globalData.openid,
      success:function(res){
        console.log(res);
      var doctype=res.data.dat.goods.type;
      var typename;
      console.log(doctype)
      switch(doctype){
        case "1": typename = "video";break;
        case "2": typename = "course";break;
        case "3": typename = "article";break;
      }
      wx.navigateTo({
        url: '../../' + typename + "/index?id="+id,
      })
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
    var THIS=this;
   wx.getSystemInfo({
     success: function(res) {
          THIS.setData({
            myheight:res.screenHeight,
          })
     },
   })
  },
  video: function () {
    this.setData({
      index: 0,
      myindex: 0,
    })
  },
  course: function () {
    this.setData({
      index: 1,
      myindex: 1,
    })
  },
  article: function () {
    this.setData({
      index: 2,
      myindex: 2,
    })
  },
  teacher: function () {
    this.setData({
      index: 2,
      myindex: 2,
    })
  },
  remark: function () {
    this.setData({
      index: 3,
      myindex: 3,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var THIS = this;
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=gzlist&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
          success: function (res) {
              console.log(res);
              THIS.setData({
                  collection: res.data.dat.list,
              })
          }
      })
      //已经购买课程
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
          success: function (res) {
              var data = res.data.dat;
              console.log(res);
              var finishlist = data.order_list3;
              THIS.setData({
                  finishlist: finishlist,
              })
          }
      })
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