// index.js
var openid = getApp().globalData.openid;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/community/home/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    jump: function(e) {
        var cid = e.currentTarget.dataset.des;
        var url = "../square/index?cid=" + cid;
        wx.navigateTo({
            url: url,
        })
    },
    onLoad: function(options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var THIS = this;
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Board",
                op: "snsvad"
            },
            success: function(res) {
                var data = res.data.dat;
                THIS.setData({
                    bannerUrls: data.SNSVAD,
                    nav: data.CATEGORY,
                })
            },
        })
        wx.request({
            url: getApp().globalData.server,
            data: {
                openid: getApp().globalData.openid,
                mid: 25769,
            },
            success: function(res) {
                var data = res.data.dat;
                console.log(data);
                THIS.setData({
                    tiplist: data.list,
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})