// index.js
var openid = getApp().globalData.openid;
var cid;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden1: 0,
        hidden2: 0,
    },

    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/square/index?cid=' + cid,
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    jump: function(event) {
        var where = event.currentTarget.dataset.case;
        wx.navigateTo({
            url: '../model/index?id=' + where,
        })
    },
    changechosen: function(chosen) {
        //请求新的帖子
        var THIS = this;
        this.setData({
            hidden2: 0,
        })
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Board",
                op: "boardlist",
                cid: chosen,
                openid: getApp().globalData.openid,
                mid: 25769,
            },
            success: function(res) {
                console.log(res.data.dat);
                var data = res.data.dat;
                THIS.setData({
                    board: data.list,
                    hidden2: 1,
                })
            },
            fail: function() {
                THIS.setData({
                    hidden2: 1,
                })
                wx.showToast({
                    title: '加载失败',
                })
            }
        })
    },
    change: function(event) {
        var chosennow = event.currentTarget.dataset.index;
        this.setData({
            indexnow: chosennow,
        })
        this.changechosen(chosennow);

    },
    all: function(event) {
        this.setData({
            hidden2: 0,
        })
        //改变按钮
        var chosennow = event.currentTarget.dataset.index;
        this.setData({
            indexnow: chosennow,
        })
        console.log(chosennow);
        var THIS = this;
        //获得所有帖子
        wx.request({
            url: getApp().globalData.server,
            data:{
              a:"Board",
              op:"boardlist",
              openid:getApp().globalData.openid,
              mid:25769,
            },
            success: function(res) {
                var data = res.data.dat;
                THIS.setData({
                    board: data.list,
                    hidden2: 1,
                })
            },
            fail: function() {
                THIS.setData({
                    hidden2: 1,
                })
                wx.showToast({
                    title: '加载失败',
                })
            }
        })
    },
    toTip: function() {
        wx.navigateTo({
            url: '../tip/index'
        })
    },
    write: function() {
        this.setData({
            status: 0
        })
    },
    onLoad: function(options) {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        cid = options.cid;
        var THIS = this;
        //左侧状态栏请求
        wx.request({
            url: getApp().globalData.server,
            data:{
              a:"Board",
              op:"lists",
              openid:getApp().globalData.openid,
              mid:25769,
              id:7,
            },
            success: function(res) {
                console.log(res.data.dat);
                var data = res.data.dat;
                THIS.setData({
                    catelist: data.category,
                    indexnow: cid,
                    hidden1: 1,
                })
            },
            fail: function() {
                THIS.setData({
                    hidden2: 1,
                })
                wx.showToast({
                    title: '加载失败',
                })
            }
        })
        //board请求
        this.changechosen(cid);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var THIS = this;
        wx.getSystemInfo({
            success: function(res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
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