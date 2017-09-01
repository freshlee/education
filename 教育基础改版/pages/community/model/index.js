// index.js
var WxParse = require('../../../wxParse/wxParse.js');
var openid = getApp().globalData.openid;
var praises=[];
var postid;
var logo=[];
var pic=[];
var bid;
var permission;
var page;
var max;
var rest;
var sublogo=[];
Page({

  /**
   * 页面的初始数据
   */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: getApp().globalData.merchname,
            path: '/pages/community/model/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
  data: {
    statu: 0,
    praise: [],
    status: 0,
    hidden:true,
    submiting:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
 //关注
 concern:function(){
   this.setData({
     isconcern:!this.data.isconcern,
   })
 },
 //删除评论
 delcomment:function(e){
   var pid = e.currentTarget.dataset.pid;
   var index = e.currentTarget.dataset.index;
   wx.request({
       url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Post&op=delete&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&id=12&bid='+bid+"&pid="+pid,
     success:function(res){
       var newlist=THIS.data.list;
       newlist.splice(index, 1);
       THIS.setData({
         list:newlist
       })
     }
   })
 },
  //删除图片
  del:function(e){
    var index= e.currentTarget.dataset.index;
    logo.splice(index,1);
    sublogo.splice(index, 1);
    this.setData({
      logo:logo,
    })
  },
  back:function(){
    this.setData({
      status:0,
    })
  },
  tocomment:function(e){
     var des=e.currentTarget.dataset.des;
     wx.navigateTo({
       url: '../../comment/index?pid='+des+'&bid='+postid,
     })

  },
  changestatu: function (event) {
    var indexnow = event.currentTarget.dataset.index;
    var status = []
    status[indexnow] = this.data.statu[indexnow]==1 ? 0 : 1;
    this.setData({
      statu: status,
    })
  },
  dochange:function(bid,pid){
    var THIS=this;
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Post&op=like&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&id=12&bid=' + bid + "&pid=" + pid,
      success: function (res) {
        THIS.setData({
          shit:res.data.dat.good,
        })
      }
    })
    console.log(this.data.shit);
    return this.data.shit;
  },
    contentinput: function (e) {
        this.setData({
            contentinput: e.detail.value,
        })
    },
    handlesubmit: function (e) {
        var value = this.data.contentinput
        var content = { detail: { value: value } }
        this.submit(content);
    },
  //提交申请
  submit: function (e) {
      if(getApp().globalData.openid){
          var THIS = this;
          var data = e.detail.value;
          this.setData({
              content: data,
          })
          if (data >= 200 || data <= 5) {
              wx.showToast({
                  title: '内容在5~200个之间',
              })
              return false;
          }
          this.setData({
              submiting: false,
          })
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Post&op=submit&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&images=' + logo[0] + "&bid=" + bid,
              data: {
                  content: THIS.data.content,
              },
              success: function (res) {
                  THIS.setData({
                      status: 0,
                      submiting: true,
                  })
                  wx.showToast({
                      title: '上传成功',
                  })
                  THIS.renewaddedcomment();
              },
              fail: function () {
                  THIS.setData({
                      submiting: true,
                  })
                  wx.showToast({
                      title: '上传失败',
                  })
              }
          })
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Post&op=upload&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + '&bid=' + bid,
              data: { images: sublogo },
              success: function (res) {

              }
          })
      }
      else{
          wx.showModal({
              title: '请登录',
              content: '未登录不能使用社区功能',
          })
      }
  },
  agree: function (event) {
      if(getApp().globalData.openid){
          this.setData({
              hidden: false,
          })
          var indexnow = event.currentTarget.dataset.index;
          var position = event.currentTarget.dataset.position + 1;
          var modifypage = Math.ceil(position / 10);
          console.log(11111111);
          console.log(modifypage);
          var modifyorg = (modifypage - 1) * 10;
          console.log(22222222);
          console.log(modifyorg);
          var THIS = this;
          this.dochange(postid, indexnow);
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=getlist&uniacid=' + getApp().globalData.acid + '&page=' + modifypage + '&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + postid,
              success: function (res) {
                  var newlist = THIS.data.list;
                  var addlist = THIS.data.list;
                  var data = res.data.dat;
                  addlist = addlist.splice(modifyorg + 10)
                  newlist.splice(modifyorg);
                  console.log(addlist);
                  THIS.setData({
                      list: newlist.concat(data.list).concat(addlist),
                      hidden: true,
                  })
              }
          })
      }
      else{
          wx.showModal({
              title: '请登录',
              content: '未登录不能使用社区功能',
          })
      }

  },
  toTip: function () {
    wx.navigateTo({
      url: '../tip/index'
    })
  },
  write: function () {
    this.setData({
      status: 1,
    })
  },
    //评论数据
  renewaddedcomment:function(){
      var THIS=this;
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=getlist&uniacid=' + getApp().globalData.acid+'&page=1&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
          success: function (res) {
              var firstpage=THIS.data.list;
              firstpage.splice(0,9);
              var data = res.data.dat;
              THIS.setData({
                  list: data.list.concat(firstpage),
                  hidden: true,
              })
              for (var key in THIS.data.list) {
                  console.log(1111111111111111111111111);
                  var newcontent = THIS.data.list[key].content;
                  WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
              }
          },
          fail: function () {
              this.setData({
                  hidden: true,
              })
              wx.showToast({
                  title: '加载失败',
              })
          }
      }) 
  },
  getcomment:function(){
      var THIS=this;
       if (page = 1) {
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=getlist&uniacid=' + getApp().globalData.acid+'&page=1&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
              success: function (res) {
                  max = Math.ceil(res.data.dat.total / res.data.dat.pagesize);
                  rest = res.data.dat.tatal % res.data.dat.pagesize;
                  var data = res.data.dat;
                  THIS.setData({
                      list: data.list,
                      hidden: true,
                      listnum: res.data.dat.total,
                  })
                  for (var key in THIS.data.list) {
                      var newcontent = THIS.data.list[key].content;
                      WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
                  }
              },
              fail: function () {
                  this.setData({
                      hidden: true,
                  })
                  wx.showToast({
                      title: '加载失败',
                  })
              }
          }) 
       }
      else{
        wx.request({
            url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=getlist&uniacid=' + getApp().globalData.acid+'&page='+page+'&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
            success: function (res) {
                var data = res.data.dat;
                THIS.setData({
                    list: THIS.data.list.concat(data.list),
                    hidden: true,
                })
                console.log(THIS.data.list);
            },
            fail: function () {
                this.setData({
                    hidden: true,
                })
                wx.showToast({
                    title: '加载失败',
                })
            }
        }) 
      }
      page+=1;
  },
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
    page=1;
    var THIS=this;
    postid=options.id;
    bid = options.id;
    console.log(options);
    //判断是不是版主
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=banzhu&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&mid=25769&bid=' + bid,
      success: function (res) {
       permission=res.data.dat;
       THIS.setData({
         permission:permission,
       })
      }
    }) 
    this.setData({
      hidden: false,
    })
    //评论数据
    this.getcomment();
    //头部数据
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=main&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&mid=25769&id=' + bid,
      success: function (res) {
        console.log(res)
        var data=res.data.dat;
        THIS.setData({
          board:data.board,
          hidden: true,
        })
      },
      fail: function () {
        this.setData({
          hidden: true,
        })
        wx.showToast({
          title: '加载失败',
        })
      }
    })
    //获取关注状态
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=sfgz&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&mid=25769&bid=' + bid,
      success:function(res){
        THIS.setData({
            concern:res.data.dat,
            isconcern: res.data.dat,
        })
        console.log(THIS.data.isconcern)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  insertpic:function(){
    var THIS=this;
     wx.chooseImage({
       success: function(res) {
         var des=/tmp_.*/
         var final=res.tempFilePaths[0].match(des)[0];
         logo.push(res.tempFilePaths[0]);
         sublogo.push(final)
         pic.push(res);
         THIS.setData({
           logo: logo,
           pic: pic,
         })
     for(var key in logo){
         console.log(logo[key]);
         wx.uploadFile({
             url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Post&op=upload&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid + '&bid=' + bid,
             filePath: logo[key],
             name: 'images',
             success:function(res){
                 console.log(res);
             }
         })
     }
       },
     })
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
    var THIS=this;
    var old = this.data.concern;
    var latest = this.data.isconcern;
    if(old!=latest){
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=follow&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid  + "&bid=" + bid,
        success: function () {
        }
      })
    } 
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
      if(page<=max){
          //刷新评论数据
          this.setData({
              hidden:false,
          })
          var THIS = this;
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Board&op=getlist&uniacid=' + getApp().globalData.acid+'&page=' + page + '&openid=' + getApp().globalData.openid + '&mid=25769&bid=' + bid,
              success: function (res) {
                  var data = res.data.dat;
                  THIS.setData({
                      list: THIS.data.list.concat(data.list),
                      hidden: true,
                  })
                  for (var key in THIS.data.list) {
                      var newcontent = THIS.data.list[key].content;
                      WxParse.wxParse('content[' + key + ']', 'html', newcontent, THIS, 5);
                  }
              },
              fail: function () {
                  this.setData({
                      hidden: true,
                  })
                  wx.showToast({
                      title: '加载失败',
                  })
              }
          })
          page += 1; 
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})