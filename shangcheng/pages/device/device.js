// pages/device/device.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // 设备列表
  handDevice:function(){
    that = this;
    app.postData("President.ashx", {
      action: "MachineInfoList",
      userId: app.globalData.userid
    }).then(res => {
      console.log(res);
      that.setData({
        list: res.Result
      })
    })
  },
  mydevice: function(e) {
    let index = e.currentTarget.dataset.index;
    let send = that.data.list[index];
    wx.navigateTo({
      url: '/pages/mydevice/mydevice?MachineId=' + send.MachineId + '&Reserves=' + send.Reserves + '&MachineState=' + send.MachineState,
    })
  },
  handJump1: function() {
    wx.redirectTo({
      url: '../device/device',
    })
  },
  handJump3: function() {
    wx.redirectTo({
      url: '../szdpersonal/szdpersonal',
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
    that.handDevice();
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