// pages/request/request.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    share:1
  },
  jian: function (e) {
    that = this;
    var share = that.data.share;
    if (share < 1) {
      wx.showToast({
        title: '份额不能为少于0',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      share--;
      that.setData({
        share: share
      })
    }
  },


  // 加
  jia: function (e) {
    that = this;
    var share = that.data.share;
    if (share >=12){
      wx.showToast({
        title: '剩余份额不足',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      share++;
      that.setData({
        share: share
      })
    }
  },

  handlQqps: function() {
    that = this;
    app.postData("GetGoodsData.ashx", {
      action: "RequestDeliver",
      userid: app.globalData.userid,
      count: that.data.share
    }).then(res => {
      console.log(res);
      if (res.Result == 1) {
        wx.navigateTo({
          url: '../qqps/qqps'
        })
      } else {
        wx.showToast({
          title: '申请失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    that = this;
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