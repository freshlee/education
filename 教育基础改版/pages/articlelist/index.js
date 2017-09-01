// index.js
var openid = getApp().globalData.openid;
var myid;
var WxParse = require('../../wxParse/wxParse.js');
var lat;
var lng;
var tel;
var cates;
var wait;
Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/advertise/index?id=' + myid,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    /**
     * 页面的初始数据
     */
    jump:function(e){
       wx.navigateTo({
           url: '../article/index?id='+e.currentTarget.dataset.id,
       })
    },
    getLocalTime: function (nS) {
        var timestamp = nS;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "年" +
            (d.getMonth() + 1) + "月" +
            (d.getDate()) + "日";
        return date;
    },
    data: {
        index: 0,
        myindex: 0,
    },

    call: function () {
        wx.makePhoneCall({
            phoneNumber: tel,
        })
    },
    onLoad: function (options) {
        cates=0;
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        myid = options.id;
        wx.request({
            url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=category",
            data: {
                uniacid: getApp().globalData.acid,
            },
            success: function (res) {
                var articletype = res.data.dat.type3;
                THIS.setData({
                    articletype: articletype,
                })
                var typebox = [];
                for (var key in articletype) {
                    typebox[key] = { name: articletype[key].name, list: [],page:1 };
                }
                THIS.setData({
                    typebox: typebox,
                })
                THIS.renew(cates,1);
            },
        })
        wx.request({
            url: 'https://api.cnmmsc.org/index.php',
            data:{
                c: "eweivideo",
                op:"avd",
                a:"videovad",
                uniacid:getApp().globalData.acid,
            },
            success:function(res){
                 var data=res.data.dat.adv;
                 THIS.setData({
                     banner:data,
                 })
            },
        })

    },
    renew: function (cates, page) {
        var THIS = this;
        console.log(page);
        if (!wait){
            //该类初次加载
            if (page == 1) {
                wx.showLoading({
                })
                wx.request({
                    url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=fl&type=3",
                    data: {
                        uniacid: getApp().globalData.acid,
                        cates: THIS.data.articletype[cates].id,
                        page: 1,
                    },
                    success: function (res) {
                        wx.hideLoading();
                        var typebox = THIS.data.typebox;
                        var data = res.data.dat.goods;
                        var total = res.data.dat.total;
                        var pagesize = res.data.dat.pagesize;
                        var maxpage = Math.ceil(parseInt(res.data.dat.total) / res.data.dat.pagesize);
                        typebox[cates].maxpage = maxpage;
                        typebox[cates].page = page;
                        for (var key in data) {
                            data[key].publictime = THIS.getLocalTime(data[key].createtime);
                        }
                        if (typebox[cates].page >= typebox[cates].maxpage) {
                            console.log("已经加载完全");
                        }
                        else {
                            typebox[cates].page++;
                        }
                        typebox[cates].list = data,
                            THIS.setData({
                                typebox: typebox,
                            })
                            wait=0;
                    }
                })
            }
            else if (THIS.data.typebox[cates].maxpage >= page) {
                wx.showLoading({
                })
                wx.request({
                    url: "https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=fl&type=3",
                    data: {
                        uniacid: getApp().globalData.acid,
                        cates: THIS.data.articletype[cates].id,
                        page: page,
                    },
                    success: function (res) {
                        wx.hideLoading();
                        var typebox = THIS.data.typebox;
                        var data = res.data.dat.goods;
                        var total = res.data.dat.total;
                        var pagesize = res.data.dat.pagesize;
                        var maxpage = Math.ceil(parseInt(res.data.dat.total) / res.data.dat.pagesize);
                        typebox[cates].maxpage = maxpage;
                        typebox[cates].page = page;
                        for (var key in data) {
                            data[key].publictime = THIS.getLocalTime(data[key].createtime);
                        }
                        if (typebox[cates].page >= typebox[cates].maxpage) {
                            console.log("已经加载完全");
                            typebox[cates].page++;
                        }
                        else {
                            typebox[cates].page++;
                        }
                        typebox[cates].list = typebox[cates].list.concat(data),
                            THIS.setData({
                                typebox: typebox,
                            })
                        wait = 0;
                    }
                })
            }
            console.log(THIS.data.typebox);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    scroll: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            index: index,
            myindex: index,
            cates:index,
        })
        cates=index;
    },
    onchange: function (event) {
        this.setData({
            myindex: event.detail.current,
            cates: event.detail.current,
        })
        cates=event.detail.current;
        var page = this.data.typebox[cates].page;
        this.renew(cates, page);
    },
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
    refresh:function(){
        var page = this.data.typebox[cates].page;
        console.log(page);
        this.renew(cates, page);
        wait = 1;
    },
    onReachBottom: function () {
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})