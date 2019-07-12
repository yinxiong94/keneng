// pages/withdrawal/withdrawal.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 社长提现记录列表
  handwithdrawal: function () {
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "WithdrawList",
      userId: app.globalData.userid
    }).then(res => {
      console.log(res);
      that.setData({
        list: res.Result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    that = this;
    that.handwithdrawal();
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