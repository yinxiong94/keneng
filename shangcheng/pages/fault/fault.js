// pages/fault/fault.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    machineId: '',
    reamrk: ''
  },
  handMachineId: function(e) {
    that = this;
    that.setData({
      machineId: e.detail.value
    })
  },
  handFault: function(e) {
    that = this;
    that.setData({
      reamrk: e.detail.value
    })
  },
  handGuzhang:function(){
    app.postData("President.ashx", {
      action: "FaultAdd",
      userId: app.globalData.userid,
      reamrk: that.data.reamrk,
      machineId: that.data.machineId
    }).then(res => {
      if (res.Msg == '故障申报成功'){
        wx.showToast({
          title: "故障申报成功",
          icon: "none",
          duration: 2000
        });
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