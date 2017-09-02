// index.js

var openid = getApp().globalData.openid;
var mycate = undefined;
var mytype = undefined;
var mypay = undefined;
var data_url;
var page;
var max;
var rm;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundurl: "../../images/background.jpg",
    cates: 0,
    types: 0,
    pays: 0,
    trans_mycate: "全部",
    trans_mytype: "全部",
    trans_mypay: "全部",
    status: "off",
    inputstatus: 0,
    hidden: true,
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: getApp().globalData.merchname,
      path: '/pages/filter/index?type=' + mytype + "&cate=" + mycate,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


  //搜索
  dosearch: function (e) {
    var title = e.detail.value;
    var THIS = this;
    this.setData({
      status: this.data.status == "on" ? "off" : "on",
    })
    wx.request({
      url: getApp().globalData.server+'&a=merch&op=likegoods&uniacid=' + getApp().globalData.acid,
      data: {
        title: title,
      },
      success: function (res) {
        THIS.setData({
          cases: res.data.dat.goods,
        })
      }
    })
    page = 100;
    max = 1;
  },
  //搜索栏动态控制方法
  input: function () {
    this.setData({
      inputstatus: this.data.inputstatus == 0 ? 1 : 0,
    })
  },
  //
  move: function (event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      index: index,
    })
    if (index == 1) {
      this.statusChange();
    }
    else {
      //查询最多评论的商品
      page = 2;
      this.setData({
        hidden: false
      })
      var THIS = this;
      var newcate = mycate == undefined || mycate == 0 ? "" : "&cates=" + mycate;
      var newtype = mytype == undefined || mytype == 0 ? "" : "&type=" + mytype;
      var newpay = mypay == undefined || mypay == 0 ? "" : "&priceattr=" + mypay;
      var newurl = getApp().globalData.server + "&a=videoshop&op=rm&page=1" + newcate + newtype + newpay;
      console.log(newurl);
      data_url = {};
      if (mycate) {
        data_url['cates'] = mycate;
      }
      if (mytype) {
        data_url['type'] = mytype;

      }
      if (mypay) {
        data_url['priceattr'] = mypay;
      }
      data_url.a = 'videoshop';
      data_url.op = 'rm';
      data_url.uniacid = getApp().globalData.acid;
      this.setData({
        status: "off"
      })
      wx.request({
        url: getApp().globadData.server,
        data:data_url,
        success: function (res) {
          max = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
          res = res.data.dat.goods;
          console.log(res);
          THIS.setData({
            cases: res,
            hidden: true,
          })
        },
        fail: function () {
          THIS.setData({
            hidden: true,
          })
        }
      })
    }
  },
  statusChange: function () {
    this.setData({
      status: this.data.status == "on" ? "off" : "on",
    })
  },
  jump: function (event) {
    var id = event.currentTarget.dataset.id;
    var jumptype = event.currentTarget.dataset.nav;
    var typename;
    if (jumptype == 1) { typename = "video" }
    else if (jumptype == 2) { typename = "course" }
    else { typename = "article" }
    var newurl = "../" + typename + "/index?&id=" + id;
    console.log(newurl);
    wx.navigateTo({
      url: newurl,
    })
  },
  chosecate: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var cate = event.currentTarget.dataset.cate;
    mycate = cate;
    this.setData({
      cates: cate,
      trans_mycate: trans.substr(0, 2) + "..",
    })
  },
  chosetype: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var types = event.currentTarget.dataset.type;
    mytype = types;
    this.setData({
      types: types,
      trans_mytype: trans.substr(0, 2) + "..",
    })
    console.log(mytype);
  },
  chosepay: function (event) {
    var trans = event.currentTarget.dataset.trans;
    var pay = event.currentTarget.dataset.pay;
    mypay = pay;
    this.setData({
      trans_mypay: trans.substr(0, 2) + "..",
      pays: pay,
    })
  },
  sure: function () {
    rm = 0;
    page = 2;
    this.setData({
      hidden: false
    })
    var THIS = this;
    var newcate = mycate == undefined || mycate == 0 ? "" : "&cates=" + mycate;
    var newtype = mytype == undefined || mytype == 0 ? "" : "&type=" + mytype;
    var newpay = mypay == undefined || mypay == 0 ? "" : "&priceattr=" + mypay;
    var newurl = getApp().globalData.server+"&a=videoshop&op=fl&uniacid=" + getApp().globalData.acid + "&page=1" + newcate + newtype + newpay;
    data_url = {};
    if (mycate) {
      data_url['cates'] = mycate;
    }
    if (mytype) {
      data_url['type'] = mytype;

    }
    if (mypay) {
      data_url['priceattr'] = mypay;
    }
    data_url.a = 'videoshop';
    data_url.op = 'fl';
    data_url.uniacid = getApp().globalData.acid;
    console.log(newurl);
    this.setData({
      status: "off"
    })
    wx.request({
      url: getApp().globalData.server,
      data:data_url,
      success: function (res) {
        max = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
        res = res.data.dat.goods;
        console.log(res);
        THIS.setData({
          cases: res,
          hidden: true,
        })
      },
      fail: function () {
        THIS.setData({
          hidden: true,
        })
      }
    })

  },
  onLoad: function (options) {
    this.setData({
      versioninfo: getApp().globalData.version,
    })
    page = 2;
    if (options.type) {
      rm = 1;
      var op = "rm";
      this.setData({
        index: 0,
      })
    }
    else {
      rm = 0;
      var op = "fl";
      this.setData({
        index: null,
      })
    }
    //初始化数据
    mytype = options.type;
    mycate = options.cate;
    mypay = null;
    switch (gettype) {
      case "1":
        gettype = "视频";
        break;
      case "2":
        gettype = "课程";
        break;
      case "3":
        gettype = "文章";
    }
    this.setData({
      types: mytype,
      trans_mytype: gettype,
      hidden: false,
      cates: mycate,
      goodstype: [],
    })
    var newcate = mycate == undefined ? "" : "&cates=" + mycate;
    var newtype = mytype == undefined ? "" : "&type=" + mytype;
    var newpay = mypay == undefined ? "" : "&priceattr=" + mypay;
    var newurl = getApp().globalData.server+"&a=videoshop&op=" + op + "&uniacid=" + getApp().globalData.acid + "&page=1" + newcate + newtype + newpay;
    data_url={};
    if(mycate){
      data_url['cates'] = mycate;
    }
    if(mytype){
      data_url['type'] = mytype;
      
    }
    if(mypay){
      data_url['priceattr'] = mypay;
    }
    data_url.a = 'videoshop';
    data_url.op = op;
    data_url.uniacid = getApp().globalData.acid;
    var gettype = options.type;
    var cate = options.cate;
    var pay = options.pay;
    var Thetype = options.type;
    var THIS = this;
    console.log(newurl);
    //获取分类
    wx.request({
      url: getApp().globalData.server+"&a=videoshop&op=category&uniacid=" + getApp().globalData.acid,
      success: function (res) {
        console.log(res);
        var data = res.data.dat;
        var newcates = data.type1.concat(data.type2).concat(data.type3);
        console.log(typeof data);
        if (typeof data == "object") {
          THIS.setData({
            goodstype: newcates,
          })
        }
        console.log(newcates);
      }
    })
    //获取商品
    wx.request({
      url: getApp().globalData.server,
      data:data_url,
      success: function (res) {
        max = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
        res = res.data.dat.goods;
        console.log(res);
        THIS.setData({
          cases: res,
          hidden: true,
        })
      },
      fail: function () {
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
    if (page <= max) {
      var THIS = this;
      var newcate = mycate == undefined || mycate == 0 ? "" : "&cates=" + mycate;
      var newtype = mytype == undefined || mytype == 0 ? "" : "&type=" + mytype;
      var newpay = mypay == undefined || mypay == 0 ? "" : "&priceattr=" + mypay;
      if (rm == 1) {
        var newurl = getApp().globalData.server+"&a=videoshop&op=rm&uniacid=" + getApp().globalData.acid + "&page=" + page + newcate + newtype + newpay;
      }
      else {
        var newurl = getApp().globalData.server+"&a=videoshop&op=fl&uniacid=" + getApp().globalData.acid + "&page=" + page + newcate + newtype + newpay;
      }

      wx.request({
        url: newurl,
        success: function (res) {
          var res = res.data.dat.goods;
          var newcases = THIS.data.cases;
          THIS.setData({
            cases: newcases.concat(res),
          })
        }
      })
      page += 1;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})