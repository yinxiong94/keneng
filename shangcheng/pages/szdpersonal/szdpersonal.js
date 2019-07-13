// pages/personal/personal.js
const app = getApp()
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    phone:"0",
    list:[],
    tel:''
  },
  handPresident:function(){
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "GetAgentInfo",
      userId: app.globalData.userid
    }).then(res => {
      console.log(res);
      that = this;
      var start = res.Result.UserTel.substring(0,3);
      var stop = res.Result.UserTel.substring(7)
      var tel = start + '****' + stop;
      that.setData({
        list: res.Result,
        tel:tel
      })
    })
  },
  handJump1: function () {
    wx.navigateTo({
      url: '../device/device',
    })
  },
  handJump3: function () {
    wx.navigateTo({
      url: '"../szdpersonal/szdpersonal",',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tomyhy:function(){
    wx.navigateTo({
      url: '/pages/szdmember/szdmember',
    })
  },
  tozz:function(){
    wx.navigateTo({
      url: '/pages/zhuangzheng/zhuangzheng',
    })
  },
  tofy:function(){
    wx.navigateTo({
      url: '/pages/Return/Return',
    })
  },
  totx:function(){
    wx.navigateTo({
      url: '/pages/withdrawal/withdrawal',
    })
  },
  totg:function(){
    wx.navigateTo({
      url: '/pages/extension/extension',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a=this.data.phone.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
    this.setData({phone:a})
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    that.handPresident();
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