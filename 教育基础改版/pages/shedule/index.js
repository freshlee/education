// index.js
var orgY;
var orgtop;
var who = [];
var openid = getApp().globalData.openid;
var final = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myindex: 0,
        thetop: -110,
        status: 1,
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/shedule/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    jump: function (e) {
        var id = e.currentTarget.dataset.index;
        //获取商品具体信息
        wx.navigateTo({
            url: '../video/index?id=' + id,
        })
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
        var THIS = this;
        wx.getSystemInfo({
            success: function (res) {
                THIS.setData({
                    myheight: res.screenHeight,
                })
            },
        })
    },
    video: function () {
        this.setData({
            index: 0,
            myindex: 0,
        })
    },
    course: function () {
        this.setData({
            index: 1,
            myindex: 1,
        })
    },
    article: function () {
        this.setData({
            index: 2,
            myindex: 2,
        })
    },
    teacher: function () {
        this.setData({
            index: 2,
            myindex: 2,
        })
    },
    remark: function () {
        this.setData({
            index: 3,
            myindex: 3,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (getApp().globalData.openid) {
            var THIS = this;
            wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=jdlist&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid,
                success: function (res) {
                    var data = res.data.dat.jdt;
                    var finishlist = [];
                    for (var key in data) {
                        data[key].procedure = "" + 100 * data[key].jdt + "%";
                        if (data[key].jdt == "1") {
                            finishlist.push(data[key]);
                            data.splice(key, 1);
                        }
                    }
                    THIS.setData({
                        collection: data,
                        finishlist: finishlist,
                    })
                }
            })
        }
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