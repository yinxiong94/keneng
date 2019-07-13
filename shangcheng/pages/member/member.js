// pages/member/member.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // 我的会员接口
  handMember: function() {
    that = this;
    app.postData("GetAgentInfo.ashx", {
      action: "MyMemberList",
      userId: app.globalData.userid
    }).then(res => {
      that.setData({
        list: res.Result
      })
    })
  },
  handJump1: function() {
    wx.navigateTo({
      url: '/pages/Dldindex/Dldindex',
    })
  },
  handJump2: function() {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  handJump3: function() {
    wx.navigateTo({
      url: '../personal/personal',
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
    that.handMember();
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