// index.js
var WxParse = require('../../../wxParse/wxParse.js');
var openid = getApp().globalData.openid;
var myid;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    back: "white",
    fontcolor:"black",
    fontsize:35
  },

  /**
   * 生命周期函数--监听页面加载
   */
  night:function(){
   this.setData({
     back: this.data.back=="black"?"white":"black",
     fontcolor: this.data.fontcolor=="white"?"black":"white",
   })
   console.log(this.data.eqheight);

  },

  sm:function(){
    this.setData({
      fontsize: this.data.fontsize-5,
    })
  },
  lg: function () {
    this.setData({
      fontsize: this.data.fontsize + 5,
    })
  },
  onLoad:function(option){
      var THIS=this;
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var id=option.id;
    myid=id;
    //获取商品信息
    wx.request({
        url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=create&uniacid=" + getApp().globalData.acid + "&openid=" + getApp().globalData.openid + "&goodsid=" + id,
        success: function (res) {
            console.log(res.data);
            var data = res.data.dat;
            var article = data.goods.content;
            console.log(article);
            WxParse.wxParse('article', 'html', article, THIS, 5);
            THIS.setData({
                goods: data.goods,
                hidden: true,
            })
            wx.setNavigationBarTitle({
                title: data.goods.title,
            })
        },
        fail: function () {
            THIS.setData({
                hidden: true,
            })
            wx.showToast({
                title: '加载失败',
            })
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          eqheight: res.windowHeight,
        })
      }
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