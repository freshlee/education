// index.js
var newlist=new Array;
var openid = getApp().globalData.openid;
var pid;
var bid;
var newurl;
var myid;
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
            path: './index?id='+myid,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
  data: {
    write: 0,
    hidden: true,
    submiting: true,
  },
  //输入操作
  inputing: function (e) {
    this.setData({
      content: e.detail.value,
    }
    )
  },
  back: function () {
    this.setData({
      write: 0,
    })
  },

  tocomment: function (e) {

    var des = e.currentTarget.dataset.des;
    console.log(e.currentTarget.dataset.des)
    wx.navigateTo({
      url: '../../comment/index?pid=' + des + '&bid=' + postid,
    })

  },
  write: function () {
    this.setData({
      write: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var THIS=this;
     myid = options.id;
     this.setData({
       versioninfo: getApp().globalData.version,
       myid:myid,
     })
     newurl = 'https://api.cnmmsc.org/index.php?c=eweivideo&a=comment&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&goodsid=' + myid,
    console.log(newurl);
    this.getcomment();
  },
  getcomment:function(){
    var THIS = this;
    wx.request({
      url: newurl,
      success: function (res) {
        var data = res.data.dat.order;
        for(var key in data){
          data[key].level = parseInt(data[key].level); 
        }
        THIS.setData({
          praiselist: data,
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
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