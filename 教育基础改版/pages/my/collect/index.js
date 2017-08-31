// index.js
var openid = getApp().globalData.openid;
var alllist;
var finishlist=[];
var waitinglist=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    myindex: 0,
    hidden:true,
  },
  cancel:function(e){
    var THIS=this;
    var orderid=e.currentTarget.dataset.orderid;
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=cancel&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&orderid='+orderid,
      success:function(res){
       THIS.renew();
      },
    })
  },
  pay:function(e){
    var orderid = e.currentTarget.dataset.orderid;
    var goodsid = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    var ordernum = e.currentTarget.dataset.ordernum; 
    var newurl = "../../booklist/index?goodsid=" + goodsid +"&coursename="+title+"&ordernum="+ordernum+"&orderid="+orderid;
    wx.navigateTo({
      url: newurl,
    })
  },
  comment:function(e){
      var thumb = e.currentTarget.dataset.thumb;
      var name = e.currentTarget.dataset.name;
    var orderid = e.currentTarget.dataset.order;
    var goodsid=e.currentTarget.dataset.index;
    var newurl="../../goodscomment/add/index?id="+goodsid+"&orderid="+orderid;
    wx.navigateTo({
      url: newurl,
    })
  },
  onchange: function (event) {
    this.setData({
      myindex: event.detail.current,
    })
  },
  base: function () {
    this.setData({
      index: 0,
      myindex: 0,
    })
  },
  address: function () {
    this.setData({
      index: 1,
      myindex: 1,
    })
  },
  teacher: function () {
    this.setData({
      index: 2,
      myindex: 2,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  renew:function(){
    var THIS = this;
    this.setData({
      hidden: false,
    })
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=list&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
      success: function (res) {
        console.log(res);
        var data = res.data.dat;
        var all=data.order_list;
        var waitinglist = data.order_list0;
        var finishlist = data.order_list3;
        // for (var key in data) {
        //   if (data[key].status == 0) {
        //     waitinglist.push(data[key]);
        //   }
        //   else {
        //     finishlist.push(data[key]);
        //   }
        // }
        THIS.setData({
          all: all,
          waitinglist: waitinglist,
          finishlist: finishlist,
          hidden: true,
        })
      },
    })

  },
  onLoad: function (options) {
      if(options.status){
          this.setData({
              myindex:options.status-1,
          })
      }
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    var THIS=this;
    this.renew();
    wx.getSystemInfo({
      success: function(res) {
        THIS.setData({
          myheight:res.screenHeight,
        })
      },
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