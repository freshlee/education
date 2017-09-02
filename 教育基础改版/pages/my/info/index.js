// index.js
const date = new Date()
const years = []
const months = []
const days = []
var birth =[];
var openid = getApp().globalData.openid;


for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  renew:function(){
    var THIS = this;
    wx.request({
        url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=selectuser&uniacid=' + getApp().globalData.acid+'&openid=' + getApp().globalData.openid,
      success: function (res) {
        console.log(res);
        var data = res.data.dat.member;
        THIS.setData({
          username: data.realname,
          sex: data.sex,
          num: data.mobile,
          email: data.email,
          qq: data.qq,
        })
        if (data.birthyear && data.birthmonth && data.birthday){
            THIS.setData({
                time: data.birthyear + "-" + data.birthmonth + "-" + data.birthday,
                age: data.age,  
            })
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      versioninfo: getApp().globalData.version,
      hidden: true,
    })
    this.renew();
  
  },
  submit:function(e){
      var permission=1;
      for(var key in e.detail.value){
          if (!e.detail.value[key]){
              permission=0;
              break;
          }
      }
      if (!this.data.time){
           permission=0;
      }
      if(permission==1){
          this.setData({
              hidden: false,
          })
          var times = this.data.time.split("-");
          var year = times[0]
          var month = times[1]
          var day = times[2]
          var THIS = this;
          wx.request({
              url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=Usersq&op=userinfo&uniacid=' + getApp().globalData.acid + '&openid=' + getApp().globalData.openid + "&lat=" + THIS.data.lat + "&lng=" + THIS.data.lng + "&birthyear=" + year + "&birthmonth=" + month + "&birthday=" + day,
              data: e.detail.value,
              success: function (res) {
                  wx.showToast({
                      title: '信息提交成功',
                  })
                  console.log(res);
                  var data = res.data.dat
                  THIS.setData({
                      hidden: true,
                      clear:'',
                      age:'',
                      time:'',
                      sex:'1',
                      address:'',
                  })
                  THIS.renew();
              },
              fail:function(){
                wx.showToast({
                  image: "../../../images/message.png",
                  title: '网络问题，信息提交失败',
                })
                THIS.setData({
                  hidden: true,
                })
              }
          })
      }
      else{
          wx.showToast({
            image:"../../../images/message.png",
              title: '请填入完整信息',
          })
      }
  },
  genderchange(e){
    this.setData({
      gender: e.detail.value, 
    })
    console.log(this.data.gender);
  },
  bindChange: function (e) {
    const val = e.detail.value;
    birth=e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },
  bindTimeChange: function (e) {
    var newdate=e.detail.value.split("-");
    var today = new Date(newdate[1] + " " + newdate[2] + "," + newdate[0]);
    var birthday = new Date();
    var diff = -(today.getTime() - birthday.getTime())/1000/3600/24/365;
    var yearold = Math.floor(diff);
    this.setData({
      time: e.detail.value,
      age: yearold,
    })
  },
  getaddress: function () {
    var THIS = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        THIS.setData({
          address: res.address,
          lat:res.latitude,
          lng:res.longitude,
        })
      },
    })
  },
  check:function(){
    var name =this.data.username;
    var gender=this.data.gender;
    var birth=this.data.time;
    var age=this.data.age;
    var num=this.data.num;
    var email=this.data.email;
    var qq =this.data.qq;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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