// pages/device/device.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 1,
      name: "九峰小区12栋1号设备"
    }, {
      id: 2,
      name: "九峰小区12栋2号设备"
    }]
  },
  mydevice: function() {
    wx.navigateTo({
      url: '/pages/mydevice/mydevice',
    })
  },
  handJump1: function() {
    wx.navigateTo({
      url: '../device/device',
    })
  },
  handJump3: function() {
    wx.navigateTo({
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