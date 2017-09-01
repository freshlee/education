//app.js

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
<<<<<<< HEAD
<<<<<<< HEAD

                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=getopenid',

                            url: getApp.globalData.server+'&a=login&op=getopenid',

=======
                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=getopenid',
>>>>>>> parent of 7d4dc4a... Revert "mianPage titlebar CHANGE"
=======
                            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=login&op=getopenid',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
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
<<<<<<< HEAD
<<<<<<< HEAD

                                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=register',

                                            url: getApp.globalData.server+'&a=login&op=register',

=======
                                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=register',
>>>>>>> parent of 7d4dc4a... Revert "mianPage titlebar CHANGE"
=======
                                            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=login&op=register',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
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
<<<<<<< HEAD
<<<<<<< HEAD

                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=bb',

                    url: getApp.globalData.server+'&a=videoshop&op=bb',

=======
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=videoshop&op=bb',
>>>>>>> parent of 7d4dc4a... Revert "mianPage titlebar CHANGE"
=======
                    url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=videoshop&op=bb',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
                    success: function (res) {
                        THIS.globalData.version = res.data.dat;
                    }
                })
                //主机构名字
                wx.request({
<<<<<<< HEAD
<<<<<<< HEAD
  url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=id',

                    url: getApp.globalData.server+'&a=merch&op=id',

=======
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=id',
>>>>>>> parent of 7d4dc4a... Revert "mianPage titlebar CHANGE"
=======
                    url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=merch&op=id',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
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
        acid: 2,
        server:"http://192.168.1.213/apivo/index.php?c=eweivideo&uniacid="+2,
    }
})



