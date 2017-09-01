// index.js
var openid = getApp().globalData.openid;
var myid;
var WxParse = require('../../wxParse/wxParse.js');
var lat;
var lng;
var tel;
Page({
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/advertise/index?id=' + myid,
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        myindex: 0,
    },

    jumptocourse: function(e) {
        var id = e.currentTarget.dataset.id;
        var doctype = e.currentTarget.dataset.doctype;
        var typename;
        switch (doctype) {
            case "1":
                typename = "video";
                break;
            case "2":
                typename = "course";
                break;
            case "3":
                typename = "article";
                break;
        }
        wx.navigateTo({
            url: '../' + typename + "/index?id=" + id,
        })
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: tel,
        })
    },
    getloacation: function() {
        wx.openLocation({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
        })
    },
    onLoad: function(options) {
        if (options.merchid || options.merchid === "0") {
            myid = options.merchid;
        } else {
            myid = options.id;
        }
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        //获取基础信息
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "merch",
                op: "id",
                uid: myid,
                openid: getApp().globalData.openid,
            },
            success: function(res) {
                //标记坐标
                var data = res.data.dat;
                if (res.data.dat.jg) {
                    lat = data.jg.lat;
                    lng = data.jg.lng;
                    tel = data.jg.tel;
                    wx.setNavigationBarTitle({
                        title: data.jg.merchname,
                    });
                } else {
                    tel = data.zz.phone;
                    wx.setNavigationBarTitle({
                        title: data.zz.name,
                    });
                }
                console.log(res);
                THIS.setData({
                    base: data,
                })
            }
        })
        //获取教师信息
        wx.request({
            url: getApp().globalData.server,
            data:{
              a:"merch",
              op:"teacher",
              uid:myid,
              openid:getApp().globalData.openid
            },
            success: function(res) {
                var teacher = res.data.dat.teacher;
                for (var key in teacher) {
                    var newcontent = teacher[key].content;
                    WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
                }
                THIS.setData({
                    teacher: teacher,
                })
            }
        })
        //获取课程信息
        wx.request({
            url: getApp().globalData.server,
            data:{
              a:"merch",
              op:"shop",
              openid:getApp().globalData.openid,
              uid:myid,
            },
            success: function(res) {
                THIS.setData({
                    shop: res.data.dat.shop,
                })
            }
        })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    base: function() {
        this.setData({
            index: 0,
            myindex: 0,
        })
    },
    address: function() {
        this.setData({
            index: 1,
            myindex: 1,
        })
    },
    teacher: function() {
        this.setData({
            index: 2,
            myindex: 2,
        })
    },
    ablum: function() {
        this.setData({
            index: 3,
            myindex: 3,
        })
    },


    onchange: function(event) {
        this.setData({
            myindex: event.detail.current,
        })
    },
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