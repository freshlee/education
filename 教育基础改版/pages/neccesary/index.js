// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:[],
      items: [
          { name: '1', value: '服务不专业' },
          { name: '2', value: '带看不及时', checked: 'true' },
          { name: '3', value: '产品问题' },
          { name: '4', value: '乱收费' },
          { name: '5', value: '车描述不符' },
          { name: '6', value: '车况不属实' },
          { name: '7', value: '退款相关' },
          { name: '8', value: '停售改价' },
          { name: '9', value: '其他' },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submit:function(e){
      wx.showLoading({
          title: '上传中',
      })
      var where={};
      where['diyformdata']=e.detail.value;
      where["c"] = "eweivideo";
      where["a"] = "diyform";
      where["op"] = "submit";
      where["uniacid"] = getApp().globalData.acid;
      where["openid"] = getApp().globalData.openid;
      wx.request({
          url: getApp().globalData.server,
          data:where,
          success:function(){
              wx.hideLoading();
              wx.showToast({
                  title: '表单提交成功',
                  duration:3000
              })
          },
          fail:function(){
              wx.hideLoading();
          }
      })
  },
  check:function(e){
      var line=e.detail.value.length;
      var index=e.currentTarget.dataset.index;
      var num=this.data.num;
      var fields=this.data.fields;
      fields[index].rank=line;
      console.log(num);
      this.setData({
          fields:fields,
      })
  },
  onLoad: function (options) {
      var THIS=this;
      wx.request({
          url: getApp().globalData.server,
          data:{
              c: "eweivideo",
              a:"diyform",
              op:"display",
              uniacid:getApp().globalData.acid,
          },
          success:function(res){
              var data = res.data.dat.diyform.fields;
              for(var key in data){
                  data[key].formname=[key];
              }
              THIS.setData({
                  fields:res.data.dat.diyform.fields,
              })
          },
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