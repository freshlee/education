// pages/detail/index.js
var WxParse = require('../../wxParse/wxParse.js');
var id;
var openid = getApp().globalData.openid;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden: true,
        tips: ["我是男宝宝", "我是女宝宝"]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    nameinput:function(e){
        var inputname=e.detail.value;
        this.setData({
            inputname:inputname,
        })
    },
    phoneinput: function (e) {
        var inputname = e.detail.value;
        this.setData({
            inputname: inputname,
        })
    },
    submit:function(e){
        var THIS = this;
        if (THIS.data.birthdate && THIS.data.date && THIS.data.purpose && THIS.data.merchid
         && THIS.data.location && THIS.data.goodsname  &&THIS.data.inputname){
            var origindate;
            wx.getUserInfo({
                success: function (res) {
                    console.log(res);
                    THIS.setData({
                        wxname: res.userInfo.nickName,
                        wxtx: res.userInfo.avatarUrl,
                    })
                    origindate = {
                        sr: THIS.data.birthdate,
                        yytimes: THIS.data.date,
                        sex: THIS.data.purpose,
                        cid: 0&&THIS.data.merchid,
                        address: THIS.data.location,
                        goodsname: THIS.data.goodsname,
                        wxname: THIS.data.wxname,
                        wxtx: THIS.data.wxtx,
                        name: THIS.data.inputname,
                    }
                    wx.request({
                        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=sellmcs&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&goodsid=' + id,
                        data: origindate,
                        success:function(res){
                            var content=res.data.dat.nr.content;
                            WxParse.wxParse('article', 'html', content, THIS, 5);
                            THIS.statuschange();
                        },
                    })
                },
            })
        }else{
            wx.showModal({
                title: '提示',
                content: '请输入完整信息',
            })
        }
    },
    stop:function(){
        return false;
    },
    statuschange:function(){
        var THIS=this;
        this.setData({
            status: !THIS.data.status,
        })
    },
    location: function () {
        var THIS = this;
        wx.chooseLocation({
            success: function (res) {
                THIS.setData({
                    location: res.address,
                })
            },
        })
    },
    getcordinate: function () {
        var THIS = this;
        wx.chooseAddress({
            success: function (res) {
                var address = res.provinceName + " " + res.cityName + " " + res.detailInfo;
                THIS.setData({
                    address: address,
                })
                console.log(THIS.data.address);
            }
        })
    },
    bindrChange: function (e) {
        this.setData({
            purpose: this.data.tips[e.detail.value],
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
        })
    },
    bindbirthDateChange: function (e) {
        this.setData({
            birthdate: e.detail.value,
        })
    },
    onLoad: function (options) {
        var THIS = this;
        this.setData({
            hidden: false,
            versioninfo: getApp().globalData.version,
            goodsid:options.goodsid,
            goodsname:options.goodsname,
            merchname:options.merchname,
            merchid:options.merchid,
        })
        wx.getSystemInfo({
            success: function(res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
        })
        id = options.id;
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