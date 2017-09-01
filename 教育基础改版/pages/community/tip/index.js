// index.js
var oldpos=0;
var indexnow=0;
var textdata=[];
var newdata;
var uploaddata;
var openid = getApp().globalData.openid;
Page({

    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: './index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
  data: {
    statu:0,
    praise:1,
    status:0,
  },
  changestatu:function(){
   this.setData({
     statu:this.data.statu==1?0:1,
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onchange:function(event){
    if (event.detail.current ==textdata.length-2){
      this.addpage();
    }
  },
  addpage:function(){
    var THIS=this;
    textdata=textdata.concat(uploaddata);
    setTimeout(function(){
      THIS.setData({
        contents: textdata,
      })
    },1000)
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
    console.log(this.data.status);
    var THIS=this;
    wx.getSystemInfo({
      success: function(res) {
         THIS.setData({
           myheight:res.windowHeight,
         })
      },
    })
    textdata=[{ content: 11111111 }, { content: 222222222 }, { content: 33333333 }, { content: 444444444 }, { content: 55555555 }, { content: 666666666 }, { content: 77777777 }];
    uploaddata = [{ content: 88888888 }, { content: 99999999 }, { content: 1010101010 }, { content: 11111111 }, { content: 12121212 }, { content: 1313131313 }, { content: 14141414 }];

    this.setData({
      contents:textdata,
    })
  
  },
  agree:function(){
    this.setData({
      praise:1,
    })
  },
  oposite: function () {
    this.setData({
      praise: 0,
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