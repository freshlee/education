// pages/detail/index.js
var id;
var openid = getApp().globalData.openid;
var date;
var position;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden: true,
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
    purchase: function () {
        var THIS = this;
        //生成订单
        wx.navigateTo({
            url: '../booklist/index?coursename=' + THIS.data.goods.title + "&merchid=" + THIS.data.goods.merchid + "&goodsid=" + id + "&doctype=" + THIS.data.doctype + "&marketprice=" + THIS.data.goods.marketprice + '&optionid=' + THIS.data.optionid ,
        })
    },
    onLoad: function (options) {
        var optionid = options.optionid;
        var THIS = this;
        this.setData({
            hidden: false,
            versioninfo: getApp().globalData.version,
            optionid: optionid,
        })
        id = options.id;
        //获取数据
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"order",
                op:"create",
                openid: getApp().globalData.openid,
                goodsid:id,
            },
            success: function (res) {
                var data = res.data.dat;
                THIS.setData({
                    goods: data.goods,
                    doctype: data.goods.type,
                    hidden: true,
                })
                console.log(THIS.data.goods)
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