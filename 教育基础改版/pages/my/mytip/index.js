// index.js
var page=2;
var psize;
var total;
var max=3;
var openid = getApp().globalData.openid;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myindex: 0,
    hidden:true,
  },
  del:function(e){
    //确认
    var THIS=this;
    var id=e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['确认删除'],
      success:function(res){
        if(res.tapIndex===0){
          THIS.setData({
            hidden: false,
          })
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=deletereply&uniacid=' + getApp().globalData.acid+'&bid=' + id + "&openid=" + getApp().globalData.openid,
            success:function(res){
            var newlist = THIS.data.replys;
            newlist.splice(index,1);
            THIS.setData({
              replys:newlist,
              hidden:true
            })
            },
            fail:function(){
              THIS.setData({
                hidden: true
              })
            },
          })
        }
      }
    })
  },
  more:function(){
    var THIS=this;
    if(page<=max){
      THIS.setData({
        hidden: false,
      })
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=getreplys&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&page=' + page,
        success: function (res) {
          THIS.setData({
            hidden:true
          })
          psize = res.data.dat.pagesize;
          total = res.data.dat.total;
          console.log(res);
          if(page==1){
            THIS.setData({
              replys: res.data.dat.list,
            })
          }
          else{
            THIS.setData({
              replys: THIS.data.replys.concat(res.data.dat.list),
            })   
          }
          page += 1;
          max = Math.ceil(total / psize);
        },
        fail:function(){
          THIS.setData({
            hidden: false
          })
        }
      })
    }
    else{
        THIS.setData({
        warm:1,
      })
    }
    console.log(psize);
  },
  jumptoreply: function (e) {
    var pid = e.currentTarget.dataset.pid;
    var bid = e.currentTarget.dataset.bid;
    wx.navigateTo({
      url: '../../comment/index?pid=' + pid+"&bid="+bid,
    })
  },
  jumptomodel:function(e){
    var id=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../community/model/index?id=' + id,
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
  base: function () {
    this.setData({
      index: 0,
      myindex: 0,
    })
  },
  address: function () {
    this.setData({
      index: 1,
      myindex: 1,
    })
  },
  onmove:function(event){
    var now=event.detail.current
    this.setData({
      myindex:now,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          versioninfo: getApp().globalData.version,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var THIS=this;
    wx.getSystemInfo({
      success: function (res) {
        THIS.setData({
          myheight: res.screenHeight,
        })
      },
    })
    //获取帖子
    THIS.setData({
       hidden:false,
    })
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=main&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
      success:function(res){
        var data=res.data.dat;
        for(var key in data.posts){
          data.posts[key].createtime = THIS.getLocalTime(data.posts[key].createtime)
        }
        console.log(res);
        THIS.setData({
          boards: data.boards,
          hidden:true,
        })
      },
      fail:function(){
        THIS.setData({
          hidden: true,
        }) 
      }
    })
    //初次获取帖子信息
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=getreplys&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid+'&page=1',
      success:function(res){
        THIS.setData({
          replys: res.data.dat.list,
        })
      }
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