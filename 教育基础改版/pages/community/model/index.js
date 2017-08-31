// index.js
var WxParse = require('../../../wxParse/wxParse.js');
var bid;
var permission;
var page;
var maxpage;
var overcount;
Page({


    data: {

    },

    stop: function (res) {
        return false;
    },
    deleted: function(e){
        wx.showLoading({
            title: '删除中',
        })
        var THIS=this;
        var index = e.currentTarget.dataset.index;
        var pid = e.currentTarget.dataset.pid;
        var id = e.currentTarget.dataset.id;
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Post",
                op: "delete",
                openid: getApp().globalData.openid,
                bid: bid,
                pid: pid,
            },
            success: function (res) {
                wx.hideLoading();
                var newlist = THIS.data.list;
                newlist.splice(index, 1);
                THIS.setData({
                    list: newlist
                })
            }
        })
    },
    del: function (e) {
        var THIS = this;
        var pid = e.currentTarget.dataset.pid;
        var id = e.currentTarget.dataset.id;
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Usersq",
                op: "deletereply",
                openid: getApp().globalData.openid,
                bid: id,
            },
            success: function () {
                THIS.setData({
                    bid: id
                })
                THIS.showreply(pid);
            },
        })
    },
    onLoad: function (options) {
        var THIS=this;
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        bid = options.id;
        overcount=0;
        permission = 0;
        page = 1;
        bid = 12;
        maxpage = 1;
        this.setData({
            list: [],
            writestatus: 0,
            openid:getApp().globalData.openid,
        })
        //判断是不是版主
        wx.request({
            url: getApp().globalData.server,
            data: {
                openid: getApp().globalData.openid,
                bid: bid,
                a: "Usersq",
                op: "banzhu",
            },
            success: function (res) {
                permission = res.data.dat;
                THIS.setData({
                    permission: permission,
                })
            }
        })
        //版面数据
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Board",
                op: "main",
                id: bid,
            },
            success: function (res) {
                THIS.setData({
                    base: res.data.dat.board,
                })
            }
        })
        //评论数据
        this.more();
    },
    back: function () {
        this.setData({
            pidchosen: null,
            replystatus: 0,
        })
        console.log("back");
    },
    hide: function (event){
        var THIS=this;
        var pid = event.currentTarget.dataset.pid;
        var list = THIS.data.list;
        for (var key in list) {
            if (list[key].id == pid) {
                list[key].replylist = [];
                break;
            }
        }
        THIS.setData({
            list: list,
        })
    },
    showreply: function (event) {
        var THIS = this;
        if (event instanceof Object && !(event instanceof Array)) {
            var pid = event.currentTarget.dataset.pid;
            console.log(11111);
        }
        else {
            var pid = event;
        }
        this.setData({
            writestatus: true,
            pidchosen: pid,
            replystatus: 1,
        })
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "Post",
                op: "getlist",
                pid: pid,
                bid: bid,
            },
            success: function (res) {
                var list = THIS.data.list;
                for (var key in list) {
                    if (list[key].id == pid) {
                        list[key].replylist = res.data.dat.list;
                        break;
                    }
                }
                THIS.setData({
                    list: list,
                })
            }
        })
    },
    praise: function (event) {
        var THIS = this;
        if (getApp().globalData.openid) {
            wx.showLoading({
                title: '加载中',
            })
            var pid = event.currentTarget.dataset.pid;
            wx.request({
                url: getApp().globalData.server,
                data: {
                    a: "Post",
                    op: "like",
                    bid: bid,
                    pid: pid,
                    openid: getApp().globalData.openid,
                },
                success: function (res) {
                    wx.hideLoading();
                    var goods = res.data.dat.good;
                    var list = THIS.data.list;
                    for (var key in list) {
                        if (list[key].id == pid) {
                            list[key].goodcount = goods;
                            break;
                        }
                    }
                    THIS.setData({
                        list: list,
                    })
                }
            })
        }
        else {
            wx.showModal({
                title: '请登录',
                content: '未登录不能使用社区功能',
            })
        }

    },
    submit: function (e) {
        var THIS = this;
        var data = e.detail.value;
        if (getApp().globalData.openid) {
            wx.showLoading({
                title: '提交中',
            })
            if (data >= 200 || data <= 5) {
                wx.showToast({
                    title: '内容在5~200个之间',
                })
                return false;
            }
            if (THIS.data.replystatus == 1) {
                var pid = THIS.data.pidchosen;
                wx.request({
                    url: getApp().globalData.server,
                    data: {
                        a: "Post",
                        op: "reply",
                        openid: getApp().globalData.openid,
                        bid: bid,
                        pid: pid,
                        content: data,
                    },
                    success: function (res) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '上传成功',
                        });
                        THIS.showreply(pid);
                    },
                    fail: function () {
                        wx.hideLoading();
                        THIS.setData({
                            submiting: true,
                        })
                        wx.showToast({
                            title: '上传失败',
                        })
                    }
                })

            }
            else {
                wx.request({
                    url: getApp().globalData.server,
                    data: {
                        content: data,
                        openid: getApp().globalData.openid,
                        bid: bid,
                        a: "Post",
                        op: "submit"
                    },
                    success: function (res) {
                        overcount++;
                        // page += Math.ceil(overcount / 10);
                        wx.hideLoading();
                        THIS.renew();
                        wx.showToast({
                            title: '上传成功',
                        });
                    },
                    fail: function () {
                        wx.hideLoading();
                        THIS.setData({
                            submiting: true,
                        })
                        wx.showToast({
                            title: '上传失败',
                        })
                    }
                })
            }
        }
        else {
            wx.showModal({
                title: '请登录',
                content: '未登录不能使用社区功能',
            })
        }
    },
    more: function () {
        var THIS = this;
        if (maxpage >= page) {
            wx.showLoading({
                title: '使劲加载中',
            })
            wx.request({
                url: getApp().globalData.server,
                data: {
                    a: "Board",
                    op: "getlist",
                    openid: getApp().globalData.openid,
                    bid: bid,
                    page: page,
                },
                success: function (res) {
                    wx.hideLoading();
                    maxpage = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
                    THIS.setData({
                        total: res.data.dat.total,
                    })
                    //首次加载
                    if (page == 1) {
                        THIS.setData({
                            list: res.data.dat.list,
                        })
                    }
                    else {
                        var oldlist = [];
                        var newlist = res.data.dat.list;
                        newlist.splice(0,overcount);
                        oldlist = THIS.data.list;
                        THIS.setData({
                            list: oldlist.concat(newlist),
                        })
                        overcount-=10;
                        overcount = overcount > 0 ? overcount:0;
                    }
                    page++;
                },
            })
        }
    },
    renew: function () {
        var THIS = this;
            wx.showLoading({
                title: '使劲加载中',
            })
            wx.request({
                url: getApp().globalData.server,
                data: {
                    a: "Board",
                    op: "getlist",
                    openid: getApp().globalData.openid,
                    bid: bid,
                    page: 1,
                },
                success: function (res) {
                    maxpage = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
                    THIS.setData({
                        total: res.data.dat.total,
                    })
                    wx.hideLoading();
                    var oldlist = [];
                    oldlist = THIS.data.list;
                    console.log(res.data.dat.list[0]);
                    oldlist.unshift(res.data.dat.list[0]);
                    THIS.setData({
                        list: oldlist,
                    })
                },
            })
    },
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
        this.more();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})