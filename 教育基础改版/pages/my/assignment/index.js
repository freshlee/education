// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  submit:function(e){
      var THIS=this;
      console.log(e);
      var newday=e.detail.value.date;
      var pro =/\d{4}\-\d{2}\-\d{2}T/;
      var day = newday.match(pro);
      day = day[0].substr(0,day[0].length-1)
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=ts&op=dosign',
          data:{
              openid:getApp().globalData.openid,
              uniacid: getApp().globalData.acid,
              date:day,
          },
          success:function(res){
              if(res.data.status){
                  wx.showToast({
                      title: '签到成功',
                  })
                  var calender=THIS.data.calender;
                  var month = parseInt(THIS.data.chosingmonth);
                  var day = parseInt(THIS.data.chosingday);
                  console.log(month);
                  console.log(day);
                  calender[month].daybox[day].status = 1;
                  THIS.setData({
                      calender:calender,
                  })
              }
              else{
                  wx.showToast({
                      title: res.data.dat,
                  })
              }
          }
      })
      
  },
  foundcalender:function(month){
      //生成日历
      var today = new Date;
      var firstday = new Date;
      var lastday = new Date;
      //根据月份生成日历
      today.setMonth(month - 1)
      firstday.setMonth(month - 1)
      lastday.setMonth(month - 1)
      //获取该月总共多少天
      firstday.setDate(0);
      firstday.setDate(firstday.getDate() + 1)
      lastday.setMonth(today.getMonth() + 1);
      lastday.setDate(0);
      lastday.setDate(lastday.getDate());
      var day = today.getDay();
      var amount = lastday.getDate();
      var begin = (firstday.getDay() + 7) % 7;
      var daybox = []
      console.log(begin);
      console.log(firstday);
      for (var key = 0; key < amount; key++) {
          var newday = new Date(Date.parse(firstday));
          newday.setDate(newday.getDate() + key);
          var theday=newday.getDate();
          var themonth=newday.getMonth()+1;
          daybox.push({ date: newday,checked:0,day:theday,month:themonth});
      }
      return {daybox:daybox,begin:begin};
  },
  checkboxchange:function(e){
        var month=e.currentTarget.dataset.month;
        var day = e.currentTarget.dataset.day;
        var calender=this.data.calender;
        for(var key in calender){
            for(var i in calender[key].daybox){
                calender[key].daybox[i].checked=0;
            }
        }
        calender[month].daybox[day].checked = 1;
        this.setData({
            calender:calender,
            chosingmonth:month,
            chosingday:day,
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
          title: '加载中',
      })
      var THIS=this;
      var month=8;
      var calender=[]
      for(var key=1;key<=12;key++){
          var cell=this.foundcalender(key);
           calender.push(cell);
      }
      //转成今天
      var today = new Date;
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();
      today = today.getUTCDate();
      this.setData({
          calender:calender,
          day: day,
          month: month,
          year: year,
      })
      console.log(today);
      var datebox=[];
      //获取签到信息
      wx.request({
          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=ts&op=sy',
          data:{
              openid:getApp().globalData.openid,
              uniacid: getApp().globalData.acid,
          },
          success:function(res){
              wx.hideLoading();
              var monthbox=res.data.dat.yeae;
              var daybox=[];
              for(var key in monthbox){
                  (function(){
                      var newkey = key
                      var year = monthbox[key].year;
                      var month = monthbox[key].month;
                      var fulldate = "" + year + "-" + month;
                      wx.request({
                          url: 'https://api.cnmmsc.org/index.php?c=eweivideo&a=ts&op=getCa',
                          data: {
                              date: fulldate,
                              openid: getApp().globalData.openid,
                              uniacid: getApp().globalData.acid
                          },
                          success: function (res) {
                              wx.hideLoading();
                              (function (){
                                  daybox[newkey] = res.data.dat.yue;
                                  var month = parseInt(res.data.dat.yue[0][0].month);
                                  //把每月信息平整化
                                  var monthcontainer=[];
                                  for (var i in res.data.dat.yue){
                                      monthcontainer=monthcontainer.concat(res.data.dat.yue[i]);
                                  }
                                  var calender = THIS.data.calender;
                                  calender[month-1].status=1;
                                  console.log(monthcontainer);
                                  for (var i in calender){
                                      calender[month-1].daybox[i].status = monthcontainer[i].signed;
                                  }
                                  THIS.setData({
                                      calender:calender,
                                  })
                                  console.log(calender);
                                //   for (var i in daybox) {
                                //       datebox=datebox.concat(daybox[i][0]);
                                //   }
                                //   var calender=THIS.data.calender;
                                //   for(var key in calender){
                                //       var month = key;

                                //   }
                              })()
                          }
                      })
                  })()
              }
          }
      })
      
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