// index.js
var pingyin = require("../../utils/pinyin.js");
var openid = getApp().globalData.openid;
var lng;
var lat;
var maxpage;
var page;
var finalres;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/organise/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    searchcity:function(e){
        console.log(e);
        var keyword = e.detail.value.title;
        console.log(keyword);
        if(keyword){
            var prereg = keyword;
            console.log(keyword);
            var reg = new RegExp(prereg);
            var resbox = [];
            var cities = this.data.cities;
            for (var key in cities) {
                var des = cities[key].fullname;
                if (reg.test(des)) {
                    resbox.push(cities[key]);
                }
            }
            this.setData({
                rescity: resbox,
            })
        }
        else{
            this.setData({
                rescity:null,
            })
        }
    },
    searchprovince: function (e) {
        console.log(e);
        var keyword = e.detail.value.title;
        console.log(keyword);
        if (keyword) {
            var prereg = keyword;
            console.log(keyword);
            var reg = new RegExp(prereg);
            var resbox = [];
            var province = this.data.province;
            for (var key in province) {
                var des = province[key].fullname;
                if (reg.test(des)) {
                    resbox.push(province[key]);
                }
            }
            this.setData({
                resprovince: resbox,
            })
        }
        else {
            this.setData({
                resprovince: null,
            })
        }
    },
    more:function(){
        var THIS=this;
        if(maxpage>=page){
            var oldpage = page;
            wx.request({
                url: getApp().globalData.server,
                data: {
                    a: "merch",
                    op: "search",
                    city: finalres,
                    page: oldpage,
                },
                success: function (res) {
                    var olddata=[];
                    olddata = THIS.data.list_all;
                    THIS.setData({
                        list_all: olddata.concat(res.data.dat.merch),
                    })
                }
            })
            page++;
        }
    },
    finalchosen:function(){
        page=1;
        finalres = this.data.cityname||this.data.provincename;
        var THIS=this; 
        wx.request({
            url: getApp().globalData.server,
            data:{
                a:"merch",
                op:"search",
                city:finalres,
                page:page,
            },
            success:function(res){
                page++;
                maxpage = Math.ceil(res.data.dat.total/res.data.dat.pagesize);
                THIS.setData({
                    list_all:res.data.dat.merch,
                    total: res.data.dat.total,
                })

            }
        })
    },
    chosecity: function (e) {
        var cityid = e.currentTarget.dataset.id;
        var cityname = e.currentTarget.dataset.name;
        this.setData({
            cityname: cityname,
            cityid: cityid,
            citystatus: 0,
            provincestatus:0,
        })
        this.finalchosen();
    },
    choseprovince: function (e) {
        var provinceid = e.currentTarget.dataset.id;
        var provincename = e.currentTarget.dataset.name;
        var firstposition = e.currentTarget.dataset.first;
        var secondposition = e.currentTarget.dataset.second;
        console.log(firstposition);
        this.setData({
            provincename: provincename,
            provinceid: provinceid,
            provincestatus: 0,
        })
        var cities = [].concat(this.data.city);
        console.log(this.data.city);
        this.setData({
            cities: cities.slice(firstposition, secondposition),
            cityname: null,
        })
        this.finalchosen();
    },
    province: function () {
        this.setData({
            provincestatus: !this.data.provincestatus,
        })
    },
    city: function () {
        this.setData({
            citystatus: !this.data.citystatus,
        })
    },
    jump: function(event) {
        var index = event.currentTarget.dataset.index;
        wx.navigateTo({
            url: '../advertise/index?id=' + index,
        })
    },
    move: function(event) {
        var index = event.currentTarget.dataset.index;
        this.setData({
            index: index,
        })
    },
    onchange: function(event) {
        this.setData({
            index: event.detail.current,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        finalres='';
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        //附近的机构
        wx.getLocation({
            success: function(res) {
                console.log(res);
                lng = res.longitude;
                lat = res.latitude;
                wx.request({
                    url: getApp().globalData.server,
                    data: {
                        a:"merch",
                        op:"dw",
                        lat: lat,
                        lng: lng,
                        openid:getApp().globalData.openid,
                    },
                    success: function(res) {
                        if (res.data.dat.address) {
                            var data = res.data.dat.address
                            console.log(res);
                            THIS.setData({
                                list_near: data,
                            })
                        }
                    }
                })
            },
        })
        var THIS = this;
        this.setData({
            hidden: true,
        })
        wx.request({
            url: 'https://apis.map.qq.com/ws/district/v1/list?key=' + getApp().globalData.key,
            success: function (res) {
                console.log(res);
                THIS.setData({
                    province: res.data.result[0],
                    city: res.data.result[1],
                    cities: res.data.result[1],
                })
            }
        })
        //初始化状态数据
        this.setData({
            searchstatus: 0,
            citystatus: 0,
            provincestatus: 0,
            cityname:'',
            provincename:'',
        })
        this.finalchosen();
        var THIS = this;
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