// index.js
var myid;
var WxParse = require('../../wxParse/wxParse.js');
var concernstatus;var concernstatus;
var originstatus;
var openid = getApp().globalData.openid;
var ralativecourse = [];
Page({

  /**
   * 页面的初始数据
   */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/article/index?id='+myid,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    purchase: function () {
        var openid = getApp().globalData.openid;
        if (openid) {
            wx.navigateTo({
                url: '../checkout/index?id=' + myid
            })
        }
        else {
            wx.showModal({
                title: '未登录',
                content: '未登录不能购买',
            })
        }
    },
  data: {
   show:1,
   hidden:true,
  },
  jumptocourse: function (e) {
      var id = e.currentTarget.dataset.id;
      var doctype = e.currentTarget.dataset.doctype;
      var typename;
      switch (doctype) {
          case "1": typename = "video"; break;
          case "2": typename = "course"; break;
          case "3": typename = "article"; break;
      }
      wx.navigateTo({
          url: '../' + typename + "/index?id=" + id,
      })
  },
  concern: function () {
    concernstatus = 0;
    this.setData({
      favor: 0,
    })
    console.log(this.data.favor);
  },
  disconcern: function () {
    concernstatus = 1;
    this.setData({
      favor: 1,
      
    })
  },
  toread:function(){
    wx.navigateTo({
      url: './read/index?id='+myid,
    })
  },
  more: function () {
      wx.navigateTo({
          url: '../goodscomment/list/index?id=' + myid,
      })
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS=this;
    concernstatus = undefined;
    THIS.setData({
      hidden:false
    })
    myid=options.id;
    console.log(myid);
    //获取商品信息
    wx.request({
        url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=create&uniacid=" + getApp().globalData.acid+"&openid="+getApp().globalData.openid+"&goodsid="+myid,
      success: function (res) {
        console.log(res.data);
        var data = res.data.dat;
        wx.setNavigationBarTitle({
            title: data.goods.title,
        });
        var article = data.goods.saletimes;
        var priceattr = data.goods.priceattr;
          WxParse.wxParse('article', 'html', article, THIS, 5);
        THIS.setData({
          goods: data.goods,
          priceattr: priceattr,
          hidden: true,
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
    //获取评论接口
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=comment&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid,
      success: function (res) {
        console.log(res);
        var data = res.data.dat
        THIS.setData({
          commentnum: data.order_count,
          commentlist: data.order,
          reputation: data.level_avg,
        })
        console.log(res);
      }
    })
    //获取关注状态
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=gz&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid,
      success: function (res) {
        console.log(res);
        THIS.setData({
          favor: res.data.dat.isfavorite,
        })
        originstatus = res.data.dat.isfavorite;
      }
    })
    //获取教师信息和课程信息，这里教师信息不显示
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=spt&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&goodsid=' + myid,
        success: function (res) {
            var data = res.data.dat;
            var teacher = data.teacher;
            for (var key in teacher) {
                var coursecount;
                var newcontent = teacher[key].content;
                WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
                wx.request({
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=tsp&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&tid=' + teacher[key].id,
                    success: function (res) {
                        var data = res.data.dat.shop;
                        teacher[key].courselist = data;
                        THIS.setData({
                            teacher: teacher,
                            ralativecourse: ralativecourse.concat(data)
                        })
                    }
                })
            }
        },
    })
    //留下脚印
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=addfootstep&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&goodsid=' + myid,
      success: function (res) {
        console.log("已经加入浏览记录")
      }
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
      var THIS = this;
      this.setData({
          hidden: false
      })
      //获取权限信息
      wx.request({
          url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=pay&op=gm&uniacid=" + getApp().globalData.acid+"&openid=" + getApp().globalData.openid + "&goodsid=" + myid,
          success: function (res) {
              THIS.setData({
                  permission: res.data.dat,
                  hidden: true
              })
          },
          fail: function () {
              THIS.setData({
                  hidden: true
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
    if (concernstatus === undefined) { }
    else {
      if (concernstatus == 0 && originstatus == 1) {
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=toggle&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=1",
        })
      }
      else if (concernstatus == 1 && originstatus == 0) {
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=toggle&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid + "&isfavorite=0",
        })
      }
    }
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