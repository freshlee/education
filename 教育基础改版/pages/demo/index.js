var openid = getApp().globalData.openid;
var WxParse = require('../../wxParse/wxParse.js');
Page({
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/demo/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    data: {

    },
    getLocalTime: function(nS) {
        var timestamp = nS;
        var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "年" +
            (d.getMonth() + 1) + "月" +
            (d.getDate()) + "日";
        return date;
    },
    moveToMore: function() {
        wx.navigateTo({
            url: '../filter/index?type=3',
        })
    },
    moveToMoreArticle: function () {
      wx.navigateTo({
        url: '../articlelist/index',
      })
    },
    moveToArticle: function(event) {
        var newurl = '../article/index?id=' + event.currentTarget.dataset.id;
        wx.navigateTo({
            url: newurl,
        })
    },
    // recorrect:function(des,oldip,newip){
    //   for(var key in des){
    //     mark=/oldip/
    //     des[key].thumb = des[key].thumb.replace(mark,"")
    //   }
    // },
    onReady: function() {
        var hehe = getApp().globalData.userInfo;
        console.log(hehe);
        var THIS = this;

        //获取用户信息

    },
    onLoad: function() {
        this.setData({
            versioninfo: getApp().globalData.version,
        })
        var THIS = this;
        //再次调起用户信息
        //商品接口
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "videoshop",
                op: "zd",
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res);
                var videos = [];
                var mainLogos;
                var subLogos = [];
                var courses = [];
                var article = [];
                var bannerUrl = [];
                var list1 = res.data.dat.type1;
                var list3 = res.data.dat.type2;
                var list4 = res.data.dat.type3;
                for (var i in list1) {
                    if (list1[i][0]) {
                        var element = "../video/index?&id=" + list1[i][0].id;
                        var list1_thumb = list1[i][0].thumb;
                        videos.push({ url: element, thumb: list1_thumb, title: list1[i][0].title });
                    }
                }
                for (var i in list3) {
                    if (list3[i][0]) {
                        var element = "../course/index?id=" + list3[i][0].id;
                        var list3_thumb = list3[i][0].thumb;
                        courses.push({
                            url: element,
                            thumb: list3_thumb,
                            price: list3[i][0].marketprice,
                            name: list3[i][0].title
                        });
                    }
                }
                for (var i in list4) {
                    if (list4[i][0]) {
                        WxParse.wxParse('content[' + i + ']', 'html', newcontent, THIS, 5);
                        var element = "../article/index?id=" + list4[i][0].id;
                        var list4_thumb = list4[i][0].thumb;
                        var time = THIS.getLocalTime(list4[i][0].createtime);
                        article.push({
                            url: element,
                            thumb: list4_thumb,
                            title: list4[i][0].title,
                            subscript: list4[i][0].articlesubscript,
                            content: list4[i][0].content,
                            time: time,
                            id: list4[i][0].id,
                            saletimes: list4[i][0].saletimes
                        });
                    }
                    var newcontent = list4[i][0].saletimes;
                }

                THIS.setData({
                    video: videos,
                    courseData: courses,
                    articleData: article,
                });
            }
        })

        //展示接口
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "videovad",
                op: "videovad_nav"

            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res);
                var videos = [];
                var mainLogos;
                var subLogos = [];
                var courses = [];
                var article = [];
                var bannerUrl = [];
                var navs = [];
                var banner = res.data.dat.BANNER;
                var list2 = res.data.adv;
                var nav = res.data.dat.NAV;
                for (var i in banner) {
                    var link = banner[i].link;
                    var probe = /cate=\d*/
                    if (banner[i].link.match(probe)) {
                        var id = banner[i].link.match(probe)[0];
                        var id = id.substring(5);
                        link = "../filter/index?cate=" + id
                    }
                    var probe = /id=\d*/
                    if (banner[i].link.match(probe)) {
                        var id = banner[i].link.match(probe)[0];
                        var id = id.substring(5);
                        link = "../filter/index?id=" + id
                    }
                    bannerUrl.push({ url: link, thumb: banner[i].thumb });
                }
                //    for (var i in list2) {
                //      if (i == 0) { mainLogos = { url: list2[i].link, thumb: list2[i].thumb }; continue; }
                //      else if (i <= 4) { subLogos.push({ url: list2[i].link, thumb: list2[i].thumb }); }
                //      else { break; }
                //    }
                for (var key in nav) {
                    var url = nav[key].url;
                    var probe = /cate=\d*/
                    if (nav[key].url.match(probe)) {
                        var thumb = nav[key].icon;
                        var name = nav[key].navname;
                        var displayorder = nav[key].displayorder;
                        var cate = nav[key].url.match(probe)[0];
                        var cate = cate.substring(5);
                        url = "../filter/index?cate=" + cate
                        navs.push({ url: url, thumb: thumb, name: name, displayorder: displayorder })
                    } else {
                        (function() {
                            var thumb = nav[key].icon;
                            var name = nav[key].navname;
                            var displayorder = nav[key].displayorder;
                            var probe = /id=\d*/
                            if (nav[key].url.match(probe)) {
                                console.log(111111);
                                var id = nav[key].url.match(probe)[0];
                                var id = id.substring(3);
                                wx.request({
                                    url: getApp().globalData.server,
                                    data: {
                                        a: "order",
                                        op: "create",
                                        openid: getApp().globalData.openid,
                                        goodsid: id,
                                    },
                                    success: function(res) {
                                        console.log(this.prototype);
                                        if (res.data.dat) {
                                            var doctype = res.data.dat.goods.type;
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
                                            url = '../' + typename + "/index?id=" + id;
                                            navs.push({ url: url, thumb: thumb, name: name, displayorder: displayorder })
                                            for (var i = 0; i < navs.length - 1; i++) {
                                                for (var j = 0; j < navs.length - i - 1; j++) {
                                                    if (navs[j].displayorder - navs[j + 1].displayorder < 0) {
                                                        var sto = navs[j];
                                                        navs[j] = navs[j + 1];
                                                        navs[j + 1] = sto;
                                                    }
                                                }
                                            }
                                            console.log(navs);
                                            THIS.setData({
                                                title: navs,
                                            })
                                        }
                                    },
                                })
                            } else {
                                navs.push({
                                    url: url,
                                    thumb: nav[key].icon,
                                    name: nav[key].navname,
                                    displayorder: nav[key].displayorder
                                })
                            }
                        })();
                    }


                }

                THIS.setData({
                    title: navs,
                    bannerUrls: bannerUrl,
                });
            }
        })
        //机构接口
        wx.request({
            url: getApp().globalData.server,
            data: {
                a: "merch",
                op: "sy",
                openid: getApp().globalData.openid
            },
            success: function(res) {
                console.log(res);
                var data = res.data.dat.sy;
                for (var key in data) {
                    data[key].url = "../advertise/index?id=" + data[key].id;
                }
                var main_organise = data[0];
                var new_organise = data.slice(1, data.length);
                THIS.setData({
                    organise: new_organise,
                    mainorganise: main_organise,
                })
            }
        })
    },
    onPullDownRefresh: function() {
        getApp().onLaunch();
        this.onLoad();
        wx.stopPullDownRefresh();
    },
})