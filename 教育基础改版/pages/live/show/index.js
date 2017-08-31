// pages/video/index.js
var WxParse = require('../../../wxParse/wxParse.js');
var openid = getApp().globalData.openid;
var org;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  section: function () {
    this.setData({
      border_section: "4rpx solid rgb(7,103,200)",
      border_detail: "none",
      border_comment: "none",
      border_interact: "none",
      toView: "section",
    })
  },
  detail: function () {
    this.setData({
      border_section: "none",
      border_detail: "4rpx solid rgb(7,103,200)",
      border_comment: "none",
      border_interact: "none",
      toView: "detail",
    })
  },
  comment: function () {
    this.setData({
      border_section: "none",
      border_detail: "none",
      border_comment: "4rpx solid rgb(7,103,200)",
      border_interact: "none",
      toView: "comment",
    })
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS = this;
    var article;
    var myid = options.id;
    var newurl = "http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&openid=1&id" + myid;
    wx.request({
      url: 'http://192.168.1.16/index.php?c=edu&a=detail&op=getgoods&id=1647&openid=1',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        article = res.data.dat.content;
        console.log(article);
        WxParse.wxParse('article', 'html', article, THIS, 5);
      }
    })

  },
  onStop: function () {
    var THIS = this;
    var length = this.data.length;
    if (org <= length / 2) {
      THIS.setData({
        toView: "section",
      });
      this.section();
    }
    else if (org >= length / 2 && org < length * 1.5) {
      THIS.setData({
        toView: "detail",
      });
      this.detail();
    }
    else if (org >= length * 1.5 && org < length * 2.5) {
      THIS.setData({
        toView: "comment",
      });
      this.comment();
    }
    else if (org >= length * 2.5 && org <= length * 4) {
      THIS.setData({
        toView: "interact",
      });
      this.interact();
    }
    console.log(org)

  },
  onMove: function (e) {
    org = e.detail.scrollLeft;

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS = this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          length: res.screenWidth,
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