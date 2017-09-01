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

                            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=login&op=getopenid',
<<<<<<< HEAD
=======
<<<<<<< HEAD
                            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=login&op=getopenid',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
=======
                            url: getApp.globalData.server+'&a=login&op=getopenid',
>>>>>>> master
>>>>>>> parent of 5e5321a... rt
=======

                            url: getApp.globalData.server+'&a=login&op=getopenid',

>>>>>>> parent of 2478629... Revert "er"
                            data: {
                                code: res.code,
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                                            url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=login&op=register',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
=======
                                            url: getApp.globalData.server+'&a=login&op=register',
>>>>>>> master
>>>>>>> parent of 5e5321a... rt
=======

                                            url: getApp.globalData.server+'&a=login&op=register',

>>>>>>> parent of 2478629... Revert "er"
                                            data: {
                                                'openid': openid,
                                                'avatarUrl': info.avatarUrl,
                                                'name': info.nickName,
                                                'gender': info.gender,
                                                'province': info.province,
                                                'city': info.city,
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=videoshop&op=bb',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
=======
                    url: getApp.globalData.server+'&a=videoshop&op=bb',
>>>>>>> master
>>>>>>> parent of 5e5321a... rt
=======

                    url: getApp.globalData.server+'&a=videoshop&op=bb',

>>>>>>> parent of 2478629... Revert "er"
                    success: function (res) {
                        THIS.globalData.version = res.data.dat;
                    }
                })
                //主机构名字
                wx.request({
<<<<<<< HEAD
<<<<<<< HEAD
                    url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=id',
=======
<<<<<<< HEAD
                    url: 'http://192.168.1.213/apivo/index.php?c=eweivideo&a=merch&op=id',
>>>>>>> parent of 31af05f... mianPage titlebar CHANGE
=======
                    url: getApp.globalData.server+'&a=merch&op=id',
>>>>>>> master
>>>>>>> parent of 5e5321a... rt
=======
  url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=merch&op=id',

                    url: getApp.globalData.server+'&a=merch&op=id',

>>>>>>> parent of 2478629... Revert "er"
                    data:{
                        uid:0,
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



