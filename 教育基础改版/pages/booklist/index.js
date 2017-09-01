// index.js
var doctype;
var openid = getApp().globalData.openid;
var orderid;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    topay: function() {
        var THIS = this;
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=pay&op=pay&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + "&orderid=" + THIS.data.orderid,
            success: function(res) {
                var data = res.data.dat.wechat;
                wx.requestPayment({
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function() {
                        wx.showToast({
                            title: '您已经支付成功',
                        })
                        wx.request({
                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=pay&op=payh&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + "&orderid=" + THIS.data.orderid,
                        })
                    }
                })
            }
        })
    },
    onLoad: function(options) {
        orderid = options.orderid;
        var THIS = this;
        this.setData({
            versioninfo: getApp().globalData.version,
            coursename: options.coursename,
            ordernum: options.ordernum,
            goodsid: options.goodsid,
            price: options.marketprice,
            orderid: options.orderid,
            hidden: false,
        })
        doctype = options.doctype;
        if (!options.orderid) {
            //生成订单好并获取信息
            wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=order&op=submit&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&goodsid=' + options.goodsid,
                data:{
                    merchid: merchid,
                },
                success: function(res) {
                    console.log(res);
                    THIS.setData({
                        ordernum: res.data.dd,
                        orderid: res.data.orderid,
                    })
                    wx.request({
                        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=pay&op=params&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&orderid=' + res.data.orderid,
                        success: function(res) {
                            THIS.setData({
                                hidden: true,
                            })
                        },
                        fail: function() {
                            THIS.setData({
                                hidden: true,
                            })
                            wx.showToast({
                                title: '订单获取失败',
                            })
                        }
                    })
                },
                fail: function() {
                    THIS.setData({
                        hidden: true,
                    })
                    wx.showToast({
                        title: '订单生成失败',
                    })
                }
            })
        } else {
            wx.request({
                url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=pay&op=params&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&orderid=' + THIS.data.orderid,
                success: function(res) {
                    THIS.setData({
                        hidden: true,
                    })
                },
                fail: function() {
                    THIS.setData({
                        hidden: true,
                    })
                    wx.showToast({
                        title: '订单获取失败',
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
        if (!this.data.orderid) {
            wx.navigateBack({
                delta: 2
            })
        }
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