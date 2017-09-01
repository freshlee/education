// index.js
var openid = getApp().globalData.openid;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getLocalTime: function (nS) {
        var timestamp = nS;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "年" +
            (d.getMonth() + 1) + "月" +
            (d.getDate()) + "日";
        return date;
    },
    purchase: function () {
        if (!this.data.id) {
            wx.showToast({
                title: '请选择vip类型',
            })
        }
        else {
            var THIS = this;
            this.setData({
                hidden: false,
            })
            var timetype = parseInt(this.data.time);
            var levelid = this.data.id;
            var time = new Date();
            switch (timetype) {
                case 1: time.setDate(time.getDate() + 7); break;
                case 2: time.setDate(time.getDate() + 30); break;
                case 3: time.setDate(time.getDate() + 182); break;
            }
            console.log(timetype);
            var nowstamp = Date.parse(time) / 1000;
            //   wx.request({
            //       url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=payvip&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&times=' + timestamp,
            //   })
            //   wx.request({
            //       url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=payvip&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&times=' + nowstamp,
            //   })
            wx.request({
                url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=gvip&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&levelid=' + THIS.data.id,
                success: function (res) {
                    var orderid = res.data.orderid;
                    wx.request({
                        url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=params&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + "&orderid=" + orderid,
                        success: function (res) {
                            wx.request({
                                url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=vipyes&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + "&orderid=" + orderid,
                                success: function (res) {
                                    var data = res.data.dat.wechat;
                                    wx.requestPayment({
                                        timeStamp: data.timeStamp,
                                        nonceStr: data.nonceStr,
                                        package: data.package,
                                        signType: data.signType,
                                        paySign: data.paySign,
                                        success: function () {
                                            THIS.setData({
                                                hidden: true,
                                            })
                                            wx.request({
                                                url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=payvip&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&times=' + nowstamp,
                                            })
                                            //是不是VIP
                                            wx.request({
                                                url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=Usersq&op=selectuser&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid,
                                                success: function (res) {
                                                    var today = new Date();
                                                    var todaystamp = Date.parse(today) / 1000;
                                                    console.log(todaystamp);
                                                    var deadlinetime = THIS.getLocalTime(res.data.dat.member.level);
                                                    THIS.setData({
                                                        deadline: res.data.dat.member.level - todaystamp,
                                                        deadlinetime: deadlinetime,
                                                    })
                                                }
                                            })
                                            wx.showToast({
                                                title: '您已经支付成功',
                                            })
                                        },
                                        fail: function () {
                                            THIS.setData({
                                                hidden: true,
                                            })
                                        }
                                    })
                                }
                            })
                        }
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
    charge: function (e) {
        var time = e.currentTarget.dataset.type;
        var money = e.currentTarget.dataset.money;
        var id = e.currentTarget.dataset.id;
        this.setData({
            time: time,
            money: money,
            id: id,
        })
    },
    show: function () {
        this.setData({
            status: 1,
        })
    },
    onLoad: function (options) {
        this.setData({
            versioninfo: getApp().globalData.version,
            hidden: true,
            deadline: -100,
        })
        var THIS = this;
        wx.request({
            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=pay&op=vip&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid,
            success: function (res) {
                //  for(var key in res.data.dat.level){
                //    res.data.dat.level[key].ordermoney = parseInt(res.data.dat.level[key].ordermoney);
                //  }
                THIS.setData({
                    viplist: res.data.dat.level,
                })
            }
        })
        //是不是VIP
        wx.request({
            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=Usersq&op=selectuser&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid,
            success: function (res) {
                if (res.data.dat.member) {
                    var today = new Date();
                    var timestamp = Date.parse(today) / 1000;
                    console.log(res.data.dat.member.level)
                    console.log(timestamp)
                    var deadlinetime = THIS.getLocalTime(res.data.dat.member.level);
                    var pasttime = new Date(res.data.dat.member.level * 1000);
                    THIS.setData({
                        deadline: pasttime.getTime() - today.getTime(),
                        deadlinetime: deadlinetime,
                    })
                    console.log(THIS.data.deadline)
                }
                else {
                    THIS.setData({
                        deadline: -100,
                    })
                }
            }
        })
        //VIP课程
        wx.request({
            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=videoshop&op=fl&uniacid=' + getApp().globalData.acid + '&priceattr=2',
            success: function (res) {
                THIS.setData({
                    list: res.data.dat.goods
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var time = new Date();
        var quantum = time.getHours();
        var now;
        if (quantum < 6) {
            now = 0;
        }
        else if (quantum < 12) {
            now = 1;
        }
        else if (quantum < 14) {
            now = 2;
        }
        else if (quantum < 18) {
            now = 3;
        }
        else {
            now = 4;
        }
        this.setData({
            timestatus: now,
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