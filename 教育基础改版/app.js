//app.js
var fundebug = require('./fundebug.0.0.3.min.js');
fundebug.apikey = 'c648da35f9c366ce97ca980df26b85e349ff34ee26c73dd5a2e9ca637526bf81';

App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var THIS = this;
        wx.login({
            success: function (res) {
                wx.getStorage({
                    key: 'openid',
                    success: function (res) {
                        THIS.globalData.openid = res.data;
                    },
                    fail: function () {
                        wx.request({
                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=getopenid',
                            data: {
                                code: res.code,
                                uniacid: getApp().globalData.acid,
                            },
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (response) {
                                var openid = response.data.openid;
                                THIS.globalData.openid = openid;
                                wx.getUserInfo({
                                    success: function (res) {
                                        var info = res.userInfo;
                                        wx.request({
                                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=register',
                                            data: {
                                                'openid': openid,
                                                'avatarUrl': info.avatarUrl,
                                                'name': info.nickName,
                                                'gender': info.gender,
                                                'province': info.province,
                                                'city': info.city,
                                                'uniacid': getApp().globalData.acid,
                                            },
                                        })
                                        wx.setStorage({
                                            key: 'openid',
                                            data: openid,
                                        })
                                    },
                                })
                                wx.getStorage({
                                    key: 'openid',
                                    success: function (res) {
                                        THIS.onLaunch();
                                    },
                                })
                            },
                        })
                    }
                })
                wx.request({
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=bb',
                    success: function (res) {
                        THIS.globalData.version = res.data.dat;
                    }
                })
                //主机构名字
                wx.request({
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=id',
                    data:{
                        uid:0,
                        uniacid: getApp().globalData.acid,
                    },
                    success: function (res) {
                        THIS.globalData.merchname = res.data.dat.zz.name;
                    }
                })
            }
        })
    },
    globalData: {
        acid: 4301,
        server:"https://api.cnmmsc.org/index.php?c=eweivideo&uniacid="+4301,
    }
})



