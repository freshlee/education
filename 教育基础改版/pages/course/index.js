// pages/video/index.js
var fundebug = require('../../fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

var WxParse = require('../../wxParse/wxParse.js');
var org;
var lengths;
var nowpos;
var myid;
var merchid;
var concernstatus;
var originstatus;
var box;
var ralativecourse = [];
var optionstorage;
var optionid;

Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/course/index?id=' + myid,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    stop:function(){
        return false;
    },
    close:function(){
        this.setData({
            paystatus:false,
        })
    },
    paystatuschange:function(){
        this.setData({
            paystatus:true
        })
    },
    itchange: function (e) {
        var firstkey = e.currentTarget.dataset.ind;
        var secondkey = e.currentTarget.dataset.index;
        var name = e.currentTarget.dataset.name;
        var oldoptions = this.data.resbox;
        console.log(firstkey)
        console.log(secondkey)
        for (var key in oldoptions[firstkey].list) {
            oldoptions[firstkey].list[key].checked = false;
        }
        oldoptions[firstkey].list[secondkey].checked = true;
        this.setData({
            resbox: oldoptions,
        })
        optionstorage[firstkey] = name;
        var newoption = optionstorage.join("+");
        console.log(newoption)
        var optionbox = this.data.optionbox;
        for (var key in optionbox) {
            if (optionbox[key].title == newoption) {
                this.setData({
                    storage: optionbox[key].stock,
                    marketprice: optionbox[key].marketprice,
                })
                optionid = optionbox[key].id;
            }
        }
    },
    //选择地点
    chosepos: function (e) {
        var THIS = this;
        console.log(THIS.data.locationData[e.detail.value]);
        this.setData({
            position: THIS.data.locationData[e.detail.value],
        })
    },
    //选择时间
    chosedate: function (e) {
        var formbox = this.data.formbox[e.detail.value].list;
        var newbox = [];
        for (var key in formbox) {
            newbox.push(formbox[key].prov + "-" + formbox[key].citys);
        }
        this.setData({
            date: this.data.dateData[e.detail.value],
            locationData: newbox,
        })
    },

    /**
     * 页面的初始数据
     */
    data: {
        status: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    purchase: function (e) {
        var formdata = e.detail.value;
        console.log(formdata);
        this.setData({
            paystatus: true
        })
        var mylength=0;
        for(var key in formdata){
            mylength++;
        }
        if (mylength) {
            for (var key in formdata) {
                if (!formdata[key] && !optionid) {
                    wx.showModal({
                      title: '提示',
                      content: '请填入完整信息',
                    })  
                    return false;
                }
            }
            var openid = getApp().globalData.openid;
            if (openid) {
              if (this.data.storage>0){
                wx.navigateTo({
                  url: '../checkout/index?id=' + myid + "&optionid=" + optionid,
                })
              }
              else{
                wx.showModal({
                  title: '提示',
                  content: '库存为0！',
                })        
              }
            } else {
                wx.showModal({
                    title: '未登录',
                    content: '未登录不能购买',
                })
            }
        }
        else {
            return false;
        }

    },
    jumptoorganise: function () {
        wx.navigateTo({
            url: '../advertise/index?merchid=' + this.data.merchid,
        })
    },
    jumptocourse: function (e) {
        var id = e.currentTarget.dataset.id;
        var doctype = e.currentTarget.dataset.doctype;
        var typename;
        switch (doctype) {
            case "1":
                typename = "vidoe";
            case "2":
                typename = "course";
            case "3":
                typename = "article";
        }
        wx.navigateTo({
            url: '../' + typename + "/index?id=" + id,
        })
    },
    concern: function () {
        concernstatus = 0;
        this.setData({
            favor: 0,
        })
        console.log(this.data.favor);
    },
    disconcern: function () {
        concernstatus = 1;
        this.setData({
            favor: 1,
        })
    },
    more: function () {
        wx.navigateTo({
            url: '../goodscomment/list/index?id=' + myid,
        })
    },
    move: function (event) {
        if (event.detail.scrollTop >= 190) {
            this.setData({
                status: 1,
            })
        } else {
            this.setData({
                status: 0,
            })

        }
    },
    expension: function (event) {
        var casename = event.currentTarget.dataset.case;
        box[casename] = box[casename] == 1 ? 0 : 1;
        this.setData({
            box: box,
        })
        console.log(this.data.box);
    },
    detail: function () {
        nowpos = 0;
        this.setData({
            myindex: 0,
            index: 0,
        })
        console.log(this.data.toView);
    },
    comment: function () {
        nowpos = lengths;
        this.setData({
            myindex: 1,
            index: 1,
        })
        console.log(this.data.toView);
    },
    interact: function () {
        nowpos = lengths * 2;
        this.setData({
            myindex: 2,
            index: 2,
        })
        console.log(this.data.toView);
    },
    onLoad: function(options) {
        var THIS = this;
        var article;
        myid = options.id;
        box = [1, 1, 1];
        concernstatus = undefined;
        this.setData({
            myid: myid,
            box: [1, 1, 1],
            ralativecourse: []
        })
        //获取商品信息
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "order",
                op: "create",
                openid: getApp().globalData.openid,
                goodsid: myid,

            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                var data = res.data.dat;
                wx.setNavigationBarTitle({
                    title: data.goods.title,
                });
                merchid = data.goods.merchid;
                var article = data.goods.content;
                var priceattr = data.goods.priceattr;
                WxParse.wxParse('article', 'html', article, THIS, 5);
                THIS.setData({
                    thumburl: data.thumburl,
                    goods: data.goods,
                    hidden: true,
                    merchid: merchid,
                    priceattr: priceattr,
                })
                // 整理选项信息
                var optionbox = res.data.dat.gg;
                THIS.setData({
                    optionbox: optionbox,
                })
                var optionsnum = optionbox[0].title.split("+").length;
                console.log(optionbox[0].title)
                console.log(optionsnum);
                var resbox = [];
                while (optionsnum) {
                    optionsnum--;
                    resbox.push({ list: [], groupname: '' });
                }
                for (var key in optionbox) {
                    var cell = optionbox[key].title.split("+");
                    for (var index in cell) {
                        if (resbox[index].list.length > 0) {
                            var test = 0;
                            for (var i in resbox[index].list) {
                                test = cell[index] == resbox[index].list[i].name || test;
                            }

                            if (test) {
                            }
                            else {
                                resbox[index].list.push({ name: cell[index], checked: 0, groupname: '' });

                            }
                        }
                        else {
                            resbox[index].list.push({ name: cell[index], checked: 0, groupname: '' });
                        }
                    }
                }
                optionstorage = new Array(resbox.length);
                var fakeoption = res.data.dat.goods.option;
                console.log(resbox);
                var subkey = resbox.length-1;
                for (var key in fakeoption) {
                    console.log(key);
                    resbox[subkey].groupname = fakeoption[key].title;
                    subkey--;
                }
                THIS.setData({
                    resbox: resbox,
                })
                console.log(resbox);

                //获取机构信息
                wx.request({
                    url: getApp().globalData.server,
                    data: {
                        a: "merch",
                        op: "id",
                        openid: getApp().globalData.openid,
                        uid: merchid,
                    },
                    success: function (res) {
                        try{
                            var desc = res.data.dat.zz.description;
                        }catch(err){
                            var desc = res.data.dat.jg.desc;   
                        }
                        console.log(res);
                        THIS.setData({
                            organise: desc,
                            organiseinfo: res.data.dat,
                        })
                    }
                })
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
        //获取评论接口
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "comment",
                op: "list",
                openid: getApp().globalData.openid,
                goodsid: myid,
            },
            success: function (res) {
                var data = res.data.dat
                var average = Math.round(data.level_avg)
                THIS.setData({
                    commentnum: data.order_count,
                    commentlist: data.order,
                    reputation: average,
                })
            }
        })

        //获取评论接口
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "comment",
                op: "list",
                openid: getApp().globalData.openid,
                goodsid: myid,
            },
            success: function(res) {
                var data = res.data.dat
                var average = Math.round(data.level_avg)
                THIS.setData({
                    commentnum: data.order_count,
                    commentlist: data.order,
                    reputation: average,
                })
            }
        })

        //获取教师信息
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"merch",
                op:"spt",
                openid:getApp().globalData.openid,
                goodsid: myid,
            },
            success: function(res) {
                if (!res.data.status) {
                    return false;
                }
                var data = res.data.dat;
                var teacher = data.teacher || null;
                for (var key in teacher) {
                    var coursecount;
                    var newcontent = teacher[key].content;
                    WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
                    wx.request({
                        url: getApp().globalData.server,
                        data:{
                            a:"merch",
                            op:"tsp",
                            openid:getApp().globalData.openid,
                            tid:teacher[key].id,
                        },
                        success: function(res) {
                            var data = res.data.dat.shop;
                            var ralativecourse = THIS.data.ralativecourse;
                            var afterfilter = [];
                            for (var subkey in data) {
                                if (data[subkey].type == 1) {
                                    afterfilter.push(data[subkey]);
                                }
                            }
                            teacher[key].courselist = data;
                            THIS.setData({
                                teacher: teacher,
                                ralativecourse: ralativecourse.concat(afterfilter)
                            })
                        }
                    })
                }
            },
        })
        //获取关注状态
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"merch",
                op:"gz",
                openid:getApp().globalData.openid,
                goodsid:myid,
            },
            success: function(res) {
                console.log(res);
                THIS.setData({
                    favor: res.data.dat.isfavorite,
                })
                originstatus = res.data.dat.isfavorite;
            }
        })
        //留下脚印
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"merch",
                op:"addfootstep",
                goodsid:myid,
            },
            success: function(res) {
                console.log("已经加入浏览记录")
            }
        })


    },

    onReady: function() {
        var THIS = this;
        wx.getSystemInfo({
            success: function(res) {
                lengths = res.screenWidth;
                THIS.setData({
                    myheight: res.screenHeight,
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var THIS = this;
        this.setData({
            hidden: false,
            versioninfo: getApp().globalData.version,
        })
        //获取权限信息
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"pay",
                op:"gm",
                openid:getApp().globalData.openid,
                goodsid:myid,
            },
            success: function(res) {
                THIS.setData({
                    permission: res.data.dat,
                    hidden: true
                })
            },
            fail: function() {
                THIS.setData({
                    hidden: true
                })
            }
        })
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
        //关注
        console.log()
        if (concernstatus === undefined) {} else {
            if (concernstatus == 0 && originstatus == 1) {
                wx.request({
                    url: getApp().globalData.server,
                    data:{
                        a:"merch",
                        op:"toggle",
                        openid:getApp().globalData.openid,
                        goodsid:myid,
                        isfavorite:1,
                    },
                })
            } else if (concernstatus == 1 && originstatus == 0) {
                wx.request({
                    url: getApp().globalData.server,
                    data:{
                        a:"merch",
                        op:"toggle",
                        openid:getApp().globalData.openid,
                        goodsid:myid,
                        isfavorite:0,

                    },
                })
            }
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.onload();
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