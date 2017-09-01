// index.js
var openid = getApp().globalData.openid;
var lng;
var lat;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
  },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/organise/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
  jump:function(event){
    var index=event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../advertise/index?id='+index,
    })
  },
  move:function(event){
   var index=event.currentTarget.dataset.index;
   this.setData({
     index:index,
   })
  },
  onchange: function (event) {
      this.setData({
          index: event.detail.current,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS=this;
  wx.request({
      url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=merch&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
    success:function(res){
      console.log(res);
      var data=res.data.dat;
      THIS.setData({
        list_all: data.user,
      })
    }
  })
  //附近的机构
  wx.getLocation({
    success: function(res) {
      console.log(res);
      lng=res.longitude;
      lat=res.latitude;
      wx.request({
          url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=merch&op=dw&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
        data: {
          lat: lat,
          lng: lng,
        },
        success: function (res) {
            if (res.data.dat.address){
                var data = res.data.dat.address
                console.log(res);
                THIS.setData({
                    list_near: data,
                })
            }
        }
      })
    },
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS=this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          myheight: res.screenHeight,
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